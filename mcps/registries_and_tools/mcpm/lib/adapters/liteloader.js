let path = require('path')
let fs = require('fs-extra-promise')

module.exports = function adapterLiteloader (folderPath) {
  return fs.readJsonAsync(path.join(folderPath, 'litemod.json'))
  .then(config => ({
    name: config.name,
    version: `1.0.0-revision-${config.revision}`,
    author: config.author,
    mc: config.mcversion,
    installFiles: {[`mods/${config.mcversion}/${config.name}-revision-${config.revision}.litemod`]: '@'}
  }))
}
