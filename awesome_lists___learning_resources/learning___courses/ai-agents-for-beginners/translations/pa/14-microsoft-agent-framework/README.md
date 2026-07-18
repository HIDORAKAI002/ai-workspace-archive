# ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਦੀ ਖੋਜ

![Agent Framework](../../../translated_images/pa/lesson-14-thumbnail.90df0065b9d234ee.webp)

### ਪਰਿਚય

ਇਸ ਪਾਠ ਵਿੱਚ ਸਿੱਖਿਆ ਜਾਵੇਗਾ:

- ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਨੂੰ ਸਮਝਣਾ: ਮੁੱਖ ਖਾਸੀਅਤਾਂ ਅਤੇ ਮੁੱਲ  
- ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਦੇ ਮੁੱਖ ਸੰਕਲਪਾਂ ਦੀ ਖੋਜ
- ਉन्नਤ MAF ਪੈਟਰਨ: ਵਰਕਫਲੋ, ਮਿਡਲਵੇਅਰ, ਅਤੇ ਮੈਮੋਰੀ

## ਸਿੱਖਣ ਦੇ ਲਕੜ

ਇਸ ਪਾਠ ਨੂੰ ਪੂਰਾ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਤੁਸੀਂ ਜਾਣੋਗੇ ਕਿ:

- ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਦੀ ਵਰਤੋਂ ਨਾਲ ਪ੍ਰੋਡਕਸ਼ਨ ਤਿਆਰ AI ਏਜੈਂਟ ਬਣਾਓ
- ਆਪਣੇ ਏਜੈਂਟਿਕ ਉਪਯੋਗ ਮਾਮਲਿਆਂ ਲਈ ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਦੀ ਕੋਰ ਖਾਸੀਅਤਾਂ ਨੂੰ ਲਾਗੂ ਕਰੋ
- ਵਰਕਫਲੋ, ਮਿਡਲਵੇਅਰ ਅਤੇ ਪ੍ਰਵੇੜਤਾ ਸਮੇਤ ਉन्नਤ ਪੈਟਰਨਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ

## ਕੋਡ ਉਦਾਹਰਨਾਂ 

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) ਲਈ ਕੋਡ ਨਮੂਨੇ ਇਸ ਰਿਪੋਜ਼ਟਰੀ ਵਿੱਚ `xx-python-agent-framework` ਅਤੇ `xx-dotnet-agent-framework` ਫਾਈਲਾਂ ਦੇ ਤਹਿਤ ਮਿਲ ਸਕਦੇ ਹਨ।

## ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਨੂੰ ਸਮਝਣਾ

![Framework Intro](../../../translated_images/pa/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) ਮਾਇਕ੍ਰੋਸਾਫਟ ਦਾ ਐਕਠਾ ਫ੍ਰੇਮਵਰਕ ਹੈ ਜੋ AI ਏਜੈਂਟ ਬਣਾਉਣ ਲਈ ਹੈ। ਇਹ ਉਤਪਾਦਨ ਅਤੇ ਖੋਜ ਵਾਲੇ ਵਾਤਾਵਰਨਾਂ ਵਿੱਚ ਦੇਖੇ ਗਏ ਵੱਖ-ਵੱਖ ਏਜੈਂਟਿਕ ਉਪਯੋਗ ਮਾਮਲਿਆਂ ਨੂੰ ਹੱਲ ਕਰਨ ਦੀ ਲਚਕੀਲੇਪਣ ਪੇਸ਼ ਕਰਦਾ ਹੈ ਜਿਸ ਵਿੱਚ ਸ਼ਾਮਿਲ ਹਨ:

- **ਕ੍ਰਮਵਾਰ ਏਜੈਂਟ ਸੰਗਠਨ** ਜਿੱਥੇ ਕਦਮ-ਦਰ-कਦਮ ਵਰਕਫਲੋਜ਼ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।
- **ਸਮਕਾਲੀ ਸੰਗਠਨ** ਜਿੱਥੇ ਏਜੈਂਟਾਂ ਨੂੰ ਇੱਕ ਸਮੇਂ ਕਾਰਜ ਪੂਰੇ ਕਰਨੇ ਹੁੰਦੇ ਹਨ।
- **ਗਰੁੱਪ ਚੈਟ ਸੰਗਠਨ** ਜਿੱਥੇ ਏਜੈਂਟ ਇੱਕ ਹੀ ਕਾਰਜ 'ਤੇ ਸਹਿਯੋਗ ਕਰ ਸਕਦੇ ਹਨ।
- **ਹੈੰਡਆਫ਼ ਸੰਗਠਨ** ਜਿੱਥੇ ਏਜੈਂਟ ਇੱਕ ਦੂਜੇ ਨੂੰ ਕਾਰਜ ਦੇ ਹਿੱਸੇ ਹੈਂਡ ਕਰਦੇ ਹਨ ਜਿਵੇਂ ਕਿ ਉਪਕਾਰਜ ਕਮਪਲੀਟ ਹੁੰਦੇ ਹਨ।
- **ਮੈਗਨੇਟਿਕ ਸੰਗਠਨ** ਜਿੱਥੇ ਇੱਕ ਮੈਨੇਜਰ ਏਜੈਂਟ ਕਾਰਜ ਸੂਚੀ ਬਣਾਉਂਦਾ ਅਤੇ ਸੋਧਦਾ ਹੈ ਅਤੇ ਉਪ-ਏਜੈਂਟਾਂ ਦੇ ਸਮਨਵੇਅ ਬਾਰੇ ਸੰਭਾਲ ਕਰਦਾ ਹੈ।

ਉਤਪਾਦਨ ਵਿੱਚ AI ਏਜੈਂਟਾਂ ਨੂੰ ਡਿਲਿਵਰ ਕਰਨ ਲਈ, MAF ਨੇ ਇਹ ਵੀ ਸ਼ਾਮਿਲ ਕੀਤਾ ਹੈ:

