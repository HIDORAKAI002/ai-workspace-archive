# MCP വികസന മികച്ച പ്രവർത്തനരീതികൾ

[![MCP Development Best Practices](../../../translated_images/ml/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(ഈ പാഠത്തിന്റെ വീഡിയോ കാണാൻ മുകളിൽ ചിത്രത്തിൽ ക്ലിക്ക് ചെയ്യുക)_

## അവലോകനം

MCP സെർവറുകളും സവിശേഷതകളും പ്രൊഡക്ഷൻ പരിസ്ഥിതികളിൽ വികസിപ്പിക്കൽ, പരീക്ഷണം, വിന്യസനം എന്നിവയ്ക്കുള്ള പുരോഗമന മികച്ച പ്രവർത്തനരീതികളിൽ ഈ പാഠം കേന്ദ്രീകരിക്കുന്നു. MCP പരിസ്ഥിതികൾ സങ്കീർണ്ണവും പ്രധാനപ്പെട്ടതുമായ സാഹചര്യത്തിലേക്ക് വളർന്നുകൊണ്ടിരിക്കുമ്പോൾ, സ്ഥാപിത മാതൃകകൾ പാലിക്കുന്നത് വിശ്വാസ്യത, പരിപാലനക്ഷമത, ഒപ്പം പരസ്പരപ്രവർത്തിത്വം ഉറപ്പാക്കുന്നു. യഥാർത്ഥ MCP നടപ്പുകളിൽ നിന്ന് ലഭിച്ച പ്രായോഗിക ജ്ഞാനം സംയോജിപ്പിച്ച്, ഫലപ്രദവും കാര്യക്ഷമവുമായ സെർവറുകളും ഫലക്ഷമമായ റിസോഴ്‌സുകളും പ്രാമ്പ്റ്റുകളും ഉപകരണങ്ങളും ആസൂത്രണം ചെയ്യുന്നതിന് ഈ പാഠം ഒരു മാർഗ്ഗനിർദ്ദേശം നൽകുന്നു.

## പഠന ലക്ഷ്യങ്ങൾ

ഈ പാഠം അവസാനിക്കുമ്പോൾ, നിങ്ങൾക്ക് താഴെ കാര്യങ്ങൾ ചെയ്യാൻ കഴിയും:

- MCP സെർവർ, സവിശേഷത ഡിസൈനുകളിൽ വ്യവസായം അംഗീകരിച്ച മികച്ച പ്രവർത്തനരീതികൾ പ്രയോഗിക്കുക
- MCP സെർവറുകൾക്കായി സമഗ്രമായ പരിശോധന രളികളും തയാറാക്കുക
- സങ്കീർണ്ണ MCP അപ്ലിക്കേഷനുകൾക്കായി കാര്യക്ഷമവും പുനരുപയോഗയോഗ്യവുമായ പ്രവൃത്തി പ്രവാഹ മാതൃകകൾ രൂപകൽപ്പന ചെയ്യുക
- MCP സെർവറുകളിൽ അനുയോജ്യമായ പിശക് കൈകാര്യം, ലോഗിംഗ്, നിരീക്ഷണം നടപ്പിലാക്കുക
- പ്രകടനക്ഷമത, സുരക്ഷ, പരിപാലനക്ഷമതക്കായി MCP നടപ്പുകരണങ്ങൾ പരമാവധി തോന്നുക

## MCP പ്രാഥമിക സിദ്ധാന്തങ്ങൾ

നിർദ്ദിഷ്ട നടപ്പുകരണ പ്രവർത്തനരീതികളിലേക്ക് കടക്കുന്നതിന് മുമ്പ്, ഫലപ്രദമായ MCP വികസനത്തിന് മാർഗ്ഗനിർദ്ദേശം നൽകുന്ന പ്രഥമ സിദ്ധാന്തങ്ങൾ മനസ്സിലാക്കണം:

1. **സ്റ്റാൻഡേർഡൈസ്ഡ് കമ്യൂണിക്കേഷൻ**: MCP എന്നത് JSON-RPC 2.0 അടിസ്ഥാനമാക്കിയാണ് ഉപയോഗിക്കുന്നത്. ഇത് എല്ലാ നടപ്പുകളിൽ അപേക്ഷകൾ, പ്രതികരണങ്ങൾ, പിശക് കൈകാര്യം എന്നിവയ്ക്കായി ഏകാന്ത ഫോർമാറ്റ് നൽകുന്നു.

2. **ഉപഭോക്തൃ കേന്ദ്രീകൃത രൂപകൽപ്പന**: നിങ്ങളുടെ MCP നടപ്പുകളിൽ ഉപഭോക്തൃ സമ്മതം, നിയന്ത്രണം, പാഴ്സ്പരസന്വയം (transparency) എല്ലായ്പ്പോഴും മുൻ നിർവ്വചിക്കുക.

3. **സുരക്ഷ ആദ്യം**: കർശനമായ സുരക്ഷാ നടപടികൾ നടപ്പാക്കുക, അതിൽ പ്രാമാണീകരണം, അവകാശം നൽകൽ, പരിശോധന, നിരക്ക് പരിധീകരണം ഉൾപ്പെടുന്നു.

4. **മോഡ്യൂളാർ ആർക്കിടെക്ചർ**: ഓരോ ഉപകരണം, വనരം (resource) എന്നിവയ്ക്കും വ്യക്തമായ, ദൃഢമായ ഉദ്ദേശ്യം കൊടുത്ത് MCP സെർവർ ഡിസൈൻ ചെയ്യുക.

5. **സ്റ്റേറ്റ്‌ഫുൾ കണക്ഷനുകൾ**: MCP-യുടെ പല അപേക്ഷകളിലും ആധികാരിക വിവരം നിലനിർത്താനുള്ള കഴിവ് ഉപയോഗിച്ച് കൂടുതൽ സुसൂക്ഷ്മവും പശ്ചാത്തലം അറിവുള്ള ആശയവിനിമയം നടപ്പാക്കുക.

## ഔദ്യോഗിക MCP മികച്ച പ്രവർത്തനരീതികൾ

താഴെ പറഞ്ഞിരിക്കുന്ന മികച്ച പ്രവർത്തനരീതികൾ മോഡൽ കോൺടെക്സ്റ്റ് പ്രോട്ടോക്കോൾ ഔദ്യോഗിക രേഖიდან ഉദ്ഭവിച്ചവയാണ്:

### സുരക്ഷ മികച്ച പ്രവർത്തനരീതികൾ

1. **ഉപയോക്തൃ സമ്മതവും നിയന്ത്രണവും**: ഡാറ്റ ആക്‌സസ് ചെയ്യുന്നതിന് അല്ലെങ്കിൽ പ്രവർത്തനങ്ങൾ നിര്‍വഹിക്കാനുള്ള മുമ്പായി ഫലപ്രദമായി ഉപയോക്തൃ സമ്മതം എപ്പോഴും ആവശ്യമാണ്. പങ്കുവെക്കാവുന്ന ഡാറ്റയും അനുവദനീയമായ പ്രവർത്തനങ്ങളും വ്യക്തമാക്കുന്ന നിയന്ത്രണം നൽകുക.

2. **ഡാറ്റ സ്വകാര്യത**: ഉപയോക്താവ് സമ്മതിച്ചുള്ള ഡാറ്റ മാത്രമേ വെളിപ്പെടുത്താവുവുള്ളു, തുടർച്ചയായ ആക്‌സസ് നിയന്ത്രണങ്ങളാൽ ഇത് സംരക്ഷിക്കുക. അനധികൃത ഡാറ്റ ട്രാൻസ്മിഷനിന് മുമ്പോട്ട് പ്രതിരോധം ഒരുക്കുക.

3. **ഉപകരണം സുരക്ഷ**: ഉപകരണം വിളിക്കാനുള്ള മുമ്പായി ഉപയോക്തൃ സമ്മതം കർശനമായി ആവശ്യപ്പെടുക. ഉപകരണത്തിന്റെ പ്രവർത്തനങ്ങൾ ഉപയോക്താക്കൾക്ക് വ്യക്തമാക്കികൊടുക്കുക; ഊൃജിതമായ സുരക്ഷാ പരിധികൾ നടപ്പിലാക്കുക.

4. **ഉപകരണം അനുവാദ നിയന്ത്രണം**: ഒരു സെഷനിൽ മോഡലിന് ഉപയോഗിക്കാവുന്ന ഉപകരണങ്ങൾ ക്രമീകരിക്കുക, മാത്രമല്ല സ്പഷ്ടമായി അനുവദിച്ച ഉപകരണങ്ങൾക്കു മാത്രമേ ആക്സസ് ഉണ്ടായിരിക്കുകയുള്ളു.

5. **പ്രാമാണീകരണം**: API കീകൾ, OAuth ടോക്കണുകൾ, മറ്റ് സുരക്ഷിത പ്രാമാണീകരണം വഴി ഉപകരണങ്ങൾ, വನറങ്ങൾ, അല്ലെങ്കിൽ സങ്കീർണ്ണ പ്രവർത്തനങ്ങൾ ആക്‌സസ് ചെയ്യാൻ അനുയോജ്യമായ പ്രാമാണീകരണം ആവശ്യമാണ്.

6. **പാരാമീറ്റർ പരിശോധന**: എല്ലാ ഉപകരണം വിളിപ്പങ്ങളിൽ പാരാമീറ്ററുകൾ ശരിയാണോ എന്ന് ഉറപ്പാക്കുക, തെറ്റായ അല്ലെങ്കിൽ അപകട കാരകമായ ഇൻപുട്ട് തടയുക.

7. **നിരക്ക് പരിധി**: ഉപയോഗ ദുരുപയോഗം തടയുന്ന വിധത്തിൽ നിരക്ക് പരിധി നടപ്പിലാക്കുക, സെർവർ വനറുകളുടെ നീതിയായ ഉപയോഗം ഉറപ്പാക്കുക.

### നടപ്പാക്കൽ മികച്ച പ്രവർത്തനരീതികൾ

1. **സാധ്യത ചൊരിയാക്കൽ**: കണക്ഷൻ സജ്ജീകരണ സമയത്ത് പിന്തുണയ്ക്കുന്ന സവിശേഷതകൾ, പ്രോട്ടോക്കോൾ പതിപ്പുകൾ, ഉപകരണം, വനറുകൾ എന്നിവ സംബന്ധിച്ച വിവരങ്ങൾ കൈമാറുക.

2. **ഉപകരണ ഡിസൈൻ**: ഒന്നിച്ചും ചുരുക്കി നിർദ്ദേശിച്ച കാര്യങ്ങളിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്ന ഉപകരണങ്ങൾ രൂപകൽപ്പന ചെയ്യുക; ഒറ്റ ടൂൾ പലമുതലായ കാര്യങ്ങൾ കൈകാര്യം ചെയ്യുന്നത് ഒഴിവാക്കുക.

3. **പിശക് കൈകാര്യം**: തുടർച്ചയായ പിശക് സന്ദേശങ്ങളും കോഡുകളും നടപ്പാക്കുക. പിശക് കണ്ടെത്താൻ സഹായിക്കും, പരാജയങ്ങൾ നന്നായി കൈകാര്യം ചെയ്യും, പ്രവർത്തനാപേക്ഷയുള്ള ഫീഡ്‌ബാക്ക് നൽകും.

4. **ലോഗിംഗ്**: ഓഡിറ്റിങ്, ഡീബഗിങ്, പ്രോട്ടോക്കോൾ ഇടപെടലുകൾ നിരീക്ഷിക്കാൻ നിർമ്മിത ലോഗുകൾ ക്രമീകരിക്കുക.

5. **പ്രോക്രസ് ട്രാക്കിംഗ്**: ദീർഘകാല പ്രവർത്തനങ്ങൾക്ക് പുരോഗതി അപ്ഡേറ്റുകൾ റിപ്പോർട്ട് ചെയ്ത് പ്രതികരണക്ഷമ UIകൾക്ക് സഹായിക്കുക.

6. **അപേക്ഷ പാളിപ്പിക്കൽ**: വേണമെങ്കിൽ ക്ലയൻറുകൾക്ക് ഇപ്പോഴുള്ള അഭ്യർത്ഥന പാളിപ്പിക്കാനായിരിക്കും അനുവദിക്കുക.

## അധിക റഫറൻസുകൾ

MCP മികച്ച പ്രവർത്തനരീതികളെക്കുറിച്ചുള്ള ഏറ്റവും പുതിയ വിവരങ്ങൾക്ക് താഴെ സന്ദർശിക്കുക:

- [MCP ഡോക്യുമെന്റേഷൻ](https://modelcontextprotocol.io/)
- [MCP സ്പെസിഫിക്കേഷൻ (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub റിപ്പോസിറ്ററി](https://github.com/modelcontextprotocol)
- [സുരക്ഷ മികച്ച പ്രവർത്തനരീതികൾ](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP ടോപ്പ് 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - സുരക്ഷാ അപകടങ്ങളും പരിഹാര മാർഗങ്ങളും
- [MCP Security Summit вор്ക്‌ഷോപ്പ് (Sherpa)](https://azure-samples.github.io/sherpa/) - പ്രായോഗിക സുരക്ഷാ പരിശീലനം

## പ്രായോഗിക നടപ്പാക്കൽ ഉദാഹരണങ്ങൾ

### ഉപകരണ ഡിസൈൻ മികച്ച പ്രവർത്തനരീതികൾ

#### 1. ഏകദേശം ഉത്തരവാദിത്തം സിദ്ധാന്തം

ഓരോ MCP ഉപകരണത്തിനും വ്യക്തമായ, കേന്ദ്രീകൃത ലക്ഷ്യം ഉണ്ടായിരിക്കണം. പല കാര്യങ്ങൾ കൈകാര്യം ചെയ്യാനുള്ള വലിയ ഉപകരണങ്ങൾ നിർമ്മിക്കാതെ പ്രത്യേകിച്ചുള്ള കാര്യങ്ങളിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്ന ഉപകരണങ്ങൾ വികസിപ്പിക്കുക.

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

#### 2. തുടർച്ചയായ പിശക് കൈകാര്യം

വിവരപരമായ പിശക് സന്ദേശങ്ങളോട് കൂടിയ ശക്തമായ പിശക് കൈകാര്യം നടപ്പാക്കുക, അനുയോജ്യമായ പുനരുദ്ധരണ സംവിധാനം ഉൾപ്പെടെ.

```python
# സമഗ്രമായ പിശക് കൈകാര്യം ചെയ്യലോടെ Python ഉദാഹരണം
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # പാരാമീറ്റർ പരിശോധിക്കൽ
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # സുരക്ഷാ പരിശോധിക്കൽ
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # ടൈംഔട്ട് ഉള്ള ഡാറ്റാബേസ് പ്രവർത്തനം
                async with timeout(10):  # 10 സെക്കന്റ് ടൈംഔട്ട്
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # കണക്ഷൻ പിശകുകൾ താൽക്കാലികമായിരിക്കാൻ സാധ്യതയുണ്ട്
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # ക്വേരി പിശകുകൾ സാദ്ധ്യതയേറിയ ക്ലയന്റ് പിശകുകളാണ്
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # ഉപകരണം-നിഷ്ഠപ്പെട്ട പിശകുകൾ കടത്തിവിടുക
            raise
        except Exception as e:
            # അപ്രതീക്ഷിത പിശകുകൾ ക്ഷണിച്ചെടുക്കുന്നതിനുള്ള എല്ലാ പിശകുകൾക്ക് വേണ്ടിയുള്ള
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL ഇജക്ഷൻ കണ്ടെത്തലിന്റെ നടപ്പാക്കൽ
        pass
        
    def _log_error(self, message, error):
        # പിശക് ലോഗ് ചെയ്യലിന്റെ നടപ്പാക്കൽ
        pass
```

#### 3. പാരാമീറ്റർ പരിശോധന

എപ്പോഴും പാരാമീറ്ററുകൾ സമഗ്രമായി പരിശോധിക്കുക, തെറ്റായ അല്ലെങ്കിൽ അപകടകരമായ ഇൻപുട്ട് തടയാൻ.

```javascript
// വിശദമായ പാരാമീറ്റർ പരിശോധനയോടുള്ള ജാവാസ്ക്രിപ്റ്റ് / ടൈപ്സ്ക്രിപ്റ്റ് ഉദാഹരണം
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
    // 1. പാരാമീറ്ററിന്റെ സാന്നിധ്യം പരിശോധിക്കുക
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. പാരാമീറ്ററിന്റെ തരം പരിശോധിക്കുക
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. പാരാമീറ്ററിന്റെ മൂല്യം പരിശോധിക്കുക
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. എഴുതൽ പ്രവർത്തനത്തിനുള്ള ഉള്ളടക്കത്തിന്റെ സാന്നിധ്യം പരിശോധിക്കുക
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. പാതയുടെ സുരക്ഷാ പരിശോധന
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // പരിശോധിച്ച പാരാമീറ്ററുകളുടെ അടിസ്ഥാനത്തിലുള്ള നടപ്പാക്കൽ
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // പാതയുടെ സുരക്ഷാ പരിശോധനയുടെ നടപ്പാക്കൽ
    // ...
  }
}
```

### സുരക്ഷ നടപ്പാക്കൽ ഉദാഹരണങ്ങൾ

#### 1. പ്രാമാണീകരണവും അവകാശനിർണയവും

```java
// ശരിവെപ്പ് සහ അധികാരാനുമതി ഉള്ള ജാവ ഉദാഹരണം
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // ആശ്രിത ചൊരിച്ചുമാറ്റം
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
        // 1. ശരിവെപ്പ് ഘടകം പുറത്തെടുക്കുക
        String authToken = request.getContext().getAuthToken();
        
        // 2. ഉപയോക്താവിനെ ശരിവെക്കുക
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. പ്രത്യേക പ്രവർത്തനത്തിനുള്ള അധികാരാനുമതി പരിശോധിക്കുക
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. അധികാരമുള്ള പ്രവർത്തനം തുടര്‍വക്കുക
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

#### 2. നിരക്ക് പരിധി

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

## പരീക്ഷണത്തിന്റെ മികച്ച പ്രവർത്തനരീതികൾ

### 1. MCP ഉപകരണങ്ങളുടെ യൂണിറ്റ് ടെസ്റ്റിംഗ്

നിങ്ങളുടെ ഉപകരണങ്ങളെ അകത്തു നിന്നായോ മനസിലാക്കി പരീക്ഷിക്കുക, ബാഹ്യ ആശ്രിതങ്ങൾ മോക്കുചെയ്യുക:

```typescript
// ടൈപ്പ്‌സ്ക്രിപ്റ്റ് ടൂൾ യൂണിറ്റ് ടെസ്റ്റിന്റെ ഉദാഹരണം
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // ഒരു മോക്ക് കാലാവസ്ഥാ സേവനം സൃഷ്ടിക്കുക
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // മോക്ക് ഡിപ്പൻഡൻസിയോടുകൂടിയ ടൂൾ സൃഷ്ടിക്കുക
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // ക്രമീകരിക്കുക
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // പ്രവർത്തിക്കുക
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // ഉറപ്പു വരുത്തുക
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // ക്രമീകരിക്കുക
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // പ്രവർത്തിക്കുക & ഉറപ്പു വരുത്തുക
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. ഇന്റഗ്രേഷൻ ടെസ്റ്റിംഗ്

ക്ലയന്റ് അഭ്യർത്ഥനകളിൽ നിന്ന് സെർവർ പ്രതികരണങ്ങളിലേക്കുള്ള മുഴുവൻ പ്രവാഹം പരീക്ഷിക്കുക:

```python
# പൈതൺ ഇന്റഗ്രേഷൻ ടെസ്റ്റ് ഉദാഹരണം
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # ഒരു ടെസ്റ്റ് സെർവർ ആരംഭിക്കുക
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # ഒരു ക്ലയന്റ് സൃഷ്ടിക്കുക
        client = McpClient("http://localhost:5000")
        
        # ടൂൾ കണ്ടെത്തൽ ടെസ്റ്റ് ചെയ്യുക
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # ടൂൾ പ്രവർത്തനം ടെസ്റ്റ് ചെയ്യുക
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # പ്രതികരണം സ്ഥിരീകരിക്കുക
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # ശുചിയീകരണം
        await server.stop()
```

## പ്രകടന അർത്ഥവത്‌ക്കരണം

### 1. കാഷിങ് രണനീതികൾ

കാഷിങ് ღონისძიികൾ നടപ്പാക്കി വൈകിയും വനറുകളും കുറയ്ക്കുക:

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

#### 2. ആശ്രിത ഇൻജക്ഷൻ ആൻഡ് ടെസ്റ്റബിലിറ്റി

ഉപകരണങ്ങൾ കൺസ്റ്റ്രക്ടർ ഇൻജക്ഷൻ വഴി ആശ്രിതങ്ങൾ സ്വീകരിക്കുക എന്ന ദിശയിൽ രൂപകൽപ്പന ചെയ്യുക, ഇത് അവ ടെസ്റ്റുചെയ്യാനും ക്രമീകരിക്കാനും സഹായിക്കും:

```java
// ഡിപ്പൻഡൻസി ഇൻജക്ഷനോടെ ജാവാ ഉദാഹരണം
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // നിർമ്മാതാവിലൂടെ ഇൻജക്റ്റ് ചെയ്‌ത ഡിപ്പൻഡൻസികൾ
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // ടൂൾ ഇംപ്ലിമെന്റേഷൻ
    // ...
}
```

#### 3. സംയോജ്യ ഉപകരണങ്ങൾ

കമ്പ്ലക്സായ പ്രവൃത്തി പ്രവാഹങ്ങൾ സൃഷ്ടിക്കാൻ ഉപകരണങ്ങൾ സംയോജിപ്പിച്ച് രൂപകൽപ്പന ചെയ്യുക:

```python
# Python ഉദാഹരണം, സംയോജ്യമായ ഉപകരണങ്ങൾ പ്രദർശിപ്പിക്കുന്നു
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # നടപ്പാക്കൽ...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # ഈ ഉപകരണം dataFetch ഉപകരണത്തിൽ നിന്നുള്ള ഫലങ്ങൾ ഉപയോഗിക്കാം
    async def execute_async(self, request):
        # നടപ്പാക്കൽ...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # ഈ ഉപകരണം dataAnalysis ഉപകരണത്തിൽ നിന്നുള്ള ഫലങ്ങൾ ഉപയോഗിക്കാം
    async def execute_async(self, request):
        # നടപ്പാക്കൽ...
        pass

# ഈ ഉപകരണങ്ങൾ സ്വതന്ത്രമായി അല്ലെങ്കിൽ ഒരു വർക്ക്‌ഫ്ലോയുടെ ഭാഗമായി ഉപയോഗിക്കാം
```

### സ്കീമ ഡിസൈൻ മികച്ച പ്രവർത്തനരീതികൾ

സ്കീമ മോഡലും ഉപകരണവും തമ്മിലുള്ള കരാറാണ്. നന്നായി രൂപകൽപ്പന ചെയ്ത സ്കീമകൾ നല്ല ഉപകരണ ഉപയോഗിക്കുന്നു.

#### 1. വ്യക്തമായ പാരാമീറ്റർ വിവരണങ്ങൾ

ഓരൊരുഹരിതത്തിനും വിശദമായ വിവരങ്ങൾ ഉൾപ്പെടുത്തുക:

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

#### 2. പരിശോധന പരിധികൾ

തെറ്റായ ഇൻപുട്ട് തടയാൻ പരിശോധന പരിധികൾ ഉൾപ്പെടുത്തുക:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ഫോർമാറ്റ് സാധൂകരണത്തോടെ ഇമെയിൽ പ്രോപ്പർട്ടി
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // സംഖ്യാത്മക നിയന്ത്രണങ്ങളുള്ള വയസ്സ് പ്രോപ്പർട്ടി
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // എണ്ണിതർജ്ജന പ്രോപ്പർട്ടി
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

#### 3. ഏകസരത്തിലുളള മറുപടി ഘടനകൾ

പരിണാമങ്ങൾ മോഡലുകൾക്ക് എളുപ്പത്തിൽ മനസ്സിലാക്കാനുള്ള ഘടന സുസ്ഥിരമായി നിലനിർത്തുക:

```python
async def execute_async(self, request):
    try:
        # അഭ്യർത്ഥന പ്രക്രിയ ചെയ്യുക
        results = await self._search_database(request.parameters["query"])
        
        # എല്ലായ്പ്പോഴും ഒരേ ഘടന മടക്കി നൽകുക
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

### പിശക് കൈകാര്യം

MCP ഉപകരണങ്ങൾക്ക് വിശ്വാസ്യത നിലനിർത്താൻ ശക്തമായ പിശക് കൈകാര്യം നിർണായകമാണ്.

#### 1. സുന്ദരമായി പിശക് കൈകാര്യം

ശേരി നിലയിൽ പിശകുകൾ കൈകാര്യം ചെയ്‌തുകൊണ്ടുള്ള വിവരപ്രദ സന്ദേശങ്ങൾ നൽകുക:

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

#### 2. ഘടനാപരമായ പിശക് മറുപടികൾ

സാദ്ധ്യതയുള്ളപ്പോൾ ഘടനാപരമായ പിശക് വിവരങ്ങൾ തിരിച്ചുകൊടുത്തു:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // നടപ്പിലാക്കല്‍
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
        
        // മറ്റ് എക്‌സ്‌സെപ്ഷനുകള്‍ ToolExecutionException ആയി വീണ്ടും ആകെയുള്ളൂ
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. റീട്രൈ ലൊജിക്

സ്ഥാപനാത്മക പരാജയങ്ങൾക്ക് അനുയോജ്യമായ പുനരുജ്ജീവന പദ്ധതി നടപ്പാക്കുക:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # സെക്കൻഡുകൾ
    
    while retry_count < max_retries:
        try:
            # ബാഹ്യ API നെ വിളിക്കുക
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # വേഗം വർദ്ധിക്കുന്ന വ്യത്യാസം
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # താൽക്കാലികമല്ലാത്ത പിശക്, പുനർപ്രയത്‌നം ചെയ്യരുത്
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### പ്രകടന അർത്ഥവത്‌ക്കരണം

#### 1. കാഷിങ്

പ്രയാസമുള്ള പ്രവർത്തനങ്ങൾക്ക് കാഷിങ് നടപ്പാക്കുക:

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

#### 2. അസിങ്ക്രോണസ് പ്രോസസ്സിംഗ്

I/O അധിഷ്ഠിത പ്രവർത്തനങ്ങൾക്ക് അസിങ്ക്രോണസ് പ്രോഗ്രാമിങ് മാതൃകകൾ ഉപയോഗിക്കുക:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // ദൈർഘ്യമേറിയ പ്രവർത്തനങ്ങൾക്ക്, തൊട്ടഥുടന്ന് ഒരു പ്രോസസ്സിങ് ഐഡി തിരികെ നൽകുക
        String processId = UUID.randomUUID().toString();
        
        // അസിങ്ക് പ്രോസസ്സിങ് ആരംഭിക്കുക
        CompletableFuture.runAsync(() -> {
            try {
                // ദൈർഘ്യമേറിയ പ്രവർത്തനം നടത്തുക
                documentService.processDocument(documentId);
                
                // നില അപ്ഡേറ്റ് ചെയ്യുക (സാധാരണയായി ഡാറ്റാബേസിൽ സംഭരിക്കും)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // പ്രോസസ് ഐഡി ഉൾപ്പെടെയുള്ള ഉടൻ പ്രതികരണം നൽകുക
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // കൂട്ടാളി നില പരിശോധന ഉപകരണം
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

#### 3. വനറു ശേഖരിക്കൽ തടയൽ

വനറുകളുടെ ഒവർലോഡ് തടയാൻ നിയന്ത്രണം നടപ്പാക്കുക:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # ഓരോ സেকന്‍ഡിലും 5 അഭ്യര്‍ത്ഥനകള്‍ അനുവദിക്കുക
            bucket_size=10        # 10 അഭ്യര്‍ത്ഥനകളില്‍ വരെ പുളിപ്പ് അനുവദിക്കുക
        )
    
    async def execute_async(self, request):
        # നാം മുന്നോട്ട് പോകാമോ അല്ലെങ്കിൽ കാത്തിരിക്കേണ്ടതുണ്ടോ എന്ന് പരിശോധിക്കുക
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # കാത്തിരിപ്പ് വളരെ ദൈര്‍ഘ്യമുണ്ടെങ്കിൽ
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # അനുയോജ്യമായ വൈകല്‍ശം സമയം കാത്തിരിക്കുക
                await asyncio.sleep(delay)
        
        # ഒരു ടോക്കൺ ഉപയോഗിച്ച് അഭ്യർഥനയുമായി മുന്നോട്ട് പോകുക
        self.rate_limiter.consume()
        
        # API വിളിക്കുക
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
            
            # അടുത്ത ടോക്കൺ ലഭിക്കുന്നതുവരെ കഴിയുന്ന സമയം കണക്കാക്കുക
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # ചിലവഴിച്ച സമയത്തിന്റെ അടിസ്ഥാനത്തിൽ പുതിയ ടോക്കണുകൾ കൂട്ടിച്ചേർക്കുക
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### സുരക്ഷ മികച്ച പ്രവർത്തനരീതികൾ

#### 1. ഇൻപുട്ട് പരിശോധന

എപ്പോഴും ഇൻപുട്ട് പാരാമീറ്ററുകൾ സമഗ്രമായി പരിശോധിക്കുക:

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

#### 2. അവകാശ പരിശോധനകൾ

ശരി വരുന്ന അവകാശ പരിശോധനകൾ നടപ്പാക്കുക:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // അഭ്യർത്ഥനയിൽ നിന്നുള്ള ഉപയോക്തൃ സാഹചര്യമെടുക്കുക
    UserContext user = request.getContext().getUserContext();
    
    // ഉപയോക്താവിന് ആവശ്യമായ അനുമതികൾ ഉണ്ട് എന്ന് പരിശോധിക്കുക
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // പ്രത്യേക വിഭവങ്ങൾക്ക്, ആ വിഭവത്തിലേക്കുള്ള ആക്‌സസ് പരിശോധിക്കുക
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // ഉപകരണം നടപ്പാക്കാൻ മുന്നോട്ട് പോകുക
    // ...
}
```

#### 3. സങ്കീർണ്ണ ഡാറ്റ കൈകാര്യം

സങ്കീർണ്ണ ഡാറ്റ സൂക്ഷ്മമായി കൈകാര്യം ചെയ്യുക:

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
        
        # ഉപയോക്തൃ ഡാറ്റ നേടുക
        user_data = await self.user_service.get_user_data(user_id)
        
        # വ്യക്തമായ അഭ്യർത്ഥനയും അനുവാദവും ഇല്ലാതെ സെൻസിറ്റീവ് ഫീൽഡുകൾ ഫിൽട്ടർ ചെയ്യുക
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # അഭ്യർത്ഥന പ്രാധാന്യ തലം പരിശോധിക്കുക
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # യഥാർത്ഥത്തെ മാറ്റാതെ പ്രതിയുടെ ഒരു പകർപ്പ് സൃഷ്ടിക്കുക
        redacted = user_data.copy()
        
        # പ്രത്യേക സെൻസിറ്റീവ് ഫീൽഡുകൾ മാറ്റിമറിക്കുക
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # നസ്‌റ്റഡ് സെൻസിറ്റീവ് ഡാറ്റ മാറ്റിമറിക്കുക
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP ഉപകരണങ്ങൾക്കുള്ള പരീക്ഷണ മികച്ച പ്രവർത്തനരീതികൾ

സമഗ്രമായ പരിശോധന MCP ഉപകരണങ്ങൾ ശരിയായി പ്രവർത്തിക്കുന്നുവോ, അത്ര മാത്രമല്ല അതിജീവനാ ഘട്ടങ്ങളും ഫലപ്രദമായി നിർവഹിക്കുന്നുവെന്ന് ഉറപ്പാക്കുന്നു.

### യൂണിറ്റ് ടെസ്റ്റിംഗ്

#### 1. ഓരോ ഉപകരണവും വേർതിരിച്ച് പരീക്ഷിക്കുക

ഓരോ ഉപകരണത്തിന്റെ ഫംഗ്ഷണാലിറ്റിക്ക് കേന്ദ്രീകൃതമായ ടെസ്റ്റുകൾ സൃഷ്ടിക്കുക:

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

#### 2. സ്കീമാ പരിശോധന ടെസ്റ്റിംഗ്

സ്കീമകൾ ശരിയായി നിലവിലുണ്ടോ, അവയ്ക്ക് ബാധകമായ നിയന്ത്രണങ്ങൾ പാലിക്കുന്നുവോ എന്നത് പരീക്ഷിക്കുക:

```java
@Test
public void testSchemaValidation() {
    // ടൂൾ ഇൻസ്റ്റൻസ് സൃഷ്ടിക്കുക
    SearchTool searchTool = new SearchTool();
    
    // സ്‌കീമ നേടുക
    Object schema = searchTool.getSchema();
    
    // സാധൂകരണത്തിന് JSON ആയി സ്‌കീമ മാറ്റുക
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // സ്‌കീമ സാധുവായ JSONSchema ആണെന്ന് സാധൂകരിക്കുക
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // സാധുവായ പാരാമീറ്ററുകൾ അവലോകനം ചെയ്യുക
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // ആവശ്യമായ പാരാമീറ്റർ കാണാതെ പരീക്ഷിക്കുക
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // അസാധുവായ പാരാമീറ്റർ തരം പരീക്ഷിക്കുക
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. പിശക് കൈകാര്യം പരിശോധനകൾ

പിശക് നിബന്ധനകൾക്കായി പ്രത്യേക ടെസ്റ്റുകൾ സൃഷ്ടിക്കുക:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # ക്രമീകരിക്കുക
    tool = ApiTool(timeout=0.1)  # വളരെ കുറച്ച് ടൈംഔട്ട്
    
    # ടൈംഔട്ട് സംഭവിക്കുന്നൊരു അഭ്യര്‍ത്ഥന മോക്ക് ചെയ്യുക
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # ടൈംഔട്ട് കാലയളവിനേക്കാള്‍ നീളം
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # പ്രവര്‍ത്തിക്കുക & സ്ഥിരീകരിക്കുക
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # _EXCEPTION സന്ദേശം സ്ഥിരീകരിക്കുക
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # ക്രമീകരിക്കുക
    tool = ApiTool()
    
    # നിരക്ക് പരിധിച്ചുള്ള പ്രതികരണം മോക്ക് ചെയ്യുക
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
        
        # പ്രവര്‍ത്തിക്കുക & സ്ഥിരീകരിക്കുക
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # _RATE_LIMIT-_എക്സെപ്ഷനില്‍ നിരക്ക് പരിധി വിവരം ഉള്‍ക്കൊള്ളുന്നുണ്ടെന്ന് സ്ഥിരീകരിക്കുക
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### ഇന്റഗ്രേഷൻ ടെസ്റ്റിംഗ്

#### 1. ഉപകരണ ചൈനിന്റെ പരിശോധന

പ്രതീക്ഷിക്കപ്പെടുന്ന സംയോജനങ്ങളിൽ ഉപകരണങ്ങൾ പരസ്പരം ചേർന്ന് പ്രവർത്തിക്കുന്നുവെന്ന് പരിശോധന നടത്തുക:

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

#### 2. MCP സെർവർ പരിശോധന

പൂർണമായ ഉപകരണ രജിസ്ട്രേഷൻ, നടപ്പിലാക്കൽ എന്നിവയുടെ MCP സെർവർ പരിശോധിക്കുക:

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
        // ഡിസ്‌കവറി എൻഡ്‌പോയിന്റ് പരീക്ഷിക്കുക
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // ടൂൾ അപേക്ഷ സൃഷ്ടിക്കുക
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // അപേക്ഷ അയച്ച് പ്രതികരണം സ്ഥിരീകരിക്കുക
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // അസാധുവായ ടൂൾ അപേക്ഷ സൃഷ്ടിക്കുക
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" എന്ന പാരാമീറ്റർ കാണാനില്ല
        request.put("parameters", parameters);
        
        // അപേക്ഷ അയച്ച് പിശക് പ്രതികരണം പരിശോദിക്കുക
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. എണ്ട്-ടു-എൻഡ് പരിശോധന

മോഡൽ പ്രാമ്പ്റ്റ് മുതൽ ഉപകരണ പ്രവർത്തനം വരെ പൂര്‍ണ പ്രവൃത്തി പ്രവാഹങ്ങൾ പരീക്ഷിക്കുക:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # ക്രമീകരിക്കുക - MCP ക്ലയന്റ് സജ്ജീകരിക്കുക, മോക്ക് മോഡൽ സജ്ജീകരിക്കുക
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # മോക്ക് മോഡൽ പ്രതികരണങ്ങൾ
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
    
    # മോക്ക് കാലാവസ്ഥ ഉപകരണ പ്രതികരണം
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
        
        # പ്രവർത്തിക്കുക
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # ഉറപ്പുവരുത്തുക
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### പ്രകടന പരിശോധന

#### 1. ലോഡ് ടെസ്റ്റിംഗ്

നിങ്ങളുടെ MCP സെർവർ എത്ര ഒത്തുചേർന്ന അഭ്യർത്ഥനകൾ കൈകാര്യം ചെയ്യാൻ കഴിയും എന്നത് പരിശോധിക്കുക:

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

#### 2. സ്‌ട്രെസ് ടെസ്റ്റിംഗ്

അത്യധികമായ ലോഡിനും കീഴിലെ പ്രക്രിയകൾ പരീക്ഷിക്കുക:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // സ്ട്രെസ് ടെസ്റ്റിംഗിനായി ജെമീറ്റർ സജ്ജമാക്കുക
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // ജെമീറ്റർ ടെസ്റ്റ് പ്ലാൻ ക്രമീകരിക്കുക
    HashTree testPlanTree = new HashTree();
    
    // ടെസ്റ്റ് പ്ലാനും, ത്രെഡ് ഗ്രൂപ്പും, സാംപ്ലറുകളും എന്നിവ സൃഷ്ടിക്കുക
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // ഉപകരണം പ്രവർത്തനത്തിനായി HTTP സാംപ്ലർ ചേർക്കുക
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // ലിസണർമാർ ചേർക്കുക
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // ടെസ്റ്റ് പ്രവർത്തിപ്പിക്കുക
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // ഫലങ്ങൾ സാധൂകരിക്കുക
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // ശരാശരി പ്രതികരണ സമയം < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90-ആം ശതമാനം < 500ms
}
```

#### 3. നിരീക്ഷണം, പ്രൊഫൈലിംഗ്

ദീർഘകാല പ്രകടന വിശകലനത്തിന് നിരീക്ഷണം ക്രമീകരിക്കുക:

```python
# MCP സെർവർക്കായി നിരീക്ഷണം ക്രമീകരിക്കുക
def configure_monitoring(server):
    # Prometheusനു വേണ്ടുന്ന അളവുകൾ ക്രമീകരിക്കുക
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
    
    # ടൈമിംഗ്-യും അളവുകൾ രേഖപ്പെടുത്തലിനും മിഡിൽവെയർ ചേർക്കുക
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # അളവുകൾ എക്സ്പോസ് ചെയ്യാനുള്ള എൻഡ്‌പോയിന്റ് തുറക്കുക
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP പ്രവൃത്തി പ്രവാഹ ഡിസൈൻ മാതൃകകൾ

നല്ല രൂപകൽപ്പന ചെയ്ത MCP പ്രവൃത്തി പ്രവാഹങ്ങൾ കാര്യക്ഷമത, വിശ്വാസ്യത, പരിപാലനക്ഷമത മെച്ചപ്പെടുത്തുന്നു. പാലിക്കേണ്ട പ്രധാന മാതൃകകൾ:

### 1. ഉപകരണങ്ങളുടെയൊത്ത് ശൃംഖല മാതൃക

ഒരുപോലെ ഒന്നിലധികം ഉപകരണങ്ങളെ പരസ്പരം ആശ്രയിച്ചുകൊണ്ട് ചേരുക, ഓരോ ഉപകരണത്തിന്റെ ഔട്ട്‌പുട്ട് അടുത്തതിനുള്ള ഇൻപുട്ടായി ഉപയോഗിക്കുക:

```python
# പൈതൺ ചെയ്ൻ ഓഫ് ടൂളുകൾ നടപ്പാക്കൽ
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # കൃത്യമായക്രമത്തിൽ പ്രവർത്തിപ്പിക്കാൻ ഉപകരണങ്ങളുടെ പട്ടിക
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # ചൈനിലുള്ള ഓരോ ഉപകരണവും മുൻഫലങ്ങൾ പാസ്സാക്കി പ്രവർത്തിപ്പിക്കുക
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # ഫലം സംഭരിച്ച് അത് അടുത്ത ഉപകരണത്തിന് ഇൻപുട്ടായി ഉപയോഗിക്കുക
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# ഉദാഹരണ ഉപയോഗം
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

### 2. ഡിസ്പാച്ചർ മാതൃക

ഇൻപുട്ടിനനുസരിച്ച് പ്രത്യേകിച്ചപ്പെട്ട ഉപകരണങ്ങളിൽ ഡിസ്‌പാച്ച് ചെയ്യുന്ന കേന്ദ്രമായ ഒരു ഉപകരണം ഉപയോഗിക്കുക:

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

### 3. സമാന്തര പ്രോസസ്സിംഗ് മാതൃക

പ്രവൃത്തീക്ഷമത്വത്തിനായി ഒന്നേ സമയത്ത് പല ഉപകരണങ്ങളും പ്രവർത്തിക്കുക:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // ഘട്ടം 1: ഡാറ്റാസെറ്റ് മെറ്റാഡേറ്റാ ഫോച് ചെയ്യുക (സിങ്ക്രോണസ്)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // ഘട്ടം 2: ഒന്നിലധികം വിശകലനങ്ങൾ പാരലെൽ ആയി ആരംഭിക്കുക
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
        
        // എല്ലാ പാരലെൽ ജോലികളും പൂർത്തിയാകുന്നത് വരെ കാത്തിരിക്കുക
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // പൂർത്തിയാകുന്നത് വരെ കാത്തിരിക്കുക
        
        // ഘട്ടം 3: ഫലങ്ങൾ സംയോജിപ്പിക്കുക
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // ഘട്ടം 4: സംഗ്രഹ റിപ്പോർട്ട് സൃഷ്ടിക്കുക
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // പൂർണ്ണ വർക്ക്‌ഫ്ലോ ഫലം തിരികെ നൽകുക
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. പിശക് പുനരുദ്ധരണ മാതൃക

ഉപകരണ പരാജയങ്ങൾക്ക് കരുണയുള്ള പിരിച്ചുമാറ്റൽ (fallback) നയം നടപ്പാക്കുക:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # ആദ്യം പ്രാഥമിക ഉപകരണം പരീക്ഷിക്കുക
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # പരാജയം രേഖപ്പെടുത്തുക
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # ദ്വിതീയ ഉപകരണത്തിലേക്ക് തിരിച്ചുപോകുക
            try:
                # തിരിച്ചുപോകുന്ന ഉപകരണത്തിനായി പാരാമീറ്ററുകൾ മാറ്റേണ്ടി വരാം
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # രണ്ടും ഉപകരണങ്ങളും പരാജയപ്പെട്ടു
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # ഈ നടപ്പിലാക്കൽ പ്രത്യേക ഉപകരണങ്ങളുടെ അടിസ്ഥാനത്തിൽ ആയിരിക്കും
        # ഈ ഉദാഹരണത്തിനായി, ഞങ്ങൾ മൊഴിയിലുള്ള പാരാമീറ്ററുകൾ മടങ്ങി നൽകും
        return params

# ഉദാഹരണ ഉപയോഗം
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # പ്രാഥമിക (പേയ്ഡ്) കാലാവസ്ഥ API
        "basicWeatherService",    # തിരിച്ചുപോകുന്ന (സ്വതന്ത്ര) കാലാവസ്ഥ API
        {"location": location}
    )
```

### 5. പ്രവൃത്തി പ്രവാഹ സംയോജനം മാതൃക

സൂക്ഷ്മമായ പ്രവൃത്തി പ്രവാഹങ്ങൾ സംയോജിപ്പിച്ച് സങ്കീർണ്ണ പ്രവൃത്തി പ്രവാഹങ്ങൾ നിർമ്മിക്കുക:

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

# MCP സെർവറുകൾ പരീക്ഷിക്കൽ: മികച്ച പ്രവർത്തനരീതികളും പ്രധാന സൂചനകളും

## അവലോകനം

ഭദ്രവും ഉയർന്ന നിലവാരമുള്ള MCP സെർവറുകൾ വികസിപ്പിക്കൽക്ക് പരീക്ഷണം അനിവാര്യമാണ്. യൂണിറ്റ് ടെസ്റ്റുകളിൽ നിന്ന് ഇന്റഗ്രേഷൻ ടെസ്റ്റുകളും എండ్-ടു-എൻഡ് ശരിഫീകരണവരെ MCP സെർവർ വികസന ജീവിതചക്രം മുഴുവൻ പരീക്ഷണത്തിനുള്ള സമഗ്രമായ മികച്ച പ്രവർത്തനരീതികളും നൽകിയിരിക്കുന്നു.

## MCP സെർവറുകൾക്കുള്ള പരീക്ഷണം എന്തുകൊണ്ട് അത്യാവശ്യമാണ്

MCP സെർവറുകൾ AI മോഡലുകളും ക്ലയന്റ് അപ്ലിക്കേഷനുകളും തമ്മിലുള്ള പ്രധാന മിഡിൽവെയർ കൂടിയാണ്. സമഗ്രമായ പരീക്ഷണം ഉറപ്പു നൽകുന്നു:

- പ്രൊഡക്ഷൻ പരിസ്ഥിതിയിലുളള വിശ്വാസ്യത
- അഭ്യർത്ഥനകളും പ്രതികരണങ്ങളും ശരിയായി കൈകാര്യം ചെയ്യൽ
- MCP നിർദ്ദേശനങ്ങൾ ഫലപ്രദമായി നടപ്പിലാക്കൽ
- പരാജയങ്ങളും അതി സൂക്ഷ്മ സന്ദർഭങ്ങളും മികവുറ്റുള്ള നേർച്ച
- വ്യത്യസ്ത ലോഡുകളിലെ സുസ്ഥിര പ്രകടനം

## MCP സെർവറുകളുടെ യൂണിറ്റ് ടെസ്റ്റിംഗ്

### യൂണിറ്റ് ടെസ്റ്റിംഗ് (അടിസ്ഥാനം)

MCP സെർവറിന്റെ ഓരോ ഘടകവും വേർതിരിച്ച് പരിശോധന നടത്തുന്നു.

#### എന്ത് പരിശോധിക്കണം

1. **റിസോഴ്‌സ് ഹാൻഡ്‌ലർമാർ**: ഓരോ റിസോഴ്‌സ് ഹാൻഡ്ലറിന്റെ ലജിക് സ്വതന്ത്രമായി പരിശോധിക്കുക
2. **ഉപകരണ നടപ്പുകൾ**: വിവിധ ഇൻപുട്ടുകളിൽ ഉപകരണ പ്രവർത്തനം പരിശോധിക്കുക
3. **പ്രാമ്പ്റ്റ് ടെംപ്ലേറ്റുകൾ**: പ്രാമ്പ്റ്റ് ടെംപ്ലേറ്റുകൾ ശരിയായി പ്രകടിപ്പിക്കുന്നുവോ എന്ന് ഉറപ്പാക്കുക
4. **സ്കീമ പരിശോധന**: പാരാമീറ്റർ പരിശോധന ലജിക് പരീക്ഷിക്കുക
5. **പിശക് കൈകാര്യ സംവിധാനം**: തെറ്റായ ഇൻപുട്ടിൽ പിശക് പ്രതികരണങ്ങൾ പരിശോധിക്കുക

#### യൂണിറ്റ് ടെസ്റ്റിംഗിൻറെ മികച്ച പ്രവർത്തനരീതികൾ

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
# പൈതണിൽ ഒരു കാൽക്കുലേറ്റർ ടൂളിനുള്ള ഉദാഹരണ യൂണിറ്റ് ടെസ്റ്റ്
def test_calculator_tool_add():
    # ക്രമീകരിക്കുക
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # പ്രവർത്തിക്കുക
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # ഉറപ്പാക്കുക
    assert result["value"] == 12
```

### ഇന്റഗ്രേഷൻ ടെസ്റ്റിംഗ് (മധ്യതല)

MCP സെർവറിലെ ഘടകങ്ങളുടെയും അവയുടെ ഇടപെടലുകളുടെയും പരിശോധന.

#### എന്ത് പരിശോധിക്കണം

1. **സെർവർ ഇനിഷ്യലൈസേഷൻ**: മിക്ക മാറ്റങ്ങളും കോൺഫിഗറേഷനുകളോടുകൂടി സെർവർ ആരംഭിക്കൽ പരിശോധിക്കുക
2. **റൂട്ട് രജിസ്ട്രേഷൻ**: എല്ലാം എപ്പോർ‌റ്റുകൾ ശരിയായി രജിസ്റ്റർ ചെയ്തിട്ടുണ്ടോ എന്ന് ഉറപ്പാക്കുക
3. **അഭ്യർത്ഥന പ്രോസസ്സിംഗ്**: പൂർണ്ണ അഭ്യർത്ഥന-പ്രതികരണ ചക്രം പരിശോധിക്കുക
4. **പിശക് പ്രചരണം**: പിശകുകൾ ഘടകങ്ങളിൽ ശരിയായി കൈകാര്യം ചെയ്തിട്ടുണ്ടോ എന്ന് ഉറപ്പാക്കുക
5. **പ്രാമാണീകരണവും അവകാശനിർണയവും**: സുരക്ഷാ സംവിധാനങ്ങൾ പരീക്ഷിക്കുക

#### ഇന്റഗ്രേഷൻ ടെസ്റ്റിംഗിൻറെ മികച്ച പ്രവർത്തനരീതികൾ

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

### എന്റ്-ടു-എൻഡ് ടെസ്റ്റിംഗ് (മുകളിൽ)

ക്ലയന്റ് മുതൽ സെർവർ വരെ പൂര്‍ണ സിസ്റ്റം പെരുമാറ്റം പരിശോധിക്കുക.

#### എന്ത് പരിശോധിക്കണം

1. **ക്ലയന്റ്-സെർവർ കമ്മ്യൂണിക്കേഷൻ**: പൂര്‍ണ്ണ അഭ്യർത്ഥന-പ്രതികരണ ചക്രം ടെസ്റ്റ് ചെയ്യുക
2. **സത്യമായ ക്ലയന്റ് SDKകൾ**: യഥാർത്ഥ ക്ലയന്റ് നടപ്പുകളിൽ പരീക്ഷിക്കുക
3. **ലോഡിനെതിരെ പ്രകടനം**: ഒത്തുചേർന്ന അഭ്യർത്ഥനകളോടെ പെരുമാറ്റം പരിശോധിക്കുക
4. **പിശക് പുനരുദ്ധരണം**: പരാജയങ്ങളിൽ നിന്നും സിസ്റ്റം പുനരുളുക്കൽ ടെസ്റ്റ് ചെയ്യുക
5. **ദീർഘകാല പ്രവർത്തനങ്ങൾ**: സ്ട്രീമിങ്ങ്, ദൈർഘ്യമുള്ള പ്രവർത്തനങ്ങൾ ശരിയായി കൈകാര്യം ചെയ്യുന്നതായി ഉറപ്പാക്കുക

#### E2E ടെസ്റ്റിംഗിൻറെ മികച്ച പ്രവർത്തനരീതികൾ

```typescript
// ടൈപ്‌സ്‌ക്രിപ്റ്റിൽ ക്ലയന്റ് ഉപയോഗിച്ച് ഉദാഹരണ E2E പരിശോധന
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // പരീക്ഷണ പരിസരത്തിൽ സെർവർ ആരംഭിക്കുക
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // പ്രവർത്തിക്കുക
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // ഉറപ്പാക്കുക
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP ടെസ്റ്റിംഗിനുള്ള മോക്കിംഗ് രണനീതികൾ

പരിശോധനയിൽ ഘടകങ്ങളെ വേർതിരിച്ച് നോക്കാന് മോക്കിംഗ് അനിവാര്യമാണ്.

### മോക്കും ചെയ്യേണ്ട ഘടകങ്ങൾ

1. **ബാഹ്യ AI മോഡലുകൾ**: പരീക്ഷണത്തിന് പ്രവചനക്ഷമമായ മോഡൽ പ്രതികരണങ്ങൾ മോക്ക് ചെയ്യുക
2. **ബാഹ്യ സേവനങ്ങൾ**: API ആശ്രിതങ്ങൾ (ഡാറ്റാബേസുകൾ, മൂന്നാം വ്യക്തി സേവനങ്ങൾ) മോക്ക് ചെയ്യുക
3. **പ്രാമാണീകരണ സേവനങ്ങൾ**: ഐഡന്റിറ്റി പ്രൊവൈഡറുകൾ മോക്ക് ചെയ്യുക
4. **വനറുകൾ നൽകുന്നവ**: വിലവഞ്ഞ് വനറു ഹാൻഡ്ലറുകൾ മോക്ക് ചെയ്യുക

### ഉദാഹരണം: AI മോഡൽ പ്രതികരണം മോക്ക് ചെയ്യൽ

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
# unittest.mock ഉപയോഗിച്ച് Python ഉദാഹരണം
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # mock കൺഫിഗർ ചെയ്യുക
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # പരിശോധനയിൽ mock ഉപയോഗിക്കുക
    server = McpServer(model_client=mock_model)
    # പരിശോധന തുടർക്കൊണ്ട് പോകുക
```

## പ്രകടന പരിശോധന

പ്രൊഡക്ഷൻ MCP സെർവറുകൾക്ക് പ്രകടന പരിശോധന നിർണായകമാണ്.

### എന്ത് അളക്കണം

1. **വൈക്കം**: അഭ്യർത്ഥനകൾക്ക് പ്രതികരണ സമയം
2. **തോറുപുതിയറ്റ്**: ഒരുവാ Second ൽ കൈകാര്യം ചെയ്യുന്ന അഭ്യർത്ഥനകളുടെ എണ്ണം
3. **വനറു ഉപയോഗം**: CPU, മെമ്മറി, നെറ്റ്വർക്ക് ഉപയോഗം
4. **സമാന്തര കൈകാര്യം**: ഒത്തുചേരുന്ന അഭ്യർത്ഥനകൾക്കെതിരെ പെരുമാറ്റം
5. **സ്കെയ്ലിംഗ് സ്വഭാവങ്ങൾ**: ലോഡ് കൂടുമ്പോൾ പ്രകടനം

### പ്രകടന പരിശോധന ഉപകരണങ്ങൾ

- **k6**: ഓപ്പൺ സോഴ്‌സ് ലോഡ് ടെസ്റ്റിങ് ഉപകരണം
- **JMeter**: സമഗ്ര പ്രകടന പരിശോധന
- **Locust**: Python അടിസ്ഥാനത്തിലുള്ള ലോഡ് ടെസ്റ്റിങ്
- **Azure Load Testing**: ക്ലൗഡ് അടിസ്ഥാനത്തിലുള്ള പ്രകടന പരിശോധന

### ഉദാഹരണം: k6 ഉപയോഗിച്ചുള്ള അടിസ്ഥാന ലോഡ് ടെസ്റ്റ്

```javascript
// MCP സെർവറിന്റെ ലോഡ് ടെസ്റ്റിംഗിന് k6 സ്ക്രിപ്റ്റ്
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 വിർച്വൽ ഉപയോക്താക്കൾ
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

## MCP സെർവർ ടെസ്റ്റ് ഓട്ടോമേഷൻ

ടെസ്റ്റുകൾ ഓട്ടോമേറ്റുചെയ്താൽ സ്ഥിരതയുള്ള നിലവാരവും വേഗതയുള്ള പിന്തുണയും ഉറപ്പാകുന്നു.

### CI/CD ഇന്റ്റഗ്രേഷൻ

1. **പുള്ല്‍ റിക്വസ്റ്റ്‌റുകളിൽ യൂണിറ്റ് ടെസ്റ്റുകൾ ഓടിക്കുക**: കോഡ് മാറ്റങ്ങൾ നിലവിലെ പ്രവർത്തനം തകരാതിരിക്കാം എന്ന് ഉറപ്പാക്കുക
2. **സ്റ്റേജിംഗിൽ ഏകീകരണ പരിശോധനകൾ**: പ്രി-പ്രൊഡക്ഷൻ പരിസ്ഥിതികളിൽ ഏകീകരണ പരിശോധനകൾ നടത്തുക  
3. **പ്രദർശന അടിസ്ഥാനരേഖകൾ**: പുനരാവൃതികൾ പിടികൂടുന്നതിനായി പ്രകടന മോണിറ്ററിംഗ് നടത്തുക  
4. **സുരക്ഷാ സ്‌കാനുകൾ**: പൈപ്പ്‌ലൈനിന്റെ ഭാഗമാകുന്ന സുരക്ഷാ പരിശോധന സ്വയംചാലകം ആക്കുക  

### ഉദാഹരണ CI പൈപ്പ്‌ലൈൻ (GitHub Actions)

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
  
## MCP നടത്തിയ നിർദ്ദേശിക്യമനുസരണ പരിശോധന

നിങ്ങളുടെ സർവർ MCP നിർദ്ദേശിക്യം ശരിയായി നടപ്പിലാക്കുന്നുണ്ടോ എന്നത് പരിശോദിക്കുക.

### മുഖ്യ അനുസരണ മേഖലകൾ

1. **API Endpoints**: ആവശ്യമായ എൻഡ്‌പോയിന്റുകൾ (/resources, /tools, മുതലായവ) ടെസ്റ്റ് ചെയ്യുക  
2. **അഭ്യർത്ഥന/പ്രതികരണ ഫോർമാറ്റ്**: സ്കീമ അനുസരണ പരിശോധിക്കുക  
3. **പിശക് കോഡുകൾ**: വിവിധ സാഹചര്യങ്ങൾക്ക് ശരിയായ സ്റ്റാറ്റസ് കോഡുകൾ പരിശോധിക്കുക  
4. **ഉള്ളടക്ക തരം**: വ്യത്യസ്ത ഉള്ളടക്ക തരം കൈകാര്യം ചെയ്യുന്നുവോ എന്ന് ടെസ്റ്റ് ചെയ്യുക  
5. **പ്രമാണീകരണ പ്രക്രിയ**: നിർദ്ദേശിക്യാനുസൃത പ്രമാണീകരണ സംവിധാനം പരിശോദിക്കുക  

### അനുസരണ പരിശോധനാ സ്യൂട്ട്

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
  
## MCP സーバർ പരിശോധനക്കുള്ള മുകളിലെ 10 ടിപ്സ്

1. **ടൂൾ നിർവചനങ്ങൾ സ്വതന്ത്രമായി പരിശോധന നടത്തുക**: ടൂൾ ലൊജിക് ഒഴികെ സ്കീമ നിർവചനങ്ങൾ പരിശോധിക്കുക  
2. **പാരാമെടറൈസ്ഡ് ടെസ്റ്റുകൾ ഉപയോഗിക്കുക**: വിവിധ ഇൻപുട്ടുകളോട് കൂടിയ പരീക്ഷണങ്ങൾ നടത്തുക, അതിൽ ഉപരിതല അവസ്ഥകളും ഉൾപ്പെടുത്തുക  
3. **പിശക് പ്രതികരണങ്ങൾ പരിശോധിക്കുക**: എല്ലാ സാധ്യതാപരമായ പിശക് അവസ്ഥകൾക്കും ശരിയായ കൈകാര്യം പരിശോധന നടത്തുക  
4. **പ്രാമാണീകരണ ലൊജിക് ടെസ്റ്റ് ചെയ്യുക**: വ്യത്യസ്ത ഉപയോക്തൃവശ്യങ്ങൾക്കായി ശരിയായ ആക്സസ് നിയന്ത്രണം ഉറപ്പുവരുത്തുക  
5. **ടെസ്റ്റ് കവർേജ് നിരീക്ഷിക്കുക**: പ്രധാന കോഡ് പാതകളുടെ ഉയർന്ന കവർേജ് ലക്ഷ്യം വയ്ക്കുക  
6. **സ്ട്രീമിംഗ് പ്രതികരണങ്ങൾ പരിശോധന നടത്തുക**: സ്ട്രീമിംഗ് ഉള്ളടക്കം ശരിയായി കൈകാര്യം ചെയ്യപ്പെടുന്നു എന്നത് പരിശോധിക്കുക  
7. **നെറ്റ്‌വർക്ക് പ്രശ്നങ്ങൾ അനുഭവപ്പെടുത്തുക**: ദുർബല നെറ്റ്‌വർക്ക് സാഹചര്യങ്ങളിൽ പെരുമാറ്റം പരിശോധിക്കുക  
8. **റിസോഴ്‌സ് പരിധികൾ പരിശോധന നടത്തുക**: ക്വോട്ടകളും നിരക്കളളാത്മക നിയന്ത്രണങ്ങൾ എത്തിയപ്പോൾ പെരുമാറ്റം പരിശോധിക്കുക  
9. **രിഗ്രഷൻ ടെസ്റ്റുകൾ സ്വയംചാലനം ആക്കുക**: ഓരോ കോഡ് മാറ്റത്തിനും പ്രവർത്തിക്കുന്ന ഒരു സ്യൂട്ട് സൃഷ്ടിക്കുക  
10. **ടെസ്റ്റ് കേസുകൾ രേഖപ്പെടുത്തുക**: ടെസ്റ്റ് سینാരിയോ കളുടെ വ്യക്തമായ രേഖപെടുത്തൽ പാലിക്കുക  

## സാധാരണ പരിശോധന തെറ്റുകൾ

- **സന്തോഷ പാത ടെസ്റ്റിംഗിൽ കൂടുതലായ ആശ്രയം**: പിശക് കേസുകൾ വിശദമായി പരിശോധിക്കുക  
- **പ്രദർശന പരിശോധനയെ അവഗണിക്കുക**: ഉൽപ്പാദനത്തെ ബാധിക്കുന്ന മുൻപ് ബോട്ടിൽനെക്കും തിരിച്ചറിഞ്ഞു പരിഹരിക്കുക  
- **അടിയന്തരമായി ടെസ്റ്റ് വേർതിരിച്ച് നടത്തുക**: യൂണിറ്റ്, ഏകീകരണം, E2E ടെസ്റ്റുകൾക്ക് കൂട്ടിച്ചേർക്കുക  
- **അസമ്പൂർണ API പൈടവുകൾ**: എല്ലാ എൻഡ്‌പോയിന്റുകളും ഫീച്ചറുകളും പരിശോധിക്കുക  
- **അസംവൃതമായ ടെസ്റ്റ് പരിസ്ഥിതികൾ**: സ്ഥിരതയുള്ള ടെസ്റ്റ് പരിസ്ഥിതി ഉറപ്പാക്കാൻ കണ്ടെയ്നറുകൾ ഉപയോഗിക്കുക  

## സമാപനം

ഉത്തമ നിലവാരമുള്ള MCP സർവ്വറുകൾ വികസിപ്പിക്കുന്നതിനായി സമഗ്രമായ പരിശോധന തന്ത്രം അനിവാര്യമാണ്. ഈ മാർഗ്ഗനിർദ്ദേശത്തിലെ മികച്ച രീതികളും ടിപ്പുകളും നടപ്പിലാക്കുമ്പോൾ നിങ്ങളുടെ MCP നടപ്പാക്കലുകൾ ഉയർന്ന നിലവാരത്തിലുള്ള വിശ്വാസ്യതക്കും പ്രകടനത്തിനും യോജിച്ചാണെന്ന് ഉറപ്പാക്കാം.  

## പ്രധാന ഒന്നര്

1. **ടൂൾ ഡിസൈൻ**: ഒറ്റ ഉത്തരവാദിത്ത സിദ്ധാന്തം പാലിക്കുക, ഡിപ്പენდൻസി ഇൻജക്ഷൻ ഉപയോഗിക്കുക, സംയോജിതത്തിന് ഡിസൈൻ ചെയ്യുക  
2. **സ്കീമ ഡിസൈൻ**: വ്യക്തവും നന്നായി രേഖപ്പെടുത്തിയ സ്കീമകളും ശരിയായ പരിശോധനനിയമങ്ങളും സൃഷ്ടിക്കുക  
3. **പിശക് കൈകാര്യം**: നയവുമായ പിശക് കൈകാര്യം, ഘടിത പിശക് പ്രതികരണങ്ങൾ, പുനരായോഗത്തിലുള്ള പ്രക്രിയ നടപ്പിലാക്കുക  
4. **പ്രദർശനം**: കാച്ചിംഗ്, അസിങ്ക്രണസ് പ്രോസസ്സിങ്, റിസോഴ്‌സ് നിയന്ത്രണം ഉപയോഗിക്കുക  
5. **സുരക്ഷ**: സമഗ്രമായ ഇൻപുട്ട് പരിശോധന, അഡ്മിനിസ്ട്രേഷൻ പരിശോധനകൾ, സങ്കീർണ്ണ ഡാറ്റ കൈകാര്യം  
6. **പരിശോധന**: സമഗ്രമായ യൂണിറ്റ്, ഏകീകരണം, എന്റു-ടു-എൻഡ് ടെസ്റ്റുകൾ സൃഷ്ടിക്കുക  
7. **വർക്‌ഫ്ലോ പാറ്റേണുകൾ**: ചെയിൻസ്, ഡിസ്ട്രിബ്യൂട്ടറുകൾ, പാരലൽ പ്രോസസ്സിങ് പോലെയുള്ള സ്ഥാപിത പാറ്റേണുകൾ ഉപയോഗിക്കുക  

## അഭ്യാസം

ഒരു ഡോക്യുമെന്റ് പ്രോസസ്സിംഗ് സിസ്റ്റത്തിനായി MCP ടൂൾയും വർക്‌ഫ്ലോയും ഡിസൈൻ ചെയ്യുക, അത്:  
1. നിരവധി ഫോർമാറ്റുകളിൽ (PDF, DOCX, TXT) ഡോക്യുമെന്റുകൾ സ്വീകരിക്കുന്നു  
2. ഡോക്യുമെന്റുകളിൽ നിന്നുള്ള ടെക്‌സ്‌റ്റ് മുഖ്യ വിവരങ്ങൾ എടുത്ത് പുറത്തെടുക്കുന്നു  
3. ഡോക്യുമെന്റുകൾ തരം, ഉള്ളടക്കം പ്രകാരം വർഗീകരിക്കുന്നു  
4. ഓരോ ഡോക്യുമെന്റിന്റെയും സംഗ്രഹം സൃഷ്ടിക്കുന്നു  

ടൂൾ സ്കീമകൾ, പിശക് കൈകാര്യം, ഏറ്റവും അനുയോജ്യമായ വർക്‌ഫ്ലോ പാറ്റേൺ നടപ്പിലാക്കുക. ഈ നടപ്പാക്കൽ എങ്ങനെ പരീക്ഷിക്കുമെന്ന് പരിഗണിക്കുക.  

## വിഭവങ്ങൾ

1. ഏറ്റവും പുതിയ പുരോഗതികൾക്കായി [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) ൽ MCP കമ്മ്യൂണിറ്റിയിൽ ചേരുക  
2. ഓപ്പൺ സോഴ്സ് [MCP പ്രോജക്റ്റുകളിൽ](https://github.com/modelcontextprotocol) സഹായിക്കുക  
3. നിങ്ങളുടെ സ്ഥാപനത്തിന്റെ AI സംരംഭങ്ങളിലോട്ട് MCP ആശയങ്ങൾ പ്രയോഗിക്കുക  
4. നിങ്ങളുടെ വ്യവസായത്തിന് അനുയോജ്യമായ MCP നടപ്പാക്കലുകൾ അന്വേഷിക്കുക  
5. മൾട്ടി-മോഡൽ ഏകീകരണം അല്ലെങ്കിൽ വ്യവസായ അപേക്ഷ ഏകീകരണം പോലുള്ള MCP വിഷയങ്ങളിൽ മുൻനിര കോഴ്സുകൾ സ്വീകരിക്കുക  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) വഴി പഠിച്ച MCP ടൂളുകളും വർക്‌ഫ്ലോകളും സ്വയം നിർമ്മിച്ച് പരീക്ഷിക്കുക  

## അടുത്തത്

അടുത്തത്: [കേയ്സ് സ്റ്റഡീസ്](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->