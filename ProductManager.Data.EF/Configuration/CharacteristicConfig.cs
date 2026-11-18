using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductManager.Data.EF.Model;

namespace ProductManager.Data.EF.Configuration
{
    /// <summary>
    /// Configures the database schema for the <see cref="Characteristic"/> entity.
    /// </summary>
    /// <remarks>
    /// This configuration defines the table name, primary key, property constraints, 
    /// and relationships for the <see cref="Characteristic"/> entity in the database.
    /// </remarks>
    internal class CharacteristicConfig:IEntityTypeConfiguration<Characteristic>
    {
        public void Configure(EntityTypeBuilder<Characteristic> builder)
        {
            builder.ToTable("Characteristic");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();
            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(Characteristic.NAME_MAX_SIZE);
            builder.Property(p => p.Created)
                .ValueGeneratedOnAdd();
            builder.Property(p => p.Modified)
                .ValueGeneratedOnUpdate();

            builder.HasMany(e => e.Values)
                .WithOne(e => e.Characteristic)
                .HasForeignKey(e => e.CharacteristicId);
        }
    }
}