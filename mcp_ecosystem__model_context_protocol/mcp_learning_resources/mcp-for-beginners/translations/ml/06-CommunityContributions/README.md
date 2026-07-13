# സമുദായവും സംഭാവനകളും

[![MCP-യിലേക്കുള്ള സംഭാവന എങ്ങനെ ചെയ്യാം: ഉപകരണങ്ങൾ, ഡോക്സ്, കോഡ് തുടങ്ങിയവ](../../../translated_images/ml/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(ഈ പാഠത്തിന്റെ വീഡിയോ դիտിക്കാൻ മുകളിൽ ചിത്രത്തിൽ ക്ളിക്ക് ചെയ്യുക)_

## അവലോകനം

MCP സമുദായവുമായി എങ്ങനെ ഏർപ്പെട്ടിരിക്കുക, MCP סביבത്തേക്ക് സംഭാവന ചെയ്യുക, സഹകരണ വികസനത്തിന് മികച്ച പദ്ധതികൾ പാലിക്കുക എന്നിവയെഴുതിയ പാഠമാണ് ഇതു. തുറന്ന ഉറവിട MCP പദ്ധതികളിൽ പങ്കെടുക്കുന്നതിന്റെ പ്രസക്തി ഈ സാങ്കേതികവിദ്യയുടെ ഭാവി രൂപപ്പെടുത്താൻ ആഗ്രഹിക്കുന്നവർക്കു മുകളിലായി കാണുന്നു.

## പഠന ലക്ഷ്യങ്ങൾ

ഈ പാഠം പൂര്‍ത്തിയാകുമ്പോൾ നിങ്ങൾ സാധിക്കും:

- MCP സമുദായത്തിന്റെയും അന്തർഗതത്തിന്റെയും ഘടന മനസ്സിലാക്കുക
- MCP സമുദായ ഫോറങ്ങളും ചർച്ചകളും പ്രാപ്തമായി പങ്കാളികളാകുക
- MCP തുറന്ന ഉറവിട സംഭരണികളിൽ സംഭാവന ചെയ്യുക
- കസ്റ്റം MCP ഉപകരണങ്ങൾക്കും സെർവറുകൾക്കും സൃഷ്ടിക്കുകയും പങ്കിടുകയും ചെയ്യുക
- MCP വികസനത്തിലും സഹകരണത്തിലും മികച്ച അഭ്യാസങ്ങൾ പിന്തുടരുക
- MCP വികസനത്തിനുള്ള സമുദായ വിഭവങ്ങളും ഫ്രെയിംവർകുകളും കണ്ടെത്തുക

## MCP സമുദായ അന്തർഗതി

MCP അന്തർഗതി വിവിധ ഘടകങ്ങളിലുമുള്ള പങ്കാളിത്തക്കാരുടെ കൂട്ടായ്മയോടെയാണ് പ്രോട്ടോക്കോൾ മെച്ചപ്പെടുത്തുന്നത്.

### പ്രധാന സമുദായ ഘടകങ്ങൾ

1. **കോർ പ്രോട്ടോക്കോൾ നിലനിർത്തുനർ**: ഔദ്യോഗിക [Model Context Protocol GitHub സംഘടന](https://github.com/modelcontextprotocol) MCP സ്പെസിഫിക്കേഷനുകളും റഫറൻസ് ഇംപ്ലിമെന്റേഷനുകളും സൂക്ഷിക്കുന്നു
2. **ഉപകരണ വികസിപ്പാക്കൾ**: MCP ഉപകരണങ്ങളും സെർവറുകളും സൃഷ്ടിക്കുന്ന വ്യക്തികളും സംഘങ്ങളുമാണ്
3. **ഇന്റഗ്രേഷൻ പ്രൊവൈഡേഴ്സ്**: MCP അവരുടെ ഉൽപ്പന്നങ്ങളിലും സേവനങ്ങളിലുമെൻറെ സംയോജനം ചെയ്യുന്ന കമ്പിനികൾ
4. **അവസാന ഉപയോക്താക്കൾ**: MCP ഉപയോഗിക്കുന്ന ഡെവലപ്പർമാരും സംഘടനകളും
5. **സംഭാവകർ**: കോഡ്, ഡോകുമെന്റേഷൻ അല്ലെങ്കിൽ മറ്റു വിഭവങ്ങളിൽ സംഭാവന ചെയ്യുന്ന സമുദായ അംഗങ്ങൾ

### സമുദായ വിഭവങ്ങൾ

#### ഔദ്യോഗിക ചാനലുകൾ

- [MCP GitHub സംഘടന](https://github.com/modelcontextprotocol)
- [MCP ഡോകുമെന്റേഷൻ](https://modelcontextprotocol.io/)
- [MCP പ്രത്യേകധർമ്മം](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub ചർച്ചകൾ](https://github.com/orgs/modelcontextprotocol/discussions)
- [MCP ഉദാഹരണങ്ങളും സെർവറുകളുമായുള്ള സംഭരണം](https://github.com/modelcontextprotocol/servers)

#### സമുദായ-ഉന്മുഖ വിതരണങ്ങൾ

- [MCP ക്ലയന്റ്‌లు](https://modelcontextprotocol.io/clients) - MCP ഇന്റഗ്രേഷനുകൾ പിന്തുണക്കുന്ന ക്ലയന്റുകൾ പട്ടിക
- [സമുദായ MCP സെർവറുകൾ](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - സമുദായ വികസിപ്പിച്ച MCP സെർവറുകളുടെ വളരുന്ന പട്ടിക
- [Awesome MCP സെർവറുകൾ](https://github.com/wong2/awesome-mcp-servers) - MCP സെർവറുകളുടെ സമാഹാരം
- [PulseMCP](https://www.pulsemcp.com/) - MCP വിഭവങ്ങൾ കണ്ടെത്താനായി സമുദായ ഹബ് & ന്യൂസ് ലെറ്റർ
- [Remote OpenClaw](https://www.remoteopenclaw.com/) - MCP സെർവറുകൾ, ഏജന്റ് കഴിവുകൾ, പ്ലഗ് ഇൻസുകളുടെ സൗജന്യ തിരഞ്ഞടുപ്പ് ഡയരക്ടറി
- [Discord സെർവർ](https://discord.gg/jHEGxQu2a5) - MCP ഡെവലപ്പർമാരുമായി ബന്ധപ്പെടുക
- ഭാഷാ-നിർദ്ദിഷ്ട SDK നടപ്പാക്കലുകൾ
- ബ്ലോഗ് പോസ്റ്റുകളും ട്യൂട്ടോറിയലുകളും

## MCP-യിലേക്ക് സംഭാവന ചെയ്യൽ

### സംഭാവനയുടെ തരം

MCP അന്തർഗതി വിവിധ തരം സംഭാവനകൾ സ്വാഗതം ചെയ്യുന്നു:

1. **കോഡ് സംഭാവനകൾ**:
   - കോർ പ്രോട്ടോക്കോൾ മെച്ചപ്പെടുത്തലുകൾ
   - ബഗ് പരിഹാരങ്ങൾ
   - ഉപകരണങ്ങളും സെർവറുകളും ഇംപ്ലിമെന്റ് ചെയ്യൽ
   - വിവിധ ഭാഷകളിലുളള ക്ലയന്റ്/സെർവർ ലൈബ്രറികൾ

2. **ഡോകുമെന്റേഷൻ**:
   - നിലവിലുള്ള ഡോകുമെന്റേഷൻ മെച്ചപ്പെടുത്തുക
   - ട്യൂട്ടോറിയലുകളും മാർഗ്ഗനിർദേശങ്ങളും സൃഷ്ടിക്കുക
   - ഡോകുമെന്റേഷൻ ഭാഷാന്തരം നിർവ്വഹിക്കുക
   - ഉദാഹരണങ്ങളും സെമ്പിൾ ആപ്ലിക്കേഷനുകളും സൃഷ്ടിക്കുക

3. **സമുദായ പിന്തുണ**:
   - ഫോറങ്ങളിലെയും ചർച്ചകളിലെയും ചോദ്യം മറുപടികൾ
   - പരിശോധനയും പ്രശ്‌നങ്ങൾ റിപ്പോർട്ട് ചെയ്യലും
   - സമുദായ പരിപാടികൾ സംഘടിപ്പിക്കൽ
   - പുതിയ സംഭാവകർക്ക് മേൽനോട്ടം നൽകൽ

### സംഭാവന പ്രക്രിയ: കോർ പ്രോട്ടോക്കോൾ

കോർ MCP പ്രോട്ടോക്കോളിനോ ഔദ്യോഗിക ഇംപ്ലിമെന്റേഷനോ സംഭാവന നൽകാൻ [ഓഫീഷ്യൽ സംഭാവന മാർഗ്ഗനിർദേശങ്ങളിൽ](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md) നിന്നുള്ള ഈ സിദ്ധാന്തങ്ങൾ പാലിക്കുക:

1. **സരളതയും ലഘുമതയും**: MCP വ്യാഖ്യാനം പുതിയ ആശയങ്ങൾ ചേർക്കുന്നതിൽ ഉയർന്ന മാനദണ്ഡം ഉണ്ട്. പുതിയ കാര്യങ്ങൾ ചേർക്കുക എളുപ്പമാണ്, ഒഴിവാക്കുക കൂടുതൽ ദുഷ്കരം.

2. **വാസ്തവമൂലക സമീപനം**: വ്യാഖ്യാനം മാറ്റങ്ങൾ പ്രത്യേക ഇംപ്ലിമെന്റേഷൻ വെല്ലുവിളികൾ അടിസ്ഥാനമാക്കിയല്ലപ്പോൾ സിദ്ധാന്തപരമായ ആശയങ്ങൾ പിന്‍വലിക്കുക.

3. **പ്രस्तാവത്തിന്റെ ഘട്ടങ്ങൾ**:
   - നിർവചിക്കുക: പ്രശ്ന സ്ഥലം കൂടി പഠിക്കുക, മറ്റ് MCP ഉപയോക്താക്കൾക്കും സമാന പ്രശ്നമുണ്ടെന്ന് സ്ഥിരീകരിക്കുക
   - പ്രോട്ടോട്ടൈപ്പ്: ഉദാഹരണ പരിഹാരം നിർമ്മിക്കുകയും പ്രായോഗിക പ്രയോഗം തെളിയിക്കുകയും ചെയ്യുക
   - എഴുതുക: പ്രോട്ടോടൈപ്പിന്റെ അടിസ്ഥാനത്തിൽ വ്യാഖ്യാനം നിർദ്ദേശം രചിക്കുക

### വികസന പരിസരം സജ്ജീകരിക്കൽ

```bash
# റിപോസിറ്ററി ഫോർക്ക് ചെയ്യുക
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# ആശ്രിതങ്ങൾ ഇൻസ്റ്റാൾ ചെയ്യുക
npm install

# സ്കീമ മാറ്റങ്ങൾക്ക്, പരിശോധന നടത്തി schema.json സൃഷ്ടിക്കുക:
npm run check:schema:ts
npm run generate:schema

# ഡോക്യുമെന്റേഷൻ മാറ്റങ്ങൾക്കായി
npm run check:docs
npm run format

# ഡോക്യുമെന്റേഷൻ പ്രൈവ്യൂ ലോക്കൽ ആയി (ഐച്ഛികം):
npm run serve:docs
```

### ഉദാഹരണം: ഒരു ബഗ് പരിഹാരം സംഭാവന ചെയ്യൽ

```javascript
// ടൈപ്പ്സ്ക്രിപ്റ്റ്-എസ്ഡികെയിലുള്ള ബഗ്ഗോടുകൂടിയ മെഴുകൻ കോഡ്
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // ബഗ്: വസ്തു പരിശോധന ലഭ്യമല്ല
  // നിലവിലെ നടപ്പാക്കൽ:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// സംഭാവനയിൽ പരിഹരിച്ചു നടപ്പാക്കൽ
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // മെച്ചപ്പെടുത്തിയ പരിശോധന
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### ഉദാഹരണം: സ്റ്റാൻഡേർഡ് ലൈബ്രറിയിലേക്ക് ഒരു പുതിയ ഉപകരണം സംഭാവന ചെയ്യൽ

```python
# ഉദാഹരണ സംഭാവനം: MCP സ്റ്റാൻഡേർഡ് ലൈബ്രറിയ്ക്ക് ഒരു CSV ഡാറ്റ പ്രോസസ്സിംഗ് ടൂൾ

from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
import pandas as pd
import io
import json
from typing import Dict, Any, List, Optional

class CsvProcessingTool(Tool):
    """
    Tool for processing and analyzing CSV data.
    
    This tool allows models to extract information from CSV files,
    run basic analysis, and convert data between formats.
    """
    
    def get_name(self):
        return "csvProcessor"
        
    def get_description(self):
        return "Processes and analyzes CSV data"
    
    def get_schema(self):
        return {
            "type": "object",
            "properties": {
                "csvData": {
                    "type": "string", 
                    "description": "CSV data as a string"
                },
                "csvUrl": {
                    "type": "string",
                    "description": "URL to a CSV file (alternative to csvData)"
                },
                "operation": {
                    "type": "string",
                    "enum": ["summary", "filter", "transform", "convert"],
                    "description": "Operation to perform on the CSV data"
                },
                "filterColumn": {
                    "type": "string",
                    "description": "Column to filter by (for filter operation)"
                },
                "filterValue": {
                    "type": "string",
                    "description": "Value to filter for (for filter operation)"
                },
                "outputFormat": {
                    "type": "string",
                    "enum": ["json", "csv", "markdown"],
                    "default": "json",
                    "description": "Output format for the processed data"
                }
            },
            "oneOf": [
                {"required": ["csvData", "operation"]},
                {"required": ["csvUrl", "operation"]}
            ]
        }
    
    async def execute_async(self, request: ToolRequest) -> ToolResponse:
        try:
            # പാരാമീറ്ററുകൾ പുറത്തെടുക്കുക
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # നേരിട്ട് ഡാറ്റയോ URL വഴി CSV ഡാറ്റ ലഭിക്കുക
            df = await self._get_dataframe(request)
            
            # അഭ്യർത്ഥിച്ച പ്രവർത്തനത്തിന്റെ അടിസ്ഥാനത്തിൽ പ്രോസസ്സ് ചെയ്യുക
            result = {}
            
            if operation == "summary":
                result = self._generate_summary(df)
            elif operation == "filter":
                column = request.parameters.get("filterColumn")
                value = request.parameters.get("filterValue")
                if not column:
                    raise ToolExecutionException("filterColumn is required for filter operation")
                result = self._filter_data(df, column, value)
            elif operation == "transform":
                result = self._transform_data(df, request.parameters)
            elif operation == "convert":
                result = self._convert_format(df, output_format)
            else:
                raise ToolExecutionException(f"Unknown operation: {operation}")
            
            return ToolResponse(result=result)
        
        except Exception as e:
            raise ToolExecutionException(f"CSV processing failed: {str(e)}")
    
    async def _get_dataframe(self, request: ToolRequest) -> pd.DataFrame:
        """Gets a pandas DataFrame from either CSV data or URL"""
        if "csvData" in request.parameters:
            csv_data = request.parameters.get("csvData")
            return pd.read_csv(io.StringIO(csv_data))
        elif "csvUrl" in request.parameters:
            csv_url = request.parameters.get("csvUrl")
            return pd.read_csv(csv_url)
        else:
            raise ToolExecutionException("Either csvData or csvUrl must be provided")
    
    def _generate_summary(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Generates a summary of the CSV data"""
        return {
            "columns": df.columns.tolist(),
            "rowCount": len(df),
            "columnCount": len(df.columns),
            "numericColumns": df.select_dtypes(include=['number']).columns.tolist(),
            "categoricalColumns": df.select_dtypes(include=['object']).columns.tolist(),
            "sampleRows": json.loads(df.head(5).to_json(orient="records")),
            "statistics": json.loads(df.describe().to_json())
        }
    
    def _filter_data(self, df: pd.DataFrame, column: str, value: str) -> Dict[str, Any]:
        """Filters the DataFrame by a column value"""
        if column not in df.columns:
            raise ToolExecutionException(f"Column '{column}' not found")
            
        filtered_df = df[df[column].astype(str).str.contains(value)]
        
        return {
            "originalRowCount": len(df),
            "filteredRowCount": len(filtered_df),
            "data": json.loads(filtered_df.to_json(orient="records"))
        }
    
    def _transform_data(self, df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
        """Transforms the data based on parameters"""
        # നടപ്പാക്കൽ വിവിധ പരിവർത്തനങ്ങൾ ഉൾകൊള്ളിക്കും
        return {
            "status": "success",
            "message": "Transformation applied"
        }
    
    def _convert_format(self, df: pd.DataFrame, format: str) -> Dict[str, Any]:
        """Converts the DataFrame to different formats"""
        if format == "json":
            return {
                "data": json.loads(df.to_json(orient="records")),
                "format": "json"
            }
        elif format == "csv":
            return {
                "data": df.to_csv(index=False),
                "format": "csv"
            }
        elif format == "markdown":
            return {
                "data": df.to_markdown(),
                "format": "markdown"
            }
        else:
            raise ToolExecutionException(f"Unsupported output format: {format}")
```

### സംഭാവന മാർഗ്ഗനിർദേശങ്ങൾ

MCP പദ്ധതികളിലേക്ക് വിജയകരം സംഭാവന ചെയ്യാൻ:

1. **ചെറുതുമുതലെടുക്കുക**: ഡോകുമെന്റേഷൻ, ബഗ് പരിഹാരങ്ങൾ അല്ലെങ്കിൽ ചെറിയ മെച്ചപ്പെടുത്തലുകൾ തുടങ്ങുക
2. **സ്റ്റൈൽ ഗൈഡ് പാലിക്കുക**: പ്രോജക്ടിന്റെ കോഡിംഗ് സ്റ്റൈൽ, പതിവുകൾ പാലിക്കുക
3. **ടെസ്റ്റുകൾ എഴുതുക**: നിങ്ങളുടെ കോഡ് സംഭാവനകൾക്ക് യൂണിറ്റ് ടെസ്റ്റുകൾ ഉൾപ്പെടുത്തുക
4. **നിങ്ങളുടെ പ്രവർത്തനം രേഖപ്പെടുത്തുക**: പുതിയ ഫീച്ചറുകൾക്കോ മാറ്റങ്ങൾക്കോ വ്യക്തമായ ഡോകുമെന്റേഷൻ ചേർക്കുക
5. **ലക്ഷ്യമിട്ട PR-കൾ സമർപ്പിക്കുക**: പുൾ റിക്വസ്റ്റ് ഒരൊറ്റ പ്രശ്‌നം അല്ലെങ്കിൽ ഫീച്ചറിലേക്ക് കേന്ദ്രീകരിക്കുക
6. **പ്രതികരണവുമായി ഇടപെടുക**: നിങ്ങളുടെ സംഭാവനകൾക്കുള്ള പ്രതികരണത്തിന് മറുപടി നൽകുക

### ഉദാഹരണ സംഭാവന പ്രവാഹം

```bash
# റെപ്പോസിറ്ററി ക്ലോൺ ചെയ്യുക
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# നിങ്ങളുടെ സംഭാവനയ്ക്ക് പുതിയ ബ്രാഞ്ച് സൃഷ്ടിക്കുക
git checkout -b feature/my-contribution

# നിങ്ങളുടെ മാറ്റങ്ങൾ ചെയ്യുക
# ...

# നിലവിലുള്ള പ്രവർത്തനക്ഷമത തകരാറിലാകാതിരിക്കാൻ പരീക്ഷണം നടത്തുക
npm test

# വിവചനാത്മക സന്ദേശത്തോടെ നിങ്ങളുടെ മാറ്റങ്ങൾ കമ്മിറ്റ് ചെയ്യുക
git commit -am "Fix validation in resource handler"

# നിങ്ങളുടെ ബ്രാഞ്ച് നിങ്ങളുടെ ഫോർക്കിലേക്ക് പുഷ് ചെയ്യുക
git push origin feature/my-contribution

# ബ്രാഞ്ചിൽ നിന്ന് മുഖ്യ റെപ്പോസിറ്ററിയിലേക്ക് പുൾ റിക്വസ്റ്റ് സൃഷ്ടിക്കുക
# തുടർന്ന് അഭിപ്രായങ്ങൾ സ്വീകരിച്ച് ആവശ്യമെങ്കിൽ നിങ്ങളുടെ പുൾ റിക്വസ്റ്റ് പുനരാവൃത്തി ചെയ്യുക
```

## MCP സെർവറുകൾ സൃഷ്ടിക്കുകയും പങ്കിടുകയും ചെയ്യൽ

MCP അന്തർഗതിയിൽ ഏറ്റവും വിലമതിക്കപ്പെടുന്ന മാർഗങ്ങളിൽ ഒന്ന് കസ്റ്റം MCP സെർവറുകൾ സൃഷ്ടിക്കുകയും പങ്കിടുകയും ചെയ്യലാണ്. സമുദായം ഇതിനകം നിരവധി സേവനങ്ങളും ഉപയോഗ കേസുകളും varten സെർവറുകൾ വികസിപ്പിച്ചിട്ടുണ്ട്.

### MCP സെർവർ വികസന ഫ്രെയിംവർകുകൾ

MCP സെർവർ വികസനം ലളിതമാക്കാൻ പല ഫ്രെയിംവർകുകളും ലഭ്യമാണ്:

1. **അൗദ്യോഗിക SDKകൾ** ([MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) അനുസരിച്ചുള്ള):
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **സമുദായ ഫ്രെയിംവർകുകൾ**:
   - [MCP-Framework](https://mcp-framework.com/) - TypeScript-ൽ MCP സെർവറുകൾ സുന്ദരവും വേഗതയിലും നിർമ്മിക്കുക
   - [MCP Declarative Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - ജാവയിൽ അനോട്ടേഷൻ-പ്രേരിത MCP സെർവറുകൾ
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) - MCP സെർവറുകൾക്കായുള്ള ജാവ ഫ്രെയിംവർക്ക്
   - [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) - MCP സെർവറുകൾക്കായുള്ള സ്റ്റാർട്ടർ Next.js പ്രോജക്ട്

### പങ്കിടാവുന്ന ഉപകരണങ്ങൾ വികസിപ്പിക്കൽ

#### .NET ഉദാഹരണം: പങ്കിടാൻ കഴിയുന്ന ടൂൾ പാക്കേജ് സൃഷ്ടിക്കൽ

```csharp
// Create a new .NET library project
// dotnet new classlib -n McpFinanceTools

using Microsoft.Mcp.Tools;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json;

namespace McpFinanceTools
{
    // Stock quote tool
    public class StockQuoteTool : IMcpTool
    {
        private readonly HttpClient _httpClient;
        
        public StockQuoteTool(HttpClient httpClient = null)
        {
            _httpClient = httpClient ?? new HttpClient();
        }
        
        public string Name => "stockQuote";
        public string Description => "Gets current stock quotes for specified symbols";
        
        public object GetSchema()
        {
            return new {
                type = "object",
                properties = new {
                    symbol = new { 
                        type = "string",
                        description = "Stock symbol (e.g., MSFT, AAPL)" 
                    },
                    includeHistory = new { 
                        type = "boolean",
                        description = "Whether to include historical data",
                        default = false
                    }
                },
                required = new[] { "symbol" }
            };
        }
        
        public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
        {
            // Extract parameters
            string symbol = request.Parameters.GetProperty("symbol").GetString();
            bool includeHistory = false;
            
            if (request.Parameters.TryGetProperty("includeHistory", out var historyProp))
            {
                includeHistory = historyProp.GetBoolean();
            }
            
            // Call external API (example)
            var quoteResult = await GetStockQuoteAsync(symbol);
            
            // Add historical data if requested
            if (includeHistory)
            {
                var historyData = await GetStockHistoryAsync(symbol);
                quoteResult.Add("history", historyData);
            }
            
            // Return formatted result
            return new ToolResponse {
                Result = JsonSerializer.SerializeToElement(quoteResult)
            };
        }
        
        private async Task<Dictionary<string, object>> GetStockQuoteAsync(string symbol)
        {
            // Implementation would call a real stock API
            // This is a simplified example
            return new Dictionary<string, object>
            {
                ["symbol"] = symbol,
                ["price"] = 123.45,
                ["change"] = 2.5,
                ["percentChange"] = 1.2,
                ["lastUpdated"] = DateTime.UtcNow
            };
        }
        
        private async Task<object> GetStockHistoryAsync(string symbol)
        {
            // Implementation would get historical data
            // Simplified example
            return new[]
            {
                new { date = DateTime.Now.AddDays(-7).Date, price = 120.25 },
                new { date = DateTime.Now.AddDays(-6).Date, price = 122.50 },
                new { date = DateTime.Now.AddDays(-5).Date, price = 121.75 }
                // More historical data...
            };
        }
    }
}

// Create package and publish to NuGet
// dotnet pack -c Release
// dotnet nuget push bin/Release/McpFinanceTools.1.0.0.nupkg -s https://api.nuget.org/v3/index.json -k YOUR_API_KEY
```

#### ജാവ ഉദാഹരണം: ടൂളുകൾക്കായി Maven പാക്കേജ് നിർമ്മിക്കൽ

```java
// പങ്ക് വെയ്ക്കാവുന്ന MCP ടൂൾ പാക്കേജ്‌ ചെയ്ത jaoks pom.xml കോൺഫിഗറേഷൻ
<!-- 
<project>
    <groupId>com.example</groupId>
    <artifactId>mcp-weather-tools</artifactId>
    <version>1.0.0</version>
    
    <dependencies>
        <dependency>
            <groupId>com.mcp</groupId>
            <artifactId>mcp-server</artifactId>
            <version>1.0.0</version>
        </dependency>
    </dependencies>
    
    <distributionManagement>
        <repository>
            <id>github</id>
            <name>GitHub Packages</name>
            <url>https://maven.pkg.github.com/username/mcp-weather-tools</url>
        </repository>
    </distributionManagement>
</project>
-->

package com.example.mcp.weather;

import com.mcp.tools.Tool;
import com.mcp.tools.ToolRequest;
import com.mcp.tools.ToolResponse;
import com.mcp.tools.ToolExecutionException;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

public class WeatherForecastTool implements Tool {
    private final HttpClient httpClient;
    private final String apiKey;
    
    public WeatherForecastTool(String apiKey) {
        this.httpClient = HttpClient.newHttpClient();
        this.apiKey = apiKey;
    }
    
    @Override
    public String getName() {
        return "weatherForecast";
    }
    
    @Override
    public String getDescription() {
        return "Gets weather forecast for a specified location";
    }
    
    @Override
    public Object getSchema() {
        Map<String, Object> schema = new HashMap<>();
        // സ്കീമ നിർവ്വചനം...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // കാലാവസ്ഥ API വിളിക്കുക
            Map<String, Object> forecast = getForecast(location, days);
            
            // പ്രതികരണം നിർമാണിക്കുക
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // നടപ്പായിപ്പിക്കുക കാലാവസ്ഥ API വിളിക്കും
        // ലളിതമാക്കി ഉദാഹരണം
        Map<String, Object> result = new HashMap<>();
        // പ്രവചനം ഡാറ്റ ചേർക്കുക...
        return result;
    }
}

// Maven ഉപയോഗിച്ച് നിർമ്മിക്കുക, പ്രസിദ്ധീകരിക്കുക
// mvn clean package
// mvn deploy
```

#### പൈറ്റൺ ഉദാഹരണം: PyPI പാക്കേജ് പ്രസിദ്ധീകരിക്കൽ

```python
# PyPI പാക്കേജിന്‍റെ ഡയറക്‌ടറി ഘടന:
# mcp_nlp_tools/
# ├── ലൈസൻസ്
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# ഉദാഹരണ setup.py
"""
from setuptools import setup, find_packages

setup(
    name="mcp_nlp_tools",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "mcp_server>=1.0.0",
        "transformers>=4.0.0",
        "torch>=1.8.0"
    ],
    author="Your Name",
    author_email="your.email@example.com",
    description="MCP tools for natural language processing tasks",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/username/mcp_nlp_tools",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
)
"""

# ഉദാഹരണ NLP ടൂൾ നടപ്പാക്കൽ (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # സൻറിമെന്റ് അനാലിസിസ് മോഡൽ ലോഡ് ചെയ്യുക
        self.sentiment_analyzer = pipeline("sentiment-analysis", model=model_name)
    
    def get_name(self):
        return "sentimentAnalysis"
        
    def get_description(self):
        return "Analyzes the sentiment of text, classifying it as positive or negative"
    
    def get_schema(self):
        return {
            "type": "object",
            "properties": {
                "text": {
                    "type": "string", 
                    "description": "The text to analyze for sentiment"
                },
                "includeScore": {
                    "type": "boolean",
                    "description": "Whether to include confidence scores",
                    "default": True
                }
            },
            "required": ["text"]
        }
    
    async def execute_async(self, request: ToolRequest) -> ToolResponse:
        try:
            # പാരാമീറ്ററുകൾ പിഴച്ച് ഏറ്റു പിടിക്കുക
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # സൻറിമെന്റ് വിശകലനം ചെയ്യുക
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # ഫലം ഫോർമാറ്റ് ചെയ്യുക
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # ഫലം മടക്കിവരിക
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# പ്രസിദ്ധീകരിക്കാൻ:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### മികച്ച അഭ്യാസങ്ങൾ പങ്കിടൽ

MCP ഉപകരണങ്ങൾ സമുദായത്തോടൊപ്പം പങ്കിടുമ്പോൾ:

1. **പൂർണ്ണമായ ഡോകുമെന്റേഷൻ**:
   - ഉദ്ദേശ്യം, ഉപയോഗം, ഉദാഹരണങ്ങൾ രേഖപ്പെടുത്തുക
   - പാരാമീറ്ററുകളും മടിയുമാര്യവുമുള്ള വിശദീകരണം നൽകുക
   - ഏതെങ്കിലും ബാഹ്യ ആശ്രിതങ്ങൾ രേഖപ്പെടുത്തുക

2. **പിശക് കൈകാര്യം**:
   - ശക്തമായ പിശക് കൈകാര്യം നടപ്പിലാക്കുക
   - പ്രയോജനപ്രദമായ പിശക് സന്ദേശങ്ങൾ നൽകുക
   - എഡ്ജ് കേസുകൾ നന്നായി കൈകാര്യം ചെയ്യുക

3. **പ്രകടന പരിഗണനകൾ**:
   - വേഗത്തിൽ വാഹനവും വിഭവ ഉപയോഗവും മെച്ചപ്പെടുത്തുക
   - ആവശ്യമായപ്പോൾ കാഷിംഗ് നടപ്പിലാക്കുക
   - സ്കെയിലബിലിറ്റി പരിഗണിക്കുക

4. **സുരക്ഷ**:
   - സുരക്ഷിത API കീകളും ഓത്തന്റിക്കേഷനും ഉപയോഗിക്കുക
   - ഇൻപുട്ടുകൾ ശരിവെക്കുന്നവും ശുദ്ധമാക്കുന്നതും ചെയ്യുക
   - ബാഹ്യ API വിളികൾക്കായി നിരക്ക്‌ പരിധിയിടൽ നടപ്പാക്കുക

5. **പരീക്ഷണം**:
   - സമഗ്രമായ ടെസ്റ്റ് കവറേജ് ഉൾപ്പെടുത്തുക
   - വ്യത്യസ്ത ഇൻപുട്ട് തരംകളും എഡ്ജ് കേസുകളും പരീക്ഷിക്കുക
   - ടെസ്റ്റ് നടപടികൾ രേഖപ്പെടുത്തുക

## സമുദായ സഹകരണവും മികച്ച അഭ്യാസങ്ങളും

ഫലപ്രദമായ സഹകരണം ക്ഷേമിച്ച MCP അന്തർഗതിയുടെ മുഖ്യ ഘടകമാണ്.

### ആശയവിനിമയ ചാനലുകൾ

- GitHub Issue കളും ചർച്ചകളും
- Microsoft ടെക്ക് കമ്മ്യൂണിറ്റി
- Discord, Slack ചാനലുകൾ
- Stack Overflow (ടാഗ്: `model-context-protocol` അല്ലെങ്കിൽ `mcp`)

### കോഡ് റിവ്യൂകൾ

MCP സംഭാവനകൾ റിവ്യൂ ചെയ്തപ്പോൾ:

1. **സ്വച്ഛത**: കോഡ് വ്യക്തവുമാണ്, ഡോകമെന്റേഷൻ മികച്ചതാണ്?
2. **ശ്രമിത ശരിത**: പ്രതീക്ഷിച്ചതുപോലെ പ്രവർത്തിക്കുന്നുണ്ടോ?
3. **ഒരൂപത**: പ്രോജക്ട് പതിവുകൾ പാലിച്ചുണ്ടോ?
4. **പൂർണത**: ടെസ്റ്റുകളും ഡോകുമെന്റേഷനും ഉൾപ്പെട്ടിട്ടുണ്ടോ?
5. **സുരക്ഷ**: സുരക്ഷാ ആശങ്കകൾ ഉണ്ടോ?

### പതിപ്പു പൊരുത്തം

MCP-ൽ വികസനവുമായി:

1. **പ്രോട്ടോക്കോൾ പതിപ്പ്**: നിങ്ങളുടെ ടൂൾ പിന്തുണയ്ക്കുന്ന MCP പ്രോട്ടോക്കോൾ പതിപ്പ് പാലിക്കുക
2. **ക്ലയന്റ് പൊരുത്തം**: പിന്മടങ്ങൽ പൊരുത്തം പരിഗണിക്കുക
3. **സെർവർ പൊരുത്തം**: സെർവർ നടപ്പീകരണ മാർഗ്ഗനിർദേശങ്ങൾ പിന്തുടരുക
4. **ഭേദഗതി പരിച്ഛേദങ്ങൾ**: സ്ഥിതി ചെയ്യുന്ന പ്രശ്നങ്ങളെ വിശദമായി രേഖപ്പെടുത്തുക

## ഉദാഹരണ സമുദായ പദ്ധതി: MCP ടൂൾ രജിസ്റ്ററി

MCP ഉപകരണങ്ങൾക്ക് പൊതുജന രജിസ്റ്ററി വികസിപ്പിക്കുക അത്യന്തം പ്രധാന സമുദായ സംഭാവനയായേക്കാം.

```python
# ഒരു സമൂഹ ഉപകരണം രജിസ്ട്രി API-ക്ക് ഉദാഹരണ സ്കീമ

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# ഉപകരണം രജിസ്ട്രിക്ക് മോഡലുകൾ
class ToolSchema(BaseModel):
    """JSON Schema for a tool"""
    type: str
    properties: dict
    required: List[str] = []

class ToolRegistration(BaseModel):
    """Information for registering a tool"""
    name: str = Field(..., description="Unique name for the tool")
    description: str = Field(..., description="Description of what the tool does")
    version: str = Field(..., description="Semantic version of the tool")
    schema: ToolSchema = Field(..., description="JSON Schema for tool parameters")
    author: str = Field(..., description="Author of the tool")
    repository: Optional[HttpUrl] = Field(None, description="Repository URL")
    documentation: Optional[HttpUrl] = Field(None, description="Documentation URL")
    package: Optional[HttpUrl] = Field(None, description="Package URL")
    tags: List[str] = Field(default_factory=list, description="Tags for categorization")
    examples: List[dict] = Field(default_factory=list, description="Example usage")

class Tool(ToolRegistration):
    """Tool with registry metadata"""
    id: uuid.UUID = Field(default_factory=uuid.uuid4)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
    updated_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
    downloads: int = Field(default=0)
    rating: float = Field(default=0.0)
    ratings_count: int = Field(default=0)

# രജിസ്ട്രിക്ക് വേണ്ടി ഫാസ്റ്റ്API അപ്ലിക്കേഷൻ
app = FastAPI(title="MCP Tool Registry")

# ഈ ഉദാഹരണത്തിന് ഇൻ-മെമ്മറി ഡാറ്റാബേസ്
tools_db = {}

@app.post("/tools", response_model=Tool)
async def register_tool(tool: ToolRegistration):
    """Register a new tool in the registry"""
    if tool.name in tools_db:
        raise HTTPException(status_code=400, detail=f"Tool '{tool.name}' already exists")
    
    new_tool = Tool(**tool.dict())
    tools_db[tool.name] = new_tool
    return new_tool

@app.get("/tools", response_model=List[Tool])
async def list_tools(tag: Optional[str] = None):
    """List all registered tools, optionally filtered by tag"""
    if tag:
        return [tool for tool in tools_db.values() if tag in tool.tags]
    return list(tools_db.values())

@app.get("/tools/{tool_name}", response_model=Tool)
async def get_tool(tool_name: str):
    """Get information about a specific tool"""
    if tool_name not in tools_db:
        raise HTTPException(status_code=404, detail=f"Tool '{tool_name}' not found")
    return tools_db[tool_name]

@app.delete("/tools/{tool_name}")
async def delete_tool(tool_name: str):
    """Delete a tool from the registry"""
    if tool_name not in tools_db:
        raise HTTPException(status_code=404, detail=f"Tool '{tool_name}' not found")
    del tools_db[tool_name]
    return {"message": f"Tool '{tool_name}' deleted"}
```

## പ്രധാന ആശയങ്ങൾ

- MCP സമുദായം വൈവിധ്യമാർന്നതും വിവിധ തരത്തിലുള്ള സംഭാവനകൾക്ക് സ്വാഗതവുമാണ്
- MCP-യിലേക്ക് സംഭാവനം നൽകുന്നത് കോർ പ്രോട്ടോക്കോൾ മെച്ചപ്പെടുത്തലുകളിൽ നിന്നും കസ്റ്റം ഉപകരണങ്ങളിലേക്കും വ്യാപിക്കുന്നു
- സംഭാവനാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ പിന്തുടരുന്നത് PR അംഗീകാരം നേടാനുള്ള സാധ്യത വർദ്ധിപ്പിക്കും
- MCP ഉപകരണങ്ങൾ സൃഷ്ടിക്കുകയും പങ്കിടുകയും ചെയ്യൽ അന്തർഗതിയെ മെച്ചപ്പെടുത്താൻ മൂല്യവത്തായ മാർഗമാണ്
- MCP വളർച്ചക്കും മെച്ചപ്പെടുത്തലിനും സമുദായ സഹകരണം അനിവാര്യമാണ്

## അഭ്യാസം

1. നിങ്ങളുടെ കഴിവുകൾക്കും താല്പര്യങ്ങൾക്കും അടിസ്ഥാനമായി MCP അന്തർഗതിയിൽ സംഭാവന ചെയ്യാനാകുന്ന പ്രദേശം കണ്ടെത്തുക
2. MCP സംഭരണം ഫോർക്കുചെയ്യുകയും പ്രാദേശിക വികസന പരിസരം സജ്ജമാക്കുക
3. സമുദായത്തിന് ലാഭകരമായ ഒരു ചെറിയ മെച്ചപ്പെടുത്തലോ, ബഗ് പരിഹാരമോ, ഉപകരണമോ സൃഷ്ടിക്കുക
4. നിങ്ങളുടെ സംഭാവനയ്ക്ക് അനുയായമായ ടെസ്റ്റുകളും ഡോകുമെന്റേഷനും ചേർക്കുക
5. അനുയായമായ സംഭരണിയിലേക്ക് പുൾ റിക്വസ്റ്റ് സമർപ്പിക്കുക

## അധിക വിഭവങ്ങൾ

- [MCP സമുദായ പദ്ധതികൾ](https://github.com/topics/model-context-protocol)

---

## അടുത്തത് എന്താണ്

അടുത്തത്: [ആദ്യ സ്വീകരണത്തിൽ നിന്നുള്ള പാഠങ്ങൾ](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->