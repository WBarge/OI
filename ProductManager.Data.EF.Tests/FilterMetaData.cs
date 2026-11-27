using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Tests
{
    internal class FilterMetaData : IFilterMetaData
    {
        public string? SearchValue { get; set; }
        public string? MatchMode { get; set; }
        public string? LogicalOperator { get; set; }
    }
}