- **ਪ੍ਰਵੇੜਤਾ** OpenTelemetry ਦੀ ਵਰਤੋਂ ਨਾਲ ਜਿੱਥੇ AI ਏਜੈਂਟ ਦੀ ਹਰ ਕਾਰਵਾਈ ਜਿਸ ਵਿੱਚ ਟੂਲ ਕਾਲ, ਸੰਗਠਨ ਕਦਮ, ਤਰਕ ਪ੍ਰਵਾਹ ਅਤੇ Microsoft Foundry ਡੈਸ਼ਬੋਰਡਜ਼ ਰਾਹੀਂ ਕਾਰਗੁਜ਼ਾਰੀ ਨਿਗਰਾਨੀ ਸ਼ਾਮਿਲ ਹੈ।
- **ਸੁਰੱਖਿਆ** ਜਿੱਥੇ ਏਜੈਂਟਾਂ ਨੂੰ ਮਾਇਕ੍ਰੋਸਾਫਟ ਫਾਊਂਡਰੀ ਉੱਤੇ ਹੋਸਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਜਿਸ ਵਿੱਚ ਭੂਮਿਕਾ-ਆਧਾਰਤ ਪਹੁੰਚ, ਨਿੱਜੀ ਡਾਟਾ ਸੰਭਾਲ ਅਤੇ ਅੰਦਰੂਨੀ ਸੁਰੱਖਿਆ ਸਮੱਗਰੀ ਵਰਗੇ ਸੁਰੱਖਿਆ ਕੰਟਰੋਲ ਸ਼ਾਮਿਲ ਹਨ।
- **ਟਿਕਾਊਪਨ** ਕਿਉਂਕਿ ਏਜੈਂਟ ਥ੍ਰੈਡ ਅਤੇ ਵਰਕਫਲੋਜ਼ ਨੂੰ ਰੋਕਣਾ, ਦੁਬਾਰਾ ਸ਼ੁਰੂ ਕਰਨਾ ਅਤੇ ਗਲਤੀਆਂ ਤੋਂ ਬਚਾਉਣ ਦੀ ਸਮਰੱਥਾ ਹੈ ਜਿਸ ਨਾਲ ਲੰਬੇ ਸਮੇਂ ਚੱਲਣ ਵਾਲੀਆਂ ਪ੍ਰਕਿਰਿਆਵਾਂ ਸੰਭਵ ਹੁੰਦੀਆਂ ਹਨ।
- **ਨਿਯੰਤਰਣ** ਜਿੱਥੇ ਮਨੁੱਖੀ ਹੱਥ ਵਾਲੇ ਵਰਕਫਲੋਜ਼ ਸਮਰੱਥ ਹਨ ਜਿੱਥੇ ਕਾਰਜ ਮਨੁੱਖੀ ਮਨਜ਼ੂਰੀ ਲਈ ਮਾਰਕ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਅੰਤਰਭਾਸ਼ਾ ਯੋਗਤਾ 'ਤੇ ਵੀ ਧਿਆਨ ਦਿੰਦਾ ਹੈ:

- **ਕਲਾਉਡ-ਅਗਨੋਸਟਿਕ ਹੋਣਾ** - ਏਜੈਂਟ ਕੰਟੇਨਰਾਂ, ਓਨ-ਪ੍ਰੇਮ ਅਤੇ ਵੱਖਰੇ ਕਲਾਉਡਾਂ ਵਿੱਚ ਚੱਲ ਸਕਦੇ ਹਨ।
- **ਪ੍ਰਦਾਤਾ-ਅਗਨੋਸਟਿਕ ਹੋਣਾ** - ਤੁਹਾਡੇ ਪਸੰਦੀਦਾ SDK ਜਿਵੇਂ ਕਿ Azure OpenAI ਅਤੇ OpenAI ਵਰਗੇ ਸੇਵਾਵਾਂ ਰਾਹੀਂ ਏਜੈਂਟ ਬਣਾਏ ਜਾ ਸਕਦੇ ਹਨ।
- **ਖੁੱਲੇ ਮਿਆਰਾਂ ਨੂੰ ਸਮਾਕਲਿਤ ਕਰਨਾ** - ਏਜੈਂਟ Agent-to-Agent (A2A) ਅਤੇ Model Context Protocol (MCP) ਵਰਗੇ ਪ੍ਰੋਟੋਕੋਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰ ਕੇ ਹੋਰ ਏਜੈਂਟਾਂ ਅਤੇ ਟੂਲਾਂ ਨੂੰ ਖੋਜ ਸਕਦੇ ਹਨ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀ ਵਰਤੋਂ ਕਰ ਸਕਦੇ ਹਨ।
- **ਪਲੱਗਇਨ ਅਤੇ ਕਨੈਕਟਰ** - Microsoft Fabric, ਸ਼ੇਅਰਪੋਇੰਟ, Pinecone ਅਤੇ Qdrant ਵਰਗੀਆਂ ਡੇਟਾ ਅਤੇ ਮੈਮੋਰੀ ਸੇਵਾਵਾਂ ਨਾਲ ਕਨੈਕਸ਼ਨ ਬਣਾਏ ਜਾ ਸਕਦੇ ਹਨ।

ਆਓ ਵੇਖੀਏ ਕਿ ਇਹ ਖਾਸੀਅਤਾਂ ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਦੇ ਕੁਝ ਮੂਲ ਸੰਕਲਪਾਂ ਤੇ ਕਿਵੇਂ ਲਾਗੂ ਹੁੰਦੀਆਂ ਹਨ।

## ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਦੇ ਮੁੱਖ ਸੰਕਲਪ

### ਏਜੈਂਟ

![Agent Framework](../../../translated_images/pa/agent-components.410a06daf87b4fef.webp)

**ਏਜੈਂਟ ਬਣਾਉਣਾ**

ਏਜੈਂਟ ਬਣਾਉਣਾ ਇੰਫਰੰਸ ਸੇਵਾ (LLM ਪ੍ਰਦਾਤਾ), AI ਏਜੈਂਟ ਲਈ ਹਦਾਇਤਾਂ ਦਾ ਸੈੱਟ, ਅਤੇ ਇੱਕ ਨਿਰਧਾਰਿਤ `name` ਨਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ:


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

ਉੱਪਰ ਦਿੱਤਾ ਗਿਆ ਉਦਾਹਰਨ `Azure OpenAI` ਦੀ ਵਰਤੋਂ ਕਰ ਰਿਹਾ ਹੈ ਪਰ ਏਜੈਂਟ ਕਈਆਂ ਸੇਵਾਵਾਂ ਨਾਲ ਬਣਾਏ ਜਾ ਸਕਦੇ ਹਨ ਜਿਵੇਂ ਕਿ `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` APIs

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

