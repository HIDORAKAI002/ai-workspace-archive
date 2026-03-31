To build the `go-html-to-md` library, run the following command:

```bash
cd apps/api/sharedLibs/go-html-to-md
go build -o <OUTPUT> -buildmode=c-shared html-to-markdown.go
```

Replace `<OUTPUT>` with the correct filename for your OS:

- Windows → `html-to-markdown.dll`
- Linux → `libhtml-to-markdown.so`
- macOS → `libhtml-to-markdown.dylib`
