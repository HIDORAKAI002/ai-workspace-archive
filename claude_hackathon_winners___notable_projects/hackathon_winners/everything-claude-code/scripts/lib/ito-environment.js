"use strict";

const SYSTEM_ENVIRONMENT_KEYS = Object.freeze([
  "CI",
  "ComSpec",
  "DISPLAY",
  "FORCE_COLOR",
  "HOME",
  "LANG",
  "LC_ALL",
  "NO_COLOR",
  "PATH",
  "PATHEXT",
  "SHELL",
  "SystemRoot",
  "TEMP",
  "TERM",
  "TMP",
  "TMPDIR",
  "USERPROFILE",
  "WAYLAND_DISPLAY",
  "WINDIR",
  "XDG_RUNTIME_DIR",
]);

function copyDefined(source, target, key) {
  if (typeof source[key] === "string") {
    target[key] = source[key];
  }
}

function createSafeItoEnvironment(source = process.env, options = {}) {
  const safe = {};
  for (const key of SYSTEM_ENVIRONMENT_KEYS) {
    copyDefined(source, safe, key);
  }
  for (const [key] of Object.entries(source)) {
    if (key.startsWith("LC_")) copyDefined(source, safe, key);
  }

  if (options.includeControls) {
    copyDefined(source, safe, "ECC_DRY_RUN");
    copyDefined(source, safe, "NODE_ENV");
    if (source.NODE_ENV === "test") {
      copyDefined(source, safe, "ECC_ITO_BROWSER_EXECUTABLE");
    }
  }

  return Object.freeze(safe);
}

module.exports = Object.freeze({
  SYSTEM_ENVIRONMENT_KEYS,
  createSafeItoEnvironment,
});
