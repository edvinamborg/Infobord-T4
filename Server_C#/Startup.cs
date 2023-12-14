using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB_Test2.Data;
using MongoDB_Test2.Controller;
using MongoDB_Test2.Services;
using MongoDB.Driver;

namespace z;
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
        services.AddSingleton<IMongoClient>(new MongoClient(connectionString));
        services.AddScoped<FruitContext>(provider => FruitContext.Create(provider.GetRequiredService<IMongoClient>().GetDatabase("info_bord_test")));
        services.AddScoped<FruitController>();
        services.AddScoped<FruitService>();
        services.AddControllers();
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
