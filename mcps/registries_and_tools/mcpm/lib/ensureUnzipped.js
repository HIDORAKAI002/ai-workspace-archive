let fs = require('fs-extra-promise')
let tmp = require('tmp-promise')
let AdmZip = require('adm-zip')

module.exports = function ensureUnzipped (pathToArchive) {
  return fs.isDirectoryAsync(pathToArchive)
  .then(isDirectory => isDirectory ? pathToArchive : tmp.dir()
    .then(tempDir => {
      let zip = new AdmZip(pathToArchive)
      zip.extractAllTo(tempDir.path)
      return tempDir.path
    })
  )
}