ਜਾਂ [MiniMax](https://platform.minimaxi.com/), ਜੋ ਵੱਡੇ ਸੰਦਰਭ ਵਿੰਡੋਜ਼ (204K ਟੋਕਨ ਤੱਕ) ਨਾਲ OpenAI-ਅਨੁਕੂਲ API ਦਿੰਦਾ ਹੈ:

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

ਜਾਂ A2A ਪ੍ਰੋਟੋਕੋਲ ਵਰਤ ਕੇ ਰਿਮੋਟ ਏਜੈਂਟ:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**ਏਜੈਂਟ ਚਲਾਉਣਾ**

ਏਜੈਂਟਾਂ ਨੂੰ `.run` ਜਾਂ `.run_stream` ਮੈਥਡਾਂ ਰਾਹੀਂ ਚਲਾਇਆ ਜਾਂਦਾ ਹੈ ਜੋ ਕਿ ਗੈਰ-ਸਟ੍ਰੀਮਿੰਗ ਜਾਂ ਸਟ੍ਰੀਮਿੰਗ ਜਵਾਬਾਂ ਲਈ ਹਨ।

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

ਹਰ ਏਜੈਂਟ ਚਲਾਉਣ 'ਚ ਵਿਕਲਪ ਸ਼ਾਮਿਲ ਹੋਣਗੇ ਜਿਵੇਂ ਕਿ `max_tokens` ਜੋ ਏਜੈਂਟ ਵਰਤਦਾ ਹੈ, `tools` ਜੋ ਏਜੈਂਟ ਕਾਲ ਕਰ ਸਕਦਾ ਹੈ, ਅਤੇ ਏਜੈਂਟ ਲਈ ਵਰਤੀ ਜਾਣ ਵਾਲੀ ਹੇਠਾਂ ਦਿੱਤੀ `model`।

ਇਹ ਉਸ ਸਮੇਂ ਲਾਭਕਾਰੀ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਕਿਸੇ ਵਰਤੋਂਕਾਰ ਦੇ ਕਾਰਜ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਖਾਸ ਮਾਡਲ ਜਾਂ ਟੂਲ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।

**ਟੂਲ**

ਟੂਲਾਂ ਨੂੰ ਦੋਹਾਂ ਵੇਲੇ ਪਰਿਭਾਸ਼ਿਤ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# ਜਦੋਂ ਚੈਟਏਜੰਟ ਸਿੱਧਾ ਬਣਾਇਆ ਜਾ ਰਿਹਾ ਹੈ

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

ਅਤੇ ਏਜੈਂਟ ਚਲਾਉਂਦੇ ਸਮੇਂ:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # ਸਿਰਫ ਇਸ ਦੌੜ ਲਈ ਉਪਲਬਧ ਸੰਦ )
```

**ਏਜੈਂਟ ਥ੍ਰੈਡ**

ਏਜੈਂਟ ਥ੍ਰੈਡ ਬਹੁ-ਚਰਣ ਗੱਲਬਾਤਾਂ ਨੂੰ ਸੰਭਾਲਣ ਲਈ ਵਰਤੇ ਜਾਂਦੇ ਹਨ। ਥ੍ਰੈਡ ਤਿਆਰ ਕੀਤੇ ਜਾ ਸਕਦੇ ਹਨ:

- `get_new_thread()` ਦੀ ਵਰਤੋਂ ਨਾਲ ਜੋ ਸਮੇਂ ਦੇ ਨਾਲ ਥ੍ਰੈਡ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰਨ ਦੀ ਆਗਿਆ ਦਿੰਦੀ ਹੈ
- ਥ੍ਰੈਡ ਆਪਣੇ ਆਪ ਬਣਾਉਣਾ ਜਦੋਂ ਏਜੈਂਟ ਚੱਲਦਾ ਹੈ ਅਤੇ ਥ੍ਰੈਡ ਸਿਰਫ ਤਤਕਾਲ ਚਲਾਉਣ ਦੌਰਾਨ ਮੌਜੂਦ ਰਹਿੰਦਾ ਹੈ।

ਥ੍ਰੈਡ ਬਣਾਉਣ ਲਈ ਕੋਡ ਇਸ ਤਰ੍ਹਾਂ ਹੁੰਦਾ ਹੈ:

```python
# ਇੱਕ ਨਵਾਂ ਥ੍ਰੇਡ ਬਣਾਓ।
thread = agent.get_new_thread() # ਥ੍ਰੇਡ ਨਾਲ ਏਜੰਟ ਚਲਾਓ।
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

ਫਿਰ ਤੁਸੀਂ ਥ੍ਰੈਡ ਨੂੰ ਭਵਿੱਖ ਵਿੱਚ ਵਰਤੋਂ ਲਈ ਸੇਰੀਅਲਾਈਜ਼ ਕਰ ਸਕਦੇ ਹੋ:

```python
# ਇੱਕ ਨਵਾਂ ਥ੍ਰੇਡ ਬਣਾਓ।
thread = agent.get_new_thread() 

# ਥ੍ਰੇਡ ਨਾਲ ਏਜੰਟ ਨੂੰ ਚਲਾਓ।

response = await agent.run("Hello, how are you?", thread=thread) 

# ਸਟੋਰੇਜ ਲਈ ਥ੍ਰੇਡ ਨੂੰ ਸੀਰੀਅਲਾਈਜ਼ ਕਰੋ।

serialized_thread = await thread.serialize() 

# ਸਟੋਰੇਜ ਤੋਂ ਲੋਡ ਕਰਨ ਤੋਂ ਬਾਅਦ ਥ੍ਰੇਡ ਦੀ ਹਾਲਤ ਨੂੰ ਡੀਸੀਰੀਅਲਾਈਜ਼ ਕਰੋ।

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**ਏਜੈਂਟ ਮਿਡਲਵੇਅਰ**

ਏਜੈਂਟ ਟੂਲਾਂ ਅਤੇ LLM ਨਾਲ ਵਿਉਜ਼ਗ ਕਰਦਾ ਹੈ ਤਾਂ ਜੋ ਵਰਤੋਂਕਾਰ ਦੇ ਕਾਰਜ ਪੂਰੇ ਹੋ ਸਕਣ। ਕੁਝ ਹਾਲਾਤਾਂ ਵਿੱਚ, ਅਸੀਂ ਇਹ ਚਾਹੁੰਦੇ ਹਾਂ ਕਿ ਇਹ ਇੰਟਰੇਕਸ਼ਨਾਂ ਵਿਚਕਾਰ ਕਿਛ ਕਾਰਵਾਈ ਕਰੀ ਜਾਵੇ ਜਾਂ ਟ੍ਰੈਕ ਕੀਤੀ ਜਾਵੇ। ਏਜੈਂਟ ਮਿਡਲਵੇਅਰ ਇਹ ਕੁਝ ਇਸ ਤਰ੍ਹਾਂ ਕਰਦਾ ਹੈ:

*ਫੰਕਸ਼ਨ ਮਿਡਲਵੇਅਰ*

ਇਹ ਮਿਡਲਵੇਅਰ ਸਾਨੂੰ ਏਜੈਂਟ ਅਤੇ ਫੰਕਸ਼ਨ/ਟੂਲ ਦੇ ਮੱਧਕਾਰ ਇੱਕ ਕਾਰਵਾਈ ਨੂੰ ਚਲਾਉਣ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ। ਉਦਾਹਰਨ ਲਈ, ਜਦੋਂ ਅਸੀਂ ਫੰਕਸ਼ਨ ਕਾਲ 'ਤੇ ਕੁਝ ਲਾਗਿੰਗ ਕਰਨੀ ਹੋਵੇ।

ਹੇਠਾਂ ਕੋਡ ਵਿੱਚ `next` ਇਸ ਗੱਲ ਨੂੰ ਸੰਕੇਤ ਕਰਦਾ ਹੈ ਕਿ ਅਗਲਾ ਮਿਡਲਵੇਅਰ ਜਾਂ ਅਸਲ ਫੰਕਸ਼ਨ ਕਾਲ ਕੀਤਾ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ।

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # ਪ੍ਰੀ-ਪ੍ਰੋਸੈਸਿੰਗ: ਫੰਕਸ਼ਨ ਦੇ ਚਲਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਲਾਗ ਕਰੋ
    print(f"[Function] Calling {context.function.name}")

    # ਅਗਲੇ ਮਿਡਲਵੇਅਰ ਜਾਂ ਫੰਕਸ਼ਨ ਚਲਾਉਣ ਵੱਲ ਜਾਰੀ ਰੱਖੋ
    await next(context)

    # ਪੋਸਟ-ਪ੍ਰੋਸੈਸਿੰਗ: ਫੰਕਸ਼ਨ ਦੇ ਚਲਾਉਣ ਤੋਂ ਬਾਅਦ ਲਾਗ ਕਰੋ
    print(f"[Function] {context.function.name} completed")
```

*ਚੈਟ ਮਿਡਲਵੇਅਰ*

ਇਹ ਮਿਡਲਵੇਅਰ ਸਾਨੂੰ ਏਜੈਂਟ ਅਤੇ LLM ਵਿਚਕਾਰ ਮੰਗਾਂ ਦੇ ਵਿਚਕਾਰ ਕਾਰਵਾਈ ਜਾਂ ਲਾਗਿੰਗ ਚਲਾਉਣ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ।

ਇਹ ਲਾਜ਼ਮੀ ਜਾਣਕਾਰੀ ਰੱਖਦਾ ਹੈ ਜਿਵੇਂ ਕਿ `messages` ਜੋ AI ਸੇਵਾ ਨੂੰ ਭੇਜੇ ਜਾ ਰਹੇ ਹਨ।

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # ਪ੍ਰੀ-ਪ੍ਰੋਸੈਸਿੰਗ: AI ਕਾਲ ਤੋਂ ਪਹਿਲਾਂ ਲਾਗ
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # ਅਗਲੇ ਮਿਡਲਵੇਅਰ ਜਾਂ AI ਸੇਵਾ ਵੱਲ ਜਾਰੀ ਰੱਖੋ
    await next(context)

    # ਪੋਸਟ-ਪ੍ਰੋਸੈਸਿੰਗ: AI ਜਵਾਬ ਦੇ ਬਾਅਦ ਲਾਗ
    print("[Chat] AI response received")

```

**ਏਜੈਂਟ ਮੈਮੋਰੀ**

ਜਿਵੇਂ ਕਿ `Agentic Memory` ਪਾਠ ਵਿੱਚ ਕਵਰ ਕੀਤਾ ਗਿਆ ਹੈ, ਮੈਮੋਰੀ ਏਜੈਂਟ ਨੂੰ ਵੱਖ-ਵੱਖ ਸੰਦਰਭਾਂ 'ਤੇ ਚਲਾਉਣ ਲਈ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਤੱਤ ਹੈ। MAF ਵਿੱਚ ਕਈ ਪ੍ਰਕਾਰ ਦੀਆਂ ਮੈਮੋਰੀਆਂ ਹਨ:

*ਇਨ-ਮੈਮੋਰੀ ਸਟੋਰੇਜ*

ਇਹ ਮੈਮੋਰੀ ਥ੍ਰੈਡਾਂ ਵਿੱਚ ਐਪਲੀਕੇਸ਼ਨ ਦੌਰਾਨ ਸਟੋਰ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।

```python
# ਇਕ ਨਵਾਂ ਥਰੇਡ ਬਣਾਓ।
thread = agent.get_new_thread() # ਥਰੇਡ ਨਾਲ ਏਜੰਟ ਨੂੰ ਚਲਾਓ।
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*ਸਥਾਈ ਸੁਨੇਹੇ*

ਇਹ ਮੈਮੋਰੀ ਵੱਖ-ਵੱਖ ਸੈਸ਼ਨਾਂ ਵਿੱਚ ਗੱਲਬਾਤ ਇਤਿਹਾਸ ਸੰਭਾਲਣ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਹੈ। ਇਹ `chat_message_store_factory` ਨਾਲ ਪਰਿਭਾਸ਼ਿਤ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

```python
from agent_framework import ChatMessageStore

# ਇੱਕ ਕਸਟਮ ਸੁਨੇਹਾ ਸਟੋਰ ਬਣਾਓ
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*ਡਾਇਨਾਮਿਕ ਮੈਮੋਰੀ*

ਇਹ ਮੈਮੋਰੀ ਸੰਦਰਭ ਵਿੱਚ ਸ਼ਾਮਿਲ ਕੀਤੀ ਜਾਂਦੀ ਹੈ ਇਸ ਤੋਂ ਪਹਿਲਾਂ ਕਿ ਏਜੈਂਟ ਚਲਾਏ ਜਾਣ। ਇਹ ਮੈਮੋਰੀ ਬਾਹਰੀ ਸੇਵਾਵਾਂ ਜਿਵੇਂ mem0 ਵਿੱਚ ਸਟੋਰ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ:

```python
from agent_framework.mem0 import Mem0Provider

# ਅdvanced ਮੈਮੋਰੀ ਸਮਰੱਥਾਵਾਂ ਲਈ Mem0 ਦੀ ਵਰਤੋਂ ਕਰਨਾ
memory_provider = Mem0Provider(
    api_key="your-mem0-api-key",
    user_id="user_123",
    application_id="my_app"
)

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a helpful assistant with memory.",
    context_providers=memory_provider
)

