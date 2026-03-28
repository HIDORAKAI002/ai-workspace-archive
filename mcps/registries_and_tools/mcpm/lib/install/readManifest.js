let adapterMcpm = require('../adapters/mcpm')
let adapterLiteloader = require('../adapters/liteloader')
let adapterForge = require('../adapters/forge')

module.exports = function readManifest (folderPath) {
  return adapterMcpm(folderPath)
  .catch(() => adapterLiteloader(folderPath))
  .catch(() => adapterForge(folderPath))
}
