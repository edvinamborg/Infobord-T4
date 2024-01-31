using MediatR;
using MongoDB.Bson;
using MongoDB_Test2.Models;
using MongoDB_Test2.Services;

namespace MongoDB_Test2.Handlers.Fruits
{
    public class UpdateFruitCommand : IRequest<UpdateFruitCommandResponse>
    {
        public required ObjectId ObjectId { get; set; }
        public required Fruit UpdatedFruit { get; set; }
    }

    public class UpdateFruitCommandHandler : IRequestHandler<UpdateFruitCommand, UpdateFruitCommandResponse>
    {
        private readonly FruitService fruitService;

        public UpdateFruitCommandHandler(FruitService fruitService)
        {
            this.fruitService = fruitService;
        }

        public async Task<UpdateFruitCommandResponse> Handle(UpdateFruitCommand request, CancellationToken cancellationToken)
        {
            var response = new UpdateFruitCommandResponse();

            try
            {
                bool updatedFruitSuccessfully = await fruitService.UpdateFruit(request.ObjectId, request.UpdatedFruit);
                response.Success = updatedFruitSuccessfully;
            }
            catch (Exception ex)
            {
                response.ErrorMessage = ex.Message;
                response.Success = false;
            }

            return response;
        }
    }

    public class UpdateFruitCommandResponse
    {
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
