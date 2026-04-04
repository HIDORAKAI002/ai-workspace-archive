# ਕੇਸ ਸਟਡੀ: ਏਪੀਆਈ ਮੈਨੇਜਮੈਂਟ ਵਿੱਚ MCP ਸਰਵਰ ਵਜੋਂ REST API ਨੂੰ ਇਕਸਪੋਜ਼ ਕਰਨਾ

Azure API Management, ਇੱਕ ਸੇਵਾ ਹੈ ਜੋ ਤੁਹਾਡੇ API ਐਂਡਪੌਇੰਟਸ ਦੇ ਉੱਤੇ ਇਕ ਗੇਟਵੇ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ। ਇਹ ਕਿਸੇ ਪਰੋਕਸੀ ਵਾਂਗ ਵਰਤਦਾ ਹੈ ਜੋ ਤੁਹਾਡੇ APIs ਦੇ ਸਾਹਮਣੇ ਹੁੰਦੀ ਹੈ ਅਤੇ ਆਉਣ ਵਾਲੀਆਂ ਬੇਨਤੀਵਾਂ ਨਾਲ ਕੀ ਕਰਨਾ ਹੈ ਇਸ ਦਾ ਫੈਸਲਾ ਕਰਦਾ ਹੈ। 

ਇਸਦੀ ਵਰਤੋਂ ਨਾਲ ਤੁਸੀਂ ਕਈ ਸਾਰੇ ਫੀਚਰ ਜੋੜ ਸਕਦੇ ਹੋ ਜਿਵੇਂ:

- **ਸੁਰੱਖਿਆ**, ਤੁਸੀਂ API ਕੀਆਂ, JWT ਤੋਂ ਲੈ ਕੇ ਪ੍ਰਬੰਧਿਤ ਪਹਿਚਾਣ ਤੱਕ ਸਭ ਕੁਝ ਵਰਤ ਸਕਦੇ ਹੋ।
- **ਰੇਟ ਲਿਮਿਟਿੰਗ**, ਇਹ ਇੱਕ ਬਹੁਤ ਵਧੀਆ ਫੀਚਰ ਹੈ ਜਿਸ ਨਾਲ ਤੁਸੀਂ ਫੈਸਲਾ ਕਰ ਸਕਦੇ ਹੋ ਕਿ ਕੁਝ ਸਮੇਂ ਵਿੱਚ ਕਿੰਨੀ ਕਾਲਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਇਸ ਨਾਲ ਯਕੀਨੀ ਬਣਦਾ ਹੈ ਕਿ ਸਾਰੇ ਯੂਜ਼ਰਾਂ ਨੂੰ ਵਧੀਆ ਤਜਰਬਾ ਮਿਲਦਾ ਹੈ ਅਤੇ ਤੁਹਾਡੀ ਸੇਵਾ ਬੇਨਤੀਆਂ ਨਾਲ ਭਰ ਜਾਨ ਤੋਂ ਬਚਦੀ ਹੈ।
- **ਸਕੇਲਿੰਗ ਅਤੇ ਲੋਡ ਬੈਲੈਂਸਿੰਗ**। ਤੁਸੀਂ ਕਈ ਐਂਡਪੌਇੰਟ ਬਣਾਕੇ ਲੋਡ ਨੂੰ ਵੰਡ ਸਕਦੇ ਹੋ ਅਤੇ ਇਹ ਵੀ ਫੈਸਲਾ ਕਰ ਸਕਦੇ ਹੋ ਕਿ ਕਿਵੇਂ "ਲੋਡ ਬੈਲੈਂਸ" ਕਰਨਾ ਹੈ।
- **AI ਫੀਚਰ ਜਿਵੇਂ ਸੈਮੈਂਟਿਕ ਕੈਚਿੰਗ**, ਟੋਕਨ ਲਿਮਿਟ ਅਤੇ ਟੋਕਨ ਮਾਨੀਟਰਿੰਗ ਆਦਿ। ਇਹ ਵਧੀਆ ਫੀਚਰ ਹਨ ਜੋ ਪ੍ਰਤੀਕਿਰਿਆਸ਼ੀਲਤਾ ਨੂੰ ਸੁਧਾਰਦੇ ਹਨ ਅਤੇ ਤੁਹਾਡੇ ਟੋਕਨ ਸਪੈਂਡ ਨਾਲ ਨਜ਼ਰਬੰਦਾ ਕੀਤੇ ਰੱਖਦੇ ਹਨ। [ਇੱਥੇ ਹੋਰ ਪੜ੍ਹੋ](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)। 

