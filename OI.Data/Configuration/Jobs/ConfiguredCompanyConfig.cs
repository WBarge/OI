using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OI.Data.Configuration.ConfigurationTags;
using OI.Data.Model.Jobs;

namespace OI.Data.Configuration.Jobs;

internal class ConfiguredCompanyConfig : IEntityTypeConfiguration<ConfiguredCompany>, IReportingConfiguration
{
    public void Configure(EntityTypeBuilder<ConfiguredCompany> builder)
    {
        builder.ToTable("CompanyConfiguration");

        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id)
            .HasColumnName("Id");
        builder.Property(c => c.CompanyName)
            .HasColumnName("CompanyName")
            .HasMaxLength(120);
        builder.Property(c => c.CompanyAddress)
            .HasColumnName("CompanyAddress")
            .HasMaxLength(300);
        builder.Property(c => c.CompanyCity)
            .HasColumnName("CompanyCity")
            .HasMaxLength(120);
        builder.Property(c => c.CompanyState)
            .HasColumnName("CompanyState")
            .HasMaxLength(20);
        builder.Property(c => c.CompanyZip)
            .HasColumnName("CompanyZip")
            .HasMaxLength(11);
        builder.Property(c => c.CompanyEmail)
            .HasColumnName("CompanyEmail")
            .HasMaxLength(256);
        builder.Property(c => c.CompanyPhone)
            .HasColumnName("CompanyPhone")
            .HasMaxLength(300);
        builder.HasOne(c => c.Result)
            .WithOne()
            .HasForeignKey<ConfiguredCompany>(c => c.ResultId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}