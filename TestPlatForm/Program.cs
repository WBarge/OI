using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OI.Business;
using OI.Data;
using OI.Glue.Security;
using OI.Reporting.Reports;
using OI.Reporting.Reports.CustomerReports;
using OI.Reporting.Reports.InvoiceReport;
using OI.Reporting.Services;

namespace TestPlatForm
{
    internal static class Program
    {
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
            ConfigureDi(services,configuration);

            using ServiceProvider provider = services.BuildServiceProvider();
            using IServiceScope scope = provider.CreateScope();
            IReportFactory factory = scope.ServiceProvider.GetRequiredService<IReportFactory>();
            await GenerateReport(factory);
        }

        public static async Task GenerateReport(IReportFactory factory)
        {
            string fileResult = @"d:\temp\customers.pdf";
            
            Guid reportId = Guid.NewGuid();
            Guid orderId = Guid.Parse("354AA2D8-0DB1-4731-B9A9-0BFEBE503CD7");
            
            BaseReport report = factory.GetReport<CustomerList>(reportId, []);
            byte[] reportResult = await report.GenerateReportAsync(CancellationToken.None);
            
            // ReSharper disable once MethodHasAsyncOverload
            File.WriteAllBytes(fileResult,reportResult);

        }

        public static void ConfigureDi(IServiceCollection services, IConfiguration configuration)
        {
            DataDi.ConfigureReportingDi(services, configuration);
            BusinessDi.ConfigureReportingDi(services);

            // The company details (name, address, logo...) the UI uploads when it starts; report generation reads them from here.
            services.AddSingleton<IClientContext>(new FakeUserContext());
            services.AddScoped<ICompanyProfileStore, PersistedCompanyProfileStore>();
            services.AddScoped<IReportFactory, ReportFactory>();
        }   

        //private static async Task BuildDataModel(IServiceScope scope)
        //{
        //    ICompanyProfileStore companyProfileStore = scope.ServiceProvider.GetRequiredService<ICompanyProfileStore>();
        //    _companyProfile = companyProfileStore.Current;
        //    if (_companyProfile != null)
        //    {
        //        Console.WriteLine($"Company Profile Loaded: {_companyProfile.CompanyName}");
        //    }
        //    else
        //    {
        //        Console.WriteLine("No Company Profile found.");
        //        return;
        //    }

            
        //    IOrderManager orderManager = scope.ServiceProvider.GetRequiredService<IOrderManager>();
        //    _order = await orderManager.GetOrderByIdAsync(Guid.Parse("354AA2D8-0DB1-4731-B9A9-0BFEBE503CD7"));
        //    if (_order != null)
        //    {
        //        Console.WriteLine($"Order Loaded: {_order.OrderNumber}");
        //    }
        //    else
        //    {
        //        Console.WriteLine("No Order found.");
        //        return;
        //    }

        //}

        //private static void GenerateEstimateDocument(string reportName)
        //{
        //    QuestPDF.Settings.License = LicenseType.Community;

        //    var doc =Document.Create(document =>
        //    {
        //        document.Page(page =>
        //        {
        //            page.DefaultTextStyle(x => x.FontSize(10));
        //            page.Margin(1.3F, Unit.Centimetre);
        //            page.Header().Container()
        //                .AlignCenter()
        //                .ExtendHorizontal()
        //                .Layers(layers =>
        //                {
        //                    layers.Layer().Image(_companyProfile!.LogoFile);
        //                    layers.Layer().Background(Color.FromHex("#D8FFFFFF"));
        //                    layers.PrimaryLayer().Padding(20).Column(column =>
        //                    {
        //                        column.Item().Row(row =>
        //                        {
        //                            row.RelativeItem(4).PaddingTop(0).ScaleToFit().Text(text =>
        //                            {
        //                                text.Line(_companyProfile!.CompanyName).FontColor(Colors.Blue.Darken4)
        //                                    .FontSize(18).Bold();
        //                                text.Line(_companyProfile!.CompanyAddress).FontColor(Colors.Blue.Darken4)
        //                                    .FontSize(14);
        //                                text.Line(_companyProfile!.CompanyCity + ", " + _companyProfile!.CompanyState + " " + _companyProfile!.CompanyZip)
        //                                    .FontColor(Colors.Blue.Darken4).FontSize(14);
        //                                text.Line($"Phone: {_companyProfile!.CompanyPhone}")
        //                                    .FontColor(Colors.Blue.Darken4).FontSize(14);
        //                            });
        //                            row.RelativeItem(4).Text(reportName).FontColor(Colors.Blue.Darken4).FontSize(30)
        //                                .AlignRight();
        //                        });
        //                    });