```

**ਏਜੈਂਟ ਪ੍ਰਵੇੜਤਾ**

ਪ੍ਰਵੇੜਤਾ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਮਹੱਤਵਪੂਰਨ ਹੈ ਕਿ ਏਜੈਂਟਿਕ ਪ੍ਰਣਾਲੀਆਂ ਭਰੋਸੇਯੋਗ ਅਤੇ ਰੱਖ-ਰਖਾਵਯੋਗ ਬਣੀਆਂ। MAF OpenTelemetry ਨਾਲ ਇੰਟਿਗ੍ਰੇਟ ਕਰਦਾ ਹੈ ਤਾਂ ਜੋ ਬਿਹਤਰ ਪ੍ਰਵੇੜਤਾ ਲਈ ਟਰੇਸਿੰਗ ਅਤੇ ਮੀਟਰ ਪ੍ਰਦਾਨ ਕੀਤੇ ਜਾ ਸਕਣ।

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # ਕੁਝ ਕਰੋ
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### ਵਰਕਫਲੋਜ਼

MAF ਵਰਕਫਲੋਜ਼ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ ਜੋ ਕਾਰਜ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਪਹਿਲਾਂ ਤੋਂ ਪਰਿਭਾਸ਼ਿਤ ਕਦਮ ਹੁੰਦੇ ਹਨ ਅਤੇ ਉਨ੍ਹਾਂ ਕਦਮਾਂ ਵਿੱਚ AI ਏਜੈਂਟਾਂ ਨੂੰ ਕੰਪੋਨੇਟ ਵਜੋਂ ਸ਼ਾਮਿਲ ਕਰਦੇ ਹਨ।

ਵਰਕਫਲੋਜ਼ ਵੱਖ-ਵੱਖ ਕੰਪੋਨੇਟਾਂ ਨਾਲ ਬਣੇ ਹੁੰਦੇ ਹਨ ਜੋ ਬਿਹਤਰ ਕੰਟਰੋਲ ਪ੍ਰਵਾਹ ਦੀ ਆਗਿਆ ਦਿੰਦੇ ਹਨ। ਵਰਕਫਲੋਜ਼ **ਬਹੁ-ਏਜੈਂਟ ਸੰਗਠਨ** ਅਤੇ ਵਰਕਫਲੋ ਸੂਚੀ ਸਟੇਟ ਸੰਭਾਲਣ ਲਈ **ਚੈਕਪੋਇੰਟਿੰਗ** ਨੂੰ ਯੋਗ ਬਣਾਉਂਦੇ ਹਨ।

ਵਰਕਫਲੋ ਦੇ ਮੁੱਖ ਕੰਪੋਨੇਟ ਹਨ:

**ਐਗਜ਼ੀਕਿਊਟਰ**

ਐਗਜ਼ੀਕਿਊਟਰ ਇਨਪੁੱਟ ਸੁਨੇਹੇ ਪ੍ਰਾਪਤ ਕਰਦੇ ਹਨ, ਆਪਣੇ ਨਿਰਧਾਰਿਤ ਕਾਰਜ ਕਰਦੇ ਹਨ ਅਤੇ ਫਿਰ ਇੱਕ ਆਉਟਪੁੱਟ ਸੁਨੇਹਾ ਤਿਆਰ ਕਰਦੇ ਹਨ। ਇਹ ਵਰਕਫਲੋ ਨੂੰ ਵੱਡੇ ਕਾਰਜ ਨੂੰ ਪੂਰਾ ਕਰਨ ਵੱਲ ਅੱਗੇ ਵਧਾਉਂਦਾ ਹੈ। ਐਗਜ਼ੀਕਿਊਟਰ AI ਏਜੈਂਟ ਜਾਂ ਕਸਟਮ ਲੋਜਿਕ ਹੋ ਸਕਦੇ ਹਨ।

**ਐਜ**

ਐਜ ਵਰਕਫਲੋ ਵਿੱਚ ਸੁਨੇਹਿਆਂ ਦੇ ਪ੍ਰਵਾਹ ਨੂੰ ਪਰਿਭਾਸ਼ਿਤ ਕਰਨ ਲਈ ਵਰਤੇ ਜਾਂਦੇ ਹਨ। ਇਹ ਹੋ ਸਕਦੇ ਹਨ:

*ਡਾਇਰੈਕਟ ਐਜ* - ਐਗਜ਼ੀਕਿਊਟਰਾਂ ਵਿੱਚ ਸਿੱਧੀ ਇੱਕ-ਤੋਂ-ਇੱਕ ਕਨੈਕਸ਼ਨ:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*ਸ਼ਰਤੀ ਐਜ* - ਜਦੋਂ ਕੋਈ ਖਾਸ ਸ਼ਰਤ ਪੂਰੀ ਹੋ ਜਾਂਦੀ ਹੈ ਤਾਂ ਐਕਟੀਵੇਟ ਹੁੰਦੇ ਹਨ। ਉਦਾਹਰਨ ਵਜੋਂ, ਜਦੋਂ ਹੋਟਲ ਦੇ ਕਮਰੇ ਉਪਲਬਧ ਨਹੀਂ ਹੁੰਦੇ, ਇੱਕ ਐਗਜ਼ੀਕਿਊਟਰ ਹੋਰ ਵਿਕਲਪ ਸੁਝਾ ਸਕਦਾ ਹੈ।

*ਸਵਿੱਚ-ਕੇਸ ਐਜ* - ਨਿਰਧਾਰਿਤ ਸ਼ਰਤਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਸੁਨੇਹਿਆਂ ਨੂੰ ਵੱਖ-ਵੱਖ ਐਗਜ਼ੀਕਿਊਟਰਾਂ ਵੱਲ ਰਾਹ ਦਿੰਦੀਆਂ ਹਨ। ਉਦਾਹਰਨ ਵਜੋਂ, ਜੇ ਯਾਤਰੀ ਗਾਹਕ ਕੋਲ ਪ੍ਰਾਇਰਟੀ ਐਕਸੈਸ ਹੈ ਤਾਂ ਉਹਨਾਂ ਦੇ ਕਾਰਜ ਹੋਰ ਵਰਕਫਲੋ ਰਾਹੀਂ ਸੰਭਾਲੇ ਜਾਣਗੇ।

*ਫੈਨ-ਆਊਟ ਐਜ* - ਇੱਕ ਸੁਨੇਹਾ ਕਈ ਟਰਗਟਾਂ ਰਾਹੀਂ ਭੇਜਣਾ।

*ਫੈਨ-ਇਨ ਐਜ* - ਵੱਖ-ਵੱਖ ਐਗਜ਼ੀਕਿਊਟਰਾਂ ਤੋਂ ਕਈ ਸੁਨੇਹਿਆਂ ਨੂੰ ਇਕੱਠਾ ਕਰਕੇ ਇਕ ਟਰਗਟ ਵੱਲ ਭੇਜਣਾ।

**ਇਵੈਂਟਸ**

ਵਰਕਫਲੋ 'ਚ ਬਿਹਤਰ ਪ੍ਰਵੇੜਤਾ ਦੇ ਲਈ, MAF ਐਗਜ਼ੀਕਿਊਸ਼ਨ ਲਈ ਬਿਲਟ-ਇਨ ਇਵੈਂਟਸ ਦਿੰਦਾ ਹੈ ਜਿਵੇਂ ਕਿ:

- `WorkflowStartedEvent`  - ਵਰਕਫਲੋ ਚੱਲਨਾ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ
- `WorkflowOutputEvent` - ਵਰਕਫਲੋ ਆਉਟਪੁੱਟ ਪੈਦਾ ਕਰਦਾ ਹੈ
- `WorkflowErrorEvent` - ਵਰਕਫਲੋ ਵਿੱਚ ਗਲਤੀ ਆਉਂਦੀ ਹੈ
- `ExecutorInvokeEvent`  - ਐਗਜ਼ੀਕਿਊਟਰ ਪ੍ਰਕਿਰਿਆ ਸ਼ੁਰੂ ਕਰਦਾ ਹੈ
- `ExecutorCompleteEvent`  -  ਐਗਜ਼ੀਕਿਊਟਰ ਪ੍ਰਕਿਰਿਆ ਮੁਕੰਮਲ ਕਰਦਾ ਹੈ
- `RequestInfoEvent` - ਇੱਕ ਬੇਨਤੀ ਜਾਰੀ ਕੀਤੀ ਜਾਂਦੀ ਹੈ

## ਉੱਚ ਪੱਧਰੀ MAF ਪੈਟਰਨ

ਉੱਪਰ ਦਿੱਤੇ ਹਿੱਸੇ ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਦੇ ਮੁੱਖ ਸੰਕਲਪਾਂ ਨੂੰ ਕਵਰ ਕਰਦੇ ਹਨ। ਜਦੋਂ ਤੁਸੀਂ ਹੋਰ ਜਟਿਲ ਏਜੈਂਟ ਬਣਾਉਂਦੇ ਹੋ, ਇਹ ਕੁਝ ਉੱਚ ਪੱਧਰੀ ਪੈਟਰਨ ਸੋਚਣ ਦੇ ਯੋਗ ਹਨ:

- **ਮਿਡਲਵੇਅਰ ਸੰਯੋਜਨ**: ਫੰਕਸ਼ਨ ਅਤੇ ਚੈਟ ਮਿਡਲਵੇਅਰ ਨੂੰ ਵਰਤ ਕੇ ਕਈ ਮਿਡਲਵੇਅਰ ਹੈਂਡਲਰਾਂ (ਲਾਗਿੰਗ, ਪਰਮਾਣੀਕਰਨ, ਦਰ-ਸੀਮਾ) ਦੀ ਲੜੀ ਬਣਾਉਂਦੇ ਹੋਏ ਏਜੈਂਟ ਦੇ ਵਿਹਾਰ 'ਤੇ ਸੁਖਮ ਜੰਤਰ-ਬੰਤਰ ਨਿਯੰਤਰਣ ਪ੍ਰਾਪਤ ਕਰੋ।
- **ਵਰਕਫਲੋ ਚੈਕਪੋਇੰਟਿੰਗ**: ਵਰਕਫਲੋ ਇਵੈਂਟਸ ਅਤੇ ਸੇਰੀਅਲਾਈਜ਼ੇਸ਼ਨ ਨੂੰ ਵਰਤ ਕੇ ਲੰਬੇ ਸਮੇਂ ਚੱਲਣ ਵਾਲੇ ਏਜੈਂਟ ਪ੍ਰਕਿਰਿਆਵਾਂ ਨੂੰ ਸੇਵ ਅਤੇ ਮੁੜ ਸ਼ੁਰੂ ਕਰੋ।
- **ਡਾਇਨਾਮਿਕ ਟੂਲ ਚੋਣ**: ਟੂਲ ਵਰਣਨਾਂ 'ਤੇ RAG ਨੂੰ MAF ਦੇ ਟੂਲ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨਾਲ ਮਿਲਾ ਕੇ ਪ੍ਰਤੀਕੁਆਲ ਵਰਗੇ ਸਿਰਫ਼ ਸਬੰਧਿਤ ਟੂਲਾਂ ਨੂੰ ਪ੍ਰਸਤੁਤ ਕਰੋ।
- **ਬਹੁ-ਏਜੈਂਟ ਹੈਂਡਆਫ਼**: ਵਿਸ਼ੇਸ਼ਿਤ ਏਜੈਂਟਾਂ ਵਿਚਕਾਰ ਹੈਂਡਆਫ਼ ਲਈ ਵਰਕਫਲੋ ਐਜ ਅਤੇ ਸ਼ਰਤੀ ਰੂਟਿੰਗ ਦਾ ਪ੍ਰਯੋਗ ਕਰੋ।

## Microsoft Foundry 'ਤੇ LangChain / LangGraph ਏਜੈਂਟਾਂ ਦੀ ਹੋਸਟਿੰਗ

ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ **ਫ੍ਰੇਮਵਰਕ-ਅੰਤਰਚਾਲਨਯੋਗ** ਹੈ — ਤੁਹਾਡੇ ਕੋਲ ਸਿਰਫ਼ MAF ਨਾਲ ਲਿਖੇ ਏਜੈਂਟਾਂ ਤੱਕ ਸੀਮਾ ਨਹੀਂ ਹੈ। ਜੇ ਤੁਹਾਡੇ ਕੋਲ ਪਹਿਲਾਂ ਹੀ **LangChain** ਜਾਂ **LangGraph** ਨਾਲ ਬਣਾਇਆ ਗਿਆ ਏਜੈਂਟ ਹੈ, ਤਾਂ ਤੁਸੀਂ ਇਸਨੂੰ Microsoft Foundry ਹੋਸਟਿਡ ਏਜੈਂਟ ਵਜੋਂ ਚਲਾ ਸਕਦੇ ਹੋ ਤਾਂ ਜੋ Foundry ਰਨਟਾਈਮ, ਸੈਸ਼ਨ, ਸਕੇਲਿੰਗ, ਪਹچਾਣ ਅਤੇ ਪ੍ਰੋਟੋਕੋਲ ਐਂਡਪਾਇੰਟ ਤੁਹਾਡੇ ਲਈ ਸੰਭਾਲੇ, ਜਦਕਿ ਤੁਹਾਡੀ ਏਜੈਂਟ ਲੋਜਿਕ LangGraph ਵਿੱਚ ਰਹਿੰਦੀ ਹੈ।

ਇਹ `langchain_azure_ai.agents.hosting` ਪੈਕੇਜ ਨਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਜੋ ਕਿ ਇੱਕ ਕੰਪਾਈਲ ਕੀਤਾ LangGraph ਗ੍ਰਾਫ ਉਨ੍ਹਾਂ ਹੀ ਪ੍ਰੋਟੋਕੋਲਾਂ ਉੱਤੇ ਖੋਲ੍ਹਦਾ ਹੈ ਜੋ Foundry ਹੋਸਟਿਡ ਏਜੈਂਟ ਵਰਤਦੇ ਹਨ।

**1. ਹੋਸਟਿੰਗ ਐਕਸਟਰਾ ਇੰਸਟਾਲ ਕਰੋ:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting` ਐਕਸਟਰਾ Foundry ਪ੍ਰੋਟੋਕੋਲ ਲਾਇਬ੍ਰੇਰੀਜ਼ ਇੰਸਟਾਲ ਕਰਦਾ ਹੈ: `azure-ai-agentserver-responses` (OpenAI-ਅਨੁਕੂਲ `/responses` ਐਂਡਪਾਇੰਟ) ਅਤੇ `azure-ai-agentserver-invocations` (ਜਨਰਲ `/invocations` ਐਂਡਪਾਇੰਟ)।

