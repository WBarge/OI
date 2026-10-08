using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OI.Data.Model;

namespace OI.Data.Configuration;

internal class StateConfig : IEntityTypeConfiguration<State>
{
    public void Configure(EntityTypeBuilder<State> builder)
    {
        // Set table name
        builder.ToTable("States");
        // Configure primary key
        builder.HasKey(s => s.Id);
        // Configure properties
        builder.Property(s => s.Id)
            .HasColumnName("Id");
        builder.Property(s => s.Name)
            .HasColumnName("Name")
            .IsRequired()
            .HasMaxLength(100);
        builder.Property(s => s.Code)
            .HasColumnName("Code")
            .IsRequired()
            .HasMaxLength(2);
        // Seed data for all 50 states
        builder.HasData(
            new State { Id = Guid.NewGuid(), Name = "Alabama", Code = "AL" },
            new State { Id = Guid.NewGuid(), Name = "Alaska", Code = "AK" },
            new State { Id = Guid.NewGuid(), Name = "Arizona", Code = "AZ" },
            new State { Id = Guid.NewGuid(), Name = "Arkansas", Code = "AR" },
            new State { Id = Guid.NewGuid(), Name = "California", Code = "CA" },
            new State { Id = Guid.NewGuid(), Name = "Colorado", Code = "CO" },
            new State { Id = Guid.NewGuid(), Name = "Connecticut", Code = "CT" },
            new State { Id = Guid.NewGuid(), Name = "Delaware", Code = "DE" },
            new State { Id = Guid.NewGuid(), Name = "Florida", Code = "FL" },
            new State { Id = Guid.NewGuid(), Name = "Georgia", Code = "GA" },
            new State { Id = Guid.NewGuid(), Name = "Hawaii", Code = "HI" },
            new State { Id = Guid.NewGuid(), Name = "Idaho", Code = "ID" },
            new State { Id = Guid.NewGuid(), Name = "Illinois", Code = "IL" },
            new State { Id = Guid.NewGuid(), Name = "Indiana", Code = "IN" },
            new State { Id = Guid.NewGuid(), Name = "Iowa", Code = "IA" },
            new State { Id = Guid.NewGuid(), Name = "Kansas", Code = "KS" },
            new State { Id = Guid.NewGuid(), Name = "Kentucky", Code = "KY" },
            new State { Id = Guid.NewGuid(), Name = "Louisiana", Code = "LA" },
            new State { Id = Guid.NewGuid(), Name = "Maine", Code = "ME" },
            new State { Id = Guid.NewGuid(), Name = "Maryland", Code = "MD" },
            new State { Id = Guid.NewGuid(), Name = "Massachusetts", Code = "MA" },
            new State { Id = Guid.NewGuid(), Name = "Michigan", Code = "MI" },
            new State { Id = Guid.NewGuid(), Name = "Minnesota", Code = "MN" },
            new State { Id = Guid.NewGuid(), Name = "Mississippi", Code = "MS" },
            new State { Id = Guid.NewGuid(), Name = "Missouri", Code = "MO" },
            new State { Id = Guid.NewGuid(), Name = "Montana", Code = "MT" },
            new State { Id = Guid.NewGuid(), Name = "Nebraska", Code = "NE" },
            new State { Id = Guid.NewGuid(), Name = "Nevada", Code = "NV" },
            new State { Id = Guid.NewGuid(), Name = "New Hampshire", Code = "NH" },
            new State { Id = Guid.NewGuid(), Name = "New Jersey", Code = "NJ" },
            new State { Id = Guid.NewGuid(), Name = "New Mexico", Code = "NM" },
            new State { Id = Guid.NewGuid(), Name = "New York", Code = "NY" },
            new State { Id = Guid.NewGuid(), Name = "North Carolina", Code = "NC" },
            new State { Id = Guid.NewGuid(), Name = "North Dakota", Code = "ND" },
            new State { Id = Guid.NewGuid(), Name = "Ohio", Code = "OH" },
            new State { Id = Guid.NewGuid(), Name = "Oklahoma", Code = "OK" },
            new State { Id = Guid.NewGuid(), Name = "Oregon", Code = "OR" },
            new State { Id = Guid.NewGuid(), Name = "Pennsylvania", Code = "PA" },
            new State { Id = Guid.NewGuid(), Name = "Rhode Island", Code = "RI" },
            new State { Id = Guid.NewGuid(), Name = "South Carolina", Code = "SC" },
            new State { Id = Guid.NewGuid(), Name = "South Dakota", Code = "SD" },
            new State { Id = Guid.NewGuid(), Name = "Tennessee", Code = "TN" },
            new State { Id = Guid.NewGuid(), Name = "Texas", Code = "TX" },
            new State { Id = Guid.NewGuid(), Name = "Utah", Code = "UT" },
            new State { Id = Guid.NewGuid(), Name = "Vermont", Code = "VT" },
            new State { Id = Guid.NewGuid(), Name = "Virginia", Code = "VA" },
            new State { Id = Guid.NewGuid(), Name = "Washington", Code = "WA" },
            new State { Id = Guid.NewGuid(), Name = "West Virginia", Code = "WV" },
            new State { Id = Guid.NewGuid(), Name = "Wisconsin", Code = "WI" },
            new State { Id = Guid.NewGuid(), Name = "Wyoming", Code = "WY" }
        );
    }
}
