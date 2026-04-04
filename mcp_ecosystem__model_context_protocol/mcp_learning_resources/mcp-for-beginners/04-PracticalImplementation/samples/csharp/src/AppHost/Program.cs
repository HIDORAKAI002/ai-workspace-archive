var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Calculator>("calc-mcp")
	   .WithExternalHttpEndpoints();

builder.Build().Run();
