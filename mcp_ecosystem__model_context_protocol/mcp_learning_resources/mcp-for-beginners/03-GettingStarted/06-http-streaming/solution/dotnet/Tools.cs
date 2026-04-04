using System.ComponentModel;
using ModelContextProtocol.Server;

namespace server;

[McpServerToolType]
public sealed class Tools
{
    [McpServerTool, Description("Add two numbers together.")]
    public async Task<string> AddNumbers(
        [Description("The first number")] int a,
        [Description("The second number")] int b)
    {
        return await Task.FromResult((a + b).ToString());
    }

}