using System.Net.NetworkInformation;
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


                    string ipAddress = "";

                    NetworkInterface[] networkInterfaces = NetworkInterface.GetAllNetworkInterfaces();

                    foreach (NetworkInterface networkInterface in networkInterfaces)
                    {
                        if (networkInterface.NetworkInterfaceType == NetworkInterfaceType.Wireless80211 &&
                            networkInterface.OperationalStatus == OperationalStatus.Up)
                        {
                            IPInterfaceProperties ipProperties = networkInterface.GetIPProperties();

                            foreach (UnicastIPAddressInformation ipAddressInfo in ipProperties.UnicastAddresses)
                            {
                                if (ipAddressInfo.Address.AddressFamily == AddressFamily.InterNetwork)
                                {
                                    ipAddress = ipAddressInfo.Address.ToString();
                                }
                            }
                        }

                        webBuilder.UseUrls($"http://{ipAddress}");
                    }
                });
    }
}