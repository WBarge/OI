using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OI.Business;
using OI.Common.Extensions.Formatting;
using OI.Data;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Reporting.Services;
using QuestPDF.Companion;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace TestPlatForm
{
    internal class Program
    {
        private static Provider _provider;
        private static Customer _customer;
        private static InvoiceViewModel _invoice;

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
            ICompanyProfile? profile = companyProfileStore.Current;
            if (profile != null)
            {
                Console.WriteLine($"Company Profile Loaded: {profile.CompanyName}");
            }
            else
            {
                Console.WriteLine("No Company Profile found.");
                return;
            }

            _provider = new Provider
            {
                Id = Guid.NewGuid(), 
                Name = profile.CompanyName, 
                Address = profile.CompanyAddress, 
                Phone = profile.CompanyPhone, 
                Email = profile.CompanyEmail,
                ContactName = profile.CompanyContactName,
                ContactPhone = profile.CompanyContactPhone,
                ContactEmail = profile.CompanyContactEmail,
                Logo = profile.LogoFile
            };

            IOrderManager orderManager = scope.ServiceProvider.GetRequiredService<IOrderManager>();
            IOrder? order = await orderManager.GetOrderByIdAsync(Guid.Parse("354AA2D8-0DB1-4731-B9A9-0BFEBE503CD7"));
            if (order != null)
            {
                Console.WriteLine($"Order Loaded: {order.OrderNumber}");
            }
            else
            {
                Console.WriteLine("No Order found.");
                return;
            }

            ICustomer? dbCustomer = order.Customer;
            if (dbCustomer == null)
            {
                Console.WriteLine("No Customer found for the order.");
                return;
            }


            _customer = new Customer
            {
                Id = dbCustomer.Id, 
                Name = dbCustomer.FirstName + " " + dbCustomer.LastName, 
                Address = order.BillingAddress1 + " " + order.BillingAddress2 ?? "" + ", " + order.BillingCity + ", " + order.BillingStateCode + " " + order.BillingZipCode,
                Phone = dbCustomer.PhoneNumber
            };
            _invoice = new InvoiceViewModel
            {
                Provider = _provider, 
                Customer = _customer, 
                InvoiceNumber = order.OrderNumber.ToString(), 
                InvoiceDate = order.OrderDate,
                Items = []
            };
            const int MULTIPLE = 30;
            for (int i = 0; i < MULTIPLE; i++)
            {
                
                foreach (IOrderItem orderItem in order.OrderItems)
                {
                    _invoice.Items.Add(new InvoiceItemViewModel
                        {
                            Id = orderItem.Id, 
                            Service = new ProviderService
                            {
                                Id = orderItem.ProductId, 
                                Description = orderItem.Description
                            }, 
                            Quantity = orderItem.Quantity, 
                            UnitPrice = orderItem.Price
                        });
                }
            }


        }

        private static void GenerateEstimateDocument(string reportName)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            Document.Create(document =>
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
                            layers.Layer().Image(_provider.Logo);
                            // Middle: white wash (alpha 0xD8 ≈ 85% opaque)
                            layers.Layer().Background(Color.FromHex("#D8FFFFFF"));
                            layers.PrimaryLayer().Padding(20).Column(column =>
                            {
                                column.Item().Row(row =>
                                {
                                    row.RelativeItem(4).PaddingTop(0).ScaleToFit().Text(text =>
                                    {
                                        text.Line(_invoice.Provider.Name).FontColor(Colors.Blue.Darken4).FontSize(18).Bold();
                                        text.Line(_invoice.Provider.Address).FontColor(Colors.Blue.Darken4).FontSize(14);
                                        text.Line($"Phone: {_invoice.Provider.Phone}").FontColor(Colors.Blue.Darken4).FontSize(14);
                                    });
                                    row.RelativeItem(4).Text(reportName).FontColor(Colors.Blue.Darken4).FontSize(30).AlignRight();
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
                                    table.ColumnsDefinition(columns =>
                                    {
                                        columns.RelativeColumn(1);
                                    });

                                    //BILL TO
                                    table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("BILL TO").FontColor(Colors.White);
                                    table.Cell().PaddingLeft(5).PaddingTop(3).Text(_invoice.Customer.ContactName);
                                    table.Cell().PaddingLeft(5).PaddingTop(3).Text(_invoice.Customer.Name);
                                    table.Cell().PaddingLeft(5).PaddingTop(3).Text(_invoice.Customer.Address);                                
                                    table.Cell().PaddingLeft(5).PaddingTop(3).Text(_invoice.Customer.Phone);
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
                                        table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("INVOICE #").FontColor(Colors.White);
                                        table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("DATE").FontColor(Colors.White);
                                        table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("TERMS").FontColor(Colors.White);
                                        table.Cell().Padding(5).Text(_invoice.InvoiceNumber);
                                        table.Cell().Padding(5).Text(_invoice.InvoiceDate.ToShortDateString());
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
                                    header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("DESCRIPTION").FontColor(Colors.White);
                                    header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("QTY").FontColor(Colors.White).AlignCenter();
                                    header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("PRICE").FontColor(Colors.White).AlignCenter();
                                    header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("AMOUNT").FontColor(Colors.White).AlignCenter();
                                });

                                foreach (InvoiceItemViewModel item in _invoice.Items)
                                {
                                    table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Service.Description);
                                    table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Quantity.ToString()).AlignRight();
                                    table.Cell().Border(1, Colors.Black).Padding(5).Text(item.UnitPrice.ToCurrency()).AlignRight();
                                    table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Total.ToCurrency()).AlignRight();
                                }                            

                                table.Cell().Border(1, Colors.Black).Padding(5).Text("Thank you for your business!").FontColor(Colors.Blue.Darken4).AlignCenter().Italic();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("TOTAL").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(_invoice.Items.Sum(x => x.Total).ToCurrency()).AlignRight();
                            });

                            column.Item().Text(txt=>txt.EmptyLine());
                            
                            //signature line
                            column.Item().Row(row =>
                            {
                                row.ConstantItem(220).Column(col =>
                                {
                                    col.Item().Height(30).BorderBottom(1);
                                    col.Item().PaddingTop(4).Text("Signature").FontSize(9);
                                });

                                row.ConstantItem(30);   // gap

                                row.ConstantItem(120).Column(col =>
                                {
                                    col.Item().Height(30).BorderBottom(1);
                                    col.Item().PaddingTop(4).Text("Date").FontSize(9);
                                });
                            });
                            
                            column.Item().PaddingTop(20).Text("If you have any questions about this {reportName}, please contact").FontSize(10).Italic().AlignCenter();
                            column.Item().Text($"{_invoice.Provider.ContactName} at {_invoice.Provider.ContactPhone} or {_invoice.Provider.ContactEmail}").FontSize(10).Bold().AlignCenter();
                        });     
                });
            }).ShowInCompanion();
        }
    }

    internal class ProviderService
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
    }

    internal class InvoiceItemViewModel 
    {
        public Guid Id { get; set; }
        public ProviderService Service { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Total { get => Quantity * UnitPrice; }
    }

    internal class InvoiceViewModel
    {
        public Provider Provider { get; set; }
        public Customer Customer { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string Terms { get; set; }
        public List<InvoiceItemViewModel> Items { get; set; }
    }

    internal class Customer
    {
        public Guid Id { get; set; }
        public string Name { get; internal set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string ContactName { get; set; }
        public string Email { get; set; }
    }

    internal class Provider
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        
        public byte[] Logo { get; set; }
    }
}
