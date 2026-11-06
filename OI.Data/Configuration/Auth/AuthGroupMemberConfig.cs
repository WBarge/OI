using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OI.Data.Configuration.ConfigurationTags;
using OI.Data.Model.Auth;

namespace OI.Data.Configuration.Auth;

internal class AuthGroupMemberConfig : IEntityTypeConfiguration<AuthGroupMember>, IAuthConfiguration
{
    public void Configure(EntityTypeBuilder<AuthGroupMember> builder)
    {
        builder.ToTable("AuthUserGroups");
        builder.HasKey(m => new { m.UserId, m.GroupId });
        builder.Property(m => m.UserId).IsRequired().HasMaxLength(450);   // matches the Identity key size
        builder.Property(m => m.GroupId).IsRequired().HasMaxLength(36);
        builder.HasIndex(m => m.GroupId);

        builder.HasOne<ApplicationUser>()
            .WithMany()
            .HasForeignKey(m => m.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<AuthGroup>()
            .WithMany()
            .HasForeignKey(m => m.GroupId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
