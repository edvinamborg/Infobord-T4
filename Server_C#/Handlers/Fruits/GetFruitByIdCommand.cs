using MediatR;
using MongoDB.Bson;
using MongoDB_Test2.Models;
using MongoDB_Test2.Services;

namespace MongoDB_Test2.Handlers.Fruits
{
    public class GetFruitByIdCommand : IRequest<GetFruitByIdCommandResponse>
    {
        public ObjectId ObjectId { get; set; }
    }

    public class GetFruitByIdCommandHandler : IRequestHandler<GetFruitByIdCommand, GetFruitByIdCommandResponse>
    {
        private readonly FruitService fruitService;

        public GetFruitByIdCommandHandler(FruitService fruitService)
        {
            this.fruitService = fruitService;
        }

        public async Task<GetFruitByIdCommandResponse> Handle(GetFruitByIdCommand request, CancellationToken cancellationToken)
        {
            var response = new GetFruitByIdCommandResponse();

            try
            {
                response.Fruit = await fruitService.GetFruitById(request.ObjectId);
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

    public class GetFruitByIdCommandResponse
    {
        public Fruit Fruit { get; set; }
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
    }
}
