using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using dotnet_nerdover.Data.Entities;

namespace dotnet_nerdover.Data.Configs;

public class LessonConfig : IEntityTypeConfiguration<Lesson>
{
    public void Configure(EntityTypeBuilder<Lesson> builder)
    {
        builder.HasKey(l => l.Id);

        builder.Property(l => l.Slug)
               .IsRequired()
               .HasMaxLength(255);

        builder.Property(l => l.Title)
               .IsRequired()
               .HasMaxLength(255);

        builder.Property(l => l.CoverUrl)
               .HasMaxLength(500);

        builder.Property(l => l.ContentUrl)
               .HasMaxLength(500);

        builder.HasIndex(l => l.Slug)
               .IsUnique();
    }
}