**2. ਹੋਸਟਿੰਗ ਪ੍ਰੋਟੋਕੋਲ ਚੁਣੋ:**

| ਪ੍ਰੋਟੋਕੋਲ | ਹੋਸਟ ਕਲਾਸ | ਐਂਡਪਾਇੰਟ | ਕਦੋਂ ਵਰਤਣਾ ਹੈ |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | ਤੁਸੀਂ OpenAI-ਅਨੁਕੂਲ ਚੈਟ, ਸਟ੍ਰੀਮਿੰਗ, ਜਵਾਬ ਇਤਿਹਾਸ, ਅਤੇ ਗੱਲਬਾਤ ਥ੍ਰੈਡਿੰਗ ਚਾਹੁੰਦੇ ਹੋ — ਗੱਲਬਾਤੀ ਏਜੈਂਟਾਂ ਲਈ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਡਿਫਾਲਟ। |
| **Invocations** | `InvocationsHostServer` | `/invocations` | ਤੁਹਾਨੂੰ ਇੱਕ ਕਸਟਮ JSON ਸ਼ੇਪ, webhook-ਸਟਾਈਲ ਐਂਡਪਾਇੰਟ ਜਾਂ ਗੈਰ-ਗੱਲਬਾਤੀ ਪ੍ਰਕਿਰਿਆ ਦੀ ਲੋੜ ਹੈ। |

