---
name: "react-graphql-apollo-client-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for react-graphql-apollo-client-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
// React + GraphQL (Apollo Client) .cursorrules

// Prefer functional components with hooks

const preferFunctionalComponents = true;

// GraphQL and Apollo Client best practices

const graphqlBestPractices = [
  "Use Apollo Client for state management and data fetching",
  "Implement query components for data fetching",
  "Utilize mutations for data modifications",
  "Use fragments for reusable query parts",
  "Implement proper error handling and loading states",
];

// Folder structure

const folderStructure = `
src/
  components/
  graphql/
    queries/
    mutations/
    fragments/
  hooks/
  pages/
  utils/
`;

// Additional instructions

const additionalInstructions = `
1. Use Apollo Provider at the root of your app
2. Implement custom hooks for Apollo operations
3. Use TypeScript for type safety with GraphQL operations
4. Utilize Apollo Client's caching capabilities
5. Implement proper error boundaries for GraphQL errors
6. Use Apollo Client DevTools for debugging
7. Follow naming conventions for queries, mutations, and fragments
`;


```