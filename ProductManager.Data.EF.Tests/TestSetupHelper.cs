using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProductManager.Data.EF.Model;


namespace ProductManager.Data.EF.Tests
{
    public static class TestSetupHelper
    {
        public static IServiceProvider GetServiceProvider()
        {
            ServiceCollection services = new ServiceCollection();

            services.AddEntityFrameworkInMemoryDatabase()
                .AddDbContext<ProductDbContext>(optionsBuilder =>
                {
                    optionsBuilder.UseInMemoryDatabase("TestDb");
                });

            ServiceProvider serviceProvider = services.BuildServiceProvider();
            return serviceProvider;
        }

        public static void SeedData(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();
            Product p = new Product()
            {
                Id = Guid.NewGuid(),
                Name = "Test Product",
                ShortDescription = "Test",
                Sku = "T125",
                Description = "A Test Product",
                Price = 12.99M
            };
            context.Products.Add(p);
            Product p1 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Test2 Product",
                ShortDescription = "Test2",
                Sku = "T124",
                Description = "A Test two Product",
                Price = 12.99M
            };
            context.Products.Add(p1);
            Product p2 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Test2 Product",
                ShortDescription = "Test2",
                Sku = "T124",
                Description = "A Test two Product",
                Price = 12.99M,
                Deleted = true
            };
            context.Products.Add(p2);
            Product p3 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Test3 Product",
                ShortDescription = "Test3",
                Sku = "T14",
                Description = "A Test three Product",
                Price = 12.99M
            };
            context.Products.Add(p3);
            Product p4 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Test4 Product",
                ShortDescription = "Test4",
                Sku = "T24",
                Description = "A Test four Product",
                Price = 12.99M
            };
            context.Products.Add(p4);
            Product p5 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Test5 Product",
                ShortDescription = "Test5",
                Sku = "T5",
                Description = "A Test five Product",
                Price = 15.99M
            };
            context.Products.Add(p5);
            context.SaveChanges();

        }

        public static void SeedDataForCharacteristics(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();
            // Create Characteristics
            Characteristic characteristic1 = new Characteristic
            {
                Id = Guid.NewGuid(),
                Name = "Color",
                Values = new List<CharacteristicValue>
                {
                    new CharacteristicValue { Id = Guid.NewGuid(), Value = "Red" },
                    new CharacteristicValue { Id = Guid.NewGuid(), Value = "Blue" },
                    new CharacteristicValue { Id = Guid.NewGuid(), Value = "Green" }
                }
            };
            Characteristic characteristic2 = new Characteristic
            {
                Id = Guid.NewGuid(),
                Name = "Size",
                Values = new List<CharacteristicValue>
                {
                    new CharacteristicValue { Id = Guid.NewGuid(), Value = "Small" },
                    new CharacteristicValue { Id = Guid.NewGuid(), Value = "Medium" },
                    new CharacteristicValue { Id = Guid.NewGuid(), Value = "Large" }
                }
            };
            Characteristic characteristic3 = new Characteristic
            {
                Id = Guid.NewGuid(),
                Name = "Material",
                Values = new List<CharacteristicValue>
                {
                    new CharacteristicValue { Id = Guid.NewGuid(), Value = "Cotton" },
                    new CharacteristicValue { Id = Guid.NewGuid(), Value = "Polyester" },
                    new CharacteristicValue { Id = Guid.NewGuid(), Value = "Wool" }
                }
            };
            // Add Characteristics to the context
            context.Characteristics.Add(characteristic1);
            context.Characteristics.Add(characteristic2);
            context.Characteristics.Add(characteristic3);
            // Save changes to the database
            context.SaveChanges();
        }

        public static void RemoveCharacteristicData(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();
            // Retrieve all Characteristics and their associated CharacteristicValues
            List<Characteristic> characteristics = context.Characteristics.Include(c => c.Values).ToList();
            // Remove associated CharacteristicValues first
            foreach (Characteristic characteristic in characteristics)
            {
                if (characteristic.Values!.Any())
                {
                    context.CharacteristicValues.RemoveRange(characteristic.Values!);
                }
            }

            // Remove Characteristics
            context.Characteristics.RemoveRange(characteristics);
            // Save changes to the database
            context.SaveChanges();
        }

        public static void RemoveData(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();
            foreach (Product contextProduct in context.Products)
            {
                context.Remove(contextProduct);
            }

            context.SaveChanges();

        }

        public static void SeedDataForOptions(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();
            Option o = new Option()
            {
                Id = Guid.NewGuid(), Name = "Test Option", Description = "A Test Option", Price = 12.99M
            };
            context.Options.Add(o);
            Option o1 = new Option
            {
                Id = Guid.NewGuid(), Name = "Test2 Option", Description = "A Test two Option", Price = 12.99M
            };
            context.Options.Add(o1);
            Option o2 = new Option
            {
                Id = Guid.NewGuid(),
                Name = "Test2 Option",
                Description = "A Test two Option",
                Price = 12.99M,
                Deleted = true
            };
            context.Options.Add(o2);
            Option o3 = new Option
            {
                Id = Guid.NewGuid(), Name = "Test3 Option", Description = "A Test three Option", Price = 12.99M
            };
            context.Options.Add(o3);
            Option o4 = new Option
            {
                Id = Guid.NewGuid(), Name = "Test4 Option", Description = "A Test four Option", Price = 12.99M
            };
            context.Options.Add(o4);
            Option o5 = new Option
            {
                Id = Guid.NewGuid(), Name = "Test5 Option", Description = "A Test five Option", Price = 15.99M
            };
            context.Options.Add(o5);
            context.SaveChanges();
        }

        public static void RemoveOptionData(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();
            foreach (Option contextOption in context.Options)
            {
                context.Remove(contextOption);
            }

            context.SaveChanges();
        }

        public static void SeedDataForProductOptions(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();

            // Prerequisite products, since a product option must reference a valid product
            Product product1 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "PO Test Product",
                ShortDescription = "POTest",
                Sku = "POT1",
                Description = "A product used for product option tests",
                Price = 9.99M
            };
            context.Products.Add(product1);
            Product product2 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "PO Test Product2",
                ShortDescription = "POTest2",
                Sku = "POT2",
                Description = "A second product used for product option tests",
                Price = 19.99M
            };
            context.Products.Add(product2);

            // Prerequisite options, since a product option must reference a valid option
            Option option1 = new Option
            {
                Id = Guid.NewGuid(),
                Name = "PO Test Option",
                Description = "An option used for product option tests",
                Price = 5.99M
            };
            context.Options.Add(option1);
            Option option2 = new Option
            {
                Id = Guid.NewGuid(),
                Name = "PO Test Option2",
                Description = "A second option used for product option tests",
                Price = 7.99M
            };
            context.Options.Add(option2);

            context.SaveChanges();

            ProductOption po = new ProductOption
            {
                Id = Guid.NewGuid(), ProductId = product1.Id, OptionId = option1.Id, Price = option1.Price
            };
            context.ProductOptions.Add(po);
            ProductOption po1 = new ProductOption
            {
                Id = Guid.NewGuid(), ProductId = product1.Id, OptionId = option2.Id, Price = option2.Price
            };
            context.ProductOptions.Add(po1);
            ProductOption po2 = new ProductOption
            {
                Id = Guid.NewGuid(),
                ProductId = product2.Id,
                OptionId = option1.Id,
                Price = option1.Price,
                Deleted = true
            };
            context.ProductOptions.Add(po2);

            context.SaveChanges();
        }

        public static void RemoveProductOptionData(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();
            foreach (ProductOption contextProductOption in context.ProductOptions)
            {
                context.Remove(contextProductOption);
            }

            context.SaveChanges();

            // Remove the prerequisite products and options created in SeedDataForProductOptions
            // so this fixture leaves the shared in-memory database clean for other test fixtures.
            foreach (Product contextProduct in context.Products)
            {
                context.Remove(contextProduct);
            }

            foreach (Option contextOption in context.Options)
            {
                context.Remove(contextOption);
            }

            context.SaveChanges();
        }


        public static void SeedDataForProductCharacteristics(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();

            // Prerequisite products, since a product characteristic must reference a valid product
            Product product1 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "PC Test Product",
                ShortDescription = "PCTest",
                Sku = "PCT1",
                Description = "A product used for product characteristic tests",
                Price = 9.99M
            };
            context.Products.Add(product1);
            Product product2 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "PC Test Product2",
                ShortDescription = "PCTest2",
                Sku = "PCT2",
                Description = "A second product used for product characteristic tests",
                Price = 19.99M
            };
            context.Products.Add(product2);
            context.SaveChanges();

            ProductCharacteristic pc1 = new ProductCharacteristic
            {
                Id = Guid.NewGuid(), ProductId = product1.Id, Name = "Color", CharacteristicValue = "Red"
            };
            context.ProductCharacteristics.Add(pc1);
            ProductCharacteristic pc2 = new ProductCharacteristic
            {
                Id = Guid.NewGuid(), ProductId = product1.Id, Name = "Size", CharacteristicValue = "Large"
            };
            context.ProductCharacteristics.Add(pc2);
            ProductCharacteristic pc3 = new ProductCharacteristic
            {
                Id = Guid.NewGuid(),
                ProductId = product1.Id,
                Name = "Material",
                CharacteristicValue = "Wool",
                Deleted = true
            };
            context.ProductCharacteristics.Add(pc3);
            ProductCharacteristic pc4 = new ProductCharacteristic
            {
                Id = Guid.NewGuid(), ProductId = product2.Id, Name = "Color", CharacteristicValue = "Blue"
            };
            context.ProductCharacteristics.Add(pc4);

            context.SaveChanges();
        }

        public static void RemoveProductCharacteristicData(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();

            foreach (ProductCharacteristic contextProductCharacteristic in context.ProductCharacteristics)
            {
                context.Remove(contextProductCharacteristic);
            }

            context.SaveChanges();

            // Remove the prerequisite products created in SeedDataForProductCharacteristics
            // so this fixture leaves the shared in-memory database clean for other test fixtures.
            foreach (Product contextProduct in context.Products)
            {
                context.Remove(contextProduct);
            }

            context.SaveChanges();
        }

        #region ProductRepo UpdateProductAsync test data

        // Identifies the products (seeded by SeedData) that SeedDataForProductUpdate attaches child rows to, so the
        // tests can find them without adding or changing any products. Product counts asserted by other tests are
        // therefore not affected.
        public const string
            UPDATE_CHARACTERISTICS_SKU = "T125"; // two characteristics; also used by the scalar and not found tests

        public const string UPDATE_OPTIONS_SKU = "T14"; // two product options and one sell

        public const string
            UPDATE_MISSING_OPTION_SKU = "T24"; // one product option pointing at UPDATE_MISSING_OPTION_NAME

        public const string UPDATE_EMPTY_DATE_SELL_SKU = "T124"; // one sell with no start or end date
        public const string UPDATE_SELLS_SKU = "T5"; // one sell per overlap scenario, see the windows below

        // Options seeded with these values (price / cost / estimated): 10 / 4 / 6, 20 / 8 / 12 and 10 / 4 / 6.
        public const string UPDATE_NO_PRICE_OPTION_NAME = "PU Test Option";
        public const string UPDATE_PRICED_OPTION_NAME = "PU Test Option2";
        public const string UPDATE_MISSING_OPTION_NAME = "PU Doomed Option";

        // The product option for UPDATE_NO_PRICE_OPTION_NAME is seeded with a price of 0 (use the option price) and the
        // one for UPDATE_PRICED_OPTION_NAME with this price.
        public const decimal UPDATE_PRODUCT_OPTION_PRICE = 55M;

        // Every seeded sell has this price.
        public const decimal UPDATE_SELL_PRICE = 5M;

        public static readonly DateTime UpdateSellBaseDate = new DateTime(2030, 1, 1);

        private static (DateTime Start, DateTime End) UpdateSellWindow(int startDay, int endDay) =>
            (UpdateSellBaseDate.AddDays(startDay), UpdateSellBaseDate.AddDays(endDay));

        // The only sell on UPDATE_OPTIONS_SKU. The "no existing sells" test removes it from the database.
        public static readonly (DateTime Start, DateTime End) UpdateNoExistingSell = UpdateSellWindow(0, 10);

        // Sells on UPDATE_SELLS_SKU. The windows are far apart so the scenarios cannot affect each other.
        // A "stored" sell is left in the database. An "incoming" sell is also seeded so it is part of the payload
        // returned by GetProductAsync, and the test that owns it removes it from the database before updating.
        public static readonly (DateTime Start, DateTime End) UpdateIdenticalStoredSell = UpdateSellWindow(0, 10);
        public static readonly (DateTime Start, DateTime End) UpdateInsideStoredSell = UpdateSellWindow(100, 120);
        public static readonly (DateTime Start, DateTime End) UpdateInsideIncomingSell = UpdateSellWindow(105, 108);
        public static readonly (DateTime Start, DateTime End) UpdateDisjointStoredSell = UpdateSellWindow(200, 210);
        public static readonly (DateTime Start, DateTime End) UpdateDisjointIncomingSell = UpdateSellWindow(220, 230);
        public static readonly (DateTime Start, DateTime End) UpdatePartialStoredSell = UpdateSellWindow(300, 310);
        public static readonly (DateTime Start, DateTime End) UpdatePartialIncomingSell = UpdateSellWindow(305, 315);
        public static readonly (DateTime Start, DateTime End) UpdateSurroundStoredSell = UpdateSellWindow(405, 408);
        public static readonly (DateTime Start, DateTime End) UpdateSurroundIncomingSell = UpdateSellWindow(400, 420);

        /// <summary>
        /// Seeds the options, characteristics, product options and sells used by the ProductRepo UpdateProductAsync
        /// tests. Must run after SeedData because it attaches the rows to products that SeedData creates.
        /// Removed by RemoveProductUpdateData.
        /// </summary>
        public static void SeedDataForProductUpdate(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();

            Product FindProduct(string sku) => context.Products.First(p => p.Sku == sku && !p.Deleted);

            Product characteristicsProduct = FindProduct(UPDATE_CHARACTERISTICS_SKU);
            Product optionsProduct = FindProduct(UPDATE_OPTIONS_SKU);
            Product missingOptionProduct = FindProduct(UPDATE_MISSING_OPTION_SKU);
            Product emptyDateSellProduct = FindProduct(UPDATE_EMPTY_DATE_SELL_SKU);
            Product sellsProduct = FindProduct(UPDATE_SELLS_SKU);

            // Prerequisite options, since a product option must reference a valid option
            Option noPriceOption = new Option
            {
                Id = Guid.NewGuid(),
                Name = UPDATE_NO_PRICE_OPTION_NAME,
                Description = "An option used for product update tests",
                Price = 10M,
                Cost = 4M,
                Estimated = 6M
            };
            Option pricedOption = new Option
            {
                Id = Guid.NewGuid(),
                Name = UPDATE_PRICED_OPTION_NAME,
                Description = "A second option used for product update tests",
                Price = 20M,
                Cost = 8M,
                Estimated = 12M
            };
            Option missingOption = new Option
            {
                Id = Guid.NewGuid(),
                Name = UPDATE_MISSING_OPTION_NAME,
                Description = "An option the product update tests remove from the database",
                Price = 10M,
                Cost = 4M,
                Estimated = 6M
            };
            context.Options.AddRange(noPriceOption, pricedOption, missingOption);
            context.SaveChanges();

            context.ProductCharacteristics.Add(new ProductCharacteristic
            {
                Id = Guid.NewGuid(),
                ProductId = characteristicsProduct.Id,
                Name = "Color",
                CharacteristicValue = "Red"
            });
            context.ProductCharacteristics.Add(new ProductCharacteristic
            {
                Id = Guid.NewGuid(),
                ProductId = characteristicsProduct.Id,
                Name = "Size",
                CharacteristicValue = "Large"
            });

            //a price of zero on the product option means "use the option price"
            context.ProductOptions.Add(new ProductOption
            {
                Id = Guid.NewGuid(), ProductId = optionsProduct.Id, OptionId = noPriceOption.Id, Price = 0M
            });
            context.ProductOptions.Add(new ProductOption
            {
                Id = Guid.NewGuid(),
                ProductId = optionsProduct.Id,
                OptionId = pricedOption.Id,
                Price = UPDATE_PRODUCT_OPTION_PRICE
            });
            context.ProductOptions.Add(new ProductOption
            {
                Id = Guid.NewGuid(), ProductId = missingOptionProduct.Id, OptionId = missingOption.Id, Price = 10M
            });

            void AddSell(Product product, (DateTime Start, DateTime End) window)
            {
                context.Add(new ProductSell
                {
                    Id = Guid.NewGuid(),
                    ProductId = product.Id,
                    Start = window.Start,
                    End = window.End,
                    Price = UPDATE_SELL_PRICE
                });
            }

            AddSell(optionsProduct, UpdateNoExistingSell);
            AddSell(emptyDateSellProduct, (default(DateTime), default(DateTime)));
            AddSell(sellsProduct, UpdateIdenticalStoredSell);
            AddSell(sellsProduct, UpdateInsideStoredSell);
            AddSell(sellsProduct, UpdateInsideIncomingSell);
            AddSell(sellsProduct, UpdateDisjointStoredSell);
            AddSell(sellsProduct, UpdateDisjointIncomingSell);
            AddSell(sellsProduct, UpdatePartialStoredSell);
            AddSell(sellsProduct, UpdatePartialIncomingSell);
            AddSell(sellsProduct, UpdateSurroundStoredSell);
            AddSell(sellsProduct, UpdateSurroundIncomingSell);

            context.SaveChanges();
        }

        /// <summary>
        /// Removes the dependent rows and options seeded by SeedDataForProductUpdate.
        /// The in-memory provider does not cascade delete to dependents that are not loaded, and RemoveData
        /// only removes products, so without this the rows would leak into other fixtures via the shared database.
        /// </summary>
        public static void RemoveProductUpdateData(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();
            context.RemoveRange(context.Set<ProductSell>().ToList());
            context.RemoveRange(context.ProductCharacteristics.ToList());
            context.RemoveRange(context.ProductOptions.ToList());
            context.RemoveRange(context.Options.ToList());
            context.SaveChanges();
        }

        #endregion

        public static void SeedDataForProductSells(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();
            // Prerequisite products, since a product sell must reference a valid product
            Product product1 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Sell Test Product 1",
                ShortDescription = "SellTest1",
                Sku = "STP1",
                Description = "A product used for product sell tests",
                Price = 19.99M
            };
            context.Products.Add(product1);
            Product product2 = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Sell Test Product 2",
                ShortDescription = "SellTest2",
                Sku = "STP2",
                Description = "Another product used for product sell tests",
                Price = 29.99M
            };
            context.Products.Add(product2);
            context.SaveChanges();
            // Add product sells
            ProductSell sell1 = new ProductSell
            {
                Id = Guid.NewGuid(),
                ProductId = product1.Id,
                Start = DateTime.UtcNow,
                End = DateTime.UtcNow.AddDays(7),
                Price = 15.99M
            };
            context.Sells.Add(sell1);
            ProductSell sell2 = new ProductSell
            {
                Id = Guid.NewGuid(),
                ProductId = product2.Id,
                Start = DateTime.UtcNow.AddDays(1),
                End = DateTime.UtcNow.AddDays(10),
                Price = 25.99M
            };
            context.Sells.Add(sell2);
            context.SaveChanges();
        }

        public static void RemoveProductSellData(this IServiceScope serviceScope)
        {
            ProductDbContext context = serviceScope.ServiceProvider.GetService<ProductDbContext>() ??
                                       throw new InvalidOperationException();
            // Remove all product sells
            foreach (ProductSell sell in context.Sells)
            {
                context.Remove(sell);
            }

            // Remove prerequisite products
            foreach (Product product in context.Products)
            {
                context.Remove(product);
            }

            context.SaveChanges();
        }

    }
}