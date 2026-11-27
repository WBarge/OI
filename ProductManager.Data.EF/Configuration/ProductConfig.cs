// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-10-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="ProductConfig.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductManager.Data.EF.Model;

namespace ProductManager.Data.EF.Configuration;

/// <summary>
/// Class ProductConfig.
/// configures the product
/// </summary>
/// <seealso cref="IEntityTypeConfiguration{Product}" />
internal class ProductConfig :IEntityTypeConfiguration<Product>
{
    /// <summary>
    /// Configures the product entity 
    /// </summary>
    /// <param name="builder">The builder to be used to configure the entity type.</param>
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Product");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id)
            .IsRequired()
            .ValueGeneratedOnAdd();
        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(Product.NAME_MAX_SIZE)
            .HasField("_name");
        builder.Property(p => p.ShortDescription)
            .IsRequired()
            .HasMaxLength(Product.SHORT_DESCRIPTION_MAX_SIZE)
            .HasField("_shortDescription");
        builder.Property(p => p.Sku)
            .HasMaxLength(Product.SKU_MAX_SIZE)
            .HasField("_sku");
        builder.Property(p => p.Description);
        builder.Property(p => p.Price)
            .HasPrecision(10, 2);
        builder.Property(p => p.Cost)
            .HasPrecision(10, 2);
        builder.Property(p => p.Estimated)
            .HasPrecision(10, 2);
        builder.Property(p => p.Deleted)
            .IsRequired()
            .HasDefaultValue(false);
        builder.Property(p => p.Created)
            .ValueGeneratedOnAdd();
        builder.Property(p => p.Modified)
            .ValueGeneratedOnUpdate();
        builder.HasMany<ProductOption>(p => p.Options)
            .WithOne(o => o.Product);
        builder.HasMany<ProductCharacteristic>(p => p.Characteristics)
            .WithOne(c => c.Product);
        builder.HasMany<ProductSell>(p => p.Reductions)
            .WithOne(s => s.Product);
    }
}