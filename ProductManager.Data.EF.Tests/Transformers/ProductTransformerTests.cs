using FluentAssertions;
using ProductManager.Data.EF.Model;
using ProductManager.Data.EF.Transformers;
using ProductManager.Glue.Interfaces.Models;

namespace ProductManager.Data.EF.Tests.Transformers
{
    [TestFixture,Description("Tests for the product transformer")]
    public class ProductTransformerTests
    {
         [Test, Description("Should return null when input is null")]
        public void Transform_NullInput_ReturnsNull()
        {
            // Act
            IFullProduct? result = ProductTransformer.Transform(null!);
            // Assert
            result.Should().BeNull();
        }
        
        [Test, Description("Should transform a product with basic properties correctly")]
        public void Transform_ProductWithBasicProperties_ReturnsTransformedProduct()
        {
            // Arrange
            Guid id = Guid.NewGuid();
            Product product = new Product
            {
                Id = id,
                Name = "Test Product",
                Price = 100.0m
            };
            // Act
            IFullProduct? transformedProduct = ProductTransformer.Transform(product);
            // Assert
            transformedProduct.Should().NotBeNull();
            transformedProduct!.Id.Should().Be(product.Id);
            transformedProduct.Name.Should().Be(product.Name);
            transformedProduct.Price.Should().Be(product.Price);
        }
        
        [Test, Description("Should transform a product with null name correctly")]
        public void Transform_ProductWithNullName_ReturnsTransformedProductWithNullName()
        {
            // Arrange
            Guid id = Guid.NewGuid();
            Product product = new Product
            {
                Id = id,
                Name = null!,
                Price = 50.0m
            };
            // Act
            IFullProduct? transformedProduct = ProductTransformer.Transform(product);
            // Assert
            transformedProduct.Should().NotBeNull();
            transformedProduct!.Id.Should().Be(product.Id);
            transformedProduct.Name.Should().BeNull();
            transformedProduct.Price.Should().Be(product.Price);
        }
        
        [Test, Description("Should handle a product with zero price correctly")]
        public void Transform_ProductWithZeroPrice_ReturnsTransformedProductWithZeroPrice()
        {
            // Arrange
            Guid id = Guid.NewGuid();
            Product product = new Product
            {
                Id = id,
                Name = "Free Product",
                Price = 0.0m
            };
            // Act
            IFullProduct? transformedProduct = ProductTransformer.Transform(product);
            // Assert
            transformedProduct.Should().NotBeNull();
            transformedProduct!.Id.Should().Be(product.Id);
            transformedProduct.Name.Should().Be(product.Name);
            transformedProduct.Price.Should().Be(0.0m);
        }
       
        [Test, Description("Should handle a product with negative price correctly")]
        public void Transform_ProductWithNegativePrice_ReturnsTransformedProductWithNegativePrice()
        {
            // Arrange
            Guid id = Guid.NewGuid();
            Product product = new Product
            {
                Id = id,
                Name = "Discounted Product",
                Price = -10.0m
            };
            // Act
            IFullProduct? transformedProduct = ProductTransformer.Transform(product);
            // Assert
            transformedProduct.Should().NotBeNull();
            transformedProduct!.Id.Should().Be(product.Id);
            transformedProduct.Name.Should().Be(product.Name);
            transformedProduct.Price.Should().Be(-10.0m);
        }
    }
}