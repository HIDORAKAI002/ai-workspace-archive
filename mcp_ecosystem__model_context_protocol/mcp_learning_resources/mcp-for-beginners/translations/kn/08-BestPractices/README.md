# MCP ಅಭಿವೃದ್ಧಿ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

[![MCP Development Best Practices](../../../translated_images/kn/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(ಈ ಪಾಠದ ವೀಡಿಯೋವನ್ನು ವೀಕ್ಷಿಸಲು ಮೇಲಿನ ಚಿತ್ರವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ)_

## ಅವಲೋಕನ

ಈ ಪಾಠವು ಉತ್ಪಾದನಾ ಪರಿಸರಗಳಲ್ಲಿ MCP ಸರ್ವರ್‌ಗಳು ಮತ್ತು ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸುವುದು, ಪರೀಕ್ಷಿಸುವುದು ಮತ್ತು ನಿಯೋಜಿಸುವುದು ಕುರಿತು ಪ್ರಗತಿಶೀಲ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳನ್ನು ಹೊಂದಿದೆ. MCP ಪರಿಸರಗಳು ಸಂಕೀರ್ಣತೆ ಮತ್ತು ಮಹತ್ವದಲ್ಲಿ ಬೆಳೆಯುತ್ತಲೇ ಇದ್ದಂತೆ, ಸ್ಥಿರತೆ, ನಿರ್ವಹಣಾತ್ಮಕತೆ ಮತ್ತು ಪರಸ್ಪರ ಓಪನತೆ ಖಚಿತಪಡಿಸಲು ಸ್ಥಾಪಿತ ಮಾದರಿಗಳನ್ನು ಅನುಸರಿಸುವುದು ಅಗತ್ಯ. ಈ ಪಾಠವು ನೈಜ MCP ಜಾರಿಗೆ ಕಾಣಿಸಿಕೊಂಡ ಉಪಯುಕ್ತ ಜ್ಞಾನವನ್ನು ಸಂಗ್ರಹಿಸಿ, ಪರಿಣಾಮಕಾರಿಯಾದ ಸಂಪನ್ಮೂಲಗಳು, ಪ್ರಾಂಪ್ಟ್‌ಗಳು ಮತ್ತು ಸಾಧನಗಳೊಂದಿಗೆ ದಿಟ್ಟ, ಪರಿಣಾಮಕಾರಿ ಸರ್ವರ್‌ಗಳನ್ನು ರಚಿಸಲು ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.

## ಕಲಿಕೆಯ ಉದ್ದೇಶಗಳು

ಈ ಪಾಠದ ಕೊನೆಗೆ, ನೀವು ಸಾಮರ್ಥ್ಯ ಹೊಂದಿರುತ್ತೀರಿ:

- MCP ಸರ್ವರ್ ಮತ್ತು ವೈಶಿಷ್ಟ್ಯ ವಿನ್ಯಾಸದಲ್ಲಿ ಕೈಗಾರಿಕಾ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳನ್ನು ಅನ್ವಯಿಸುವುದು
- MCP ಸರ್ವರ್‌ಗಳಿಗೆ ವ್ಯಾಪಕವಾದ ಪರೀಕ್ಷಾ ತಂತ್ರಗಳನ್ನು ರಚಿಸುವುದು
- ಸಂಕೀರ್ಣ MCP ಅನ್ವಯಿಕೆಗಳಿಗೆ ಪರಿಣಾಮಕಾರಿ, ಪುನಃಬಳಕೆಯಾದ ಕಾರ್ಯವાહી ಮಾದರಿಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸುವುದು
- MCP ಸರ್ವರ್‌ಗಳಲ್ಲಿ ಸರಿಯಾದ ದೋಷ ನಿರ್ವಹಣೆ, ಲಾಗಿಂಗ್ ಮತ್ತು ದೃಶ್ಯೀಕರಣವನ್ನು ಜಾರಿ ಮಾಡುವುದು
- ಕಾರ್ಯಕ್ಷಮತೆ, ಭದ್ರತೆ ಮತ್ತು ನಿರ್ವಹಣಾತ್ಮಕತೆಗಾಗಿ MCP ಜಾರಿಗೆ ಗರಿಷ್ಠಗೊಳಿಸುವುದು

## MCP ಮೂಲ ತತ್ವಗಳು

ನಿಖರ ಜಾರಿಗೆ ಮುನ್ನ, ಪರಿಣಾಮಕಾರಿ MCP ಅಭಿವೃದ್ಧಿಯನ್ನು ಮಾರ್ಗದರ್ಶನ ಮಾಡುವ ಮೂಲ ತತ್ವಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ಮಹತ್ವದ್ದಾಗಿದ್ದು:

1. **ಮೌಲ್ಯಮಾಪಕ ಸಂವಹನ**: MCP ಇದರ ಆಧಾರದಾಗಿ JSON-RPC 2.0 ಅನ್ನು ಬಳಸುತ್ತದೆ, ಇದರಿಂದ ಎಲ್ಲಾ ಜಾರಿಗೆ ಸಮಾನ ವಿನಂತಿಗಳು, ಪ್ರತಿಕ್ರಿಯೆಗಳು ಮತ್ತು ದೋಷ ನಿರ್ವಹಣೆಗೆ ಸದೃಢರೂಪ ನೀಡುತ್ತದೆ.

2. **ಬಳಕೆದಾರ ಕೇಂದ್ರಿತ ವಿನ್ಯಾಸ**: ನಿಮ್ಮ MCP ಜಾರಿಗೆ ಯಾವಾಗಲೂ ಬಳಕೆದಾರರ ಅನುಮತಿ, ನಿಯಂತ್ರಣ ಮತ್ತು ಪಾರದರ್ಶಕತೆಯನ್ನು ಮೊದಲು ಇಡಿ.

3. **ಭದ್ರತೆ ಮೊದಲನೇ ಸ್ಥಾನದಲ್ಲಿ**: ದೃಢ ಭದ್ರತಾ ಕ್ರಮಗಳನ್ನು ಜಾರಿ ಮಾಡಿರಿ, ಇದರಲ್ಲಿ ಪ್ರಮಾಣೀಕರಣ, ಅನುಮತಿ, ಮಾನ್ಯತೆ ಮತ್ತು ದರ ಮಿತಿ ಸೇರಿವೆ.

4. **ಮಾಡ್ಯುಲರ್ ವಾಸ್ತುಶಿಲ್ಪ**: ಪ್ರತಿ ಸಾಧನ ಮತ್ತು ಸಂಪನ್ಮೂಲಕ್ಕೆ ಸ್ಪಷ್ಟ, ಕೇಂದ್ರೀಕೃತ ಉದ್ದೇಶವಿರುವ ಮಾದ್ಯುಲರ್ ಪರಿಕಲ್ಪನೆಗೆ ಹೊಂದುವಂತೆ MCP ಸರ್ವರ್‌ಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಿ.

5. **ಸ್ಥಿತಿಸ್ಥಾಪಕ ಸಂಪರ್ಕಗಳು**: ಅನೇಕ ವಿನಂತಿಗಳಲ್ಲಿ ಸ್ಥಿತಿಯನ್ನು ಸ್ಥಾಪಿಸುವ MCP ಸಾಮರ್ಥ್ಯವನ್ನು ಉಪಯೋಗಿಸಿ, ಪರಿಣಾಮಕಾರಿಯಾದ ಮತ್ತು ಪೃ контекст-ಜಾಗೃತ ಸಂವಾದಗಳನ್ನು ಸಾಧ್ಯ ಮಾಡುವುದು.

## ಅಧಿಕೃತ MCP ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

ಕೆಳಗಿನ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು ಅಧಿಕೃತ ಮಾದಲ್ ಕಾಂಟೆಕ್ಸ್ಟ್ ಪ್ರೋಟೋಕಾಲ್ ಡಾಕ್ಯುಮೆಂಟೇಶನಿಂದ ಪಡೆಯಲಾಗಿದೆ:

### ಭದ್ರತೆ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

1. **ಬಳಕೆದಾರ ಅನುಮತಿ ಮತ್ತು ನಿಯಂತ್ರಣ**: ಡೇಟಾ ಪ್ರವೇಶಿಸಲು ಅಥವಾ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಮಾಡಿಕೊಳ್ಳಲು ಯಾವಾಗಲೂ ಸ್ಪಷ್ಟ ಬಳಕೆದಾರ ಅನುಮತಿಯನ್ನು ಕೇಳಿ. ಯಾವ ಡೇಟಾ ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ ಮತ್ತು ಯಾವ ಕ್ರಿಯಾ ಅನುಮತಿಗೊಂಡಿವೆ ಎಂಬುದರ ಮೇಲಿನ ನಿಯಂತ್ರಣವನ್ನು ನೀಡಿರಿ.

2. **ಡೇಟಾ ಗೌಪ್ಯತೆ**: ಸ್ಪಷ್ಟ ಅನುಮತಿಯೊಂದಿಗೆ ಮಾತ್ರ ಬಳಕೆದಾರ ಡೇಟಾವನ್ನು ಬಹಿರಂಗ ಮಾಡಿಕೊಂಡು, ಸೂಕ್ತ ಪ್ರವೇಶ ನಿಯಂತ್ರಣಗಳಿಂದ ಅದನ್ನು ರಕ್ಷಿಸಿ. ಅನಧಿಕೃತ ಡೇಟಾ ಪ್ರಸಾರವನ್ನು ತಡೆಹಿಡಿಯಿರಿ.

3. **ಸಾಧನ ಭದ್ರತೆ**: ಯಾವುದೇ ಸಾಧನವನ್ನು ಕರೆಯುವುದಕ್ಕೆ ಮುನ್ನ ಸ್ಪಷ್ಟ ಬಳಕೆದಾರ ಅನುಮತಿ ಬೇಕಾಗುತ್ತದೆ. ಬಳಕೆದಾರರು ಪ್ರತಿಯೊಂದು ಸಾಧನದ ಕಾರ್ಯವಿಧಾನವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತಾರೆ ಎಂಬುದು ಖಚಿತಪಡಿಸಿ ಮತ್ತು ದೃಢ ಭದ್ರತಾ ಗಡಿ ಹಾಕಿ.

4. **ಸಾಧನ ಅನುಮತಿ ನಿಯಂತ್ರಣ**: ಸೆಷನ್ ಸಮಯದಲ್ಲಿ ಯಾವ ಸಾಧನಗಳನ್ನು ಮಾದರಿ ಬಳಸಬಹುದು ಎಂದು ಸಂರಚಿಸಿ, ಸ್ಪಷ್ಟವಾಗಿ ಅನುಮತಿಸಿದ ಸಾಧನಗಳಿಗಷ್ಟೇ ಪ್ರವೇಶ ಇರಲಿ.

5. **ಪ್ರಮಾಣೀಕರಣ**: ಸಾಧನಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಅಥವಾ ಸಂವೇದನಶೀಲ ಕಾರ್ಯಾಚರಣೆಗಳಿಗೆ ಪ್ರವೇಶ ನೀಡುವ ಮೊದಲು ಸರಿಯಾದ ಪ್ರಮಾಣೀಕರಣವನ್ನು ನೀವೂ ಜಾರಿ ಮಾಡಬೇಕು, ಇದಕ್ಕಾಗಿ API ಕೀಗಳು, OAuth ಟೋಕನ್‌ಗಳು ಅಥವಾ ಇತರ ಸುರಕ್ಷಿತ ಪ್ರಮಾಣೀಕರಣ ವಿಧಾನಗಳನ್ನು ಉಪಯೋಗಿಸಿ.

6. **ಪರಿಮಿತಿ ಮಾನ್ಯತೆ**: ತಪ್ಪು ರೂಪದಲ್ಲಿದ್ದಾ ಅಥವಾ ಅಪಾಯಕಾರಿಯಾದ ಇನ್ಪುಟ್ ಸಾಧನ ಜಾರಿಗೆ ತಲುಪದಂತೆ ಎಲ್ಲ ಸಾಧನ ಕರೆಗಳಿಗೆ ಮಾನ್ಯತಾ ಪರಿಶೀಲನೆಯನ್ನು ಜಾರಿಗೊಳಿಸಿ.

7. **ದರ ಮಿತಿ**: ದುರ್ಬಳಕೆ ತಪ್ಪಿಸುವುದಕ್ಕೆ ಮತ್ತು ಸರ್ವರ್ ಸಂಪನ್ಮೂಲಗಳ ನ್ಯಾಯವಾದ ಬಳಕೆಯನ್ನು ಖಚಿತಪಡಿಸಲು ದರ ಮಿತಿಯನ್ನು ಜಾರಿಗೊಳಿಸಿ.

### ಜಾರಿಗೊಳಿಸುವ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

1. **ಸಾಧ್ಯತೆ ಮಾತನಾಡಿಕೆ**: ಸಂಪರ್ಕ ಸ್ಥಾಪನೆಯ ಸಮಯದಲ್ಲಿ ಬೆಂಬಲಿತ ವೈಶಿಷ್ಟ್ಯಗಳು, ಪ್ರೋಟೋಕಾಲ್ ಆವೃತ್ತಿಗಳು, ಲಭ್ಯವಿರುವ ಸಾಧನಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳ ಕುರಿತು ಮಾಹಿತಿಯನ್ನು ವಿನಿಮಯಮಾಡಿಕೊಳ್ಳಿ.

2. **ಸಾಧನ ವಿನ್ಯಾಸ**: ಅನೇಕ ವಿಚಾರಗಳನ್ನು ನಿಭಾಯಿಸುವ ಬದಲು ಒಂದೇ ಕಾರ್ಯದಲ್ಲಿ ಉತ್ತಮವಾದ ಕೇಂದ್ರೀಕೃತ ಸಾಧನಗಳನ್ನು ರಚಿಸಿ.

3. **ದೋಷ ನಿರ್ವಹಣೆ**: ಸಮಸ್ಯೆಗಳನ್ನು ಗುರುತಿಸಲು, ವೈಫಲ್ಯಗಳನ್ನು ಶಾಂತಿಯಿಂದವಾಗಿ ನಿರ್ವಹಿಸಲು ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಲು ಮಾನ್ಯ ದೋಷ ಸಂದೇಶಗಳು ಮತ್ತು ಕೋಡ್‌ಗಳನ್ನು ಜಾರಿಗೊಳಿಸಿ.

4. **ಲಾಗಿಂಗ್**: ಪ್ರೋಟೋಕಾಲ್ ಸಂವಾದಗಳನ್ನು ಪರಿಶೀಲನೆ, ಡಿಬಗಿಂಗ್ ಮತ್ತು ಮೇಲ್ವಿಚಾರಣೆಗೆ ರಚನಾತ್ಮಕ ಲಾಗ್‌ಗಳನ್ನು ಸಂರಚಿಸಿ.

5. **ಪ್ರಗತಿಯ ಟ್ರ್ಯಾಕಿಂಗ್**: ದೀರ್ಘಕಾಲದ ಆಪರೇಷನ್ಗಳು ಹೆಚ್ಚಿನ ಸಂವೇದನಾಶೀಲ ಬಳಕೆದಾರ ಇಂಟರ್‌ಫೇಸ್ಗಳಕ್ಕೆ ವರದಿಮಾಡುವ ಪ್ರಗತಿ ನವೀಕರಣಗಳನ್ನು ನೀಡಲಿ.

6. **ವಿನಂತಿ ರದ್ಧು**: ಅಗತ್ಯವಿಲ್ಲದ ಅಥವಾ ತುಂಬಾ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತಿರುವ ಮಧ್ಯ-ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಇರುವ ವಿನಂತಿಗಳನ್ನು ಗ್ರಾಹಕರು ರದ್ದುಮಾಡಲು ಅನುಮತಿಸಿ.

## ಹೆಚ್ಚುವರಿ ಉಲ್ಲೇಖಗಳು

MCP ಉತ್ತಮ ಅಭ್ಯಾಸಗಳ ಇತ್ತೀಚಿನ ಮಾಹಿತಿಗಾಗಿ ನೋಡಿ:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - ಭದ್ರತಾ ಅಪಾಯಗಳು ಮತ್ತು ಪರಿಹಾರಗಳು
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - ಕೈಗೊಂಡ ಭದ್ರತಾ ತರಬೇತಿ

## ಪ್ರಾಯೋಗಿಕ ಜಾರಿಗೊಳಿಸುವ ಉದಾಹರಣೆಗಳು

### ಸಾಧನ ವಿನ್ಯಾಸ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

#### 1. ಏಕ ಜವಾಬ್ದಾರಿ ತತ್ವ

ಪ್ರತಿ MCP ಸಾಧನಕ್ಕೆ ಸ್ಪಷ್ಟ, ಕೇಂದ್ರೀಕೃತ ಉದ್ದೇಶವಿರಬೇಕು. ಹಲವು ವಿಚಾರಗಳನ್ನು ನಿಭಾಯಿಸುವ ಮೊನೊಲಿಥಿಕ್ ಸಾಧನಗಳನ್ನು ರಚಿಸುವ ಬದಲು ನಿರ್ದಿಷ್ಟ ಕಾರ್ಯಗಳಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿರುವ ವಿಶಿಷ್ಟ ಸಾಧನಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಿ.

```csharp
// A focused tool that does one thing well
public class WeatherForecastTool : ITool
{
    private readonly IWeatherService _weatherService;
    
    public WeatherForecastTool(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }
    
    public string Name => "weatherForecast";
    public string Description => "Gets weather forecast for a specific location";
    
    public ToolDefinition GetDefinition()
    {
        return new ToolDefinition
        {
            Name = Name,
            Description = Description,
            Parameters = new Dictionary<string, ParameterDefinition>
            {
                ["location"] = new ParameterDefinition
                {
                    Type = ParameterType.String,
                    Description = "City or location name"
                },
                ["days"] = new ParameterDefinition
                {
                    Type = ParameterType.Integer,
                    Description = "Number of forecast days",
                    Default = 3
                }
            },
            Required = new[] { "location" }
        };
    }
    
    public async Task<ToolResponse> ExecuteAsync(IDictionary<string, object> parameters)
    {
        var location = parameters["location"].ToString();
        var days = parameters.ContainsKey("days") 
            ? Convert.ToInt32(parameters["days"]) 
            : 3;
            
        var forecast = await _weatherService.GetForecastAsync(location, days);
        
        return new ToolResponse
        {
            Content = new List<ContentItem>
            {
                new TextContent(JsonSerializer.Serialize(forecast))
            }
        };
    }
}
```

#### 2. ಸಹಜ ದೋಷ ನಿರ್ವಹಣೆ

ಮಾಹಿತಿಯುತ ದೋಷ ಸಂದೇಶಗಳ ಮತ್ತು ಸೂಕ್ತ পুনರುದ್ಧಾರ ಕ್ರಮಗಳೊಂದಿಗೆ ದೃಢ ದೋಷ ನಿರ್ವಹಣೆಯನ್ನು ಜಾರಿಗೊಳಿಸಿ.

```python
# ಸಮಗ್ರ ದೋಷ ನಿರ್ವಹಣೆಯೊಂದಿಗೆ ಪೈಥಾನ್ ಉದಾಹರಣೆ
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # ಪರಿಮಿತಿ ಪರಿಶೀಲನೆ
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # ಭದ್ರತಾ ಪರಿಶೀಲನೆ
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # ಟೈಮ್‌ಔಟ್‌ನೊಂದಿಗೆ ಡೇಟಾಬೇಸ್ ಕಾರ್ಯಾಚರಣೆ
                async with timeout(10):  # 10 ಸೆಕೆಂಡಿನ ಟೈಮ್‌ಔಟ್
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # ಸಂಪರ್ಕ ದೋಷಗಳು ತಾತ್ಕಾಲಿಕವಾಗಿರಬಹುದು
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # ಪ್ರಶ್ನೆ ದೋಷಗಳು ಸಾಧ್ಯತೆಯು 클ೈಂಟ್ ದೋಷಗಳು
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # ಸಾಧನ-ನಿರ್ದಿಷ್ಟ ದೋಷಗಳನ್ನು ಹಾದುಹೋಗಲು ಬಿಡಿ
            raise
        except Exception as e:
            # ಅಪ್ರತೀಕ್ಷಿತ ದೋಷಗಳಿಗಾಗಿ catch-all
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL ಇಂಜೆಕ್ಷನ್ ಪತ್ತೆಮಾಡುವಿಕೆ ಅನುಷ್ಠಾನ
        pass
        
    def _log_error(self, message, error):
        # ದೋಷ ಲಾಗಿಂಗ್ ಅನುಷ್ಠಾನ
        pass
```

#### 3. ಪರಿಮಿತಿ ಮಾನ್ಯತೆ

ತಪ್ಪಾದ ಅಥವಾ ದೋಷಭರಿತ ಇನ್ಪುಟ್ ತಡೆಯಲು ಯಾವಾಗಲೂ ಪರಿಮಿತಿಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಪರಿಶೀಲಿಸಿ.

```javascript
// ವಿಸ್ತೃತ ಪ್ಯಾರಮೀಟರ್ ಮಾನ್ಯತೆೊಂದಿಗೆ JavaScript/TypeScript ಉದಾಹರಣೆ
class FileOperationTool {
  getName() {
    return "fileOperation";
  }
  
  getDescription() {
    return "Performs file operations like read, write, and delete";
  }
  
  getDefinition() {
    return {
      name: this.getName(),
      description: this.getDescription(),
      parameters: {
        operation: {
          type: "string",
          description: "Operation to perform",
          enum: ["read", "write", "delete"]
        },
        path: {
          type: "string",
          description: "File path (must be within allowed directories)"
        },
        content: {
          type: "string",
          description: "Content to write (only for write operation)",
          optional: true
        }
      },
      required: ["operation", "path"]
    };
  }
  
  async execute(parameters) {
    // 1. ಪ್ಯಾರಮೀಟರ್ ಇದ್ದವು ಎಂದು ಪರಿಶೀಲಿಸಿ
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. ಪ್ಯಾರಮೀಟರ್ ಪ್ರಕಾರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. ಪ್ಯಾರಮೀಟರ್ ಮೌಲ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. ಬರೆಹ ಕಾರ್ಯಕ್ಕಾಗಿ ವಿಷಯದ ಉಪಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. ಮಾರ್ಗ ಸುರಕ್ಷತೆ ಪರಿಶೀಲನೆ
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // ಮಾನ್ಯಗೊಂಡ ಪ್ಯಾರಮೀಟರ್ ಆಧಾರಿತ ಜಾರಿಗೊಳಿಸುವಿಕೆ
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // ಮಾರ್ಗ ಸುರಕ್ಷತೆ ಪರೀಕ್ಷೆಯ ಜಾರಿಗೊಳಿಸುವಿಕೆ
    // ...
  }
}
```

### ಭದ್ರತೆ ಜಾರಿಗೊಳಿಸುವ ಉದಾಹರಣೆಗಳು

#### 1. ಪ್ರಮಾಣೀಕರಣ ಮತ್ತು ಅನುಮತಿ

```java
// ಪ್ರಮಾಣೀಕರಣ ಮತ್ತು ಪ್ರಾಧಿಕರಣದಿಂದ ಜಾವಾ ಉದಾಹರಣೆ
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // ಅವಲಂಬನೆ ಎಂಜೆಕ್ಷನ್
    public SecureDataAccessTool(
            AuthenticationService authService,
            AuthorizationService authzService,
            DataService dataService) {
        this.authService = authService;
        this.authzService = authzService;
        this.dataService = dataService;
    }
    
    @Override
    public String getName() {
        return "secureDataAccess";
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        // 1. ಪ್ರಮಾಣೀಕರಣ ಸಂದರ್ಭವನ್ನು ಹೊರತೆಗೆದುಕೊಳ್ಳಿ
        String authToken = request.getContext().getAuthToken();
        
        // 2. ಬಳಕೆದಾರರನ್ನು ಪ್ರಮಾಣೀಕರಿಸಿ
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. ನಿರ್ದಿಷ್ಟ ಕಾರ್ಯಕ್ಕಾಗಿ ಪ್ರಾಧಿಕರಣವನ್ನು ಪರಿಶೀಲಿಸಿ
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. ಪ್ರಾಧಿಕೃತ ಕಾರ್ಯನಿರ್ವಹಣೆಯನ್ನು ಮುಂದುವರಿಸಿ
        try {
            switch (operation) {
                case "read":
                    Object data = dataService.getData(dataId, user.getId());
                    return ToolResponse.success(data);
                case "update":
                    JsonNode newData = request.getParameters().get("newData");
                    dataService.updateData(dataId, newData, user.getId());
                    return ToolResponse.success("Data updated successfully");
                default:
                    return ToolResponse.error("Unsupported operation: " + operation);
            }
        } catch (Exception e) {
            return ToolResponse.error("Operation failed: " + e.getMessage());
        }
    }
}
```

#### 2. ದರ ಮಿತಿ  

```csharp
// C# rate limiting implementation
public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IMemoryCache _cache;
    private readonly ILogger<RateLimitingMiddleware> _logger;
    
    // Configuration options
    private readonly int _maxRequestsPerMinute;
    
    public RateLimitingMiddleware(
        RequestDelegate next,
        IMemoryCache cache,
        ILogger<RateLimitingMiddleware> logger,
        IConfiguration config)
    {
        _next = next;
        _cache = cache;
        _logger = logger;
        _maxRequestsPerMinute = config.GetValue<int>("RateLimit:MaxRequestsPerMinute", 60);
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        // 1. Get client identifier (API key or user ID)
        string clientId = GetClientIdentifier(context);
        
        // 2. Get rate limiting key for this minute
        string cacheKey = $"rate_limit:{clientId}:{DateTime.UtcNow:yyyyMMddHHmm}";
        
        // 3. Check current request count
        if (!_cache.TryGetValue(cacheKey, out int requestCount))
        {
            requestCount = 0;
        }
        
        // 4. Enforce rate limit
        if (requestCount >= _maxRequestsPerMinute)
        {
            _logger.LogWarning("Rate limit exceeded for client {ClientId}", clientId);
            
            context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
            context.Response.Headers.Add("Retry-After", "60");
            
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Rate limit exceeded",
                message = "Too many requests. Please try again later.",
                retryAfterSeconds = 60
            });
            
            return;
        }
        
        // 5. Increment request count
        _cache.Set(cacheKey, requestCount + 1, TimeSpan.FromMinutes(2));
        
        // 6. Add rate limit headers
        context.Response.Headers.Add("X-RateLimit-Limit", _maxRequestsPerMinute.ToString());
        context.Response.Headers.Add("X-RateLimit-Remaining", (_maxRequestsPerMinute - requestCount - 1).ToString());
        
        // 7. Continue with the request
        await _next(context);
    }
    
    private string GetClientIdentifier(HttpContext context)
    {
        // Implementation to extract API key or user ID
        // ...
    }
}
```

## ಪರೀಕ್ಷಾ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

### 1. MCP ಸಾಧನಗಳ ಒಂದುಗೂಡಿಕೆ ಪರೀಕ್ಷೆ

ನಿಮ್ಮ ಸಾಧನಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಪರೀಕ್ಷಿಸಿ, ಹೊರಗಿನ ಅವಲಂಬನೆಗಳನ್ನು ಮೌಕ್ ಮಾಡಿ:

```typescript
// ಟೈಪ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಉದಾಹರಣೆಯೊಂದರ ಬಳಕೆಯ ಸಾಧನ ಘಟಕ ಪರೀಕ್ಷೆ
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // ನಕಲಿ ಹವಾಮಾನ ಸೇವೆಯನ್ನು ರಚಿಸಿ
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // ನಕಲಿ ಅವಲಂಬನೆಯೊಂದಿಗೆ ಸಾಧನವನ್ನು ರಚಿಸಿ
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // ವ್ಯವಸ್ಥೆಮಾಡು
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // ಕಾರ್ಯ
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // ದೃಢೀಕರಿಸಿ
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // ವ್ಯವಸ್ಥೆಮಾಡು
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // ಕಾರ್ಯ ಮತ್ತು ದೃಢೀಕರಿಸಿ
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. ಇಂಟಿಗ್ರೇಶನ್ ಪರೀಕ್ಷೆ

ಗ್ರಾಹಕ ವಿನಂತಿಯಿಂದ ಸರ್ವರ್ ಪ್ರತಿಕ್ರಿಯೆ ವರೆಗೆ ಪೂರ್ಣ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ:

```python
# Python ಎಲ್ವಿಕೆ ಪರೀಕ್ಷಾ ಉದಾಹರಣೆ
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # ಪರೀಕ್ಷಾ ಸರ್ವರ್ ಪ್ರಾರಂಭಿಸಿ
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # ಗ್ರಾಹಕ ರಚಿಸಿ
        client = McpClient("http://localhost:5000")
        
        # ಸಾಧನ ಕಂಡುಹಿಡಿಯುವಿಕೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # ಸಾಧನ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪರಿಶೀಲಿಸಿ
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # ಸ್ವಚ್ಛಮಾಡಿ
        await server.stop()
```

## ಕಾರ್ಯಕ್ಷಮತೆ ಗರಿಷ್ಠಗೊಳಿಸುವಿಕೆ

### 1. ಕ್ಯಾಶಿಂಗ್ ತಂತ್ರಗಳು

ಅವಕಾಶೋಚಿತ ಕ್ಯಾಶಿಂಗ್ ಅನ್ನು ಜಾರಿಗೊಳಿಸಿ, ವಿಳಂಬ ಮತ್ತು ಸಂಪನ್ಮೂಲ ಬಳಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ:

```csharp
// C# example with caching
public class CachedWeatherTool : ITool
{
    private readonly IWeatherService _weatherService;
    private readonly IDistributedCache _cache;
    private readonly ILogger<CachedWeatherTool> _logger;
    
    public CachedWeatherTool(
        IWeatherService weatherService,
        IDistributedCache cache,
        ILogger<CachedWeatherTool> logger)
    {
        _weatherService = weatherService;
        _cache = cache;
        _logger = logger;
    }
    
    public string Name => "weatherForecast";
    
    public async Task<ToolResponse> ExecuteAsync(IDictionary<string, object> parameters)
    {
        var location = parameters["location"].ToString();
        var days = Convert.ToInt32(parameters.GetValueOrDefault("days", 3));
        
        // Create cache key
        string cacheKey = $"weather:{location}:{days}";
        
        // Try to get from cache
        string cachedForecast = await _cache.GetStringAsync(cacheKey);
        if (!string.IsNullOrEmpty(cachedForecast))
        {
            _logger.LogInformation("Cache hit for weather forecast: {Location}", location);
            return new ToolResponse
            {
                Content = new List<ContentItem>
                {
                    new TextContent(cachedForecast)
                }
            };
        }
        
        // Cache miss - get from service
        _logger.LogInformation("Cache miss for weather forecast: {Location}", location);
        var forecast = await _weatherService.GetForecastAsync(location, days);
        string forecastJson = JsonSerializer.Serialize(forecast);
        
        // Store in cache (weather forecasts valid for 1 hour)
        await _cache.SetStringAsync(
            cacheKey,
            forecastJson,
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
            });
        
        return new ToolResponse
        {
            Content = new List<ContentItem>
            {
                new TextContent(forecastJson)
            }
        };
    }
}
```

#### 2. ಅವಲಂಬನೆ ಇಂಜೆಕ್ಷನ್ ಮತ್ತು ಪರೀಕ್ಷಾಸಾಧ್ಯತೆ

ಕನ್ಸ್ಟ್ರಕ್ಟರ್ ಇಂಜೆಕ್ಷನ್ ಮೂಲಕ ಅವಲಂಬನೆಗಳನ್ನು ಪಡೆಯುವಂತೆ ಸಾಧನಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಿ, ಅವುಗಳನ್ನು ಪರೀಕ್ಷಿಸಲು ಮತ್ತು ಸಂರಚಿಸಲು ಅನುಕೂಲವಾಗುವಂತೆ:

```java
// ಅವಲಂಬನೆಯ ಒಳಗೊಳ್ಳಿಕೊಳ್ಳುವ ಜಾವಾ ಉದಾಹರಣೆ
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // ನಿರ್ಮಾಪಕ ಮೂಲಕ ಒಳಗೊಳ್ಳಿಸಲಾದ ಅವಲಂಬನೆಗಳು
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // ಸಾಧನದ ಅನುಷ್ಠಾನ
    // ...
}
```

#### 3. ಸಂಯೋಜಿಸಬಹುದಾದ ಸಾಧನಗಳು

ವೈವಿಧ್ಯಮಯ ಕಾರ್ಯವಾಹಿಗಳನ್ನು ರಚಿಸಲು ಪರಸ್ಪರ ಸಂಯೋಜಿಸಬಹುದಾದ ಸಾಧನಗಳನ್ನು ವಿನ್ಯಾಸಮಾಡಿ:

```python
# ಸಂಯೋಜಿಸಬಹುದಾದ ಸಾಧನಗಳನ್ನು ತೋರಿಸುವ ಪೈತಾನ್ ಉದಾಹರಣೆ
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # ಅನುಷ್ಠಾನ...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # ಈ ಸಾಧನವು dataFetch ಸಾಧನದಿಂದ ಫಲಿತಾಂಶಗಳನ್ನು ಬಳಸಬಹುದು
    async def execute_async(self, request):
        # ಅನುಷ್ಠಾನ...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # ಈ ಸಾಧನವು dataAnalysis ಸಾಧನದಿಂದ ಫಲಿತಾಂಶಗಳನ್ನು ಬಳಸಬಹುದು
    async def execute_async(self, request):
        # ಅನುಷ್ಠಾನ...
        pass

