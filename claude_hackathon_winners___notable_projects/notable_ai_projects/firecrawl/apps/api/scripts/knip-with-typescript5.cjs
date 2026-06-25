const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const knipPackagePath = require.resolve("knip/package.json");
const knipNodeModules = path.dirname(path.dirname(knipPackagePath));
const knipTypescriptPath = path.join(knipNodeModules, "typescript");
const typescript5Path = path.dirname(require.resolve("typescript5/package.json"));

// Windows "dir" symlinks require Developer Mode / elevation; junctions do the
// same thing for directories without any special privilege. The type argument
// is ignored on non-Windows, so a normal symlink is created there as before.
const linkType = process.platform === "win32" ? "junction" : "dir";

// Remove a symlink/junction without touching its target. Junctions report as a
// directory to lstat and must be removed with rmdirSync; symlinks use unlinkSync.
function removeLink(linkPath) {
  if (!fs.existsSync(linkPath)) return;
  if (fs.lstatSync(linkPath).isDirectory()) {
    fs.rmdirSync(linkPath);
  } else {
    fs.unlinkSync(linkPath);
  }
}

let originalTarget;
let hadOriginal = false;

try {
  hadOriginal = fs.existsSync(knipTypescriptPath);
  if (hadOriginal) {
    originalTarget = fs.readlinkSync(knipTypescriptPath);
    removeLink(knipTypescriptPath);
  }

  fs.symlinkSync(typescript5Path, knipTypescriptPath, linkType);

  const result = spawnSync(
    process.execPath,
    [require.resolve("knip/bin/knip.js"), ...process.argv.slice(2)],
    { stdio: "inherit" },
  );

  process.exitCode = result.status ?? 1;
} finally {
  try {
    removeLink(knipTypescriptPath);
    if (hadOriginal) {
      const restoreTarget = path.isAbsolute(originalTarget)
        ? originalTarget
        : path.resolve(path.dirname(knipTypescriptPath), originalTarget);
      fs.symlinkSync(restoreTarget, knipTypescriptPath, linkType);
    }
  } catch (error) {
    console.error("Failed to restore knip TypeScript peer link:", error);
    process.exitCode = process.exitCode || 1;
  }
}
