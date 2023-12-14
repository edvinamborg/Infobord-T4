using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using MongoDB.Driver;
using MongoDB_Test2.Data;
using MongoDB_Test2.Models;
using MongoDB_Test2.Services;
using System.Runtime.Versioning;
using MongoDB.Bson;

namespace MongoDB_Test2.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FruitController : ControllerBase
    {
        private readonly FruitService service;
        public FruitController(FruitService service) 
        {
            this.service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Fruit>> GetAll()
        {
            try 
            {
                return service.GetAll();
            }
            catch (Exception ex)
            {         
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public ActionResult<Fruit> GetFruitById(ObjectId id)
        {
            try 
            {
                return service.GetFruitById(id);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public IActionResult RemoveFruit(ObjectId id)
        {
            try 
            {
                var fruit = service.GetFruitById(id);

                if (fruit is null)
                {
                    return NotFound();
                }

                service.RemoveFruit(fruit);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public IActionResult UpdateFruit(ObjectId id, [FromBody] Fruit updatedFruit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try 
            {
                var currentFruit = service.GetFruitById(id);

                if (currentFruit is null)
                {
                    return NotFound();
                }

                service.UpdateFruit(currentFruit, updatedFruit);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        public IActionResult CreateFruit([FromBody] Fruit fruit) 
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            var createdFruit = service.CreateFruit(fruit);
            return CreatedAtAction(nameof(GetFruitById), new { id = createdFruit._id }, createdFruit);
        }
    }
}