## ਕਿਉਂ MCP + Azure API Management?

ਮੌਡਲ ਕਾਂਟੈਕਸਟ ਪ੍ਰੋਟੋਕੋਲ ਤੇਜ਼ੀ ਨਾਲ ਏਜੈਂਟਿਕ AI ਐਪਸ ਲਈ ਇੱਕ ਮਿਆਰੀ ਬਣਦਾ ਜਾ ਰਿਹਾ ਹੈ ਅਤੇ ਸੰਦਾਂ ਅਤੇ ਡਾਟਾ ਨੂੰ ਇੱਕ ਅਖੰਡ ਤਰੀਕੇ ਨਾਲ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ। ਜਦੋਂ ਤੁਹਾਨੂੰ APIs ਨੂੰ "ਮੈਨੇਜ" ਕਰਨਾ ਹੁੰਦਾ ਹੈ ਤਾਂ Azure API Management ਇੱਕ ਕੁਦਰਤੀ ਚੋਣ ਹੁੰਦੀ ਹੈ। MCP ਸਰਵਰ ਅਕਸਰ ਹੋਰ APIs ਨਾਲ ਮਿਲ ਕੇ ਬੇਨਤੀਆਂ ਨੂੰ ਹੱਲ ਕਰਦੇ ਹਨ। ਇਸ ਲਈ Azure API Management ਅਤੇ MCP ਨੂੰ ਜੋੜਨਾ ਬਹੁਤ ਸਜ਼ਾ ਹੋਦਾ ਹੈ।

## ਓਵਰਵਿਊ

ਇਸ ਵਿਸ਼ੇਸ਼ ਕੇਸ ਵਿੱਚ ਅਸੀਂ ਸਿੱਖਾਂਗੇ ਕਿ ਕਿਵੇਂ API ਐਂਡਪੌਇੰਟਸ ਨੂੰ MCP ਸਰਵਰ ਵਜੋਂ ਇਕਸਪੋਜ਼ ਕਰਨਾ ਹੈ। ਇਹ ਕਰਨ ਨਾਲ ਅਸੀਂ ਐਂਡਪੌਇੰਟਸ ਨੂੰ ਇੱਕ ਏਜੈਂਟਿਕ ਐਪ ਦਾ ਹਿੱਸਾ ਬਣਾ ਸਕਦੇ ਹਾਂ ਅਤੇ ਨਾਲ ਹੀ Azure API Management ਦੇ ਫੀਚਰਾਂ ਦਾ ਲਾਭ ਵੀ ਉਠਾ ਸਕਦੇ ਹਾਂ।

## ਮੁੱਖ ਫੀਚਰ

- ਤੁਸੀਂ ਉਹ ਐਂਡਪੌਇੰਟ ਮੈਥਡਜ਼ ਚੁਣਦੇ ਹੋ ਜੋ ਤੁਸੀਂ ਸੰਦ ਵਜੋਂ ਇਕਸਪੋਜ਼ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ।
- ਤੁਹਾਨੂੰ ਮਿਲਣ ਵਾਲੇ ਵਾਧੂ ਫੀਚਰ ਤੁਹਾਡੇ API ਦੀ ਪਾਲਿਸੀ ਸੈਕਸ਼ਨ ਵਿੱਚ ਸੰਰਚਨਾ 'ਤੇ ਨਿਰਭਰ ਕਰਦੇ ਹਨ। ਪਰ ਅਸੀਂ ਇੱਥੇ ਦਰਸਾਵਾਂਗੇ ਕਿ ਕਿਵੇਂ ਰੇਟ ਲਿਮਿਟਿੰਗ ਜੋੜੀ ਜਾ ਸਕਦੀ ਹੈ।

