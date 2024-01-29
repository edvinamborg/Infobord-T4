using System.Net;
using System.Net.Sockets;

namespace MongoDB_Test2
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();

                    var host = Dns.GetHostEntry(Dns.GetHostName());
                    string ipAddress = "";

                    foreach (var ip in host.AddressList)
                    {
                        if (ip.AddressFamily == AddressFamily.InterNetwork)
                        {
                            ipAddress = ip.ToString();
                        }
                    }

                    webBuilder.UseUrls($"http://{ipAddress}");
                });
    }
}