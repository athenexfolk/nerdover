using dotnet_nerdover.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dotnet_nerdover.Data.Configs;

public class CategoryConfig : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Slug)
               .IsRequired()
               .HasMaxLength(255);

        builder.Property(c => c.Name)
               .IsRequired()
               .HasMaxLength(255);

        builder.HasIndex(c => c.Slug)
               .IsUnique();
    }
}