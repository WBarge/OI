using OI.Common.Extensions.Comparison;
using OI.Common.Extensions.Formatting;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Reporting.Services;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace OI.Reporting.Reports.EstimateReport;

public class EstimateReport(ILogger<EstimateReport> logger,
    Guid reportId,
    ICompanyProfileStore companyProfileStore,
    IOrderManager orderManager) : BaseReport(reportId, logger)
{
    private readonly ILogger<EstimateReport> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    private readonly ICompanyProfileStore _companyProfileStore = companyProfileStore ?? throw new ArgumentNullException(nameof(companyProfileStore));
    private readonly IOrderManager _orderManager = orderManager ?? throw new ArgumentNullException(nameof(orderManager));

    public override string ReportName { get { return "Estimate"; } }
    
    public Guid OrderId { get; set; }

    private ICompanyProfile? _companyProfile = null;
    private IOrder? _order = null;
    
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
            _logger.LogDebug("Building estimate report document.");
            IDocument document = Document.Create(document =>
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
                            layers.Layer().Background(Color.FromHex("#D8FFFFFF"));//white at about 85% opacity.
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
                                        text.Line(_companyProfile!.CompanyCity + ", " + _companyProfile!.CompanyState + " " + _companyProfile!.CompanyZip)
                                            .FontColor(Colors.Blue.Darken4).FontSize(14);
                                        text.Line($"Phone: {_companyProfile!.CompanyPhone}")
                                            .FontColor(Colors.Blue.Darken4).FontSize(14);
                                    });
                                    row.RelativeItem(4).Text(ReportName).FontColor(Colors.Blue.Darken4).FontSize(30)
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
                                        _order.BillingAddress1 + " " + _order.BillingAddress2 ?? "");
                                    table.Cell().PaddingLeft(5).PaddingTop(3).Text(    _order.BillingCity + ", " + _order.BillingStateCode + " " + _order.BillingZipCode);
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
            return Task.FromResult(document);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "An error occurred while building the estimate report document.");
            return Task.FromException<IDocument>(exception);
        }
    }
}