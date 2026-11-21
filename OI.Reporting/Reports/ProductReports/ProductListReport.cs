using OI.Common.Extensions.Comparison;
using OI.Common.Extensions.Formatting;
using OI.Glue.Models;
using OI.Reporting.Services;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace OI.Reporting.Reports.ProductReports;

public class ProductListReport(ILogger<ProductListReport> logger, Guid reportId, ICompanyProfileStore companyProfileStore, IProductService productService) : BaseReport(reportId, logger)
{
    private readonly ILogger<ProductListReport> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    private readonly ICompanyProfileStore _companyProfileStore = companyProfileStore ?? throw new ArgumentNullException(nameof(companyProfileStore));

    private readonly IProductService _productService = productService ?? throw new ArgumentNullException(nameof(productService));
    public override string ReportName { get=>"Product List"; }

    private ICompanyProfile? _companyProfile;

    protected override async Task BuildDataModelAsync()
    {
        try
        {
            //if any of the required data is missing, throw an exception to prevent report generation
            _logger.LogDebug("Building product list report data model.");
            _companyProfile = _companyProfileStore.Current;
            _companyProfile.Required(nameof(_companyProfile));
            
            //need the  product service implemented
            throw new NotImplementedException();

            //insert logic to get the product list
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "An error occurred while building the product list report data model.");
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
            _logger.LogDebug("Building product list report document.");
            IDocument document = Document.Create(document =>
            {
                document.Page(page =>
                {
                    page.DefaultTextStyle(x => x.FontSize(10));
                    page.Margin(1.3F, Unit.Centimetre);
                    page.Header().Container().CreateInternalLetterHead(ReportName,_companyProfile);
                    page.Content().Container()
                        .Column(column =>
                        {
                            column.Item().PaddingTop(20).Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.RelativeColumn(5);//name
                                    columns.RelativeColumn(10);//description
                                    columns.RelativeColumn(4);//sku
                                    columns.RelativeColumn(2);//price
                                    columns.RelativeColumn(2);//cost
                                    columns.RelativeColumn(2);//estimated
                                });

                                table.Header(header =>
                                {
                                    header.Cell().Padding(5).Text("Name");
                                    header.Cell().Padding(5).Text("DESCRIPTION");
                                    header.Cell().Padding(5).Text("SKU").AlignCenter();
                                    header.Cell().Padding(5).Text("PRICE").AlignRight();
                                    header.Cell().Padding(5).Text("COST").AlignRight();
                                    header.Cell().Padding(5).Text("Profit").AlignCenter();
                                });
                                //TODO loop through the products and add them to the grid
                                //foreach (IOrderItem item in _order!.OrderItems)
                                //{
                                //    table.Cell().Padding(5).Text(item.Name);
                                //    table.Cell().Padding(5).Text(item.Description);
                                //    table.Cell().Padding(5).Text(item.Sku);
                                //    table.Cell().Padding(5).Text(item.Price.ToCurrency()).AlignRight();
                                //    table.Cell().Padding(5).Text(item.Cost.ToCurrency()).AlignRight();
                                //    table.Cell().Padding(5).Text(item.Estimated.ToCurrency()).AlignRight();
                                //}
                            });
                        });
                });
            });
            return Task.FromResult(document);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "An error occurred while building the product list report document.");
            return Task.FromException<IDocument>(exception);
        }

    }
}