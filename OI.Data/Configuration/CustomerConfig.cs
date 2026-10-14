using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OI.Data.Model;

namespace OI.Data.Configuration;

internal class CustomerConfig : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        // Set table name
        builder.ToTable("Customers");
        // Configure primary key
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id)
            .HasColumnName("Id");
        // Configure required properties
        builder.Property(c => c.LastName)
            .HasColumnName("LastName")
            .IsRequired()
            .HasMaxLength(100);
        builder.Property(c => c.FirstName)
            .HasColumnName("FirstName")
            .HasMaxLength(100);
        builder.Property(c => c.PhoneNumber)
            .HasColumnName("PhoneNumber")
            .IsRequired()
            .HasMaxLength(20);
        // Configure billing address properties
        builder.Property(c => c.DefaultBillingAddress1)
            .HasColumnName("DefaultBillingAddress1")
            .HasMaxLength(200);
        builder.Property(c => c.DefaultBillingAddress2)
            .HasColumnName("DefaultBillingAddress2")
            .HasMaxLength(200);
        builder.Property(c => c.DefaultBillingCity)
            .HasColumnName("DefaultBillingCity")
            .HasMaxLength(100);
        builder.Property(c => c.DefaultBillingStateCode)
            .HasColumnName("DefaultBillingStateCode")
            .HasMaxLength(2);
        builder.Property(c => c.DefaultBillingZipCode)
            .HasColumnName("DefaultBillingZipCode")
            .HasMaxLength(10);
        // Configure shipping address properties
        builder.Property(c => c.DefaultShippingAddress1)
            .HasColumnName("DefaultShippingAddress1")
            .HasMaxLength(200);
        builder.Property(c => c.DefaultShippingAddress2)
            .HasColumnName("DefaultShippingAddress2")
            .HasMaxLength(200);
        builder.Property(c => c.DefaultShippingCity)
            .HasColumnName("DefaultShippingCity")
            .HasMaxLength(100);
        builder.Property(c => c.DefaultShippingStateCode)
            .HasColumnName("DefaultShippingStateCode")
            .HasMaxLength(2);
        builder.Property(c => c.DefaultShippingZipCode)
            .HasColumnName("DefaultShippingZipCode")
            .HasMaxLength(10);
        // Configure audit properties
        builder.Property(c => c.Created)
            .HasColumnName("Created")
            .ValueGeneratedOnAdd()
            .IsRequired();
        builder.Property(c => c.Modified)
            .HasColumnName("Modified")
            .ValueGeneratedOnUpdate();
    }
}
