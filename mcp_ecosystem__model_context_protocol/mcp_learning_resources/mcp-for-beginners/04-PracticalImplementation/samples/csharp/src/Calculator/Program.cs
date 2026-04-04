using Calculator.Tools;

var builder = WebApplication.CreateBuilder(args);       
builder.Logging.AddConsole(consoleLogOptions =>
{
    // Configure all logs to go to stderr
    consoleLogOptions.LogToStandardErrorThreshold = LogLevel.Trace;
});

builder.Services
	   .AddMcpServer()
	   .WithHttpTransport(o => o.Stateless = true)
	   .WithTools<CalculatorTool>();

builder.AddServiceDefaults();

var app = builder.Build();

app.MapDefaultEndpoints();

app.MapMcp("/mcp");

app.Run();