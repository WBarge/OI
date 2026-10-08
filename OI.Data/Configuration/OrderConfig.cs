using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OI.Data.Model;

namespace OI.Data.Configuration;

internal class OrderConfig : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        // Set table name
        builder.ToTable("Orders");
        // Configure primary key
        builder.HasKey(o => o.Id);
        builder.Property(o => o.Id)
            .HasColumnName("Id");
        // Configure foreign key relationship
        builder.HasOne(o => o.Customer)
            .WithMany()
            .HasForeignKey(o => o.CustomerId);
        builder.Property(o => o.CustomerId)
            .HasColumnName("CustomerId");
        // Configure date properties
        builder.Property(o => o.OrderDate)
            .HasColumnName("OrderDate")
            .IsRequired();
        builder.Property(o => o.CompletedDate)
            .HasColumnName("CompletedDate");
        // Configure billing address properties
        builder.Property(o => o.BillingAddress1)
            .HasColumnName("BillingAddress1")
            .HasMaxLength(200);
        builder.Property(o => o.BillingAddress2)
            .HasColumnName("BillingAddress2")
            .HasMaxLength(200);
        builder.Property(o => o.BillingCity)
            .HasColumnName("BillingCity")
            .HasMaxLength(100);
        builder.Property(o => o.BillingStateCode)
            .HasColumnName("BillingStateCode")
            .HasMaxLength(2);
        builder.Property(o => o.BillingZipCode)
            .HasColumnName("BillingZipCode")
            .HasMaxLength(10);
        // Configure shipping address properties
        builder.Property(o => o.ShippingAddress1)
            .HasColumnName("ShippingAddress1")
            .HasMaxLength(200);
        builder.Property(o => o.ShippingAddress2)
            .HasColumnName("ShippingAddress2")
            .HasMaxLength(200);
        builder.Property(o => o.ShippingCity)
            .HasColumnName("ShippingCity")
            .HasMaxLength(100);
        builder.Property(o => o.ShippingStateCode)
            .HasColumnName("ShippingStateCode")
            .HasMaxLength(2);
        builder.Property(o => o.ShippingZipCode)
            .HasColumnName("ShippingZipCode")
            .HasMaxLength(10);
        // Configure numeric properties
        builder.Property(o => o.SubTotal)
            .HasColumnName("SubTotal")
            .IsRequired();
        builder.Property(o => o.Shipping)
            .HasColumnName("Shipping")
            .IsRequired();
        builder.Property(o => o.Tax)
            .HasColumnName("Tax")
            .IsRequired();
        builder.Property(o => o.Total)
            .HasColumnName("Total")
            .IsRequired();
        // Configure audit properties
        builder.Property(o => o.Created)
            .HasColumnName("Created")
            .ValueGeneratedOnAdd()
            .IsRequired();
        builder.Property(o => o.Modified)
            .HasColumnName("Modified")
            .ValueGeneratedOnUpdate();
    }

}