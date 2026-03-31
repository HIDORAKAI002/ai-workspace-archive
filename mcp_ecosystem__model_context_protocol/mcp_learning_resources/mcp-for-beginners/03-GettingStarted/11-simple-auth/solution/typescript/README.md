# Run sample

## Install dependencies

```sh
npm install
```

## Build

```sh
npm run build
```

## Generate tokens

```sh
npm run generate
```

This creates a token in a file *.env*. The client will read from this file.

## Run code

Start the server with:

```sh
npm start
```

Run the client, in a separate terminal with:

```sh
npm run client
```

In the server's terminal, you should see an output similar to:

```text
User exists
User has required scopes
Middleware executed
```

and from the client terminal, you should see output similar to:

```text
Connected to MCP server with session ID: c1e50d7b-acff-4f11-8f96-5ae490ca1eaa
Available tools: { tools: [ { name: 'process-files', inputSchema: [Object] } ] }
Client disconnected.
Exiting...
```

### Changing things

Let's ensure we understand the scopes. Locate the file *server.ts* and this code:

```typescript
 if(!hasScopes(token, ["User.Read"])){
        res.status(403).send('Forbidden - insufficient scopes');
    }
```

This says the passed token needs to have "User.Read", let's change that to "User.Write". Now run `npm run build` and restart the server `npm start`. You should now see auth fail as we don't have this scope (we have User.Read and Admin.Write):

The client now says

```text
Error initializing client: Error: Error POSTing to endpoint (HTTP 403): Forbidden - insufficient scopes
```

and you can see in the server terminal that it says:

```text
User exists
```

and that it doesn't go beyond this point. 

Either add this scope "User.Write" and run `npm run generate` and rerun the client OR change the server code back.