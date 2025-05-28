using dotnet_nerdover.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace dotnet_nerdover.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Category> Categories { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
}