ਕਿਉਂਕਿ **Responses API Foundry ਵਿੱਚ ਏਜੈਂਟ-ਸ਼ੈਲੀ ਵਿਕਾਸ ਲਈ ਮੁੱਖ API ਹੈ**, ਜ਼ਿਆਦਾਤਰ ਏਜੈਂਟਾਂ ਲਈ ਸ਼ੁਰੂਆਤ `ResponsesHostServer` ਨਾਲ ਕਰੋ।

**3. ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲ ਸੈੱਟ ਕਰੋ** (`az login` ਪਹਿਲਾਂ ਕਰੋ ਤਾਂ ਜੋ `DefaultAzureCredential` ਪ੍ਰਮਾਣਿਕਤਾ ਕਰ ਸਕੇ):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

ਜਦੋਂ ਫਿਰ ਏਜੈਂਟ Foundry ਵਿੱਚ ਹੋਸਟਿਡ ਏਜੈਂਟ ਵਜੋਂ ਚੱਲਦਾ ਹੈ, ਪਲੇਟਫਾਰਮ ਆਪੋ-ਆਪਣੇ `FOUNDRY_PROJECT_ENDPOINT` ਈਨਜੈਕਟ ਕਰਦਾ ਹੈ।

**4. Responses ਪ੍ਰੋਟੋਕੋਲ ਉੱਤੇ ਇੱਕ LangGraph ਏਜੈਂਟ ਖੋਲ੍ਹੋ:**

