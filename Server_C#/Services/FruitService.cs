using MongoDB_Test2.Data;
using MongoDB_Test2.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;

namespace MongoDB_Test2.Services;

public class FruitService 
{
    private readonly FruitContext context;

    public FruitService(FruitContext context) 
    {
        this.context = context;
    }

    public Task<List<Fruit>> GetAll()
    {
        return Task.FromResult(context.Fruits
            .AsNoTracking()
            .ToList());
    }

    public Task<Fruit> GetFruitById(ObjectId objectId)
    {
        return Task.FromResult(context.Fruits
            .SingleOrDefault(f => f._id == objectId));
    }

    public Task<bool> RemoveFruit(ObjectId objectId)
    {
        Fruit fruit = GetFruitById(objectId).Result;

        if (fruit == null)
        {
            return Task.FromResult(false);
        }

        context.Fruits.Remove(fruit);
        context.SaveChanges();

        return Task.FromResult(true);
    }

    public Task<bool> UpdateFruit(ObjectId objectId, Fruit updatedFruit)
    {
        Fruit currentFruit = GetFruitById(objectId).Result;

        if (currentFruit == null)
        {
            return Task.FromResult(false);
        }

        currentFruit.header = updatedFruit.header;
        currentFruit.description = updatedFruit.description;
        currentFruit.image = updatedFruit.image;
        context.SaveChanges();

        return Task.FromResult(true);
    }
    
    public Task<Fruit> CreateFruit(Fruit fruit)
    {
        context.Add(fruit);
        context.SaveChanges();
        return Task.FromResult(fruit);
    }
}