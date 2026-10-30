using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OI.Data.Configuration.ConfigurationTags;
using OI.Data.Model.Jobs;

namespace OI.Data.Configuration.Jobs;

internal class JobResultConfig : IEntityTypeConfiguration<JobResult>,IReportingConfiguration
{
    public void Configure(EntityTypeBuilder<JobResult> builder)
    {
        // Set table name
        builder.ToTable("JobResults");

        builder.HasKey(o => o.Id);
        builder.Property(o => o.Id)
            .HasColumnName("Id");
        builder.Property(o => o.Name)
            .HasColumnName("Name")
            .HasMaxLength(300);
        builder.Property(o => o.Created)
            .HasColumnName("Created")
            .ValueGeneratedOnAdd()
            .HasDefaultValueSql("GETUTCDATE()")
            .IsRequired();
        builder.Property(o => o.CreatedBy)
            .HasColumnName("CreatedBy")
            .IsRequired();

        builder.HasOne(o => o.Result)
            .WithOne()
            .HasForeignKey<JobResult>(o => o.ResultId)
            .OnDelete(DeleteBehavior.Cascade); 
    }
}