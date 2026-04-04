# Running this sample

You're recommended to install `uv` but it's not a must, see [instructions](https://docs.astral.sh/uv/#highlights)

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
Prompt:  {
  type: 'text',
  text: 'Please review this code:\n\nconsole.log("hello");'
}
Resource template:  file
Tool result:  { content: [ { type: 'text', text: '9' } ] }
```
