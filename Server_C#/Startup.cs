using MongoDB_Test2.Data;
using MongoDB_Test2.Controller;
using MongoDB_Test2.Services;
using MongoDB.Driver;
using System.Reflection;

namespace MongoDB_Test2;
public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {      
        string? connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
        //Please do not change the connection string to a static string, keep it as an environment variable. This is for security reasons.
        //If you need help with adding an environment variable, see 'Server_C#/README.md'. If you need the connection string, contact a group member with access to it.
        
        services.AddSingleton<IMongoClient>(new MongoClient(connectionString));
        services.AddScoped<FruitContext>(provider => FruitContext.Create(provider.GetRequiredService<IMongoClient>().GetDatabase("test")));
        services.AddScoped<FruitController>();
        services.AddScoped<FruitService>();
        services.AddControllers();
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
                builder => builder
                    .WithOrigins("http://localhost:5500", "http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseCors("CorsPolicy");

        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