## ਪ੍ਰੀ-ਸਟੈਪ: ਇੱਕ API ਨੂੰ ਇੰਪੋਰਟ ਕਰੋ

ਜੇ ਤੁਹਾਡੇ ਕੋਲ ਪਹਿਲਾਂ ਹੀ Azure API Management ਵਿੱਚ API ਹੈ ਤਾਂ ਵਧੀਆ, ਤੁਸੀਂ ਇਹ ਕਦਮ ਛੱਡ ਸਕਦੇ ਹੋ। ਜੇ ਨਹੀਂ, ਤਾਂ ਇਸ ਲਿੰਕ ਨੂੰ ਦੇਖੋ, [Azure API Management ਵਿੱਚ API ਇੰਪੋਰਟ ਕਰਨਾ](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api)।

## API ਨੂੰ MCP ਸਰਵਰ ਵਜੋਂ ਇਕਸਪੋਜ਼ ਕਰੋ

API ਐਂਡਪੌਇੰਟਸ ਨੂੰ ਇਕਸਪੋਜ਼ ਕਰਨ ਲਈ, ਇਹ ਕਦਮ ਦਿਓ:

1. Azure ਪੋਰਟਲ ਤੇ ਜاؤ ਅਤੇ ਇਹ ਪਤਾ ਖੋਲ੍ਹੋ <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
ਆਪਣੇ API Management ਇੰਸਟੈਂਸ ਤੇ ਜਾਓ।

1. ਖੱਬੇ ਮੇਨੂ ਵਿੱਚ, APIs > MCP Servers > + Create new MCP Server ਚੁਣੋ।

1. API ਵਿੱਚ, ਇੱਕ REST API ਚੁਣੋ ਜਿਸਨੂੰ MCP ਸਰਵਰ ਵਜੋਂ ਇਕਸਪੋਜ਼ ਕਰਨਾ ਹੈ।

