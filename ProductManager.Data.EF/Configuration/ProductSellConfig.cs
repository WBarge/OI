// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-12-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="ProductSellConfig.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductManager.Data.EF.Model;

namespace ProductManager.Data.EF.Configuration;

/// <summary>
/// Class ProductSellConfig.
/// configures the product sells
/// </summary>
/// <seealso cref="IEntityTypeConfiguration{ProductSell}" />
internal class ProductSellConfig:IEntityTypeConfiguration<ProductSell>
{
    /// <summary>
    /// Configures the ProductSell entity 
    /// </summary>
    /// <param name="builder">The builder to be used to configure the entity type.</param>
    public void Configure(EntityTypeBuilder<ProductSell> builder)
    {
        builder.ToTable("ProductSell");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id)
            .IsRequired()
            .ValueGeneratedOnAdd();
        builder.Property(p => p.Price)
            .HasPrecision(10, 2);
        builder.Property(p => p.Start);
        builder.Property(p => p.End);
        builder.Ignore(p => p.Period);
        builder.Property(p => p.Deleted)
            .IsRequired()
            .HasDefaultValue(false);
        builder.Property(p => p.Created)
            .ValueGeneratedOnAdd();
        builder.Property(p => p.Modified)
            .ValueGeneratedOnUpdate();
        builder.HasOne<Product>(po => po.Product)
            .WithMany(p => p.Reductions);
    }
}