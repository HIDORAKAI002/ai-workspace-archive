# Tool Prompt: lsp-intelligence-operations-2

- Name: LSP

## Summary

Use LSP to navigate symbols, references, hover, and call hierarchy in code.

# Raw Prompt Text
Interact with Language Server Protocol (LSP) servers to get code intelligence features.

Supported operations:
- goToDefinition: Find where a symbol is defined
- findReferences: Find all references to a symbol
- hover: Get hover information (documentation, type info) for a symbol
- documentSymbol: Get all symbols (functions, classes, variables) in a document
- workspaceSymbol: Search for symbols across the entire workspace
- goToImplementation: Find implementations of an interface or abstract method
- prepareCallHierarchy: Get call hierarchy item at a position (functions${PATH})
- incomingCalls: Find all functions${PATH} that call the function at a position
- outgoingCalls: Find all functions${PATH} called by the function at a position

All operations require:
- filePath: The file to operate on
- line: The line number (${NUM}-based, as shown in editors)
- character: The character offset (${NUM}-based, as shown in editors)

Note: LSP servers must be configured for the file type. If no server is available, an error will be returned.