# ಈ ಸಾಧನಗಳನ್ನು ಸ್ವತಂತ್ರವಾಗಿ ಅಥವಾ ಕಾರ್ಯಪ್ರವಾಹದ ಭಾಗವಾಗಿ ಬಳಸಬಹುದು
```

### ತಂತ್ರಾಂಶ ರೂಪರೇಖೆಯ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

ರೂಪರೇಖೆ ಮಾದರಿ ಮತ್ತು ನಿಮ್ಮ ಸಾಧನಗಳ ನಡುವೆ ಒಪ್ಪಂದವಾಗಿದೆ. ಉತ್ತಮ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ರೂಪರೇಖೆಗಳು ಸಾಧನ ಬಳಕೆಯ ಸುಗಮತೆಯನ್ನು ತರುತ್ತವೆ.

#### 1. ಸ್ಪಷ್ಟ ಪರಿಮಿತಿ ವಿವರಣೆಗಳು

ಪ್ರತಿ ಪರಿಮಿತಿಗೆ ವಿವರಣಾತ್ಮಕ ಮಾಹಿತಿಯನ್ನು ಯಾವಾಗಲೂ ಸೇರಿಸಿ:

```csharp
public object GetSchema()
{
    return new {
        type = "object",
        properties = new {
            query = new { 
                type = "string", 
                description = "Search query text. Use precise keywords for better results." 
            },
            filters = new {
                type = "object",
                description = "Optional filters to narrow down search results",
                properties = new {
                    dateRange = new { 
                        type = "string", 
                        description = "Date range in format YYYY-MM-DD:YYYY-MM-DD" 
                    },
                    category = new { 
                        type = "string", 
                        description = "Category name to filter by" 
                    }
                }
            },
            limit = new { 
                type = "integer", 
                description = "Maximum number of results to return (1-50)",
                default = 10
            }
        },
        required = new[] { "query" }
    };
}
```

#### 2. ಮಾನ್ಯತಾ ನಿಯಮಗಳು

ಅಮಾನ್ಯ ಇನ್ಪುಟ್ ತಡೆಯಲು ಮಾನ್ಯತಾ ನಿಯಮಗಳನ್ನು ಸೇರಿಸಿ:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ಇಮೇಲ್ ಗುಣಲಕ್ಷಣವು ಸ್ವರೂಪ ಮಾನ್ಯತೆಯೊಂದಿಗೆ
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // ಸಂಖ್ಯೆ ಮಿತிகளಿರುವ ವಯಸ್ಸಿನ ಗುಣಲಕ್ಷಣ
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // ಪಟ್ಟಿಮಾಡಲಾದ ಗುಣಲಕ್ಷಣ
    Map<String, Object> subscription = new HashMap<>();
    subscription.put("type", "string");
    subscription.put("enum", Arrays.asList("free", "basic", "premium"));
    subscription.put("default", "free");
    subscription.put("description", "Subscription tier");
    
    properties.put("email", email);
    properties.put("age", age);
    properties.put("subscription", subscription);
    
    schema.put("properties", properties);
    schema.put("required", Arrays.asList("email"));
    
    return schema;
}
```

