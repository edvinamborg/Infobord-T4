using Microsoft.AspNetCore.Mvc;
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

    public ActionResult<IEnumerable<Fruit>> GetAll()
    {
        return context.Fruits
            .AsNoTracking()
            .ToList();
    }

    public void RemoveFruit(Fruit fruit)
    {    
        context.Fruits.Remove(fruit);
        context.SaveChanges();
    }
    public void UpdateFruit(Fruit currentFruit, Fruit updatedFruit)
    {
        currentFruit.name = updatedFruit.name;
        currentFruit.description = updatedFruit.description;
        currentFruit.image_string = updatedFruit.image_string;
        context.SaveChanges();
    }
    public Fruit GetFruitById(ObjectId id)
    {
        return context.Fruits
            .SingleOrDefault(f => f._id == id);
    }

    public Fruit CreateFruit(Fruit fruit)
    {
        context.Add(fruit);
        context.SaveChanges();
        return fruit;
    }
}