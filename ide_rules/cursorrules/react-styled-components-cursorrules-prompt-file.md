---
name: "react-styled-components-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for react-styled-components-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
// React + Styled Components .cursorrules

// Prefer functional components with hooks

const preferFunctionalComponents = true;

// Styled Components best practices

const styledComponentsBestPractices = [
  "Use the styled-components/macro for better debugging",
  "Implement a global theme using ThemeProvider",
  "Create reusable styled components",
  "Use props for dynamic styling",
  "Utilize CSS helper functions like css`` when needed",
];

// Folder structure

const folderStructure = `
src/
  components/
    styled/
  styles/
    theme.js
    globalStyles.js
  pages/
  utils/
`;

// Additional instructions

const additionalInstructions = `
1. Use proper naming conventions for styled components (e.g., StyledButton)
2. Implement a consistent theming system
3. Use CSS-in-JS for all styling needs
4. Utilize styled-components' attrs method for frequently used props
5. Implement proper TypeScript support for styled-components
6. Use the css prop for conditional styling when appropriate
7. Follow the styled-components documentation for best practices
`;


```