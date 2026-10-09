using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OI.Data.Model;

namespace OI.Data.Configuration;

internal class OrderCounterConfig : IEntityTypeConfiguration<OrderCounter>
{
    public void Configure(EntityTypeBuilder<OrderCounter> builder)
    {
        // Set table name
        builder.ToTable("OrderCounters");
        // Configure primary key
        builder.HasKey(o => o.Id);
        builder.Property(o => o.Id)
            .HasColumnName("Id");
        // Configure properties
        builder.Property(o => o.NextOrderNumber)
            .HasColumnName("NextOrderNumber")
            .IsRequired();
        // Configure audit properties
        builder.Property(o => o.Created)
            .HasColumnName("Created")
            .ValueGeneratedOnAdd()
            .IsRequired();
        builder.Property(o => o.Modified)
            .HasColumnName("Modified")
            .ValueGeneratedOnUpdate();
        // Seed one row
        builder.HasData(
            new OrderCounter
            {
                Id = Guid.Parse("c0ffee00-1234-5678-abcd-ef0123456789"),
                NextOrderNumber = 1000,
                Created = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
