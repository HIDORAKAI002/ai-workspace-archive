let path = require('path')
let fs = require('fs-extra-promise')

module.exports = function adapterForge (folderPath) {
  return fs.readJsonAsync(path.join(folderPath, 'mcmod.info'))
  .then(config => ({
    name: config[0].modid,
    version: `1.0.0-original-${config[0].version}`,
    author: (config[0].authors || [])[0],
    mc: config[0].mcversion,
    installFiles: {[`mods/${config[0].mcversion}/${config[0].modid}-${config[0].version}.jar`]: '@'}
  }))
}
