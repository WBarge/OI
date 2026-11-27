// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-12-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="ProductCharacteristicConfig.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductManager.Data.EF.Model;

namespace ProductManager.Data.EF.Configuration;

/// <summary>
/// Class ProductCharacteristicConfig.
/// configures the product characteristic 
/// </summary>
/// <seealso cref="IEntityTypeConfiguration{ProductCharacteristic}" />
internal class ProductCharacteristicConfig :IEntityTypeConfiguration<ProductCharacteristic>
{
    /// <summary>
    /// Configures the ProductCharacteristic entity
    /// </summary>
    /// <param name="builder">The builder to be used to configure the entity type.</param>
    public void Configure(EntityTypeBuilder<ProductCharacteristic> builder)
    {
        builder.ToTable("ProductCharacteristic");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id)
            .IsRequired()
            .ValueGeneratedOnAdd();
        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(ProductCharacteristic.NAME_MAX_SIZE)
            .HasField("_name");
        builder.Property(p => p.CharacteristicValue)
            .IsRequired()
            .HasMaxLength(ProductCharacteristic.CHARACTERISTIC_VALUE_MAX_SIZE)
            .HasField("_charValue");
        builder.Property(p => p.Deleted)
            .IsRequired()
            .HasDefaultValue(false);
        builder.Property(p => p.Created)
            .ValueGeneratedOnAdd();
        builder.Property(p => p.Modified)
            .ValueGeneratedOnUpdate();
        builder.HasOne<Product>(po => po.Product)
            .WithMany(p => p.Characteristics);
    }
}