#### 3. ಸಮನ್ವಿತ ಪ್ರತಿಕ್ರಿಯಾ ರಚನೆಗಳು

ಮಾದರಿಗಳು ಫಲಿತಾಂಶಗಳನ್ನು ತಿಳಿದುಕೊಳ್ಳಲು ಸುಲభವಾಗುವಂತೆ ಪ್ರತಿಕ್ರಿಯಾ ವಿನ್ಯಾಸಗಳಲ್ಲಿ ಸಮನ್ವಯವಾಗಿರಿ:

```python
async def execute_async(self, request):
    try:
        # ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಿ
        results = await self._search_database(request.parameters["query"])
        
        # ಎಂದಿಗೂ ಅಕ್ಕಟದ ರಚನೆಯನ್ನು ಮರಳಿಸಿ
        return ToolResponse(
            result={
                "matches": [self._format_item(item) for item in results],
                "totalCount": len(results),
                "queryTime": calculation_time_ms,
                "status": "success"
            }
        )
    except Exception as e:
        return ToolResponse(
            result={
                "matches": [],
                "totalCount": 0,
                "queryTime": 0,
                "status": "error",
                "error": str(e)
            }
        )
    
def _format_item(self, item):
    """Ensures each item has a consistent structure"""
    return {
        "id": item.id,
        "title": item.title,
        "summary": item.summary[:100] + "..." if len(item.summary) > 100 else item.summary,
        "url": item.url,
        "relevance": item.score
    }
```

### ದೋಷ ನಿರ್ವಹಣೆ

ದೃಢ ದೋಷ ನಿರ್ವಹಣೆ MCP ಸಾಧನಗಳಿಗೆ ಸ್ಥಿತಿಸ್ಥಾಪಕತೆ ಕಾಪಾಡಲು ಅವಶ್ಯಕ.

#### 1. ಶ್ರೇಯೋಭಿವೃದ್ಧಿ ದೋಷ ನಿರ್ವಹಣೆ

ತಕ್ಕ ಮಟ್ಟಿಗೆ ದೋಷಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಮಾಹಿತಿಪೂರ್ಣ ಸಂದೇಶಗಳನ್ನು ಒದಗಿಸಿ:

```csharp
public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
{
    try
    {
        string fileId = request.Parameters.GetProperty("fileId").GetString();
        
        try
        {
            var fileData = await _fileService.GetFileAsync(fileId);
            return new ToolResponse { 
                Result = JsonSerializer.SerializeToElement(fileData) 
            };
        }
        catch (FileNotFoundException)
        {
            throw new ToolExecutionException($"File not found: {fileId}");
        }
        catch (UnauthorizedAccessException)
        {
            throw new ToolExecutionException("You don't have permission to access this file");
        }
        catch (Exception ex) when (ex is IOException || ex is TimeoutException)
        {
            _logger.LogError(ex, "Error accessing file {FileId}", fileId);
            throw new ToolExecutionException("Error accessing file: The service is temporarily unavailable");
        }
    }
    catch (JsonException)
    {
        throw new ToolExecutionException("Invalid file ID format");
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Unexpected error in FileAccessTool");
        throw new ToolExecutionException("An unexpected error occurred");
    }
}
```

#### 2. ರಚನಾತ್ಮಕ ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಗಳು

