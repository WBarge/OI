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

        // Both relationships name their navigations on BOTH sides. If a navigation exists on a type but is left
        // out of the configuration, EF conventions build a second, shadow relationship (UserId1/GroupId1) next to it.
        builder.HasOne(m => m.User)
            .WithMany(u => u.GroupMemberships)
            .HasForeignKey(m => m.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(m => m.Group)
            .WithMany(g => g.Members)
            .HasForeignKey(m => m.GroupId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
