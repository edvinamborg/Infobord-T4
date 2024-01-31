using MediatR;
using MongoDB_Test2.Models;
using MongoDB_Test2.Services;

namespace MongoDB_Test2.Handlers.Fruits
{
    public class CreateFruitCommand : IRequest<CreateFruitCommandResponse>
    {
        public required Fruit CreateFruit { get; set; }
    }

    public class CreateFruitCommandHandler : IRequestHandler<CreateFruitCommand, CreateFruitCommandResponse>
    {
        private readonly FruitService fruitService;

        public CreateFruitCommandHandler(FruitService fruitService)
        {
            this.fruitService = fruitService;
        }

        public async Task<CreateFruitCommandResponse> Handle(CreateFruitCommand request, CancellationToken cancellationToken)
        {
            var response = new CreateFruitCommandResponse();

            try
            {
                response.CreatedFruit = await fruitService.CreateFruit(request.CreateFruit);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.ErrorMessage = ex.Message;
                response.Success = false;
            }

            return response;
        }
    }

    public class CreateFruitCommandResponse
    {
        public Fruit? CreatedFruit { get; set; }
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