        //                });
        //            page.Content().Container()
        //                .Column(column =>
        //                {

        //                    //Top part of Estimate
        //                    column.Item().Row(row =>
        //                    {
        //                        row.Spacing(20);
        //                        //BILL TO
        //                        row.RelativeItem(3).Table(table =>
        //                        {
        //                            table.ColumnsDefinition(columns => { columns.RelativeColumn(1); });

        //                            //BILL TO
        //                            table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
        //                                .Text("BILL TO").FontColor(Colors.White);
        //                            table.Cell().PaddingLeft(5).PaddingTop(3)
        //                                .Text(_order!.Customer!.FirstName + " " + _order.Customer.LastName);
        //                            table.Cell().PaddingLeft(5).PaddingTop(3).Text(
        //                                _order.BillingAddress1 + " " + _order.BillingAddress2 ?? "");
        //                            table.Cell().PaddingLeft(5).PaddingTop(3).Text(    _order.BillingCity + ", " + _order.BillingStateCode + " " + _order.BillingZipCode);
        //                            table.Cell().PaddingLeft(5).PaddingTop(3).Text(_order.Customer.PhoneNumber);
        //                        });
        //                        //order number and date
        //                        row.RelativeItem(5).Column(column =>
        //                        {
        //                            column.Spacing(10);
        //                            column.Item().Table(table =>
        //                            {
        //                                table.ColumnsDefinition(columns =>
        //                                {
        //                                    columns.RelativeColumn(3);
        //                                    columns.RelativeColumn(4);
        //                                    columns.RelativeColumn(6);
        //                                    columns.RelativeColumn(6);
        //                                });
        //                                table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
        //                                    .Text("Order #").FontColor(Colors.White).AlignLeft();
        //                                table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
        //                                    .Text("DATE").FontColor(Colors.White).AlignCenter();
        //                                table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
        //                                    .Text("TERMS").FontColor(Colors.White).AlignCenter();
        //                                table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
        //                                    .Text("Ship Via").FontColor(Colors.White).AlignCenter();
        //                                table.Cell().Padding(5).Text(_order!.OrderNumber.ToString()).AlignLeft();
        //                                table.Cell().Padding(5).Text(_order.OrderDate.ToShortDateString()).AlignCenter();
        //                                table.Cell().Padding(5).Text(_order.Terms).AlignCenter();
        //                                table.Cell().Padding(5).Text(_order.Via).AlignCenter();
        //                            });
        //                        });
        //                    });

        //                    //Items
        //                    column.Item().PaddingTop(20).Table(table =>
        //                    {
        //                        table.ColumnsDefinition(columns =>
        //                        {
        //                            columns.RelativeColumn(10);
        //                            columns.RelativeColumn(2);
        //                            columns.RelativeColumn(4);
        //                            columns.RelativeColumn(5);
        //                        });

        //                        table.Header(header =>
        //                        {
        //                            header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
        //                                .Text("DESCRIPTION").FontColor(Colors.White);
        //                            header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
        //                                .Text("QTY").FontColor(Colors.White).AlignCenter();
        //                            header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
        //                                .Text("PRICE").FontColor(Colors.White).AlignCenter();
        //                            header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
        //                                .Text("AMOUNT").FontColor(Colors.White).AlignCenter();
        //                        });

        //                        foreach (IOrderItem item in _order!.OrderItems)
        //                        {
        //                            table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Description);
        //                            table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Quantity.ToString())
        //                                .AlignRight();
        //                            table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Price.ToCurrency())
        //                                .AlignRight();
        //                            table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Total.ToCurrency())
        //                                .AlignRight();
        //                        }

        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("")
        //                            .FontColor(Colors.Blue.Darken4).AlignCenter().Italic();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("Sub-Total").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.SubTotal.ToCurrency()).AlignRight();

        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("Shipping").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.Shipping.ToCurrency()).AlignRight();

        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("Tax").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.Tax.ToCurrency()).AlignRight();

        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text("TOTAL").AlignRight();
        //                        table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.Total.ToCurrency())
        //                            .AlignRight();
        //                    });

        //                    column.Item().Text(txt => txt.EmptyLine());

        //                    column.Item().PaddingTop(20)
        //                        .Text("Thank you for your business!").FontSize(10)
        //                        .Italic().AlignCenter();
        //                });
        //        });
        //    });
            
        //    doc.GeneratePdf(@"d:\temp\Order.pdf");

        //}
    }

}
