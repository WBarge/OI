using OI.Common.Extensions.Comparison;
using OI.Common.Extensions.Formatting;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Reporting.Services;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace OI.Reporting.Reports.OrderReport;

public class OrderReport(ILogger<OrderReport> logger,Guid reportId,
    ICompanyProfileStore companyProfileStore,
    IOrderManager orderManager) : BaseReport(reportId, logger)
{
    private readonly ILogger<OrderReport> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    private readonly ICompanyProfileStore _companyProfileStore = companyProfileStore ?? throw new ArgumentNullException(nameof(companyProfileStore));
    private readonly IOrderManager _orderManager = orderManager ?? throw new ArgumentNullException(nameof(orderManager));


    public override string ReportName { get { return "Order"; } }

    public Guid OrderId { get; set; }
    private ICompanyProfile? _companyProfile;
    private IOrder? _order;

    
    protected override async Task BuildDataModelAsync()
    {
        try
        {
            //if any of the required data is missing, throw an exception to prevent report generation
            _logger.LogDebug("Building estimate report data model.");
            OrderId.Required(nameof(OrderId));
            _companyProfile = _companyProfileStore.Current;
            _companyProfile.Required(nameof(_companyProfile));
            _order = await _orderManager.GetOrderByIdAsync(OrderId);
            _order.Required(nameof(_order));
            _order!.Customer.Required(nameof(_order.Customer));
            _order.OrderItems.Required(nameof(_order.OrderItems));

        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "An error occurred while building the estimate report data model.");
            throw;
        }
    }

    protected override Task<IDocument> BuildReportDocumentAsync()
    {
        try
        {
            // The data model has already been built in BuildDataModelAsync,
            // so we can use it to create the report document.
            // The model should have been validated in BuildDataModelAsync, so we can assume it is valid here.
            _logger.LogDebug("Building order report document.");
            IDocument doc = Document.Create(document =>
            {
                document.Page(page =>
                {
                    page.DefaultTextStyle(x => x.FontSize(10));
                    page.Margin(1.3F, Unit.Centimetre);
                    page.Header().Container().CreateLetterHead(ReportName,_companyProfile);
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
                                    table.ColumnsDefinition(columns => { columns.RelativeColumn(); });

                                    //BILL TO
                                    table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                        .Text("BILL TO").FontColor(Colors.White);
                                    table.Cell().PaddingLeft(5).PaddingTop(3)
                                        .Text(_order!.Customer!.FirstName + " " + _order.Customer.LastName);
                                    table.Cell().PaddingLeft(5).PaddingTop(3).Text(
                                        _order.BillingAddress1 + " " + _order.BillingAddress2);
                                    table.Cell().PaddingLeft(5).PaddingTop(3).Text(_order.BillingCity + ", " +
                                        _order.BillingStateCode + " " + _order.BillingZipCode);
                                    table.Cell().PaddingLeft(5).PaddingTop(3).Text(_order.Customer.PhoneNumber);
                                });
                                //order number and date
                                row.RelativeItem(5).Column(columnDescriptor =>
                                {
                                    columnDescriptor.Spacing(10);
                                    columnDescriptor.Item().Table(table =>
                                    {
                                        table.ColumnsDefinition(columns =>
                                        {
                                            columns.RelativeColumn(3);
                                            columns.RelativeColumn(4);
                                            columns.RelativeColumn(6);
                                            columns.RelativeColumn(6);
                                        });
                                        table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                            .Text("Order #").FontColor(Colors.White).AlignLeft();
                                        table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                            .Text("DATE").FontColor(Colors.White).AlignCenter();
                                        table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                            .Text("TERMS").FontColor(Colors.White).AlignCenter();
                                        table.Cell().Background(Colors.Blue.Darken4).Border(1, Colors.Black).Padding(5)
                                            .Text("Ship Via").FontColor(Colors.White).AlignCenter();
                                        table.Cell().Padding(5).Text(_order!.OrderNumber.ToString()).AlignLeft();
                                        table.Cell().Padding(5).Text(_order.OrderDate.ToShortDateString())
                                            .AlignCenter();
                                        table.Cell().Padding(5).Text(_order.Terms).AlignCenter();
                                        table.Cell().Padding(5).Text(_order.Via).AlignCenter();
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

                                table.Cell().Border(1, Colors.Black).Padding(5).Text("")
                                    .FontColor(Colors.Blue.Darken4).AlignCenter().Italic();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("Sub-Total").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.SubTotal.ToCurrency())
                                    .AlignRight();

                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("Shipping").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.Shipping.ToCurrency())
                                    .AlignRight();

                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("Tax").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.Tax.ToCurrency())
                                    .AlignRight();

                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text("TOTAL").AlignRight();
                                table.Cell().Border(1, Colors.Black).Padding(5).Text(_order.Total.ToCurrency())
                                    .AlignRight();
                            });

                            column.Item().Text(txt => txt.EmptyLine());

                            column.Item().PaddingTop(20)
                                .Text("Thank you for your business!").FontSize(10)
                                .Italic().AlignCenter();
                        });
                });
            });
            return Task.FromResult(doc);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "An error occurred while building the estimate report document.");
            return Task.FromException<IDocument>(exception);
        }
    }
}