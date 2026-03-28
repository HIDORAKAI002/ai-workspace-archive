import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import prompts from "prompts";
import { validateMCPProject } from "../utils/validate-project.js";
import { toPascalCase } from "../utils/string-utils.js";

export async function addResource(name?: string) {
  await validateMCPProject();

  let resourceName = name;
  if (!resourceName) {
    const response = await prompts([
      {
        type: "text",
        name: "name",
        message: "What is the name of your resource?",
        validate: (value: string) =>
          /^[a-z0-9-]+$/.test(value)
            ? true
            : "Resource name can only contain lowercase letters, numbers, and hyphens",
      },
    ]);

    if (!response.name) {
      console.log("Resource creation cancelled");
      process.exit(1);
    }

    resourceName = response.name;
  }

  if (!resourceName) {
    throw new Error("Resource name is required");
  }

  const className = toPascalCase(resourceName);
  const fileName = `${className}Resource.ts`;
  const resourcesDir = join(process.cwd(), "src/resources");

  try {
    await mkdir(resourcesDir, { recursive: true });

    const resourceContent = `import { MCPResource, ResourceContent } from "mcp-framework";

class ${className}Resource extends MCPResource {
  uri = "resource://${resourceName}";
  name = "${className}";
  description = "${className} resource description";
  mimeType = "application/json";

  async read(): Promise<ResourceContent[]> {
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify({ message: "Hello from ${className} resource" }),
      },
    ];
  }
}

export default ${className}Resource;`;

    await writeFile(join(resourcesDir, fileName), resourceContent);

    console.log(
      `Resource ${resourceName} created successfully at src/resources/${fileName}`
    );
  } catch (error) {
    console.error("Error creating resource:", error);
    process.exit(1);
  }
}
