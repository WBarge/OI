using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductManager.Data.EF.Model;

namespace ProductManager.Data.EF.Configuration
{
    /// <summary>
    /// Provides the Entity Framework configuration for the <see cref="CharacteristicValue"/> entity.
    /// </summary>
    /// <remarks>
    /// This configuration defines the table name, primary key, property constraints, and relationships
    /// for the <see cref="CharacteristicValue"/> entity in the database.
    /// </remarks>
    internal class CharacteristicValueConfig :IEntityTypeConfiguration<CharacteristicValue>
    {
        public void Configure(EntityTypeBuilder<CharacteristicValue> builder)
        {
            builder.ToTable("CharacteristicValue");
            builder.HasKey(cv => cv.Id);
            builder.Property(cv => cv.Id)
                .IsRequired();
            builder.Property(cv => cv.Value)
                .IsRequired()
                .HasMaxLength(CharacteristicValue.VALUE_MAX_SIZE);

            builder.Property(cv => cv.CharacteristicId)
                .IsRequired();
            builder.Property(p => p.Created)
                .ValueGeneratedOnAdd();
            builder.Property(p => p.Modified)
                .ValueGeneratedOnUpdate();

            builder.HasOne(cv => cv.Characteristic)
                .WithMany(c => c.Values)
                .HasForeignKey(cv => cv.CharacteristicId);
        }
    }
}