```python
import os

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_azure_ai.agents.hosting import ResponsesHostServer

_AZURE_AI_SCOPE = "https://ai.azure.com/.default"


def build_chat_model() -> ChatOpenAI:
    project_endpoint = os.environ["FOUNDRY_PROJECT_ENDPOINT"].rstrip("/")
    deployment = os.environ.get("FOUNDRY_MODEL_NAME", "gpt-4.1")
    credential = DefaultAzureCredential()
    project = AIProjectClient(endpoint=project_endpoint, credential=credential)
    openai_client = project.get_openai_client()
    token_provider = get_bearer_token_provider(credential, _AZURE_AI_SCOPE)

    # ਇੱਥੇ ChatOpenAI Foundry ਪ੍ਰੋਜੈਕਟ ਦੇ OpenAI-ਸੰਮੇਲਿਤ (Responses) ਐਂਡਪਾਇੰਟ ਨੂੰ ਟਾਰਗੇਟ ਕਰਦਾ ਹੈ।
    return ChatOpenAI(
        model=deployment,
        base_url=str(openai_client.base_url),
        api_key=token_provider,
    )


def main() -> None:
    graph = create_agent(build_chat_model(), tools=[])
    port = int(os.environ.get("PORT", "8088"))
    ResponsesHostServer(graph).run(port=port)


if __name__ == "__main__":
    main()
```

