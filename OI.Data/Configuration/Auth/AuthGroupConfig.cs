using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OI.Data.Configuration.ConfigurationTags;
using OI.Data.Model.Auth;

namespace OI.Data.Configuration.Auth;

internal class AuthGroupConfig : IEntityTypeConfiguration<AuthGroup>, IAuthConfiguration
{
    public void Configure(EntityTypeBuilder<AuthGroup> builder)
    {
        builder.ToTable("AuthGroups");
        builder.HasKey(g => g.Id);
        builder.Property(g => g.Id).HasMaxLength(36);
        builder.Property(g => g.Name).IsRequired().HasMaxLength(64);
        builder.Property(g => g.Description).HasMaxLength(200);
        builder.HasIndex(g => g.Name).IsUnique();
    }
}
