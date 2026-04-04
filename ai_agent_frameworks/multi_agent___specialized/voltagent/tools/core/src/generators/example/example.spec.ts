import { type Tree, readProjectConfiguration } from "@nx/devkit";
import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing";
import { exampleGenerator } from "./example";
import type { ExampleGeneratorSchema } from "./schema";

describe("example generator", () => {
  let tree: Tree;
  const options: ExampleGeneratorSchema = { name: "test", description: "Test example" };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await exampleGenerator(tree, options);
    const config = readProjectConfiguration(tree, "example-test");
    expect(config).toBeDefined();
  });
});
