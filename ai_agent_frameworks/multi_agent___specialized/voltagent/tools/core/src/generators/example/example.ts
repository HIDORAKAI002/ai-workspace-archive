import * as path from "node:path";
import { type Tree, addProjectConfiguration, formatFiles, generateFiles } from "@nx/devkit";
import type { ExampleGeneratorSchema } from "./schema";

export async function exampleGenerator(tree: Tree, options: ExampleGeneratorSchema) {
  const projectRoot = `examples/${options.name}`;
  addProjectConfiguration(tree, `example-${options.name}`, {
    root: projectRoot,
    projectType: "application",
    sourceRoot: `${projectRoot}/src`,
    targets: {
      build: {
        executor: "@nx/js:tsc",
        outputs: ["{options.outputPath}"],
        options: {
          outputPath: `${projectRoot}/dist`,
          main: `${projectRoot}/src/index.ts`,
          tsConfig: `${projectRoot}/tsconfig.json`,
        },
      },
      dev: {
        executor: "@nx/js:node",
        options: {
          buildTarget: `example-${options.name}:build`,
          watch: true,
        },
      },
    },
  });
  generateFiles(tree, path.join(__dirname, "files"), projectRoot, options);
  await formatFiles(tree);
}

export default exampleGenerator;
