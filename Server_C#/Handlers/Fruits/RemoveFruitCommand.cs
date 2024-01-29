using MediatR;
using MongoDB.Bson;
using MongoDB_Test2.Services;

namespace MongoDB_Test2.Handlers.Fruits
{
    public class RemoveFruitCommand : IRequest<RemoveFruitCommandResponse>
    {
        public ObjectId ObjectId { get; set; }
    }

    public class RemoveFruitCommandHandler : IRequestHandler<RemoveFruitCommand, RemoveFruitCommandResponse>
    {
        private readonly FruitService fruitService;

        public RemoveFruitCommandHandler(FruitService fruitService)
        {
            this.fruitService = fruitService;
        }

        public async Task<RemoveFruitCommandResponse> Handle(RemoveFruitCommand request, CancellationToken cancellationToken)
        {
            var response = new RemoveFruitCommandResponse();

            try
            {
                bool removedFruitSuccessfully = await fruitService.RemoveFruit(request.ObjectId);
                response.Success = removedFruitSuccessfully;
            }
            catch (Exception ex)
            {
                response.ErrorMessage = ex.Message;
                response.Success = false;
            }

            return response;
        }
    }

    public class RemoveFruitCommandResponse
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
    }
}
