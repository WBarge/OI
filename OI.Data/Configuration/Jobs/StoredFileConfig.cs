using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OI.Data.Configuration.ConfigurationTags;

namespace OI.Data.Configuration.Jobs;

internal class StoredFileConfig: IEntityTypeConfiguration<OI.Data.Model.Jobs.StoredFile>,IReportingConfiguration
{
    public void Configure(EntityTypeBuilder<OI.Data.Model.Jobs.StoredFile> builder)
    {
        builder.ToTable("Files");

        builder.HasKey(f => f.Id);
        builder.Property(o => o.Id)
            .HasColumnName("Id");
        builder.Property(f => f.FileName)
            .IsRequired()
            .HasMaxLength(260)
            .HasColumnName("FileName");
        builder.Property(f => f.FileContents)
            .IsRequired()
            .HasColumnName("FileContents");

    }
}