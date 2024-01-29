using Microsoft.AspNetCore.Mvc;
using MongoDB_Test2.Models;
using MongoDB_Test2.Services;
using MongoDB.Bson;
using MediatR;
using MongoDB_Test2.Handlers.Fruits;

namespace MongoDB_Test2.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FruitController : ControllerBase
    {
        private readonly IMediator mediator;
        public FruitController(IMediator mediator) 
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Fruit>>> GetAll()
        {
            try 
            {
                var query = new GetAllQuery();

                GetAllQueryResponse getAllFruits = await mediator.Send(query);

                return getAllFruits.Success == true
                    ? Ok(getAllFruits.Fruits)
                    : NotFound($"No fruits were found. {getAllFruits.ErrorMessage}");
            }
            catch (Exception ex)
            {         
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Fruit>> GetFruitById(ObjectId id)
        {
            try 
            {

                var command = new GetFruitByIdCommand
                {
                    ObjectId = id
                };

                GetFruitByIdCommandResponse fruit = await mediator.Send(command);

                return fruit.Success == true
                    ? Ok(fruit.Fruit)
                    : NotFound($"Fruit not found. {fruit.ErrorMessage}");
            }
            catch (Exception ex) 
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveFruit(ObjectId objectId)
        {
            try 
            {
                var command = new RemoveFruitCommand
                {
                    ObjectId = objectId
                };

                RemoveFruitCommandResponse removedFruit = await mediator.Send(command);

                return removedFruit.Success == true
                    ? Ok("Successfully removed fruit.")
                    : NotFound($"Fruit was not found. {removedFruit.ErrorMessage}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateFruit(ObjectId objectId, [FromBody] Fruit updatedFruit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try 
            {
                var command = new UpdateFruitCommand
                {
                    ObjectId = objectId,
                    UpdatedFruit = updatedFruit
                };

                UpdateFruitCommandResponse newFruit = await mediator.Send(command);

                return newFruit.Success == true
                    ? Ok("Fruit updated successfully.")
                    : NotFound($"Fruit was not found, no fruit was updated. {newFruit.ErrorMessage}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<ActionResult> CreateFruit([FromBody] Fruit fruit)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }
    
            try
            {
                var command = new CreateFruitCommand
                {
                    CreateFruit = fruit
                };

                CreateFruitCommandResponse createdFruit = await mediator.Send(command);

                return createdFruit.Success == true
                    ? CreatedAtAction(nameof(GetFruitById), new { id = createdFruit.CreatedFruit._id }, createdFruit.CreatedFruit)
                    : StatusCode(500, $"Creation of fruit was unsuccessful. {createdFruit.ErrorMessage}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}