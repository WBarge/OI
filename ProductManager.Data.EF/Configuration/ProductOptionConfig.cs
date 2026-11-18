// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-12-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="ProductOptionConfig.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductManager.Data.EF.Model;

namespace ProductManager.Data.EF.Configuration;

/// <summary>
/// Class ProductOptionConfig.
/// configure the product options
/// </summary>
/// <seealso cref="IEntityTypeConfiguration{ProductOption}" />
internal class ProductOptionConfig:IEntityTypeConfiguration<ProductOption>
{
    /// <summary>
    /// Configures the ProductOption entity
    /// </summary>
    /// <param name="builder">The builder to be used to configure the entity type.</param>
    public void Configure(EntityTypeBuilder<ProductOption> builder)
    {
        builder.ToTable("ProductOption");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id)
            .IsRequired()
            .ValueGeneratedOnAdd();
        builder.Property(p=>p.OptionId)
            .IsRequired();
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
        builder.HasOne<Product>(po => po.Product)
            .WithMany(p => p.Options);
        builder.HasOne<Option>(po => po.Option)
            .WithMany();
    }
}