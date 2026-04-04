using server;

var builder = WebApplication.CreateBuilder(args);

builder.Services
       .AddMcpServer()
       .WithHttpTransport(o => o.Stateless = true)
       .WithTools<Tools>();

builder.Services.AddHttpClient();

var app = builder.Build();

app.MapMcp("/mcp");

app.Run();