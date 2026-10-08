using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OI.Data.Model;

namespace OI.Data.Configuration;

internal class OrderItemConfig : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        // Set table name
        builder.ToTable("OrderItems");
        // Configure primary key
        builder.HasKey(oi => oi.Id);
        builder.Property(oi => oi.Id)
            .HasColumnName("Id");
        // Configure foreign key relationship
        builder.HasOne(oi => oi.Order)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(oi => oi.OrderId);
        builder.Property(oi => oi.OrderId)
            .HasColumnName("OrderId");
        builder.Property(oi => oi.ProductId)
            .HasColumnName("ProductId");
        // Configure required string properties
        builder.Property(oi => oi.Name)
            .HasColumnName("Name")
            .IsRequired()
            .HasMaxLength(OrderItem.NAME_MAX_SIZE);
        builder.Property(oi => oi.Description)
            .HasColumnName("Description")
            .IsRequired()
            .HasMaxLength(OrderItem.DESCRIPTION_MAX_SIZE);
        builder.Property(oi => oi.Sku)
            .HasColumnName("Sku")
            .IsRequired()
            .HasMaxLength(OrderItem.SKU_MAX_SIZE);
        // Configure numeric properties
        builder.Property(oi => oi.Price)
            .HasColumnName("Price")
            .IsRequired();
        builder.Property(oi => oi.Quantity)
            .HasColumnName("Quantity")
            .IsRequired();
        builder.Property(oi => oi.Total)
            .HasColumnName("Total")
            .IsRequired();
        // Configure audit properties
        builder.Property(oi => oi.Created)
            .HasColumnName("Created")
            .ValueGeneratedOnAdd()
            .IsRequired();
        builder.Property(oi => oi.Modified)
            .HasColumnName("Modified")
            .ValueGeneratedOnUpdate();
    }
}
