using Microsoft.Extensions.Logging;
using OI.Glue.Managers;
using OI.Glue.Models;
using OI.Glue.Repos;
using CrossCutting.Exceptions;

namespace OI.Business.Managers;

/// <summary>
/// Manages customer-related business logic.
/// </summary>
internal class CustomerManager(ICustomerRepo customerRepo, ILogger<CustomerManager> logger) : ICustomerManager
{
    private readonly ICustomerRepo _customerRepo = customerRepo ?? throw new ArgumentNullException(nameof(customerRepo));

    private readonly ILogger<CustomerManager> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    internal const int DEFAULT_PAGE_SIZE = 100000;

    // The longest value each column accepts. These mirror OI.Data's CustomerConfig; a longer value would fail on save.
    internal const int MAX_LAST_NAME_LENGTH = 100;
    internal const int MAX_FIRST_NAME_LENGTH = 100;
    internal const int MAX_PHONE_NUMBER_LENGTH = 20;
    internal const int MAX_ADDRESS_LINE_LENGTH = 200;
    internal const int MAX_CITY_LENGTH = 100;
    internal const int MAX_STATE_CODE_LENGTH = 2;
    internal const int MAX_ZIP_CODE_LENGTH = 10;

    /// <summary>
    /// Get customers by a filter criteria and page the results.
    /// This is not full customer record!
    /// </summary>
    /// <param name="filters"></param>
    /// <param name="page"></param>
    /// <param name="pageSize"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<PagedResult<ICustomerSearch>> GetCustomersPagedAsync(
        Dictionary<string, IFilterMetaData[]>? filters,
        int? page,
        int? pageSize,
        CancellationToken cancellationToken = default)
    {
        int pageNumber = page is null or < 1 ? 1 : page.Value;
        int size = pageSize is null or < 1 ? DEFAULT_PAGE_SIZE : pageSize.Value;
        _logger.LogInformation("Listing customers, page {Page} with page size {PageSize}", pageNumber, size);

        // Run one after the other: both queries use the same DbContext, which cannot run two queries at once.
        IEnumerable<ICustomerSearch> data =
            await _customerRepo.FindPagedCustomerRecordsAsync(filters, pageNumber, size, cancellationToken);
        long totalRecordSize = await _customerRepo.GetCustomerCountAsync(filters, cancellationToken);
        return new PagedResult<ICustomerSearch>(data, totalRecordSize);
    }

    /// <summary>
    /// Gets the number of customers in the system
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<long> GetCustomerCountAsync(CancellationToken cancellationToken = default)
    {
        //if we want a subset then we need expose the filter criteria
        return await _customerRepo.GetCustomerCountAsync(null, cancellationToken);
    }

    /// <summary>
    /// Gets the customer by id - this should be the full customer record and not a partial as in the case of searching.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<ICustomer?> GetCustomerByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        if (id == Guid.Empty)
        {
            //there should not be a record in the data store that has guid.empty as its id - if it is there then we don't want it exposed!!
            _logger.LogWarning("Customer lookup skipped because the id was empty");
            return null;
        }

        _logger.LogInformation("Looking up customer {CustomerId}", id);
        return await _customerRepo.GetCustomerByIdAsync(id, cancellationToken);
    }

    /// <summary>
    /// Creates a new customer in the system
    /// </summary>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    /// <exception cref="RequiredObjectException"></exception>
    public async Task<ICustomer> CreateCustomerAsync(ICreateCustomer? request, CancellationToken cancellationToken = default)
    {
        if (request is null)
        {
            throw new RequiredObjectException("A customer is required.");
        }

        NormalizeAndValidate(request);

        // Names and phone numbers are personal data, so only the new id is logged.
        _logger.LogInformation("Creating customer");
        ICustomer customer = await _customerRepo.CreateCustomerAsync(request, cancellationToken);
        _logger.LogInformation("Created customer {CustomerId}", customer.Id);
        return customer;
    }

    /// <summary>
    /// Trims every value, turns blank optional values into null, then checks the required values and the lengths.
    /// Every problem found is reported together so the caller can fix them in one go.
    /// </summary>
    /// <param name="request"></param>
    /// <exception cref="RequestException"></exception>
    private static void NormalizeAndValidate(ICreateCustomer request)
    {
        request.LastName = request.LastName?.Trim() ?? string.Empty;
        request.PhoneNumber = request.PhoneNumber?.Trim() ?? string.Empty;
        request.FirstName = NullIfBlank(request.FirstName);
        request.DefaultBillingAddress1 = NullIfBlank(request.DefaultBillingAddress1);
        request.DefaultBillingAddress2 = NullIfBlank(request.DefaultBillingAddress2);
        request.DefaultBillingCity = NullIfBlank(request.DefaultBillingCity);
        request.DefaultBillingStateCode = NullIfBlank(request.DefaultBillingStateCode);
        request.DefaultBillingZipCode = NullIfBlank(request.DefaultBillingZipCode);
        request.DefaultShippingAddress1 = NullIfBlank(request.DefaultShippingAddress1);
        request.DefaultShippingAddress2 = NullIfBlank(request.DefaultShippingAddress2);
        request.DefaultShippingCity = NullIfBlank(request.DefaultShippingCity);
        request.DefaultShippingStateCode = NullIfBlank(request.DefaultShippingStateCode);
        request.DefaultShippingZipCode = NullIfBlank(request.DefaultShippingZipCode);

        List<string> problems = [];
        CheckRequired(problems,nameof(ICreateCustomer.LastName),request.LastName);
        CheckLength(problems, nameof(ICreateCustomer.LastName), request.LastName, MAX_LAST_NAME_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.FirstName), request.FirstName, MAX_FIRST_NAME_LENGTH);
        CheckRequired(problems,nameof(ICreateCustomer.PhoneNumber),request.PhoneNumber);
        CheckLength(problems, nameof(ICreateCustomer.PhoneNumber), request.PhoneNumber, MAX_PHONE_NUMBER_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.DefaultBillingAddress1), request.DefaultBillingAddress1, MAX_ADDRESS_LINE_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.DefaultBillingAddress2), request.DefaultBillingAddress2, MAX_ADDRESS_LINE_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.DefaultBillingCity), request.DefaultBillingCity, MAX_CITY_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.DefaultBillingStateCode), request.DefaultBillingStateCode, MAX_STATE_CODE_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.DefaultBillingZipCode), request.DefaultBillingZipCode, MAX_ZIP_CODE_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.DefaultShippingAddress1), request.DefaultShippingAddress1, MAX_ADDRESS_LINE_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.DefaultShippingAddress2), request.DefaultShippingAddress2, MAX_ADDRESS_LINE_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.DefaultShippingCity), request.DefaultShippingCity, MAX_CITY_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.DefaultShippingStateCode), request.DefaultShippingStateCode, MAX_STATE_CODE_LENGTH);
        CheckLength(problems, nameof(ICreateCustomer.DefaultShippingZipCode), request.DefaultShippingZipCode, MAX_ZIP_CODE_LENGTH);

        if (problems.Count > 0)
        {
            throw new RequestException(string.Join(" ", problems));
        }
    }

    /// <summary>
    /// will return null or the trimmed of the string
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    private static string? NullIfBlank(string? value)
    {
        return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
    }

    /// <summary>
    /// checks that the string is not longer than the max length
    /// </summary>
    /// <param name="problems"></param>
    /// <param name="propertyName"></param>
    /// <param name="value"></param>
    /// <param name="maxLength"></param>
    private static void CheckLength(List<string> problems, string propertyName, string? value, int maxLength)
    {
        if (value is not null && value.Length > maxLength)
        {
            problems.Add($"{propertyName} must be {maxLength} characters or fewer.");
        }
    }

    /// <summary>
    /// checks to see the value is present
    /// </summary>
    /// <param name="problems"></param>
    /// <param name="propName"></param>
    /// <param name="value"></param>
    private static void CheckRequired(List<string> problems, string propName, string? value)
    {
        if (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))
        {
            problems.Add($"{propName} is required.");
        }
    }
}