ਇਸਨੂੰ लोकਲੀ `python main.py` ਨਾਲ ਚਲਾਓ, ਫਿਰ `http://localhost:8088/responses` 'ਤੇ Responses ਬੇਨਤੀ ਭੇਜੋ।

**ਮੁੱਖ ਵਿਹਾਰ:**

- **ਗੱਲਬਾਤਾਂ**: ਕਲਾਇੰਟ `previous_response_id` ਜਾਂ `conversation` ID ਭੇਜ ਕੇ ਗੱਲਬਾਤ ਜਾਰੀ ਰੱਖਦੇ ਹਨ। ਜੇ ਤੁਹਾਡਾ ਗ੍ਰਾਫ LangGraph ਚੈਕਪੌਇੰਟਰ ਨਾਲ ਕੰਪਾਈਲ ਕੀਤਾ ਗਿਆ ਹੈ ਤਾਂ Foundry ਗੱਲਬਾਤ ਸਥਿਤੀ ਨੂੰ ਚੈਕਪੌਇੰਟ ਨਾਲ ਜੋੜਦਾ ਹੈ (ਉਤਪਾਦਨ ਵਿੱਚ ਇੱਕ ਟਿਕਾਊ ਚੈਕਪੌਇੰਟਰ ਵਰਤੋਂ; ਸਥਾਨਕ ਟੈਸਟਿੰਗ ਲਈ `MemorySaver` ਠੀਕ ਹੈ)।
- **ਮਨੁੱਖੀ-ਇਨ-ਲੂਪ**: ਜੇ ਤੁਹਾਡਾ ਗ੍ਰਾਫ LangGraph `interrupt()` ਵਰਤਦਾ ਹੈ, `ResponsesHostServer` ਬਕਾਇਆ ਰੋਕ ਨੂੰ Responses `function_call` / `mcp_approval_request` ਆਈਟਮ ਵਜੋਂ ਪ੍ਰਗਟ ਕਰਦਾ ਹੈ, ਅਤੇ ਕਲਾਇੰਟ ਇੱਕ ਮਿਲਦਾ ਜੁਲਦਾ `function_call_output` / `mcp_approval_response` ਨਾਲ ਮੁੜ ਚੱਲਦੇ ਹਨ।
- **Foundry ਦੇ ਲਈ ਡਿਪਲੋਏ ਕਰੋ**: Azure Developer CLI ਵਰਤੋ — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (ਸਥਾਨਕ, Docker ਲੋੜੀਂਦਾ), ਫਿਰ `azd provision` ਅਤੇ `azd deploy`। ਹੋਸਟਿਡ ਏਜੈਂਟ ਡਿਪਲੋਇਮੈਂਟ ਲਈ **Foundry ਪ੍ਰਾਜੈਕਟ ਮੈਨੇਜਰ** ਭੂਮਿਕਾ ਲੋੜੀਂਦੀ ਹੈ।

ਇਸ ਉਦਾਹਰਨ ਦਾ ਇੱਕ ਚੱਲਣਯੋਗ ਸੰਸਕਰਣ [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) ਵਿੱਚ ਉਪਲਬਧ ਹੈ। ਪੂਰੀ ਵਾਕਫਲੋ ਲਈ (Invocations ਪ੍ਰੋਟੋਕੋਲ, ਕਸਟਮ ਬੇਨਤੀ ਸਕੀਮਾਂ, ਅਤੇ ਸਮੱਸਿਆ-ਸਲਾਹ) ਦੇਖੋ [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)।

## ਕੋਡ ਉਦਾਹਰਨਾਂ 

ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਲਈ ਕੋਡ ਨਮੂਨੇ ਇਸ ਰਿਪੋਜ਼ਟਰੀ ਵਿੱਚ `xx-python-agent-framework` ਅਤੇ `xx-dotnet-agent-framework` ਫਾਈਲਾਂ ਵਿੱਚ ਮਿਲਦੇ ਹਨ।

## ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੈਂਟ ਫ੍ਰੇਮਵਰਕ ਬਾਰੇ ਹੋਰ ਸਵਾਲ ਹਨ?

ਹੋਰ ਸਿੱਖਣ ਵਾਲਿਆਂ ਨਾਲ ਮਿਲਣ, ਦਫ਼ਤਰ ਘੰਟਿਆਂ 'ਚ ਭਾਗ ਲੈਣ ਅਤੇ ਆਪਣੇ AI ਏਜੈਂਟ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਲੈਣ ਲਈ [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) ਦਾ ਹਿੱਸਾ ਬਣੋ।
## ਪਹਿਲਾ ਪਾਠ

[AI ਏਜੈਂਟ ਲਈ ਮੈਮੋਰੀ](../13-agent-memory/README.md)

## ਅਗਲਾ ਪਾਠ

[ਕੰਪਿਊਟਰ ਵਰਤੋਂ ਏਜੈਂਟ ਦਾ ਨਿਰਮਾਣ (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->