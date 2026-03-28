let flattenFileHash = require('./install/flattenFileHash')
let copyFiles = require('./install/copyFiles')

module.exports = function handleInstallFiles (fileHash, folderPath, zipPath) {
  if (!fileHash) return Promise.resolve()

  return flattenFileHash(fileHash, folderPath, zipPath)
  .then(fileHash => copyFiles(fileHash, folderPath, zipPath))
}
