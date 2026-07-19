import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const readmePath = path.join(repositoryRoot, "README.md");
const outputPath = path.join(repositoryRoot, "site", "resources.json");

const groupForSection = (levelTwo, levelThree) => {
  if (levelThree === "Tools") return "Tools";
  if (levelTwo === "Applications") return "Applications";
  if (levelTwo === "Frameworks") return "Frameworks";
  if (levelTwo === "Benchmark/Evaluator") return "Benchmarks";
  if (levelTwo === "Platforms/API") return "Platforms";
  if (levelTwo === "Related" || levelTwo === "Reference Repo") {
    return "Research";
  }
  return "Other";
};

const iconForUrl = (value) => {
  try {
    const url = new URL(value);
    const pathParts = url.pathname.split("/").filter(Boolean);

    if (url.hostname === "github.com" && pathParts.length >= 2) {
      return {
        url: `https://github.com/${encodeURIComponent(pathParts[0])}.png?size=96`,
        type: "avatar",
      };
    }

    return {
      url: `${url.origin}/favicon.ico`,
      type: "favicon",
    };
  } catch {
    return null;
  }
};

const decodeEntities = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");

const cleanDescription = (value) =>
  decodeEntities(
    value
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/!\[[^\]]*$/g, "")
      .replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[`*_]/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );

const readme = await readFile(readmePath, "utf8");
const resources = [];
let levelTwo = "";
let levelThree = "";
let inResources = false;

for (const line of readme.split("\n")) {
  const secondLevel = line.match(/^##\s+(.+?)\s*$/);
  if (secondLevel) {
    levelTwo = secondLevel[1].trim();
    levelThree = "";
    inResources = true;
    continue;
  }

  const thirdLevel = line.match(/^###\s+(.+?)\s*$/);
  if (thirdLevel) {
    levelThree = thirdLevel[1].trim();
    continue;
  }

  if (!inResources) continue;

  const entry = line.match(
    /^- \[([^\]]+)\]\((https?:\/\/[^)]+)\)\s*(?:[-—]\s*)?(.*)$/,
  );
  if (!entry) continue;

  const [, name, url, rawDescription] = entry;
  const description = cleanDescription(rawDescription);
  const section = levelThree || levelTwo;

  resources.push({
    id: resources.length + 1,
    name: decodeEntities(name.trim()),
    url,
    description: description || "Explore this resource and its documentation.",
    category: groupForSection(levelTwo, levelThree),
    section,
    source: url.includes("github.com") ? "GitHub" : "Website",
    icon: iconForUrl(url),
  });
}

await writeFile(outputPath, `${JSON.stringify(resources, null, 2)}\n`, "utf8");
console.log(`Generated ${resources.length} resources at ${outputPath}`);
