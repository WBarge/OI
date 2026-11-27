using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Business.Tests.DataFactories
{
    public static class OptionFactory
    {
        public static IOption BuildOption()
        {
            return new Option
            {
                Id = Guid.NewGuid(),
                Name = "Test Option",
                Description = "A test option used for unit testing",
                Price = 9.99m
            };
        }

        public static IEnumerable<IOption> BuildOptionList()
        {
            return new List<IOption>
            {
                new Option
                {
                    Id = Guid.NewGuid(),
                    Name = "Option One",
                    Description = "The first test option",
                    Price = 4.99m
                },
                new Option
                {
                    Id = Guid.NewGuid(),
                    Name = "Option Two",
                    Description = "The second test option",
                    Price = 14.99m
                }
            };
        }

        private class Option : IOption
        {
            public Guid Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public string? Description { get; set; }
            public decimal Price { get; set; }
            public decimal Cost { get; set; }
            public decimal Estimated { get; set; }
        }
    }
}