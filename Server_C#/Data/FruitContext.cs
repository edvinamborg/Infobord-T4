using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;
using MongoDB_Test2.Models;


namespace MongoDB_Test2.Data;

public class FruitContext : DbContext
{
    public DbSet<Fruit> Fruits { get; init; }

    public static FruitContext Create(IMongoDatabase database) => 
            new(new DbContextOptionsBuilder<FruitContext>()
            .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
            .Options);

    public FruitContext(DbContextOptions<FruitContext> options)
        :base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Fruit>().ToCollection("posts");
    }
}