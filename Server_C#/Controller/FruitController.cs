using Microsoft.AspNetCore.Mvc;
using MongoDB_Test2.Models;
using MongoDB_Test2.Services;
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
        public ActionResult<List<Fruit>> GetAll()
        {
            try 
            {
                List<Fruit> fruits = service.GetAll();

                return fruits == null ? NotFound("No fruits were found.") : Ok(fruits);
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
                Fruit fruit = service.GetFruitById(id);

                return fruit == null ? NotFound("Fruit not found.") : Ok(fruit);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public ActionResult RemoveFruit(ObjectId id)
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
        public ActionResult UpdateFruit(ObjectId id, [FromBody] Fruit updatedFruit)
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
        public ActionResult CreateFruit([FromBody] Fruit fruit) 
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