using System.Collections;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OI.Business;
using OI.Data;
using OI.Glue.Models;
using QuestPDF.Companion;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace TestPlatForm
{
    internal class Program
    {
        static void Main(string[] args)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            Console.WriteLine("Configuration loaded successfully.");
            Console.WriteLine($"ApplicationName: {configuration["AppSettings:ApplicationName"]}");
            
            //yes do the service location pattern here, but only for testing purposes
            ServiceCollection services = new ServiceCollection();
            DataDi.ConfigureReportingDi(services, configuration);
            BusinessDi.ConfigureReportingDi(services);

            GenerateReport(services);

        }

        public static void GenerateReport(IServiceCollection services)
        {
            var provider = new Provider { Id = 2, Name = "Bravo Provider Company", Address = "2nd St., Fisher Avenue, Makati City", Phone = "223 - 3311", Email = "bravo @mail.com" };
            var customer = new Customer { Id = 1, Name = "Alpha Customer", Address = "1st St., Primary Road, Davao City, Philippines", Phone = "211-2132", ContactName = "John Alpha", Email = "alpha@customer.com" };
            var invoice = new InvoiceViewModel { Provider = provider, Customer = customer, InvoiceNumber = "0001", InvoiceDate = DateTime.Now, Terms = "Some terms here." };
            invoice.Items =
            [
                new InvoiceItemViewModel { Id = 1, Service = new ProviderService { Id = 1, Description = "Alpha service" }, Quantity = 1, UnitPrice = 25.50M },
                new InvoiceItemViewModel { Id = 2, Service = new ProviderService { Id = 1, Description = "Bravo service" }, Quantity = 1, UnitPrice = 3289.99M },
            ];

            QuestPDF.Settings.License = LicenseType.Community;

            Document.Create(document =>
            {
                document.Page(page =>
                {
                    page.DefaultTextStyle(x => x.FontSize(10));
                    page.Margin(1.3F, Unit.Centimetre);
                    page.Content().Container()
                    .Column(column =>
                    {
                        column.Item().Row(row =>
                        {
                            row.RelativeItem(7).PaddingTop(10).ScaleToFit().Text(text =>
                            {
                                text.Line(invoice.Provider.Name).FontColor(Colors.Blue.Darken4).FontSize(20).Bold();
                                text.EmptyLine();
                                text.Line(invoice.Provider.Address).FontColor(Colors.Black).FontSize(16);
                                text.Line($"Phone: {invoice.Provider.Phone}").FontColor(Colors.Black).FontSize(16);
                            });
                            row.RelativeItem(3).Text("INVOICE TITLE").FontColor(Colors.Blue.Darken4).FontSize(30).AlignRight();
                        });
                        
                        column.Item().Row(row =>
                        {
                            row.Spacing(20);
                            row.RelativeItem(5).Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.RelativeColumn(1);
                                });

                                //BILL TO
                                table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("BILL TO").FontColor(Colors.White);
                                table.Cell().PaddingLeft(5).PaddingTop(3).Text(invoice.Customer.ContactName);
                                table.Cell().PaddingLeft(5).PaddingTop(3).Text(invoice.Customer.Name);
                                table.Cell().PaddingLeft(5).PaddingTop(3).Text(invoice.Customer.Address);                                
                                table.Cell().PaddingLeft(5).PaddingTop(3).Text(invoice.Customer.Phone);
                                table.Cell().PaddingLeft(5).PaddingTop(3).Text(invoice.Customer.Email);
                            });
                            row.RelativeItem(5).Column(column =>
                            {
                                column.Spacing(10);
                                //INVOICE # & DATE
                                column.Item().Table(table =>
                                {
                                    table.ColumnsDefinition(columns =>
                                    {
                                        columns.RelativeColumn(4);
                                        columns.RelativeColumn(6);
                                    });
                                    table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("INVOICE #").FontColor(Colors.White);
                                    table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("DATE").FontColor(Colors.White);
                                    table.Cell().Padding(5).Text(invoice.InvoiceNumber);
                                    table.Cell().Padding(5).Text(invoice.InvoiceDate.ToShortDateString());
                                });
                                //CUSTOMERID & TERMS
                                column.Item().Table(table =>
                                {
                                    table.ColumnsDefinition(columns =>
                                    {
                                        columns.RelativeColumn(4);
                                        columns.RelativeColumn(6);
                                    });
                                    table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("CUSTOMER ID").FontColor(Colors.White);
                                    table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("TERMS").FontColor(Colors.White);
                                    table.Cell().Padding(5).Text(invoice.Customer.Id.ToString());
                                    table.Cell().Padding(5).Text(invoice.Terms);
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
                                header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("UNIT PRICE").FontColor(Colors.White).AlignCenter();
                                header.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5).Text("AMOUNT").FontColor(Colors.White).AlignCenter();
                            });

                            foreach (var item in invoice.Items)
                            {
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Service.Description);
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Quantity.ToString()).AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(item.UnitPrice.ToString("N2")).AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(item.Total.ToString("N2")).AlignRight();
                            }                            

                            table.Cell().Border(1, Colors.Black).Padding(5).Text("Thank you for your business!").FontColor(Colors.Blue.Darken4).AlignCenter().Italic();
                            table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                            table.Cell().Border(1, Colors.Black).Padding(5).Text("TOTAL").AlignRight();
                            table.Cell().Border(1, Colors.Black).Padding(5).Text(invoice.Items.Sum(x => x.Total).ToString("N2")).AlignRight();
                        });

                        column.Item().PaddingTop(20).Text("If you have any questions about this invoice, please contact").FontSize(10).Italic().AlignCenter();
                        column.Item().Text("Cora Thomas at (516) 555-0135 or cora@example.com").FontSize(10).Bold().AlignCenter();
                    });                    
                });
            }).ShowInCompanion();
        }
    }

    internal class ProviderService
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }

    internal class InvoiceItemViewModel 
    {
        public int Id { get; set; }
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
        public IEnumerable<InvoiceItemViewModel> Items { get; set; }
    }

    internal class Customer
    {
        public int Id { get; set; }
        public string Name { get; internal set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string ContactName { get; set; }
        public string Email { get; set; }
    }

    internal class Provider
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