ಸಾಧ್ಯವಾದಲ್ಲಿ ರಚನಾತ್ಮಕ ದೋಷ ಮಾಹಿತಿಯನ್ನು ಹಿಂತಿರುಗಿಸಿ:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // ಅನುಷ್ಠಾನ
    } catch (Exception ex) {
        Map<String, Object> errorResult = new HashMap<>();
        
        errorResult.put("success", false);
        
        if (ex instanceof ValidationException) {
            ValidationException validationEx = (ValidationException) ex;
            
            errorResult.put("errorType", "validation");
            errorResult.put("errorMessage", validationEx.getMessage());
            errorResult.put("validationErrors", validationEx.getErrors());
            
            return new ToolResponse.Builder()
                .setResult(errorResult)
                .build();
        }
        
        // ಇತರ ತಪ್ಪುಗಳನ್ನು ToolExecutionException ಆಗಿ ಮರುಬಿಡಿ
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. ಮರುಪ್ರಯತ್ನ ತಂತ್ರಜ್ಞಾನ

ತಾತ್ಕಾಲಿಕ ವೈಫಲ್ಯಗಳಿಗೆ ಸೂಕ್ತ ಮರುಪ್ರಯತ್ನ ತಂತ್ರಜ್ಞಾನವನ್ನು ಜಾರಿಗೊಳಿಸಿ:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # ಸೆಕೆಂಡುಗಳು
    
    while retry_count < max_retries:
        try:
            # ಬಾಹ್ಯ APIನ್ನು ಕರೆದೊಯ್ಯಿ
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # ಘಾತಾಂಕ ಬ್ಯಾಕ್ಓಫ್
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # ಅಸ್ಥಿರವಲ್ಲದ ದೋಷ, ಪುನಃ ಪ್ರಯತ್ನಿಸಬೇಡಿ
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### ಕಾರ್ಯಕ್ಷಮತೆ ಗರಿಷ್ಠಗೊಳಿಸುವಿಕೆ

#### 1. ಕ್ಯಾಶಿಂಗ್

ಖರ್ಚುಹೊಂದುವ ಕಾರ್ಯಾಚರಣೆಗಳುಗಾಗಿ ಕ್ಯಾಶಿಂಗ್ ಜಾರಿಗೊಳಿಸಿ:

```csharp
public class CachedDataTool : IMcpTool
{
    private readonly IDatabase _database;
    private readonly IMemoryCache _cache;
    
    public CachedDataTool(IDatabase database, IMemoryCache cache)
    {
        _database = database;
        _cache = cache;
    }
    
    public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
    {
        var query = request.Parameters.GetProperty("query").GetString();
        
        // Create cache key based on parameters
        var cacheKey = $"data_query_{ComputeHash(query)}";
        
        // Try to get from cache first
        if (_cache.TryGetValue(cacheKey, out var cachedResult))
        {
            return new ToolResponse { Result = cachedResult };
        }
        
        // Cache miss - perform actual query
        var result = await _database.QueryAsync(query);
        
        // Store in cache with expiration
        var cacheOptions = new MemoryCacheEntryOptions()
            .SetAbsoluteExpiration(TimeSpan.FromMinutes(15));
            
        _cache.Set(cacheKey, JsonSerializer.SerializeToElement(result), cacheOptions);
        
        return new ToolResponse { Result = JsonSerializer.SerializeToElement(result) };
    }
    
    private string ComputeHash(string input)
    {
        // Implementation to generate stable hash for cache key
    }
}
```

#### 2. ಅಸಿಂಕ್ರೋನಸ್ ಪ್ರೊಸೆಸ್

I/O ಬೌಂಡ್ ಕಾರ್ಯಾಚರಣೆಗಳಿಗೆ ಅಸಿಂಕ್ರೋನಸ್ ಪ್ರೋಗ्रामಿಂಗ್ ಮಾದರಿಗಳನ್ನು ಬಳಸಿ:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // ದೀರ್ಘಕಾಲ ನಡೆಯುವ ಕಾರ್ಯಗಳಿಗಾಗಿ, ಪ್ರಾಸಂಗೇಕ ID ಅನ್ನು ತಕ್ಷಣ ಮರಳಿಸಿ
        String processId = UUID.randomUUID().toString();
        
        // ಅಸಿಂಕ್ರೋನಸ್ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ
        CompletableFuture.runAsync(() -> {
            try {
                // ದೀರ್ಘಕಾಲ ನಡೆಯುವ ಕಾರ್ಯವನ್ನು ನಿರ್ವಹಿಸಿ
                documentService.processDocument(documentId);
                
                // ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಿ (ಸಾಮಾನ್ಯವಾಗಿ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // ಪ್ರಕ್ರಿಯಾ ID ರೊಂದಿಗೆ ತಕ್ಷಣದ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಮರಳಿಸಿ
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // ಸಂಗಾತಿ ಸ್ಥಿತಿ ಪರಿಶೀಲನಾ ಉಪಕರಣ
    public class ProcessStatusTool implements Tool {
        @Override
        public ToolResponse execute(ToolRequest request) {
            String processId = request.getParameters().get("processId").asText();
            ProcessStatus status = processStatusRepository.getStatus(processId);
            
            return new ToolResponse.Builder().setResult(status).build();
        }
    }
}
```

#### 3. ಸಂಪನ್ಮೂಲ ನಿಯಂತ್ರಣ

ಒತ್ತಡ ತಪ್ಪಿಸಲು ಸಂಪನ್ಮೂಲ ನಿಯಂತ್ರಣವನ್ನು ಜಾರಿಗೊಳಿಸಿ:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # ಪ್ರತಿ ಸೆಕೆಂಡಿಗೆ 5 ವಿನಂತಿಗಳನ್ನು ಅನುಮತಿಸಿ
            bucket_size=10        # 10 ವಿನಂತಿಗಳವರೆಗಿನ ಸ್ಫೋಟಗಳನ್ನು ಅನುಮತಿಸಿ
        )
    
    async def execute_async(self, request):
        # ನಾವು ಮುಂದುವರೆಯಬಹುದೇ ಅಥವಾ ಕಾಯಬೇಕೇ ನೋಡುವುದು
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # ಕಾಯುವ ಸಮಯ ಹೆಚ್ಚು ಇದ್ದರೆ
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # ಸೂಕ್ತ ವಿಳಂಬ ಸಮಯಕ್ಕೆ ಕಾಯಿರಿ
                await asyncio.sleep(delay)
        
        # ಒಂದು ಟೋಕೆನ್ ಬಳಸಿ ವಿನಂತಿಯನ್ನು ಮುಂದುವರೆಸಿ
        self.rate_limiter.consume()
        
        # ಎಪಿಐ ಕರೆಯಿರಿ
        result = await self._call_api(request.parameters)
        return ToolResponse(result=result)

class TokenBucketRateLimiter:
    def __init__(self, tokens_per_second, bucket_size):
        self.tokens_per_second = tokens_per_second
        self.bucket_size = bucket_size
        self.tokens = bucket_size
        self.last_refill = time.time()
        self.lock = asyncio.Lock()
    
    async def get_delay_time(self):
        async with self.lock:
            self._refill()
            if self.tokens >= 1:
                return 0
            
            # ಮುಂದಿನ ಟೋಕೆನ್ ಲಭ್ಯವಾಗುವವರೆಗೆ ಸಮಯವನ್ನು ಲೆಕ್ಕಹಾಕಿ
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # ಕಳೆದ ಸಮಯದ ಆಧಾರದ ಮೇಲೆ ಹೊಸ ಟೋಕೆನ್ಗಳನ್ನು ಸೇರಿಸಿ
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### ಭದ್ರತೆ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

#### 1. ಇನ್ಪುಟ್ ಮಾನ್ಯತೆ

ಪ್ರವೇಶಿಸುವ ಪರಿಮಿತಿಗಳನ್ನು ಯಾವಾಗಲೂ ಸಂಪೂರ್ಣ ಪರಿಶೀಲಿಸಿ:

```csharp
public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
{
    // Validate parameters exist
    if (!request.Parameters.TryGetProperty("query", out var queryProp))
    {
        throw new ToolExecutionException("Missing required parameter: query");
    }
    
    // Validate correct type
    if (queryProp.ValueKind != JsonValueKind.String)
    {
        throw new ToolExecutionException("Query parameter must be a string");
    }
    
    var query = queryProp.GetString();
    
    // Validate string content
    if (string.IsNullOrWhiteSpace(query))
    {
        throw new ToolExecutionException("Query parameter cannot be empty");
    }
    
    if (query.Length > 500)
    {
        throw new ToolExecutionException("Query parameter exceeds maximum length of 500 characters");
    }
    
    // Check for SQL injection attacks if applicable
    if (ContainsSqlInjection(query))
    {
        throw new ToolExecutionException("Invalid query: contains potentially unsafe SQL");
    }
    
    // Proceed with execution
    // ...
}
```

#### 2. ಅನುಮತಿ ಪರಿಶೀಲನೆಗಳು

ಸರಿಯಾದ ಅನುಮತಿ ಪರಿಶೀಲನೆಗಳನ್ನು ಜಾರಿಗೊಳಿಸಿ:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // ವಿನಂತಿಯಿಂದ ಬಳಕೆದಾರರ_CONTEXTವನ್ನು ಪಡೆಯಿರಿ
    UserContext user = request.getContext().getUserContext();
    
    // ಬಳಕೆದಾರರಿಗೆ ಅಗತ್ಯ ಅನುಮತಿಗಳು ಇದ್ದಾರೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // ನಿರ್ದಿಷ್ಟ ಸಂಪನ್ಮೂಲಗಳಿಗೆ, ಆ ಸಂಪನ್ಮೂಲವನ್ನು ಪ್ರವೇಶಿಸುವುದನ್ನು ತನಿಖಿಸು
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // ಸಾಧನವನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸುವುದನ್ನು ಮುಂದುವರೆಸಿ
    // ...
}
```

#### 3. ಸಂವೇದನಶೀಲ ಡೇಟಾ ನಿರ್ವಹಣೆ

ಸಂವೇದನಶೀಲ ಡೇಟಾವನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ನಿರ್ವಹಿಸಿ:

```python
class SecureDataTool(Tool):
    def get_schema(self):
        return {
            "type": "object",
            "properties": {
                "userId": {"type": "string"},
                "includeSensitiveData": {"type": "boolean", "default": False}
            },
            "required": ["userId"]
        }
    
    async def execute_async(self, request):
        user_id = request.parameters["userId"]
        include_sensitive = request.parameters.get("includeSensitiveData", False)
        
        # ಬಳಕೆದಾರ ಡೇಟಾವನ್ನು ಪಡೆಯಿರಿ
        user_data = await self.user_service.get_user_data(user_id)
        
        # ಸ್ಪಷ್ಟವಾಗಿ ವಿನಂತಿಸದಿದ್ದರೆ ಮತ್ತು ಅನುಮತಿಸದಿದ್ದರೆ ಸಂವೇದನಶೀಲ ಕ್ಷೇತ್ರಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # ವಿನಂತಿ ಸನ್ನಿವೇಶದಲ್ಲಿನ ಅನುಮತಿ ಮಟ್ಟವನ್ನು ಪರಿಶೀಲಿಸಿ
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # ಮೂಲವನ್ನು ಬದಲಾಯಿಸುವುದರಿಂದ ತಪ್ಪಿಸಲು ಪ್ರತಿಯನ್ನು ರಚಿಸಿ
        redacted = user_data.copy()
        
        # ನಿರ್ದಿಷ್ಟ ಸಂವೇದನಶೀಲ ಕ್ಷೇತ್ರಗಳನ್ನು ರೆಡ್ಯಾಕ್ಟ್ ಮಾಡಿ
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # ನೆಸ್ಟೆಡ್ ಸಂವೇದನಶೀಲ ಡೇಟಾವನ್ನು ರೆಡ್ಯಾಕ್ಟ್ ಮಾಡಿ
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP ಸಾಧನಗಳ ಪರೀಕ್ಷಾ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

ಸಂಪೂರ್ಣ ಪರೀಕ್ಷೆಯು MCP ಸಾಧನಗಳು ಸರಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ, ಅಂಚು ಪ್ರಕರಣಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತವೆ ಮತ್ತು ವ್ಯವಸ್ಥೆಯೊಂದಿಗೆ ಸಮರ್ಪಕವಾಗಿ ಸಂಯೋಜಿಸುತ್ತವೆ ಎಂದು ಖಚಿತಪಡಿಸುತ್ತದೆ.

### ಘಟಕ ಪರೀಕ್ಷೆ

#### 1. ಪ್ರತಿ ಸಾಧನವನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಪರೀಕ್ಷಿಸಿ

ಪ್ರತಿ ಸಾಧನ ಕಾರ್ಯಚಟುವಟಿಕೆಗೆ ಕೇಂದ್ರೀಕೃತ ಪರೀಕ್ಷೆಗಳನ್ನು ರಚಿಸಿ:

```csharp
[Fact]
public async Task WeatherTool_ValidLocation_ReturnsCorrectForecast()
{
    // Arrange
    var mockWeatherService = new Mock<IWeatherService>();
    mockWeatherService
        .Setup(s => s.GetForecastAsync("Seattle", 3))
        .ReturnsAsync(new WeatherForecast(/* test data */));
    
    var tool = new WeatherForecastTool(mockWeatherService.Object);
    
    var request = new ToolRequest(
        toolName: "weatherForecast",
        parameters: JsonSerializer.SerializeToElement(new { 
            location = "Seattle", 
            days = 3 
        })
    );
    
    // Act
    var response = await tool.ExecuteAsync(request);
    
    // Assert
    Assert.NotNull(response);
    var result = JsonSerializer.Deserialize<WeatherForecast>(response.Result);
    Assert.Equal("Seattle", result.Location);
    Assert.Equal(3, result.DailyForecasts.Count);
}

[Fact]
public async Task WeatherTool_InvalidLocation_ThrowsToolExecutionException()
{
    // Arrange
    var mockWeatherService = new Mock<IWeatherService>();
    mockWeatherService
        .Setup(s => s.GetForecastAsync("InvalidLocation", It.IsAny<int>()))
        .ThrowsAsync(new LocationNotFoundException("Location not found"));
    
    var tool = new WeatherForecastTool(mockWeatherService.Object);
    
    var request = new ToolRequest(
        toolName: "weatherForecast",
        parameters: JsonSerializer.SerializeToElement(new { 
            location = "InvalidLocation", 
            days = 3 
        })
    );
    
    // Act & Assert
    var exception = await Assert.ThrowsAsync<ToolExecutionException>(
        () => tool.ExecuteAsync(request)
    );
    
    Assert.Contains("Location not found", exception.Message);
}
```

#### 2. ರೂಪರೇಖೆ ಮಾನ್ಯತೆ ಪರೀಕ್ಷೆ

ರೂಪರೇಖೆಗಳು ಮಾನ್ಯವಾಗಿವೆ ಮತ್ತು ನಿಯಮಗಳನ್ನು ಸರಿಯಾಗಿ ಜಾರಿಗೊಳಿಸುತ್ತವೆ ಎಂದು ಪರೀಕ್ಷಿಸಿ:

```java
@Test
public void testSchemaValidation() {
    // ಉಪಕರಣದ ಉದಾಹರಣೆ ಸೃಷ್ಟಿಸಿ
    SearchTool searchTool = new SearchTool();
    
    // ಸ್ಕೀಮಾ ಪಡೆಯಿರಿ
    Object schema = searchTool.getSchema();
    
    // ಪರಿಶೀಲನೆಗಾಗಿ ಸ್ಕೀಮಾವನ್ನು JSON ಗೆ ಪರಿವರ್ತಿಸಿ
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // ಸ್ಕೀಮಾ ಮಾನ್ಯ JSONSchema ಆಗಿರುವುದನ್ನು ಪರಿಶೀಲಿಸಿ
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // ಮಾನ್ಯವಾದ ನಿಯಮಿತಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // ತಪ್ಪಿದ್ದ ಅಗತ್ಯ ನಿಯಮಿತವನ್ನು ಪರೀಕ್ಷಿಸಿ
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // ಅಮಾನ್ಯ ನಿಯಮಿತ ಪ್ರಕಾರವನ್ನು ಪರೀಕ್ಷಿಸಿ
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. ದೋಷ ನಿರ್ವಹಣೆ ಪರೀಕ್ಷೆಗಳು

ದೋಷ ಪರಿಸ್ಥಿತಿಗಳಿಗಾಗಿ ವಿಶೇಷ ಪರೀಕ್ಷೆಗಳನ್ನು ರಚಿಸಿ:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # ಜೋಡಣೆ ಮಾಡಿ
    tool = ApiTool(timeout=0.1)  # ತುಂಬಾ ಚಿಕ್ಕ ಟೈಮೌಟ್
    
    # ಟೈಮೌಟ್ ಆಗುವ ವಿನಂತಿಯನ್ನು ನಕಲಿ ಮಾಡಿ
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # ಟೈಮೌಟಿಗಿಂತ ಹೆಚ್ಚು ಸಮಯ
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # ಕಾರ್ಯನಿರ್ವಹಿಸಿ ಮತ್ತು ದೃಢೀಕರಿಸಿ
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # ಹೊರತುಪಡಿಸುವ ಸಂದೇಶವನ್ನು ಪರಿಶೀಲಿಸಿ
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # ಜೋಡಣೆ ಮಾಡಿ
    tool = ApiTool()
    
    # ದರ-ಹದ ಗಡಿಯಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನಕಲಿ ಮಾಡಿ
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            status=429,
            headers={"Retry-After": "2"},
            body=json.dumps({"error": "Rate limit exceeded"})
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # ಕಾರ್ಯನಿರ್ವಹಿಸಿ ಮತ್ತು ದೃಢೀಕರಿಸಿ
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # ಹೊರತುಪಡಿಸುವುದು ದರ-ಹದ ಮಾಹಿತಿ ಹೊಂದಿದೆ ಎಂದು ಪರಿಶೀಲಿಸಿ
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### ಸಂಯೋಜನೆ ಪರೀಕ್ಷೆ

#### 1. ಸಾಧನ ಸರಪಳಿ ಪರೀಕ್ಷೆ

ನಿರೀಕ್ಷಿತ ಸಂಯೋಜನೆಯಲ್ಲಿ ಸಾಧನಗಳು ಒಟ್ಟಾಗಲು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಾವೆಯೇ ಎಂದು ಪರೀಕ್ಷಿಸಿ:

```csharp
[Fact]
public async Task DataProcessingWorkflow_CompletesSuccessfully()
{
    // Arrange
    var dataFetchTool = new DataFetchTool(mockDataService.Object);
    var analysisTools = new DataAnalysisTool(mockAnalysisService.Object);
    var visualizationTool = new DataVisualizationTool(mockVisualizationService.Object);
    
    var toolRegistry = new ToolRegistry();
    toolRegistry.RegisterTool(dataFetchTool);
    toolRegistry.RegisterTool(analysisTools);
    toolRegistry.RegisterTool(visualizationTool);
    
    var workflowExecutor = new WorkflowExecutor(toolRegistry);
    
    // Act
    var result = await workflowExecutor.ExecuteWorkflowAsync(new[] {
        new ToolCall("dataFetch", new { source = "sales2023" }),
        new ToolCall("dataAnalysis", ctx => new { 
            data = ctx.GetResult("dataFetch"),
            analysis = "trend" 
        }),
        new ToolCall("dataVisualize", ctx => new {
            analysisResult = ctx.GetResult("dataAnalysis"),
            type = "line-chart"
        })
    });
    
    // Assert
    Assert.NotNull(result);
    Assert.True(result.Success);
    Assert.NotNull(result.GetResult("dataVisualize"));
    Assert.Contains("chartUrl", result.GetResult("dataVisualize").ToString());
}
```

#### 2. MCP ಸರ್ವರ್ ಪರೀಕ್ಷೆ

ಪೂರ್ಣ ಸಾಧನ ನೋಂದಣಿ ಮತ್ತು ಜಾರಿಗೊಳಿಸುವಿಕೆ ಸಹಿತ MCP ಸರ್ವರ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಿ:

```java
@SpringBootTest
@AutoConfigureMockMvc
public class McpServerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    public void testToolDiscovery() throws Exception {
        // ಡಿಸ್ಕವರಿ ಎಂಡ್‌ಪಾಯಿಂಟ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಿ
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // ಉಪಕರಣ ವಿನಂತಿ ಸೃಷ್ಟಿಸಿ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // ವಿನಂತಿ ಕಳುಹಿಸಿ ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ದೃಢೀಕರಿಸಿ
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // ಅಮಾನ್ಯ ಉಪಕರಣ ವಿನಂತಿ ಸೃಷ್ಟಿಸಿ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" ಪರಿಮಾಣ ಕೊರತೆ
        request.put("parameters", parameters);
        
        // ವಿನಂತಿ ಕಳುಹಿಸಿ ಮತ್ತು ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ದೃಢೀಕರಿಸಿ
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. ಪೂರ್ಣವಿಧಿ ಪರೀಕ್ಷೆ

ಮಾದರಿ ಪ್ರಾಂಪ್ಟ್‌ನಿಂದ ಸಾಧನ ಜಾರಿಗೊಳಿಸುವಿಕೆ ವರೆಗೆ ಸಂಪೂರ್ಣ ಕಾರ್ಯವಾಹಿಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # ಅಳವಡಿಸು - MCP ಕ್ಲೈಂಟ್ ಮತ್ತು ಮೋಕ್ ಮಾದರಿಯನ್ನು ಸೆಟ್‌ಅಪ್ ಮಾಡು
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # ಮೋಕ್ ಮಾದರಿ ಪ್ರತಿಕ್ರಿಯೆಗಳು
    mock_model = MockLanguageModel([
        MockResponse(
            "What's the weather in Seattle?",
            tool_calls=[{
                "tool_name": "weatherForecast",
                "parameters": {"location": "Seattle", "days": 3}
            }]
        ),
        MockResponse(
            "Here's the weather forecast for Seattle:\n- Today: 65°F, Partly Cloudy\n- Tomorrow: 68°F, Sunny\n- Day after: 62°F, Rain",
            tool_calls=[]
        )
    ])
    
    # ಮೋಕ್ ಹವಾಮಾನ ಉಪಕರಣ ಪ್ರತಿಕ್ರಿಯೆ
    with aioresponses() as mocked:
        mocked.post(
            "http://localhost:5000/mcp/execute",
            payload={
                "result": {
                    "location": "Seattle",
                    "forecast": [
                        {"date": "2023-06-01", "temperature": 65, "conditions": "Partly Cloudy"},
                        {"date": "2023-06-02", "temperature": 68, "conditions": "Sunny"},
                        {"date": "2023-06-03", "temperature": 62, "conditions": "Rain"}
                    ]
                }
            }
        )
        
        # ಕಾರ್ಯನಿರ್ವಹಿಸು
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # ಖಚಿತಪಡಿಸಿಕೊಳ್ಳು
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### ಕಾರ್ಯಕ್ಷಮತೆ ಪರೀಕ್ಷೆ

#### 1. ಲೋಡ್ ಪರೀಕ್ಷೆ

ನಿಮ್ಮ MCP ಸರ್ವರ್ ಎಷ್ಟು ಕ್ಲೈಂಟ್ ವಿನಂತಿಗಳನ್ನು ಸಮಕಾಲೀನವಾಗಿ ನಿಭಾಯಿಸಬಹುದೆಂದು ಪರೀಕ್ಷಿಸಿ:

```csharp
[Fact]
public async Task McpServer_HandlesHighConcurrency()
{
    // Arrange
    var server = new McpServer(
        name: "TestServer",
        version: "1.0",
        maxConcurrentRequests: 100
    );
    
    server.RegisterTool(new FastExecutingTool());
    await server.StartAsync();
    
    var client = new McpClient("http://localhost:5000");
    
    // Act
    var tasks = new List<Task<McpResponse>>();
    for (int i = 0; i < 1000; i++)
    {
        tasks.Add(client.ExecuteToolAsync("fastTool", new { iteration = i }));
    }
    
    var results = await Task.WhenAll(tasks);
    
    // Assert
    Assert.Equal(1000, results.Length);
    Assert.All(results, r => Assert.NotNull(r));
}
```

#### 2. ಸ್ಟ್ರೆಸ್ಸ್ ಪರೀಕ್ಷೆ

ಅತ್ಯಧಿಕ ಒತ್ತಡದಡಿ ವ್ಯವಸ್ಥೆಯ ಸಾಮರ್ಥ್ಯವನ್ನು ಪರೀಕ್ಷಿಸಿ:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // ಸ್ಟ್ರೆಸ್ ಟೆಸ್ಟಿಂಗ್‌ಗಾಗಿ ಜೆಮೀಟರ್ ಅನ್ನು ಸೆಟ್ ಅಪ್ ಮಾಡಿ
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // ಜೆಮೀಟರ್ ಟೆಸ್ಟ್ ಪ್ಲಾನ್ ಅನ್ನು ಸಂರಚಿಸಿ
    HashTree testPlanTree = new HashTree();
    
    // ಟೆಸ್ಟ್ ಪ್ಲಾನ್, ಥ್ರೆಡ್ ಗುಂಪು, ಸ್ಯಾಂಪ್ಲರ್‌ಗಳು ಇತ್ಯಾದಿ ರಚಿಸಿ
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // ಉಪಕರಣ ಕಾರ್ಯಗತಗೊಳಿಸಲು HTTP ಸ್ಯಾಂಪ್ಲರ್ ಸೇರಿಸಿ
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // ಶ್ರೋತೃಗಳನ್ನು ಸೇರಿಸಿ
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // ಟೆಸ್ಟ್ ಚಾಲನೆ ಮಾಡಿ
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // ಫಲಿತಾಂಶಗಳನ್ನು ಮಾನ್ಯಗೊಳಿಸಿ
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // ಸರಾಸರಿ ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90ನೇ ಶೇಕಡಾವಾರು < 500ms
}
```

#### 3. ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಪ್ರೊಫೈಲಿಂಗ್

ದೀರ್ಘಕಾಲದ ಕಾರ್ಯಕ್ಷಮತೆ ವಿಶ್ಲೇಷಣೆಗೆ ಮೇಲ್ವಿಚಾರಣೆಯನ್ನು ಸ್ಥಾಪಿಸಿ:

```python
# MCP ಸರ್ವರ್‌ಗಾಗಿ ಮಾನಿಟರಿಂಗ್ ಅನ್ನು ಸಂರಚಿಸಿ
def configure_monitoring(server):
    # ಪ್ರೊಮೆಥಿಯಸ್ ಮೆಟ್ರಿಕ್ಸ್‌ಗಳನ್ನು ಸೆಟ್ ಅಪ್ ಮಾಡಿ
    prometheus_metrics = {
        "request_count": Counter("mcp_requests_total", "Total MCP requests"),
        "request_latency": Histogram(
            "mcp_request_duration_seconds", 
            "Request duration in seconds",
            buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 2.5, 5.0, 10.0]
        ),
        "tool_execution_count": Counter(
            "mcp_tool_executions_total", 
            "Tool execution count",
            labelnames=["tool_name"]
        ),
        "tool_execution_latency": Histogram(
            "mcp_tool_duration_seconds", 
            "Tool execution duration in seconds",
            labelnames=["tool_name"],
            buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 2.5, 5.0, 10.0]
        ),
        "tool_errors": Counter(
            "mcp_tool_errors_total",
            "Tool execution errors",
            labelnames=["tool_name", "error_type"]
        )
    }
    
    # ಸಮಯಮಾಪನ ಮತ್ತು ಮೆಟ್ರಿಕ್ಸ್ ರೆಕಾರ್ಡಿಂಗ್‌ಗೆ ಮಧ್ಯವರ್ತಿ ಅನ್ನು ಸೇರಿಸಿ
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # ಮೆಟ್ರಿಕ್ಸ್ ಎಂಡ್ಪಾಯಿಂಟ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸಿ
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP ಕಾರ್ಯವಾಹಿ ವಿನ್ಯಾಸ ಮಾದರಿಗಳು

ಚಿಕ್ಕ-ಚಿಕ್ಕವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಿದ MCP ಕಾರ್ಯವಾಹಿಗಳು ಕಾರ್ಯಕ್ಷಮತೆ, ಸ್ಥಿರತೆ ಮತ್ತು ನಿರ್ವಹಣಾತ್ಮಕತೆಯನ್ನು ಸುಧಾರಿಸುತ್ತವೆ. ಪಾಲನೆಯ ಪ್ರಮುಖ ಮಾದರಿಗಳು ಇಲ್ಲಿವೆ:

### 1. ಸಾಧನ ಸರಪಳಿ ಮಾದರಿ

ಪ್ರತಿ ಸಾಧನದ ಔಟ್‌ಪುಟ್ ಮುಂದಿನ ಸಾಧನದ ಇನ್ಪುಟ್ ಆಗುವ ಕ್ರಮಬದ್ಧ ಸರಣಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ:

```python
# ಪೈಥಾನ್ ಚೈನ್ ಆಫ್ ಟೂಲ್‌ಗಳ ಜಾರಿಗೊಳಿಸುವಿಕೆ
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # ಕ್ರಮವಾಗಿ ನಿರ್ವಹಿಸಲು ಟೂಲ್ ಹೆಸರುಗಳ ಪಟ್ಟಿ
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # ಚೈನ್‌ನಲ್ಲಿ ಪ್ರತಿ ಟೂಲ್ ಅನ್ನು ನಡೆಸಿ, ಹಿಂದಿನ ಫಲಿತಾಂಶವನ್ನು ಪಾಸು ಮಾಡುವುದು
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # ಫಲಿತಾಂಶವನ್ನು ಸಂಗ್ರಹಿಸಿ, ಮುಂದಿನ ಟೂಲ್ಗೆ ಇನ್ಪುಟ್ ಆಗಿ ಉಪಯೋಗಿಸಿ
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# ಉದಾಹರಣೆಯ ಬಳಕೆ
data_processing_chain = ChainWorkflow([
    "dataFetch",
    "dataCleaner",
    "dataAnalyzer",
    "dataVisualizer"
])

result = await data_processing_chain.execute(
    mcp_client,
    {"source": "sales_database", "table": "transactions"}
)
```

### 2. ಡಿಸ್ಪ್ಯಾಚರ್ ಮಾದರಿ

ಇನ್ಪುಟ್ನ ಆಧಾರದ ಮೇಲೆ ವಿಶೇಷ ಸಾಧನಗಳಿಗೆ ನಿಯೋಜಿಸುವ ಕೇಂದ್ರ ಸಾಧನವನ್ನು ಬಳಸಿ:

```csharp
public class ContentDispatcherTool : IMcpTool
{
    private readonly IMcpClient _mcpClient;
    
    public ContentDispatcherTool(IMcpClient mcpClient)
    {
        _mcpClient = mcpClient;
    }
    
    public string Name => "contentProcessor";
    public string Description => "Processes content of various types";
    
    public object GetSchema()
    {
        return new {
            type = "object",
            properties = new {
                content = new { type = "string" },
                contentType = new { 
                    type = "string",
                    enum = new[] { "text", "html", "markdown", "csv", "code" }
                },
                operation = new { 
                    type = "string",
                    enum = new[] { "summarize", "analyze", "extract", "convert" }
                }
            },
            required = new[] { "content", "contentType", "operation" }
        };
    }
    
    public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
    {
        var content = request.Parameters.GetProperty("content").GetString();
        var contentType = request.Parameters.GetProperty("contentType").GetString();
        var operation = request.Parameters.GetProperty("operation").GetString();
        
        // Determine which specialized tool to use
        string targetTool = DetermineTargetTool(contentType, operation);
        
        // Forward to the specialized tool
        var specializedResponse = await _mcpClient.ExecuteToolAsync(
            targetTool,
            new { content, options = GetOptionsForTool(targetTool, operation) }
        );
        
        return new ToolResponse { Result = specializedResponse.Result };
    }
    
    private string DetermineTargetTool(string contentType, string operation)
    {
        return (contentType, operation) switch
        {
            ("text", "summarize") => "textSummarizer",
            ("text", "analyze") => "textAnalyzer",
            ("html", _) => "htmlProcessor",
            ("markdown", _) => "markdownProcessor",
            ("csv", _) => "csvProcessor",
            ("code", _) => "codeAnalyzer",
            _ => throw new ToolExecutionException($"No tool available for {contentType}/{operation}")
        };
    }
    
    private object GetOptionsForTool(string toolName, string operation)
    {
        // Return appropriate options for each specialized tool
        return toolName switch
        {
            "textSummarizer" => new { length = "medium" },
            "htmlProcessor" => new { cleanUp = true, operation },
            // Options for other tools...
            _ => new { }
        };
    }
}
```

### 3. ಸಮಪಾಲು ಪ್ರಕ್ರಿಯೆ ಮಾದರಿ

ಕಾರ್ಯಕ್ಷಮತೆಗಾಗಿ ಬಹುಸಾಧನಗಳನ್ನು ಒಂದೇ ಸಮಯದಲ್ಲಿ ಜಾರಿಗೊಳಿಸಿ:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // ಹಂತ 1: ಡೇಟಾಸೆಟ್ ಮೆಟಾಡೇಟಾ ಪಡೆಯಿರಿ (ಸಿಂಕ್ರೋನಸ್)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // ಹಂತ 2: ಬಹು ವಿಶ್ಲೇಷಣೆಗಳನ್ನು ಸಮಾನಾಂತರವಾಗಿ ಪ್ರಾರಂಭಿಸಿ
        CompletableFuture<ToolResponse> statisticalAnalysis = CompletableFuture.supplyAsync(() ->
            mcpClient.executeTool("statisticalAnalysis", Map.of(
                "datasetId", datasetId,
                "type", "comprehensive"
            ))
        );
        
        CompletableFuture<ToolResponse> correlationAnalysis = CompletableFuture.supplyAsync(() ->
            mcpClient.executeTool("correlationAnalysis", Map.of(
                "datasetId", datasetId,
                "method", "pearson"
            ))
        );
        
        CompletableFuture<ToolResponse> outlierDetection = CompletableFuture.supplyAsync(() ->
            mcpClient.executeTool("outlierDetection", Map.of(
                "datasetId", datasetId,
                "sensitivity", "medium"
            ))
        );
        
        // ಎಲ್ಲಾ ಸಮಾನಾಂತರ ಕಾರ್ಯಗಳು ಪೂರ್ಣಗೊಳ್ಳುವವರೆಗೂ ಕಾಯಿರಿ
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // ಪೂರ್ಣಗೊಂಡ ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಕಾಯಿರಿ
        
        // ಹಂತ 3: ಫಲಿತಾಂಶಗಳನ್ನು ಸಂಯೋಜಿಸಿ
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // ಹಂತ 4: ಸಂಕ್ಷಿಪ್ತ ವರದಿಯನ್ನು ರಚಿಸಿ
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // ಸಂಪೂರ್ಣ ಕಾರ್ಯಪ್ರವಾಹ ಫಲಿತಾಂಶವನ್ನು ಹಿಂತಿರುಗಿಸಿ
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. ದೋಷ ಪುನರುದ್ಧಾರ ಮಾದರಿ

ಸಾಧನ ವೈಫಲ್ಯಕ್ಕೆ ಶ್ರೇಯೋಭಿವೃದ್ಧಿ ಬ್ಯಾಕಪ್‌ಗಳನ್ನು ಜಾರಿಗೊಳಿಸಿ:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # ಮೊದಲು ಪ್ರಾಥಮಿಕ ಸಾಧನವನ್ನು ಪ್ರಯತ್ನಿಸಿ
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # ವೈಫಲ್ಯವನ್ನು ಲಾಗ್ ಮಾಡಿ
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # ದ್ವಿತೀಯ ಸಾಧನಕ್ಕೆ ಮರಳಿ ಬನ್ನಿ
            try:
                # ಮರಳಿ ಬರುವ ಸಾಧನಕ್ಕಾಗಿ ನಿಯಮಗಳನ್ನು ಪರಿವರ್ತನೆ ಮಾಡಲು ಅವಶ್ಯಕತೆ ಇರಬಹುದು
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # ಎರಡೂ ಸಾಧನಗಳು ವಿಫಲವಾದವು
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # ಈ ಅನುಷ್ಠಾನವು ನಿರ್ದಿಷ್ಟ ಸಾಧನಗಳ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ
        # ಈ ಉದಾಹರಣೆಗೆ, ನಾವು ಮೂಲ ನಿಯಮಗಳನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತೇವೆ
        return params

# ಉದಾಹರಣೆಯ ಬಳಕೆ
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # ಪ್ರಾಥಮಿಕ (ಪಾವತಿಸಿದ) ಹವಾಮಾನ API
        "basicWeatherService",    # ಮರಳಿ ಬರುವ ( ಉಚಿತ) ಹವಾಮಾನ API
        {"location": location}
    )
```

### 5. ಕಾರ್ಯವಾಹಿ ಸಂಯೋಜನೆ ಮಾದರಿ

ಸರಳ ಕಾರ್ಯವಾಹಿಗಳನ್ನು ಸಂಯೋಜಿಸುವ ಮೂಲಕ ಸಂಕೀರ್ಣ ಕಾರ್ಯವಾಹಿಗಳನ್ನು ರಚಿಸಿ:

```csharp
public class CompositeWorkflow : IWorkflow
{
    private readonly List<IWorkflow> _workflows;
    
    public CompositeWorkflow(IEnumerable<IWorkflow> workflows)
    {
        _workflows = new List<IWorkflow>(workflows);
    }
    
    public async Task<WorkflowResult> ExecuteAsync(WorkflowContext context)
    {
        var results = new Dictionary<string, object>();
        
        foreach (var workflow in _workflows)
        {
            var workflowResult = await workflow.ExecuteAsync(context);
            
            // Store each workflow's result
            results[workflow.Name] = workflowResult;
            
            // Update context with the result for the next workflow
            context = context.WithResult(workflow.Name, workflowResult);
        }
        
        return new WorkflowResult(results);
    }
    
    public string Name => "CompositeWorkflow";
    public string Description => "Executes multiple workflows in sequence";
}

// Example usage
var documentWorkflow = new CompositeWorkflow(new IWorkflow[] {
    new DocumentFetchWorkflow(),
    new DocumentProcessingWorkflow(),
    new InsightGenerationWorkflow(),
    new ReportGenerationWorkflow()
});

var result = await documentWorkflow.ExecuteAsync(new WorkflowContext {
    Parameters = new { documentId = "12345" }
});
```

# MCP ಸರ್ವರ್‌ಗಳ ಪರೀಕ್ಷೆ: ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು ಮತ್ತು ಪ್ರಮುಖ ಸಲಹೆಗಳು

## ಅವಲೋಕನ

ಪರೀಕ್ಷೆ MCP ಸರ್ವರ್‌ಗಳ ಉಳಿವು, ಉನ್ನತ ಗುಣಮಟ್ಟದ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿ ಮುಖ್ಯಭಾಗ ವಹಿಸುತ್ತದೆ. ಈ ಮಾರ್ಗದರ್ಶಿಯಲ್ಲಿ ಘಟಕ ಪರೀಕ್ಷೆಯಿಂದ ಇಂಟಿಗ್ರೇಶನ್ ಮತ್ತು ಪೂರ್ಣವಿಧಿ ಪರಿಶೀಲನೆಗಳವರೆಗೆ ನಿಮ್ಮ MCP ಸರ್ವರ್‌ಗಳ ಅಭಿವೃದ್ಧಿ ಜೀವನಚರ್ಯೆದಲ್ಲಿ ವಿಸ್ತೃತ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು ಮತ್ತು ಸಲಹೆಗಳು ನೀಡಲಾಗಿದೆ.

## ಯಾಕೆ MCP ಸರ್ವರ್‌ಗಳ ಪರೀಕ್ಷೆ ಮುಖ್ಯ?

MCP ಸರ್ವರ್‌ಗಳು AI ಮಾದರಿಗಳ ಮತ್ತು ಗ್ರಾಹಕ ಅನ್ವಯಿಕೆಗಳ ನಡುವಣ ಮುಖ್ಯ ಮಧ್ಯಮ ಸ್ಥಿತಿಸ್ಥಾಪಕವಾಗಿವೆ. ಸಮಗ್ರ ಪರೀಕ್ಷೆಯು ಕಾಣಿಸುತ್ತದೆ:

- ಉತ್ಪಾ ದನಾ ಪರಿಸರದಲ್ಲಿ ವಿಶ್ವಸನೀಯತೆ
- ವಿನಂತಿಗಳು ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆಗಳ ನಿಖರ ನಿರ್ವಹಣೆ
- MCP ವಿಶೇಷಣಗಳ ಸರಿಯಾದ ಜಾರಿಗೊಳಿಸುವಿಕೆ
- ವೈಫಲ್ಯಗಳು ಮತ್ತು ಅಂಚು ಪ್ರಕರಣಗಳ ವಿರುದ್ಧ ಪ್ರತಿರೋಧ
- ವಿವಿಧ ಒತ್ತಡದಡಿಯಲ್ಲಿ ಸಮನ್ವಿತ ಕಾರ್ಯಾಗಾರ

## MCP ಸರ್ವರ್‌ಗಳಿಗೆ ಘಟಕ ಪರೀಕ್ಷೆ

### ಘಟಕ ಪರೀಕ್ಷೆ (ಆಧಾರ)

ಘಟಕ ಪರೀಕ್ಷೆಗಳು ನಿಮ್ಮ MCP ಸರ್ವರ್‌ನ ಪ್ರತ್ಯೇಕ ಘಟಕಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಪರಿಶೀಲಿಸುತ್ತವೆ.

#### ಏನನ್ನು ಪರೀಕ್ಷಿಸಬೇಕು

1. **ಸಂಪನ್ಮೂಲ ಹ್ಯಾಂಡ್ಲರ್‌ಗಳು**: ಪ್ರತಿ ಸಂಪನ್ಮೂಲ ಹ್ಯಾಂಡ್ಲರ್ ಲಾಜಿಕ್ನ ಸ್ವತಂತ್ರ ಪರೀಕ್ಷೆ
2. **ಸಾಧನ ಜಾರಿಗೊಳಿಸುವಿಕೆಗಳು**: ವಿಭಿನ್ನ ಇನ್ಪುಟ್‌ಗಳೊಂದಿಗೆ ಸಾಧನ ವರ್ತನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ
3. **ಪ್ರಾಂಪ್ಟ್ ಟೆಂಪ್ಲೇಟುಗಳು**: ಪ್ರಾಂಪ್ಟ್ ಟೆಂಪ್ಲೇಟುಗಳು ಸರಿಯಾಗಿ ರೆಂಡರ್ ಆಗುತ್ತಿವೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿ
4. **ರೂಪರೇಖೆ ಮಾನ್ಯತೆ**: ಪರಿಮಿತಿ ಮಾನ್ಯತಾ ಲಾಜಿಕ್ನ ಪರೀಕ್ಷೆ
5. **ದೋಷ ನಿರ್ವಹಣೆ**: ಅಮಾನ್ಯ ಇನ್ಪುಟ್‌ಗೆ ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪರಿಶೀಲಿಸಿ

#### ಘಟಕ ಪರೀಕ್ಷೆಗೆ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

```csharp
// Example unit test for a calculator tool in C#
[Fact]
public async Task CalculatorTool_Add_ReturnsCorrectSum()
{
    // Arrange
    var calculator = new CalculatorTool();
    var parameters = new Dictionary<string, object>
    {
        ["operation"] = "add",
        ["a"] = 5,
        ["b"] = 7
    };
    
    // Act
    var response = await calculator.ExecuteAsync(parameters);
    var result = JsonSerializer.Deserialize<CalculationResult>(response.Content[0].ToString());
    
    // Assert
    Assert.Equal(12, result.Value);
}
```

```python
# ಪೈಥಾನ್‌ನಲ್ಲಿ ಕ್ಯಾಲ್ಕ್ಯುಲೇಟರ್ ಉಪಕರಣಕ್ಕೆ ಉದಾಹರಣೆ ಘಟಕ ಪರೀಕ್ಷೆ
def test_calculator_tool_add():
    # ವ್ಯವಸ್ಥೆ ಮಾಡು
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # ಕ್ರಮ ಕೈಗೊಳ್ಳು
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # ಖಚಿತಪಡಿಸಿಕೊಳ್ಳು
    assert result["value"] == 12
```

### ಸಂಯೋಜನೆ ಪರೀಕ್ಷೆ (ಮಧ್ಯಮ ಪದವಿ)

ಸಂಯೋಜನೆ ಪರೀಕ್ಷೆಗಳು MCP ಸರ್ವರ್‌ನ ಘಟಕಗಳ ನಡುವೆ ಸಂವಾದಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತವೆ.

#### ಏನನ್ನು ಪರೀಕ್ಷಿಸಬೇಕು

1. **ಸರ್ವರ್ ಆರಂಭ**: ವಿಭಿನ್ನ ಸಂರಚನೆಗಳೊಂದಿಗೆ ಸರ್ವರ್ ಪ್ರಾರಂಭವನ್ನು ಪರೀಕ್ಷಿಸಿ
2. **ರూట್ ನೋಂದಣಿ**: ಎಲ್ಲ ಅಂತಿಮ ಬಿಂದುಗಳು ಸರಿಯಾಗಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ ಎಂದು ಪರಿಶೀಲಿಸಿ
3. **ವಿನಂತಿ ಪ್ರಕ್ರಿಯೆ**: ಸಂಪೂರ್ಣ ವಿನಂತಿ-ಪ್ರತಿಕ್ರಿಯೆ ಚಕ್ರವನ್ನು ಪರೀಕ್ಷಿಸಿ
4. **ದೋಷ ಪ್ರಸರಣ**: ಘಟಕಗಳ ನಡುವೆ ದೋಷಗಳು ಹೇಗೆ ನಿರ್ವಹಿಸಲ್ಪಡುತ್ತವೆಯೋ ಖಚಿತಪಡಿಸಿ
5. **ಪ್ರಮಾಣೀಕರಣ ಮತ್ತು ಅನುಮತಿ**: ಭದ್ರತಾ ಕ್ರಿಯಾವಳಿಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ

#### ಸಂಯೋಜನೆ ಪರೀಕ್ಷೆಗೆ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

```csharp
// Example integration test for MCP server in C#
[Fact]
public async Task Server_ProcessToolRequest_ReturnsValidResponse()
{
    // Arrange
    var server = new McpServer();
    server.RegisterTool(new CalculatorTool());
    await server.StartAsync();
    
    var request = new McpRequest
    {
        Tool = "calculator",
        Parameters = new Dictionary<string, object>
        {
            ["operation"] = "multiply",
            ["a"] = 6,
            ["b"] = 7
        }
    };
    
    // Act
    var response = await server.ProcessRequestAsync(request);
    
    // Assert
    Assert.NotNull(response);
    Assert.Equal(McpStatusCodes.Success, response.StatusCode);
    // Additional assertions for response content
    
    // Cleanup
    await server.StopAsync();
}
```

### ಪೂರ್ಣವಿಧಿ ಪರೀಕ್ಷೆ (ಎತ್ತರದ ಪದವಿ)

ಪೂರ್ಣವಿಧಿ ಪರೀಕ್ಷೆಗಳು ಗ್ರಾಹಕದಿಂದ ಸರ್ವರ್‌ಗೆ ಪೂರ್ಣ ವ್ಯವಸ್ಥೆಯ ವರ್ತನೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತವೆ.

#### ಏನನ್ನು ಪರೀಕ್ಷಿಸಬೇಕು

1. **ಗ್ರಾಹಕ-ಸರ್ವರ್ ಸಂವಹನ**: ಪೂರ್ಣ ವಿನಂತಿ-ಪ್ರತಿಕ್ರಿಯೆ ಚಕ್ರಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ
2. **ನೈಜ ಗ್ರಾಹಕ SDKಗಳು**: ನೈಜ ಗ್ರಾಹಕ ಜಾರಿಗೊಳಿಸುವಿಕೆಗಳೊಂದಿಗೆ ಪರೀಕ್ಷಿಸಿರಿ
3. **ಒತ್ತಡದಡಿಯಲ್ಲಿ ಕಾರ್ಯಕ್ಷಮತೆ**: ಅನೇಕ ಸಮಕಾಲೀನ ವಿನಂತಿಗಳೊಂದಿಗೆ ಕಾರ್ಯನಿರ್ವಹಣೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ
4. **ದೋಷ ಪುನರುದ್ಧಾರ**: ವೈಫಲ್ಯಗಳಿಂದ ವ್ಯವಸ್ಥೆಯ ಪುನರುತ್ಥಾನವನ್ನು ಪರೀಕ್ಷಿಸಿ
5. **ದೀರ್ಘಕಾಲಿಕ ಕಾರ್ಯಾಚರಣೆಗಳು**: ಸ್ಟ್ರೀಮಿಂಗ್ ಮತ್ತು ದೀರ್ಘ ಕಾರ್ಯಾಚರಣೆಗಳ ನಿರ್ವಹಣೆಯನ್ನು ಖಚಿತಪಡಿಸಿ

#### E2E ಪರೀಕ್ಷೆಗೆ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು

```typescript
// ಟೈಪ್‌ಸ್ಕ್ರಿಪ್ಟ್‌ನಲ್ಲಿ ಕ್ಲೈಂಟ್ ಜೊತೆಗೆ ಉದಾಹರಣೆಯ E2E ಪರೀಕ್ಷೆ
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // ಪರೀಕ್ಷಾ ವಾತಾವರಣದಲ್ಲಿ ಸರ್ವರ್ ಪ್ರಾರಂಭಿಸಿ
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // ಕ್ರಿಯೆ
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // ದೃಢಪಡಿಸಿ
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP ಪರೀಕ್ಷೆಗೆ ಮೌಕಿಂಗ್ ತಂತ್ರಗಳು

ಪರೀಕ್ಷೆಯ ಸಮಯದಲ್ಲಿ ಘಟಕಗಳನ್ನು ಪ್ರತ್ಯೇಕಗೊಳಿಸುವುದಕ್ಕೆ ಮೌಕಿಂಗ್ ಅಗತ್ಯ.

### ಮೌಕ್ ಮಾಡಬೇಕಾದ ಘಟಕಗಳು

1. **ಹೊರಗಿನ AI ಮಾದರಿಗಳು**: ನಿರೀಕ್ಷಿತ ಪರೀಕ್ಷೆಗೆ ಮಾದರಿ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಮೌಕ್ ಮಾಡಿ
2. **ಹೊರಗಿನ ಸೇವೆಗಳು**: API ಅವಲಂಬನೆಗಳನ್ನು (ಡೇಟಾಬೇಸ್‌ಗಳು, ಮೂರನೇ ಪಕ್ಷದ ಸೇವೆಗಳು) ಮೌಕ್ ಮಾಡಿ
3. **ಪ್ರಮಾಣೀಕರಣ ಸೇವೆಗಳು**: ಗುರುತಿಸಿಕೊಳ್ಳುವವರನ್ನು ಮೌಕ್ ಮಾಡಿ
4. **ಸಂಪನ್ಮೂಲ ಒದಗಿಸುವವರು**: ದುಬಾರಿ ಸಂಪನ್ಮೂಲ ಹ್ಯಾಂಡ್ಲರ್‌ಗಳನ್ನು ಮೌಕ್ ಮಾಡಿ

### ಉದಾಹರಣೆ: AI ಮಾದರಿ ಪ್ರತಿಕ್ರಿಯೆ ಮೌಕಿಂಗ್

```csharp
// C# example with Moq
var mockModel = new Mock<ILanguageModel>();
mockModel
    .Setup(m => m.GenerateResponseAsync(
        It.IsAny<string>(),
        It.IsAny<McpRequestContext>()))
    .ReturnsAsync(new ModelResponse { 
        Text = "Mocked model response",
        FinishReason = FinishReason.Completed
    });

var server = new McpServer(modelClient: mockModel.Object);
```

```python
# Python ಉದಾಹರಣೆ unittest.mock ನೊಂದಿಗೆ
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # mock ಅನ್ನು ಸಂರಚನೆ ಮಾಡಿ
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # ಪರೀಕ್ಷೆಯಲ್ಲಿ mock ಅನ್ನು ಬಳಸಿರಿ
    server = McpServer(model_client=mock_model)
    # ಪರೀಕ್ಷೆ ಮುಂದುವರೆಸಿ
```

## ಕಾರ್ಯಕ್ಷಮತೆ ಪರೀಕ್ಷೆ

ಕಾರ್ಯಕ್ಷಮತೆ ಪರೀಕ್ಷೆ ಉತ್ಪಾದನಾ MCP ಸರ್ವರ್‌ಗಳಿಗೆ ಬಹುಮುಖ್ಯ.

### ಯಾವುದನ್ನು ಅಳೆಯಬೇಕು

1. **ವಿಳಂಬ**: ವಿನಂತಿಗಳ ಪ್ರತಿಕ್ರಿಯೆಗೆ ಉಡುಪಿನ ಸಮಯ
2. **ಥ್ರೂಪುಟ್**: ಸೆಕೆಂಡಿಗೆ ನಿಭಾಯಿಸುವ ವಿನಂತಿಗಳ ಸಂಖ್ಯೆ
3. **ಸಂಪನ್ಮೂಲ ಬಳಕೆ**: CPU, ಮೆಮೊರಿ, ನೆಟ್‌ವರ್ಕ್ ಬಳಕೆ
4. **ಸಮಕಾಲೀನ ನಿರ್ವಹಣೆ**: ಸಮಕಾಲೀನ ವಿನಂತಿಗಳಲ್ಲಿನ ವರ್ತನೆ
5. **ವಿಸ್ತರಣೆ ಲಕ್ಷಣಗಳು**: ಒತ್ತಡ ಹೆಚ್ಚಾದರೆ ಕಾರ್ಯಕ್ಷಮತೆ

### ಕಾರ್ಯಕ್ಷಮತೆ ಪರೀಕ್ಷೆಗೆ ಉಪಕರಣಗಳು

- **k6**: ಓಪನ್-ಸೋರ್ಸ್ ಲೋಡ್ ಟೆಸ್ಟಿಂಗ್ ಸಾಧನ
- **JMeter**: ವ್ಯಾಪಕ ಕಾರ್ಯಕ್ಷಮತೆ ಪರೀಕ್ಷೆ
- **Locust**: ಪೈಥಾನ್ ಆಧಾರಿತ ಲೋಡ್ ಪರೀಕ್ಷೆ
- **Azure Load Testing**: ಕ್ಲೌಡ್ ಆಧಾರಿತ ಕಾರ್ಯಕ್ಷಮತೆ ಪರೀಕ್ಷೆ

### ಉದಾಹರಣೆ: k6 ಮೂಲಕ ಮೂಲಭೂತ ಲೋಡ್ ಟೆಸ್ಟ್

```javascript
// MCP ಸರ್ವರ್ ಲೋಡ್ ಪರೀಕ್ಷೆಗೆ k6 ಸ್ಕ್ರಿಪ್ಟ್
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 ನಕಲಿ ಬಳಕೆದಾರರು
  duration: '30s',
};

export default function () {
  const payload = JSON.stringify({
    tool: 'calculator',
    parameters: {
      operation: 'add',
      a: Math.floor(Math.random() * 100),
      b: Math.floor(Math.random() * 100)
    }
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-token'
    },
  };

  const res = http.post('http://localhost:5000/api/tools/invoke', payload, params);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

## MCP ಸರ್ವರ್‌ಗಳಿಗೆ ಟೆಸ್ಟ್ ಸ್ವಯಂಕ್ರಿಯೆ

ನಿಮ್ಮ ಪರೀಕ್ಷೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುವ ಮೂಲಕ ಉತ್ತಮ ಗುಣಮಟ್ಟ ಮತ್ತು ದ್ರುತ ಪ್ರತಿಕ್ರಿಯಾ ಚಕ್ರಗಳನ್ನು ಖಚಿತಮಾಡಿ.

### CI/CD ಏಕೀಕರಣ

1. **ಪುಲ್ ವಿನಂತಿಗಳ ನಲ್ಲಿ ಘಟಕ ಪರೀಕ್ಷೆಗಳನ್ನು ಚಾಲನೆ ಮಾಡಿ**: ಕೋಡ್ ಬದಲಾವಣೆಗಳಿಂದ ಇದ್ದಂತಹ ಕಾರ್ಯಚಟುವಟಿಕೆ ಒಡೆತನವಾಗದಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ
2. **ಸ್ಟೇಜಿಂಗ್‌ನಲ್ಲಿ ಇಂಟಿಗ್ರೇಷನ್ ಪರೀಕ್ಷೆಗಳು**: ಪೂರ್ವ ಉತ್ಪಾದನಾ ಪರಿಸರಗಳಲ್ಲಿ ಇಂಟಿಗ್ರೇಷನ್ ಪರೀಕ್ಷೆಗಳನ್ನು ನಡೆಸಿ
3. **ಕಾರ್ಯಕ್ಷಮತೆ ಬೇಸ್‌ಲೈನ್ಸ್**: ಹಿಂದುಳಿದತೆಗಳನ್ನು ಕಾಣಲು ಕಾರ್ಯಕ್ಷಮತೆ ಮಾನದಂಡಗಳನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ
4. **ಸುರಕ್ಷತಾ ಸ್ಕ್ಯಾನ್ಗಳು**: ಪೈಪಲೈನಿನ ಭಾಗವಾಗಿ ಸ್ವಯಂಚಾಲಿತ ಸುರಕ್ಷತಾ ಪರೀಕ್ಷೆಗಳನ್ನು ನಡೆಸಿ

### ಉದಾಹರಣೆ ಸಿಐ ಪೈಪಲೈನ್ (GitHub ಕ್ರಿಯೆಗಳು)

```yaml
name: MCP Server Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Runtime
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: '8.0.x'
    
    - name: Restore dependencies
      run: dotnet restore
    
    - name: Build
      run: dotnet build --no-restore
    
    - name: Unit Tests
      run: dotnet test --no-build --filter Category=Unit
    
    - name: Integration Tests
      run: dotnet test --no-build --filter Category=Integration
      
    - name: Performance Tests
      run: dotnet run --project tests/PerformanceTests/PerformanceTests.csproj
```

## MCP ಸ್ಪೆಸಿಫಿಕೇಶನ್‌ಗಾಗಿ ಅನುಕ್ರಮಣಿಕೆ ಪರೀಕ್ಷೆ

ನಿಮ್ಮ ಸರ್ವರ್ ಸರಿಯಾಗಿ MCP ಸ್ಪೆಸಿಫಿಕೇಶನ್ ಅನ್ನು ಜಾರಿಗೊಳಿಸುತ್ತಿದೆ ಎಂದು ದೃಢೀಕರಿಸಿ.

### ಮುಖ್ಯ ಅನುಕ್ರಮಣಿಕೆ ಪ್ರದೇಶಗಳು

1. **API ಎಂಡ್‌ಪಾಯಿಂಟ್‌ಗಳು**: ಅಗತ್ಯವಿರುವ ಎಂಡ್‌ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ (/resources, /tools ಮುಂತಾದವು)
2. ** ವಿನಂತಿ/ಪ್ರತಿಕ್ರಿಯಾ ಫಾರ್ಮ್ಯಾಟ್**: ಸ್ಕೀಮಾ ಅನುಕ್ರಮಣಿಕೆಯನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ
3. **ದೋಷ ಕೋಡ್‌ಗಳು**: ವಿವಿಧ ಸಂದರ್ಭಗಳಿಗಾಗಿ ಸರಿಯಾದ ಸ್ಥಿತಿಗತಿಕೋಡ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ
4. **ವಿಷಯ ತರಗತಿಗಳು**: ಬಗೆಬಗೆಯ ವಿಷಯ ತರಗತಿಗಳ ನಿರ್ವಹಣೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ
5. **ಪ್ರಮಾಣೀಕರಣ ಹರಿವು**: ಸ್ಪೆಕ್-ಅನುಕ್ರಮಣಿಕೆಯ ಮಾನ್ಯತೆ ಮೆಕ್ಯಾನಿಸಂಗಳನ್ನು ಪರಿಶೀಲಿಸಿ

### ಅನುಕ್ರಮಣಿಕೆ ಟೆಸ್ಟ್ ಸೂಟ್

```csharp
[Fact]
public async Task Server_ResourceEndpoint_ReturnsCorrectSchema()
{
    // Arrange
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", "Bearer test-token");
    
    // Act
    var response = await client.GetAsync("http://localhost:5000/api/resources");
    var content = await response.Content.ReadAsStringAsync();
    var resources = JsonSerializer.Deserialize<ResourceList>(content);
    
    // Assert
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    Assert.NotNull(resources);
    Assert.All(resources.Resources, resource => 
    {
        Assert.NotNull(resource.Id);
        Assert.NotNull(resource.Type);
        // Additional schema validation
    });
}
```

## ಪರಿಣಾಮಕಾರಿ MCP ಸರ್ವರ್ ಪರೀಕ್ಷೆಗಾಗಿ ಟಾಪ್ 10 ಸಲಹೆಗಳು

1. **ಟೂಲ್ ವ್ಯಾಖ್ಯಾನಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಪರೀಕ್ಷಿಸಿ**: ಟೂಲ್ ಲಾಜಿಕ್‌ನಿಂದ ಪ್ರತ್ಯೇಕವಾಗಿ ಸ್ಕೀಮಾ ವ್ಯಾಖ್ಯಾನಗಳನ್ನು ಪರಿಶೀಲಿಸಿ
2. **ಪ್ಯಾರಾಮೆಟರ್‌ಗಳುಳ್ಳ ಟೆಸ್ಟ್‌ಗಳನ್ನು ಬಳಸಿ**: ವಿವಿಧ ಇನ್‌ಪುಟ್‌ಗಳೊಂದಿಗೆ, ಅಡ್ಡದೃಷ್ಟಿ ಪ್ರಕರಣಗಳು ಒಳಗೊಂಡಂತೆ, ಟೂಲ್‌ಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ
3. **ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ**: ಎಲ್ಲಾ ಸಾಧ್ಯ ದೋಷ ಪರಿಸ್ಥಿತಿಗಳಿಗಾಗಿ ಸರಿಯಾದ ದೋಷ ನಿರ್ವಹಣೆಯನ್ನು ಪರಿಶೀಲಿಸಿ
4. **ಅಧಿಕಾರ ಲಾಜಿಕ್ ಪರೀಕ್ಷಿಸಿ**: ವಿವಿಧ ಬಳಕೆದಾರ ಪಾತ್ರಗಳಿಗಾಗಿ ಸರಿಯಾದ ಪ್ರಾಪ್ತಿಯ ನಿಯಂತ್ರಣವನ್ನು ಖಚಿತಪಡಿಸಿ
5. **ಪರೀಕ್ಷಾ ವ್ಯಾಪ್ತಿಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ**: ಪ್ರಮುಖ ಮಾರ್ಗ ಕೋಡ್‌ನ ಹೆಚ್ಚಿನ ವ್ಯಾಪ್ತಿಗೆ ಧ್ಯಾನ ಕೊಡಿ
6. **ಸ್ಟ್ರೀಮಿಂಗ್ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ**: ಸ್ಟ್ರೀಮಿಂಗ್ ವಿಷಯದ ಸರಿಯಾದ ನಿರ್ವಹಣೆಯನ್ನು ಪರಿಶೀಲಿಸಿ
7. **ನೆಟ್ವರ್ಕ್ ಸಮಸ್ಯೆಗಳನ್ನು ಅನುಕರಿಸಿ**: ದುರ್ಬಲ ನೆಟ್ವರ್ಕ್ ಪರಿಸ್ಥಿತಿಗಳಲ್ಲಿ ಪ್ರವರ್ತನೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ
8. **ಸಂಪನ್ಮೂಲ ಮಿತಿಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ**: ಕಾರ್ಮಿಕತೆ ಅಥವಾ ದರ ಮಿತಿಗಳನ್ನು ತಲುಪಿದಾಗ ಪ್ರವರ್ತನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ
9. **ಹಿಂದುಳಿದ ಪರೀಕ್ಷೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸಿ**: ಪ್ರತಿ ಕೋಡ್ ಬದಲಾವಣೆಗೂ ನಡೆಯುವ ಸೂಟನ್ನು ನಿರ್ಮಿಸಿ
10. **ಟೆಸ್ಟ್ ಪ್ರಕರಣಗಳನ್ನು ದಾಖಲೆ ಮಾಡಿ**: ಪರೀಕ್ಷಾ ಸಂದರ್ಭಗಳ ಸ್ಪಷ್ಟ ದಾಖಲೆಗಳನ್ನು ಕಾಪಾಡಿ

## ಸಾಮಾನ್ಯ ಪರೀಕ್ಷಾ ವ್ಯತ್ಯಾಸಗಳು

- **ಸಂತೋಷಕರ ಮಾರ್ಗದ ಪರೀಕ್ಷೆಯ ಮಿತಿಯಾದ ನಂಬಿಕೆ**: ದೋಷ ಪ್ರಕರಣಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಪರೀಕ್ಷಿಸುವುದನ್ನು ಖಚಿತಪಡಿಸಿ
- **ಕಾರ್ಯಕ್ಷಮತೆ ಪರೀಕ್ಷೆಯನ್ನು ತ್ಯಜಿಸುವುದು**: ಉತ್ಪಾದನೆಗೆ ಪ್ರಭಾವ ಬೀರುವ ಮೊದಲು ತಡೆಬರುವ ಅಡೆತಡಿ ಗುರುತಿಸಿ
- **ಒಂಟಿತನದಲ್ಲಿ ಮಾತ್ರ ಪರೀಕ್ಷೆ**: ಘಟಕ, ಇಂಟಿಗ್ರೇಷನ್ ಮತ್ತು ಎ2ಇ ಪರೀಕ್ಷೆಗಳನ್ನು ಸಂಯೋಜಿಸಿ
- **ಅಪೂರ್ಣ API ವ್ಯಾಪ್ತಿ**: ಎಲ್ಲಾ ಎಂಡ್‌ಪಾಯಿಂಟ್‌ಗಳು ಮತ್ತು ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಪರೀಕ್ಷಿಸಲಾಗುತ್ತದೆ ಎಂದು ಖಚಿತಪಡಿಸಿ
- **ಅನಿಯಮಿತ ಪರೀಕ್ಷಾ ಪರಿಸರಗಳು**: ಸ್ಥಿರ ಪರೀಕ್ಷಾ ಪರಿಸರಗಳನ್ನು ಖಚಿತಪಡಿಸಲು ಕಾಂಟೈನರ್‌ಗಳನ್ನು ಬಳಸಿ

## ತಿರುಗುಮಟ

ವಿಶ್ವಾಸಾರ್ಹ, ಉನ್ನತ ಗುಣಮಟ್ಟದ MCP ಸರ್ವರ್‌ಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಲು ಸಮಗ್ರ ಪರೀಕ್ಷಾ ತಂತ್ರವು ಅಗತ್ಯವಿದೆ. ಈ ಮಾರ್ಗದರ್ಶಿಯಲ್ಲಿ ಉಲ್ಲೇಖಿಸಿರುವ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು ಮತ್ತು ಸಲಹೆಗಳನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸುವ ಮೂಲಕ, ನೀವು ನಿಮ್ಮ MCP ಜಾರಿಗೊಳಿಕೆಗಳು ಅತ್ಯುಚ್ಚ ಗುಣಮಟ್ಟ, ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆಯ ಮಾನದಂಡಗಳನ್ನು ಪೂರೈಸುವಂತೆ ನೋಡಿಕೊಳ್ಳಬಹುದು.

## ಪ್ರಮುಖ ತಿಳಿವಳಿಕೆಗಳು

1. **ಟೂಲ್ ವಿನ್ಯಾಸ**: ಏಕ ಜವಾಬ್ದಾರಿ ಸ 원칙 ಪಾಲಿಸಿ, ಅವಲಂಬನೆ ಇಂಜೆಕ್ಷನ್‌ ಬಳಸಿ, ಮತ್ತು ಸಂಯೋಜನೀಯತೆಗಾಗಿ ವಿನ್ಯಾಸ ಗೊಳಿಸಿ
2. **ಸ್ಕೀಮಾ ವಿನ್ಯಾಸ**: ಸ್ಫಟಿಕ, ಚೆನ್ನಾಗಿ ದಾಖಲಾಗಿರುವ ಸ್ಕೀಮಾಗಳು ಮತ್ತು ಸರಿಯಾದ ಮಾನ್ಯತೆ ನಿಯಮಗಳನ್ನು ರಚಿಸಿ
3. **ದೋಷ ನಿರ್ವಹಣೆ**: ಸೌಮ್ಯ ದೋಷ ನಿರ್ವಹಣೆ, ಸಂರಚಿತ ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಮತ್ತು ಮರುಪ್ರಯತ್ನ ತಂತ್ರಗಳನ್ನು ಜಾರಿಗೊಳಿಸಿ
4. **ಕಾರ್ಯಕ್ಷಮತೆ**: ಕ್ಯಾಶಿಂಗ್, ಅಸಿಂಕ್ರೋನಸ್ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ಸಂಪನ್ಮೂಲ ನಿಯಂತ್ರಣಗಳನ್ನು ಬಳಸಿ
5. **ಸುರಕ್ಷತೆ**: ಸಂಪೂರ್ಣ ಇನ್‌ಪುಟ್ ಮಾನ್ಯತೆ, ಪ್ರಾಧಿಕರ ಪರಿಶೀಲನೆ ಮತ್ತು ಸಂವೇದನಶೀಲ ದತ್ತಾಂಶ ನಿರ್ವಹಣೆಯನ್ನು ಅನ್ವಯಿಸಿ
6. **ಪರೀಕ್ಷೆ**: ಸಮಗ್ರ ಘಟಕ, ಇಂಟಿಗ್ರೇಷನ್ ಮತ್ತು ಅಂತಿಮ-ಮುಗಿಲು ಪರೀಕ್ಷೆಗಳನ್ನು ರಚಿಸಿ
7. **ಕಾರ್ಯಪ್ರವಾಹ ಮಾದರಿಗಳು**: ಸರಣಿಗಳು, ಡಿಸ್ಪ್ಯಾಚರ್ಸ್ ಮತ್ತು ಸಮಾಂತರ ಪ್ರಕ್ರಿಯೆಗಳಂತಹ ಸ್ಥಾಪಿತ ಮಾದರಿಗಳನ್ನು ಅನ್ವಯಿಸಿ

## ವ್ಯಾಯಾಮ

ಡಾಕ್ಯುಮೆಂಟ್ ಪ್ರಕ್ರಿಯೆಗಾಗಿ MCP ಟೂಲ್ ಮತ್ತು ಕಾರ್ಯಪ್ರವಾಹವನ್ನು ವಿನ್ಯಾಸ ಮಾಡಿ, ಅದು:

1. ಹಲವು ಫಾರ್ಮ್ಯಾಟ್‌ಗಳಲ್ಲಿ ಡಾಕ್ಯುಮೆಂಟ್‌ಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆ (PDF, DOCX, TXT)
2. ಡಾಕ್ಯುಮೆಂಟ್‌ಗಳಿಂದ ಪಠ್ಯ ಮತ್ತು ಪ್ರಮುಖ ಮಾಹಿತಿಯನ್ನು ಹೊರತೆಗೆಯುತ್ತದೆ
3. ಡಾಕ್ಯುಮೆಂಟ್‌ಗಳನ್ನು ಪ್ರಕಾರ ಮತ್ತು ವಿಷಯದ ಮೂಲಕ ವರ್ಗೀಕರಿಸುತ್ತದೆ
4. ಪ್ರತಿ ಡಾಕ್ಯುಮೆಂಟ್‌ನ ಸಾರಾಂಶವನ್ನು ರಚಿಸುತ್ತದೆ

ಈ ಸಂದರ್ಭದಲ್ಲಿ ಅತ್ಯುತ್ತಮವಾಗಿರುವ ಟೂಲ್ ಸ್ಕೀಮಾಗಳು, ದೋಷ ನಿರ್ವಹಣೆ, ಮತ್ತು ಕಾರ್ಯಪ್ರವಾಹ ಮಾದರಿಯನ್ನು ಜಾರಿಗೊಳಿಸಿ. ಈ ಜಾರಿಗೊಳಿಕೆಯನ್ನು ನೀವು ಹೇಗೆ ಪರೀಕ್ಷಿಸುವಿರೋ ಪರಿಗಣಿಸಿ.

## ಸಂಪನ್ಮೂಲಗಳು

1. MCP ಸಮುದಾಯದಲ್ಲಿ ಸೇರಿ [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) ನಲ್ಲಿ ಇತ್ತೀಚಿನ ಅಭಿವೃದ್ಧಿಗಳನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ
2. ಮುಕ್ತಸೋರ್ಸ್ [MCP ಪ್ರಾಜೆಕ್ಟ್‌ಗಳಲ್ಲಿ](https://github.com/modelcontextprotocol) ಕೊಡುಗೆ ನೀಡಿರಿ
3. ನಿಮ್ಮ ಸಂಸ್ಥೆಯ AI ಉಪಕ್ರಮಗಳಲ್ಲಿ MCP ತತ್ವಗಳನ್ನು ಅನ್ವಯಿಸಿ
4. ನಿಮ್ಮ ಉದ್ಯಮಕ್ಕೆ ವಿಶೇಷ MCP ಜಾರಿಗೊಳಿಕೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ
5. ಬಹು-ಮುದ್ರಣ ಇಂಟಿಗ್ರೇಷನ್ ಅಥವಾ ಎಂಟರ್ಪ್ರೈಸ್ ಅಪ್ಲಿಕೇಶನ್ ಇಂಟಿಗ್ರೇಷನ್ ಮುಂತಾದ ನಿರ್ದಿಷ್ಟ MCP ವಿಷಯಗಳ ಮೇಲೆ ಅદ્યತನ ಕೋರ್ಸುಗಳನ್ನು ಪರಿಗಣಿಸಿ
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) ಮೂಲಕ ಕಲಿತ ತತ್ವಗಳನ್ನು ಬಳಸಿ ನಿಮ್ಮ ಸ್ವಂತ MCP ಟೂಲ್ ಮತ್ತು ಕಾರ್ಯಪ್ರವಾಹಗಳನ್ನು ನಿರ್ಮಿಸುವ ಪ್ರಯೋಗ ಮಾಡಿ

## ಮುಂದೇನು

ಮುಂದೆ: [ಕೇಸ್ ಅಧ್ಯಯನಗಳು](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->