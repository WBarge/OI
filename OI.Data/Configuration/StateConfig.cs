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
            new State { Id = Guid.Parse("a1b2c3d4-e5f6-7890-abcd-ef1234567801"), Name = "Alabama", Code = "AL" },
            new State { Id = Guid.Parse("b2c3d4e5-f6a7-8901-bcde-f12345678902"), Name = "Alaska", Code = "AK" },
            new State { Id = Guid.Parse("c3d4e5f6-a7b8-9012-cdef-123456789003"), Name = "Arizona", Code = "AZ" },
            new State { Id = Guid.Parse("d4e5f6a7-b8c9-0123-defa-234567890104"), Name = "Arkansas", Code = "AR" },
            new State { Id = Guid.Parse("e5f6a7b8-c9d0-1234-efab-345678901205"), Name = "California", Code = "CA" },
            new State { Id = Guid.Parse("f6a7b8c9-d0e1-2345-fabc-456789012306"), Name = "Colorado", Code = "CO" },
            new State { Id = Guid.Parse("a7b8c9d0-e1f2-3456-abcd-567890123407"), Name = "Connecticut", Code = "CT" },
            new State { Id = Guid.Parse("b8c9d0e1-f2a3-4567-bcde-678901234508"), Name = "Delaware", Code = "DE" },
            new State { Id = Guid.Parse("c9d0e1f2-a3b4-5678-cdef-789012345609"), Name = "Florida", Code = "FL" },
            new State { Id = Guid.Parse("d0e1f2a3-b4c5-6789-defa-89012345670a"), Name = "Georgia", Code = "GA" },
            new State { Id = Guid.Parse("e1f2a3b4-c5d6-789a-efab-9012345678b0"), Name = "Hawaii", Code = "HI" },
            new State { Id = Guid.Parse("f2a3b4c5-d6e7-89ab-fabc-0123456789c1"), Name = "Idaho", Code = "ID" },
            new State { Id = Guid.Parse("a3b4c5d6-e7f8-9abc-abcd-123456789d02"), Name = "Illinois", Code = "IL" },
            new State { Id = Guid.Parse("b4c5d6e7-f8a9-abcd-bcde-23456789e013"), Name = "Indiana", Code = "IN" },
            new State { Id = Guid.Parse("c5d6e7f8-a9b0-bcde-cdef-3456789f0124"), Name = "Iowa", Code = "IA" },
            new State { Id = Guid.Parse("d6e7f8a9-b0c1-cdef-defa-456789001235"), Name = "Kansas", Code = "KS" },
            new State { Id = Guid.Parse("e7f8a9b0-c1d2-def0-efab-567890112346"), Name = "Kentucky", Code = "KY" },
            new State { Id = Guid.Parse("f8a9b0c1-d2e3-ef01-fabc-678901223457"), Name = "Louisiana", Code = "LA" },
            new State { Id = Guid.Parse("a9b0c1d2-e3f4-f012-abcd-789012334568"), Name = "Maine", Code = "ME" },
            new State { Id = Guid.Parse("b0c1d2e3-f4a5-0123-bcde-890123445679"), Name = "Maryland", Code = "MD" },
            new State { Id = Guid.Parse("c1d2e3f4-a5b6-1234-cdef-90123455678a"), Name = "Massachusetts", Code = "MA" },
            new State { Id = Guid.Parse("d2e3f4a5-b6c7-2345-defa-0123456678b9"), Name = "Michigan", Code = "MI" },
            new State { Id = Guid.Parse("e3f4a5b6-c7d8-3456-efab-123456789c0d"), Name = "Minnesota", Code = "MN" },
            new State { Id = Guid.Parse("f4a5b6c7-d8e9-4567-fabc-23456789d01e"), Name = "Mississippi", Code = "MS" },
            new State { Id = Guid.Parse("a5b6c7d8-e9f0-5678-abcd-3456789e012f"), Name = "Missouri", Code = "MO" },
            new State { Id = Guid.Parse("b6c7d8e9-f0a1-6789-bcde-456789f01230"), Name = "Montana", Code = "MT" },
            new State { Id = Guid.Parse("c7d8e9f0-a1b2-789a-cdef-5678900123a1"), Name = "Nebraska", Code = "NE" },
            new State { Id = Guid.Parse("d8e9f0a1-b2c3-89ab-defa-678901234b52"), Name = "Nevada", Code = "NV" },
            new State { Id = Guid.Parse("e9f0a1b2-c3d4-9abc-efab-789012345c63"), Name = "New Hampshire", Code = "NH" },
            new State { Id = Guid.Parse("f0a1b2c3-d4e5-abcd-fabc-890123456d74"), Name = "New Jersey", Code = "NJ" },
            new State { Id = Guid.Parse("a1b2c3d4-e5f6-bcde-abcd-901234567e85"), Name = "New Mexico", Code = "NM" },
            new State { Id = Guid.Parse("b2c3d4e5-f6a7-cdef-bcde-012345678f96"), Name = "New York", Code = "NY" },
            new State { Id = Guid.Parse("c3d4e5f6-a7b8-def0-cdef-1234567890a7"), Name = "North Carolina", Code = "NC" },
            new State { Id = Guid.Parse("d4e5f6a7-b8c9-ef01-defa-23456789b1b8"), Name = "North Dakota", Code = "ND" },
            new State { Id = Guid.Parse("e5f6a7b8-c9d0-f012-efab-3456789c2c09"), Name = "Ohio", Code = "OH" },
            new State { Id = Guid.Parse("f6a7b8c9-d0e1-0123-fabc-456789d3d11a"), Name = "Oklahoma", Code = "OK" },
            new State { Id = Guid.Parse("a7b8c9d0-e1f2-1234-abcd-56789e4e422b"), Name = "Oregon", Code = "OR" },
            new State { Id = Guid.Parse("b8c9d0e1-f2a3-2345-bcde-6789f5f5533c"), Name = "Pennsylvania", Code = "PA" },
            new State { Id = Guid.Parse("c9d0e1f2-a3b4-3456-cdef-789006064d4d"), Name = "Rhode Island", Code = "RI" },
            new State { Id = Guid.Parse("d0e1f2a3-b4c5-4567-defa-890117175e5e"), Name = "South Carolina", Code = "SC" },
            new State { Id = Guid.Parse("e1f2a3b4-c5d6-5678-efab-901228286f6f"), Name = "South Dakota", Code = "SD" },
            new State { Id = Guid.Parse("f2a3b4c5-d6e7-6789-fabc-012339397070"), Name = "Tennessee", Code = "TN" },
            new State { Id = Guid.Parse("a3b4c5d6-e7f8-789a-abcd-1234404a8181"), Name = "Texas", Code = "TX" },
            new State { Id = Guid.Parse("b4c5d6e7-f8a9-89ab-bcde-2345515b9292"), Name = "Utah", Code = "UT" },
            new State { Id = Guid.Parse("c5d6e7f8-a9b0-9abc-cdef-3456626ca3a3"), Name = "Vermont", Code = "VT" },
            new State { Id = Guid.Parse("d6e7f8a9-b0c1-abcd-defa-456773b4b4b4"), Name = "Virginia", Code = "VA" },
            new State { Id = Guid.Parse("e7f8a9b0-c1d2-bcde-efab-5678840c5c5c"), Name = "Washington", Code = "WA" },
            new State { Id = Guid.Parse("f8a9b0c1-d2e3-cdef-fabc-678995d6d6d6"), Name = "West Virginia", Code = "WV" },
            new State { Id = Guid.Parse("a9b0c1d2-e3f4-def0-abcd-7890a6e7e7e7"), Name = "Wisconsin", Code = "WI" },
            new State { Id = Guid.Parse("b0c1d2e3-f4a5-ef01-bcde-8901b7f8f8f8"), Name = "Wyoming", Code = "WY" }
        );
    }
}
