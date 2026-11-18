using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductManager.Data.EF.Model;

namespace ProductManager.Data.EF.Configuration
{
    /// <summary>
    /// Configures the entity of type <see cref="Option"/>.
    /// </summary>
    internal class OptionConfig: IEntityTypeConfiguration<Option>
    {
        /// <summary>
        /// Configures the entity of type <see cref="Option"/>.
        /// </summary>
        /// <param name="builder"></param>
        public void Configure(EntityTypeBuilder<Option> builder)
        {
            builder.ToTable("Option");
            builder.HasKey(p=>p.Id);
            builder.Property(p => p.Id)
                .IsRequired()
                .ValueGeneratedOnAdd();
            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(Option.NAME_MAX_SIZE);
            builder.Property(p => p.Description);
            builder.Property(p => p.Price)
                .IsRequired()
                .HasPrecision(10, 2);
            builder.Property(p => p.Cost)
                .IsRequired()
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

        }
    }
}