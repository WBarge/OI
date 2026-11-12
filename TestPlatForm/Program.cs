using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OI.Business;
using OI.Common.Extensions.Formatting;
using OI.Data;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Reporting.Services;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace TestPlatForm
{
    internal class Program
    {
        private static ICompanyProfile? _companyProfile = null;
        private static IOrder? _order = null;

        static async Task Main(string[] args)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            Console.WriteLine("Configuration loaded successfully.");
            Console.WriteLine($"ApplicationName: {configuration["AppSettings:ApplicationName"]}");
            
            //yes do the service location pattern here, but only for testing purposes
            ServiceCollection services = new ServiceCollection();
            
            services.AddLogging(builder =>
            {
                builder.AddConfiguration(configuration.GetSection("Logging")); // optional
                builder.AddConsole();
                builder.SetMinimumLevel(LogLevel.Debug);
            });
            
            DataDi.ConfigureReportingDi(services, configuration);
            BusinessDi.ConfigureReportingDi(services);
            services.AddScoped<ICompanyProfileStore, PersistedCompanyProfileStore>();

            using ServiceProvider provider = services.BuildServiceProvider();
            using IServiceScope scope = provider.CreateScope();
            await GenerateReport(scope);
        }

        public static async Task GenerateReport(IServiceScope scope)
        {
            await BuildDataModel(scope);

            GenerateEstimateDocument("Estimate");
        }

        private static async Task BuildDataModel(IServiceScope scope)
        {
            ICompanyProfileStore companyProfileStore = scope.ServiceProvider.GetRequiredService<ICompanyProfileStore>();
            _companyProfile = companyProfileStore.Current;
            if (_companyProfile != null)
            {
                Console.WriteLine($"Company Profile Loaded: {_companyProfile.CompanyName}");
            }
            else
            {
                Console.WriteLine("No Company Profile found.");
                return;
            }

            
            IOrderManager orderManager = scope.ServiceProvider.GetRequiredService<IOrderManager>();
            _order = await orderManager.GetOrderByIdAsync(Guid.Parse("354AA2D8-0DB1-4731-B9A9-0BFEBE503CD7"));
            if (_order != null)
            {
                Console.WriteLine($"Order Loaded: {_order.OrderNumber}");
            }
            else
            {
                Console.WriteLine("No Order found.");
                return;
            }

        }

        private static void GenerateEstimateDocument(string reportName)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            var doc =Document.Create(document =>
            {
                document.Page(page =>
                {
                    page.DefaultTextStyle(x => x.FontSize(10));
                    page.Margin(1.3F, Unit.Centimetre);
                    page.Header().Container()
                        .AlignCenter()
                        .ExtendHorizontal()
                        .Layers(layers =>
                        {
                            layers.Layer().Image(_companyProfile!.LogoFile);
                            layers.Layer().Background(Color.FromHex("#D8FFFFFF"));
                            layers.PrimaryLayer().Padding(20).Column(column =>
                            {
                                column.Item().Row(row =>
                                {
                                    row.RelativeItem(4).PaddingTop(0).ScaleToFit().Text(text =>
                                    {
                                        text.Line(_companyProfile!.CompanyName).FontColor(Colors.Blue.Darken4)
                                            .FontSize(18).Bold();
                                        text.Line(_companyProfile!.CompanyAddress).FontColor(Colors.Blue.Darken4)
                                            .FontSize(14);
                                        text.Line($"Phone: {_companyProfile!.CompanyPhone}")
                                            .FontColor(Colors.Blue.Darken4).FontSize(14);
                                    });
                                    row.RelativeItem(4).Text(reportName).FontColor(Colors.Blue.Darken4).FontSize(30)
                                        .AlignRight();
                                });
                            });

                        });
                    page.Content().Container()
                        .Column(column =>
                        {

                            //Top part of Estimate
                            column.Item().Row(row =>
                            {
                                row.Spacing(20);
                                //BILL TO
                                row.RelativeItem(3).Table(table =>
                                {
                                    table.ColumnsDefinition(columns => { columns.RelativeColumn(1); });

                                    //BILL TO
                                    table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                        .Text("BILL TO").FontColor(Colors.White);
                                    table.Cell().PaddingLeft(5).PaddingTop(3)
                                        .Text(_order!.Customer!.FirstName + " " + _order.Customer.LastName);
                                    table.Cell().PaddingLeft(5).PaddingTop(3).Text(
                                        _order.BillingAddress1 + " " + _order.BillingAddress2 ?? "" + ", " +
                                        _order.BillingCity + ", " + _order.BillingStateCode + " " +
                                        _order.BillingZipCode);
                                    table.Cell().PaddingLeft(5).PaddingTop(3).Text(_order.Customer.PhoneNumber);
                                });
                                //order number and date
                                row.RelativeItem(5).Column(column =>
                                {
                                    column.Spacing(10);
                                    column.Item().Table(table =>
                                    {
                                        table.ColumnsDefinition(columns =>
                                        {
                                            columns.RelativeColumn(4);
                                            columns.RelativeColumn(3);
                                            columns.RelativeColumn(6);
                                        });
                                        table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                            .Text("INVOICE #").FontColor(Colors.White);
                                        table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                            .Text("DATE").FontColor(Colors.White);
                                        table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                            .Text("TERMS").FontColor(Colors.White);
                                        table.Cell().Padding(5).Text(_order!.OrderNumber.ToString());
                                        table.Cell().Padding(5).Text(_order.OrderDate.ToShortDateString());
                                        table.Cell().Padding(5).Text("Upon Completion");
                                    });
                                });
                            });

                            //Items
                            column.Item().PaddingTop(20).Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.RelativeColumn(10);
                                    columns.RelativeColumn(2);
                                    columns.RelativeColumn(4);
                                    columns.RelativeColumn(5);
                                });

                                table.Header(header =>
                                {
                                    header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                        .Text("DESCRIPTION").FontColor(Colors.White);
                                    header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                        .Text("QTY").FontColor(Colors.White).AlignCenter();
                                    header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                        .Text("PRICE").FontColor(Colors.White).AlignCenter();
                                    header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                        .Text("AMOUNT").FontColor(Colors.White).AlignCenter();
                                });

                                foreach (IOrderItem item in _order!.OrderItems)
                                {
                                    table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Description);
                                    table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Quantity.ToString())
                                        .AlignRight();
                                    table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Price.ToCurrency())
                                        .AlignRight();
                                    table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Total.ToCurrency())
                                        .AlignRight();
                                }

                                table.Cell().Border(1, Colors.Black).Padding(5).Text("Thank you for your business!")
                                    .FontColor(Colors.Blue.Darken4).AlignCenter().Italic();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("Sub-Total").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.SubTotal.ToCurrency());

                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("Shipping").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.Shipping.ToCurrency());

                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("Tax").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.Tax.ToCurrency());

                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("TOTAL").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.Total.ToCurrency())
                                    .AlignRight();
                            });

                            column.Item().Text(txt => txt.EmptyLine());

                            //signature line
                            column.Item().Row(row =>
                            {
                                row.ConstantItem(220).Column(col =>
                                {
                                    col.Item().Height(30).BorderBottom(1);
                                    col.Item().PaddingTop(4).Text("Signature").FontSize(9);
                                });

                                row.ConstantItem(30); // gap

                                row.ConstantItem(120).Column(col =>
                                {
                                    col.Item().Height(30).BorderBottom(1);
                                    col.Item().PaddingTop(4).Text("Date").FontSize(9);
                                });
                            });

                            column.Item().PaddingTop(20)
                                .Text("If you have any questions about this {reportName}, please contact").FontSize(10)
                                .Italic().AlignCenter();
                            column.Item()
                                .Text(
                                    $"{_companyProfile!.CompanyContactName} at {_companyProfile.CompanyContactPhone} or {_companyProfile.CompanyContactEmail}")
                                .FontSize(10).Bold().AlignCenter();
                        });
                });
            });
            
            doc.GeneratePdf(@"d:\temp\Estimate.pdf");

        }
    }

}
