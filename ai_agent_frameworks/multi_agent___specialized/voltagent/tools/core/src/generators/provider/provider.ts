import * as path from "node:path";
import { type Tree, addProjectConfiguration, formatFiles, generateFiles } from "@nx/devkit";
import type { PackageGeneratorSchema } from "./schema";

export async function providerGenerator(tree: Tree, options: PackageGeneratorSchema) {
  const projectRoot = `packages/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: "library",
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, "files"), projectRoot, {
    ...options,
    uppercase: (val: string) => val.toUpperCase(),
    lowercase: (val: string) => val.toLowerCase(),
    classify: (val: string) =>
      val.replace(/(\w)(\w*)/g, (_ignore, sub1, sub2) => sub1.toUpperCase() + sub2.toLowerCase()),
  });
  await formatFiles(tree);
}

export default providerGenerator;