1. ਇੱਕ ਜਾਂ ਇੱਕ ਤੋਂ ਵੱਧ API Operations ਨੂੰ ਟੂਲ ਵਜੋਂ ਇਕਸਪੋਜ਼ ਕਰਨ ਲਈ ਚੁਣੋ। ਤੁਸੀਂ ਸਾਰੇ ऑपਰੇਸ਼ਨ ਜਾਂ ਕੁਝ ਖਾਸ ऑपਰੇਸ਼ਨ ਚੁਣ ਸਕਦੇ ਹੋ।

    ![ਇਕਸਪੋਜ਼ ਕਰਨ ਲਈ ਮੈਥਡ ਚੁਣੋ](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. **Create** 'ਤੇ ਕਲਿੱਕ ਕਰੋ।

1. ਮੇਨੂ ਵਿੱਚ **APIs** ਅਤੇ **MCP Servers** 'ਤੇ ਜਾਓ, ਤੁਹਾਨੂੰ ਹੇਠਾਂ ਦਿੱਤੀਆਂ ਚੀਜ਼ਾਂ ਦੇਖਣ ਨੂੰ ਮਿਲਣਗੀਆਂ:

    ![ਮੁੱਖ ਖਿੜਕੀ ਵਿੱਚ MCP Server ਵੇਖੋ](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP ਸਰਵਰ ਬਣ ਚੁੱਕਾ ਹੈ ਅਤੇ API ਆਪਰੇਸ਼ਨ ਟੂਲ ਵਜੋਂ ਇਕਸਪੋਜ਼ ਹਨ। MCP ਸਰਵਰ MCP Servers ਪੈਨ ਵਿੱਚ ਲਿਸਟ ਕੀਤਾ ਗਿਆ ਹੈ। URL ਕਾਲਮ MCP ਸਰਵਰ ਦੇ ਐਂਡਪੌਇੰਟ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ ਜਿਥੇ ਤੁਸੀਂ ਟੈਸਟਿੰਗ ਜਾਂ ਕਲਾਇੰਟ ਐਪਲੀਕੇਸ਼ਨ ਵਿੱਚ ਕਾਲ ਕਰ ਸਕਦੇ ਹੋ।

## ਈਛਿਕ: ਨੀਤੀਆਂ ਸੰਰਚਿਤ ਕਰੋ

Azure API Management ਵਿੱਚ ਨੀਤੀਆਂ ਦਾ ਮੁੱਖ ਤਤਵ ਹੁੰਦਾ ਹੈ ਜਿੱਥੇ ਤੁਸੀਂ ਆਪਣੇ ਐਂਡਪੌਇੰਟ ਲਈ ਵੱਖ-ਵੱਖ ਨਿਯਮ ਸੈੱਟ ਕਰਦੇ ਹੋ ਜਿਵੇਂ ਕਿ ਰੇਟ ਲਿਮਿਟਿੰਗ ਜਾਂ ਸੈਮੈਂਟਿਕ ਕੈਚਿੰਗ। ਇਹ ਨੀਤੀਆਂ XML ਵਿੱਚ ਲਿਖੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।

ਇੱਥੇ ਤੁਸੀਂ ਕਿਵੇਂ ਆਪਣੀ MCP ਸਰਵਰ ਲਈ ਰੇਟ ਲਿਮਿਟ ਨੀਤੀ ਸੈੱਟ ਕਰ ਸਕਦੇ ਹੋ:

1. ਪੋਰਟਲ ਵਿੱਚ, APIs ਦੇ ਹੇਠਾਂ, **MCP Servers** ਚੁਣੋ।

1. ਉਸ MCP ਸਰਵਰ ਨੂੰ ਚੁਣੋ ਜੋ ਤੁਸੀਂ ਬਣਾਇਆ ਹੈ।

1. ਖੱਬੇ ਮੇਨੂ ਵਿੱਚ, MCP ਤਹਿਤ **Policies** ਚੁਣੋ।

1. ਨੀਤੀ ਸੰਪਾਦਕ ਵਿੱਚ, ਉਹ ਨੀਤੀਆਂ ਜੋ MCP ਸਰਵਰ ਦੇ ਟੂਲਾਂ ਤੇ ਲਾਗੂ ਕਰਨੀ ਹਨ, ਜੋੜੋ ਜਾਂ ਸੋਧੋ। ਨੀਤੀਆਂ XML ਫਾਰਮੈਟ ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ ਹਨ। ਉਦਾਹਰਨ ਵਜੋਂ, ਤੁਸੀਂ ਇੱਕ ਨੀਤੀ ਜੋੜ ਸਕਦੇ ਹੋ ਜੋ MCP ਸਰਵਰ ਦੇ ਟੂਲਾਂ ਲਈ ਕਾਲਾਂ ਨੂੰ ਸੀਮਿਤ ਕਰਦੀ ਹੈ (ਇਸ ਉਦਾਹרן ਵਿੱਚ, ਹਰ 30 ਸੈਕਿੰਡ ਵਿੱਚ 5 ਕਾਲਾਂ ਪ੍ਰਤੀ ਕਲਾਇੰਟ IP ਪਤਾ)। ਇਹ XML ਇਸ ਨੂੰ ਰੇਟ ਲਿਮਿਟ ਕਰਨ ਲਈ ਹੈ:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    ਨੀਤੀ ਸੰਪਾਦਕ ਦੀ ਇਮেজ ਇੱਥੇ ਹੈ:

    ![ਨੀਤੀ ਸੰਪਾਦਕ](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## ਅਜਮਾਈਏ

ਆਓ ਯਕੀਨੀ ਬਣਾਈਏ ਕਿ ਸਾਡਾ MCP ਸਰਵਰ ਜਿਸ ਤਰ੍ਹਾਂ ਚਾਹੀਦਾ ਹੈ ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ।

ਇਸ ਲਈ, ਅਸੀਂ Visual Studio Code ਅਤੇ GitHub Copilot ਦੇ Agent ਮੋਡ ਦੀ ਵਰਤੋਂ ਕਰਾਂਗੇ। ਅਸੀਂ MCP ਸਰਵਰ ਨੂੰ *mcp.json* ਵਿੱਚ ਜੋੜਾਂਗੇ। ਇਸ ਤਰ੍ਹਾਂ, Visual Studio Code ਏਜੈਂਟਿਕ ਸਮਰੱਥਾਵਾਂ ਵਾਲਾ ਕਲਾਇੰਟ ਵਜੋਂ ਕੰਮ ਕਰੇਗਾ ਅਤੇ ਅੰਤਮ ਯੂਜ਼ਰ ਪ੍ਰਾਮਪਟ ਟਾਈਪ ਕਰਕੇ ਇਸ ਸਰਵਰ ਨਾਲ ਇੰਟਰੈਕਟ ਕਰ ਸਕਦੇ ਹਨ।

ਚਲੋ ਵੇਖੀਏ ਕਿ Visual Studio Code ਵਿੱਚ MCP ਸਰਵਰ ਕਿਵੇਂ ਜੋੜਨਾ ਹੈ:

1. ਕਮਾਂਡ ਪੈਲੇਟ ਤੋਂ MCP: **Add Server ਕਮਾਂਡ** ਵਰਤੋਂ।

1. ਜਦੋਂ ਪੁੱਛਿਆ ਜਾਵੇ, ਸਰਵਰ ਕਿਸਮ ਚੁਣੋ: **HTTP (HTTP ਜਾਂ Server Sent Events)**।

1. API Management ਵਿੱਚ MCP ਸਰਵਰ ਦਾ URL ਦਿਓ। ਉਦਾਹਰਨ: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE ਐਂਡਪੌਇੰਟ ਲਈ) ਜਾਂ **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP ਐਂਡਪੌਇੰਟ ਲਈ), ਦਰਿਆਫਤ ਕਰੋ ਕਿ ਟਰਾਂਸਪੋਰਟ ਵਿੱਚ ਫਰਕ `/sse` ਜਾਂ `/mcp` ਹੈ।

1. ਆਪਣੀ ਪਸੰਦ ਦਾ ਸਰਵਰ ID ਦਿਓ। ਇਹ ਮਹੱਤਵਪੂਰਣ ਵਿਸ਼ੇਸ਼ਤਾ ਨਹੀਂ ਹੈ ਪਰ ਇਹ ਤੁਹਾਨੂੰ ਯਾਦ ਰੱਖਣ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ ਕਿ ਇਹ ਸਰਵਰ ਕਿਹੜਾ ਹੈ।

1. ਚੁਣੋ ਕਿ ਤੁਸੀਂ ਸੰਰਚਨਾ ਨੂੰ ਆਪਣੇ ਵਰਕਸਪੇਸ ਸੈਟਿੰਗਜ਼ ਜਾਂ ਯੂਜ਼ਰ ਸੈਟਿੰਗਜ਼ ਵਿੱਚ ਸੰਭਾਲਣਾ ਚਾਹੁੰਦੇ ਹੋ।

  - **ਵਰਕਸਪੇਸ ਸੈਟਿੰਗਜ਼** - ਸਰਵਰ ਸੰਰਚਨਾ ਸਿਰਫ਼ ਵਰਤਮਾਨ ਵਰਕਸਪੇਸ ਵਿੱਚ ਉਪਲਬਧ .vscode/mcp.json ਫਾਇਲ ਵਿੱਚ ਸੰਭਾਲੀ ਜਾਂਦੀ ਹੈ।

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    ਜਾਂ ਜੇ ਤੁਸੀਂ ਸਟ੍ਰੀਮਿੰਗ HTTP ਟਰਾਂਸਪੋਰਟ ਚੁਣਦੇ ਹੋ ਤਾਂ ਇਹ ਕੁਝ ਥੋੜ੍ਹਾ ਵੱਖਰਾ ਹੋਵੇਗਾ:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **ਯੂਜ਼ਰ ਸੈਟਿੰਗਜ਼** - ਸਰਵਰ ਸੰਰਚਨਾ ਤੁਹਾਡੇ ਗਲੋਬਲ *settings.json* ਫਾਇਲ ਵਿੱਚ ਜੋੜੀ ਜਾਂਦੀ ਹੈ ਅਤੇ ਸਾਰੇ ਵਰਕਸਪੇਸਾਂ ਵਿੱਚ ਉਪਲਬਧ ਹੁੰਦੀ ਹੈ। ਸੰਰਚਨਾ ਕੁਝ ਇਸ ਤਰ੍ਹਾਂ ਦਿਖਦੀ ਹੈ:

    ![ਯੂਜ਼ਰ ਸੈਟਿੰਗ](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. ਤੁਹਾਨੂੰ Azure API Management ਵੱਲ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਪ੍ਰਮਾਣਿਕਤਾ ਲਈ ਇੱਕ ਹੈਡਰ ਵੀ ਜੋੜਨਾ ਪਵੇਗਾ। ਇਹ ਹੈਡਰ **Ocp-Apim-Subscription-Key* ਕਹਿੰਦਾ ਹੈ। 

    - ਇਸਨੂੰ ਸੈਟਿੰਗਜ਼ 'ਚ ਅਜਿਹੇ ਜੋੜੋ:

    ![ਪ੍ਰਮਾਣਿਕਤਾ ਲਈ ਹੈਡਰ ਜੋੜਨਾ](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), ਇਸ ਨਾਲ ਪ੍ਰਾਂਪਟ ਸੀਜ਼ ਹੋ ਕੇ ਤੁਹਾਡੇ ਨੂੰ API ਕੁੰਜੀ ਦੇ ਮੁੱਲ ਲਈ ਪੁੱਛੇਗਾ ਜੋ ਤੁਸੀਂ ਆਪਣੇ Azure API Management ਇੰਸਟੈਂਸ ਵਿੱਚ Azure ਪੋਰਟਲ ਤੋਂ ਲੱਭ ਸਕਦੇ ਹੋ।

   - ਇਸਨੂੰ ਸਿੱਧਾ *mcp.json* ਵਿੱਚ ਜੋੜਨ ਲਈ, ਤੁਸੀਂ ਇਸ ਤਰ੍ਹਾਂ ਜੋੜ ਸਕਦੇ ਹੋ:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### ਏਜੰਟ ਮੋਡ ਵਰਤੋਂ

ਹੁਣ ਤਸੀਂ ਸੈਟਿੰਗਜ਼ ਜਾਂ *.vscode/mcp.json* ਵਿੱਚ ਸੇਟਅੱਪ ਕਰ ਚੁੱਕੇ ਹੋ। ਚਲੋ ਅਜਮਾਈਏ। 

ਇੱਕ ਟੂਲ ਆਈਕਨ ਹੋਵੇਗਾ ਜਿੱਥੇ ਤੁਹਾਡੇ ਸਰਵਰ ਦੇ ਇਕਸਪੋਜ਼ ਕੀਤੇ ਟੂਲ ਲਿਸਟ ਹੋਣਗੇ:

![ਸਰਵਰ ਦੇ ਟੂਲ](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. ਟੂਲ ਆਈਕਨ 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਅਤੇ ਤੁਹਾਨੂੰ ਟੂਲਾਂ ਦੀ ਲਿਸਟ ਵੇਖਣ ਨੂੰ ਮਿਲੇਗੀ:

    ![ਟੂਲਾਂ](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. ਚੈਟ ਵਿੱਚ ਇੱਕ ਪ੍ਰਾਂਪਟ ਦਿਓ ਟੂਲ ਨੂੰ ਕਾਲ ਕਰਨ ਲਈ। ਉਦਾਹਰਨ ਵਜੋਂ, ਜੇ ਤੁਸੀਂ ਕੋਈ ਟੂਲ ਚੁਣਿਆ ਹੈ ਜੋ ਕਿਸੇ ਆਰਡਰ ਬਾਰੇ ਜਾਣਕਾਰੀ ਲੈਦਾ ਹੈ, ਤਾਂ ਤੁਸੀਂ ਏਜੰਟ ਨੂੰ ਆਰਡਰ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ। ਇਹ ਪ੍ਰਾਂਪਟ ਦਾ ਉਦਾਹਰਨ ਹੈ:

    ```text
    get information from order 2
    ```

    ਤੁਹਾਨੂੰ ਹੁਣ ਟੂਲ ਆਈਕਨ ਦਿੱਸੇਗਾ ਜੋ ਤੁਹਾਨੂੰ ਟੂਲ ਚਲਾਉਣ ਲਈ ਪੁੱਛੇਗਾ। ਜਾਰੀ ਰੱਖਣ ਲਈ ਚੁਣੋ, ਹੁਣ ਤੁਸੀਂ ਨਤੀਜਾ ਇਸ ਤਰ੍ਹਾਂ ਵੇਖੋਗੇ: 

    ![ਪ੍ਰਾਂਪਟ ਤੋਂ ਨਤੀਜਾ](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **ਤੁਹਾਡੇ ਸੈੱਟਅੱਪ ਕੀਤੇ ਟੂਲਾਂ 'ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ ਕਿ ਤੁਸੀਂ ਕੀ ਵੇਖ ਰਹੇ ਹੋ, ਪਰ ਬੁਨਿਆਦੀ ਤੌਰ ਤੇ ਤੁਸੀਂ ਟੈਕਸਟ ਆਧਾਰਿਤ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰਦੇ ਹੋ।**


## ਸੰਦਰਭ

ਇੱਥੇ ਤੁਸੀਂ ਹੋਰ ਕਿਵੇਂ ਸਿੱਖ ਸਕਦੇ ਹੋ:

- [Azure API Management ਅਤੇ MCP 'ਤੇ ਟਿਊਟੋਰਿਯਲ](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python ਸੈਂਪਲ: Azure API Management ਨਾਲ ਸੁਰੱਖਿਅਤ ਰਿਮੋਟ MCP ਸਰਵਰ (ਪਰਿਯੋਗਿਕ)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP ਕਲਾਇੰਟ ਪ੍ਰਮਾਣਿਕਤਾ ਲੈਬ](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [VS Code ਲਈ Azure API Management ਐਕਸਟੈਨਸ਼ਨ ਨਾਲ APIs ਨੂੰ ਇੰਪੋਰਟ ਅਤੇ ਮੈਨੇਜ ਕਰੋ](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Azure API Center ਵਿੱਚ ਰਿਮੋਟ MCP ਸਰਵਰ ਰਜਿਸਟਰ ਅਤੇ ਖੋਜੋ](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) ਇੱਕ ਵਧੀਆ ਰੇਪੋ ਜੋ Azure API Management ਦੇ ਨਾਲ ਕਈ AI ਸਮਰੱਥਾਵਾਂ ਦਿਖਾਉਂਦਾ ਹੈ  
- [AI Gateway ਵਰਕਸ਼ਾਪ](https://azure-samples.github.io/AI-Gateway/) ਜੋ Azure ਪੋਰਟਲ ਦੀ ਵਰਤੋਂ ਨਾਲ ਵਰਕਸ਼ਾਪ ਸਮੇਤ AI ਸਮਰੱਥਾਵਾਂ ਦੀ ਸਿਖਲਾਈ ਦਿੰਦਾ ਹੈ।

## ਅੱਗੇ ਕੀ

- ਵਾਪਸ: [ਕੇਸ ਸਟਡੀ ਓਵਰਵਿਊ](./README.md)
- ਅਗਲਾ: [Azure AI ਟ੍ਰੈਵਲ ਏਜੰਟਸ](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋक्ति**:
ਇਹ ਦਸਤਾਵੇਜ਼ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਅਨੁਵਾਦਿਤ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਅਤਾ ਲਈ ਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ ਕਿ ਆਟੋਮੈਟਿਕ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਹੀਤੀਆਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੇ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਹੀ ਪ੍ਰਮਾਣਿਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਮਹੱਤਵਪੂਰਨ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੀ ਵਰਤੋਂ ਤੋਂ ਉਪਜਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫ਼ਹਮੀ ਜਾਂ ਗਲਤ ਵਿਵਰਣ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->