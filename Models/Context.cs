using System.Text.Json;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Models;

public class AppDbContext : IdentityDbContext<User>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Poll>()
            .Property(p => p.Options)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null)
            );

        modelBuilder.Entity<Poll>()
            .HasOne(p => p.Creator)
            .WithMany(u => u.CreatedPolls)
            .HasForeignKey(p => p.CreatorId);

        modelBuilder.Entity<Poll>()
            .HasMany(p => p.Votes)
            .WithOne(v => v.Poll)
            .HasForeignKey(p => p.PollId);

        modelBuilder.Entity<Vote>()
            .HasIndex(v => new { v.PollId, v.UserId })
            .IsUnique();

        modelBuilder.Entity<Poll>()
            .HasMany(p => p.Votes)
            .WithOne(v => v.Poll)
            .HasForeignKey(v => v.PollId)
            .OnDelete(DeleteBehavior.Restrict);

        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Poll> Poll { get; set; }
    public DbSet<Vote> Vote { get; set; }
}