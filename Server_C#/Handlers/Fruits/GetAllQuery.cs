using MediatR;
using MongoDB_Test2.Models;
using MongoDB_Test2.Services;

namespace MongoDB_Test2.Handlers.Fruits
{
    public class GetAllQuery : IRequest<GetAllQueryResponse>
    {

    }

    public class GetAllQueryHandler : IRequestHandler<GetAllQuery, GetAllQueryResponse>
    {
        private readonly FruitService fruitService; 

        public GetAllQueryHandler(FruitService fruitService)
        {
            this.fruitService = fruitService;
        }

        public async Task<GetAllQueryResponse> Handle(GetAllQuery request, CancellationToken cancellationToken)
        {
            var response = new GetAllQueryResponse();

            try
            {
                response.Fruits = await fruitService.GetAll();
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

    public class GetAllQueryResponse
    {
        public List<Fruit>? Fruits { get; set; }
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
