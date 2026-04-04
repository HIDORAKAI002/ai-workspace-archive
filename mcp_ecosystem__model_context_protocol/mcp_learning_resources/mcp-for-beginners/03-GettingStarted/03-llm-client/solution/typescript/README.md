# Running this sample

This sample involves having an LLM on the client. The LLM needs you to either run this in a Codespaces or for you to set up a personal access token in GitHub to work.

## -1- Install the dependencies

```bash
npm install
```

## -3- Run the server


```bash
npm run build
```

## -4- Run the client

```sh
npm run client
```

You should see a result similar to:

```text
Asking server for available tools
MCPClient started on stdin/stdout
Querying LLM:  What is the sum of 2 and 3?
Making tool call
Calling tool add with args "{\"a\":2,\"b\":3}"
Tool result:  { content: [ { type: 'text', text: '5' } ] }
```
