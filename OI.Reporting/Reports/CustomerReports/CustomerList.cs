using OI.Common.Extensions.Comparison;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Reporting.Services;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace OI.Reporting.Reports.CustomerReports;

public class CustomerList(ILogger<CustomerList> logger, Guid reportId, ICompanyProfileStore companyProfileStore, ICustomerManager customerManager) : BaseReport(reportId, logger)
{
    private readonly ILogger<CustomerList> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    private readonly ICompanyProfileStore _companyProfileStore = companyProfileStore ?? throw new ArgumentNullException(nameof(companyProfileStore));

    private readonly ICustomerManager _customerManager = customerManager ?? throw new ArgumentNullException(nameof(customerManager));
    public override string ReportName { get=>"Customer List"; }

    private ICompanyProfile? _companyProfile;
    private IEnumerable<ICustomer> _customers;
    protected override async Task BuildDataModelAsync()
    {
        try
        {
            //if any of the required data is missing, throw an exception to prevent report generation
            _logger.LogDebug("Building {ReportName} report data model.", ReportName);
            _companyProfile = _companyProfileStore.Current;
            _companyProfile.Required(nameof(_companyProfile));
            _customers = await _customerManager.GetAllCustomers(CancellationToken);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "An error occurred while building the {ReportName} report data model.", ReportName);
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
            _logger.LogDebug("Building {ReportName} report document.", ReportName);
            IDocument document = Document.Create(document =>
            {
                document.Page(page =>
                {
                    page.Size(PageSizes.Letter.Landscape());
                    page.DefaultTextStyle(x => x.FontSize(10));
                    //page.Margin(1F, Unit.Centimetre);
                    page.Header().Container().CreateInternalLetterHead(ReportName,_companyProfile);
                    page.Content().Container()
                        .Column(column =>
                        {
                            column.Item().PaddingTop(10).Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.RelativeColumn(4);//first
                                    columns.RelativeColumn(4);//last
                                    columns.RelativeColumn(7);//bill addy
                                    columns.RelativeColumn(7);//shipping addy
                                    columns.RelativeColumn(5);//phone
                                    columns.RelativeColumn(6);//email
                                });

                                table.Header(header =>
                                {
                                    header.Cell().BorderBottom(1).Text("First").FontColor(Colors.Blue.Darken4).FontSize(12);
                                    header.Cell().BorderBottom(1).Text("Last").FontColor(Colors.Blue.Darken4).FontSize(12);
                                    header.Cell().BorderBottom(1).Text("Billing Address").FontColor(Colors.Blue.Darken4).FontSize(12);
                                    header.Cell().BorderBottom(1).Text("Shipping Address").FontColor(Colors.Blue.Darken4).FontSize(12);
                                    header.Cell().BorderBottom(1).Text("Phone #").FontColor(Colors.Blue.Darken4).FontSize(12);
                                    header.Cell().BorderBottom(1).Text("Email").FontColor(Colors.Blue.Darken4).FontSize(12);
                                });
                                foreach (ICustomer item in _customers)
                                {
                                    table.Cell().Text(item.FirstName).FontSize(10);
                                    table.Cell().Text(item.LastName).FontSize(10);
                                    table.Cell().Container().AddAddress(item.DefaultBillingAddress1!,
                                            item.DefaultBillingAddress2!,
                                            item.DefaultBillingCity!,item.DefaultBillingStateCode!,
                                            item.DefaultBillingZipCode!,10);
                                    table.Cell().Container().AddAddress(item.DefaultShippingAddress1!,
                                        item.DefaultShippingAddress2!,
                                        item.DefaultShippingCity!,item.DefaultShippingStateCode!,
                                        item.DefaultShippingZipCode!,10);
                                    table.Cell().Text(item.PhoneNumber).FontSize(10);
                                    table.Cell().Text("").FontSize(10);//item.email when we have it
                                }
                            });
                        });
                });
            });
            return Task.FromResult(document);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "An error occurred while building the {ReportName} report document.", ReportName);
            return Task.FromException<IDocument>(exception);
        }

    }
}