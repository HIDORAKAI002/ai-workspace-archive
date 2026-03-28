let parsePackageString = require('./install/parsePackageString')
let ensureDownloaded = require('./ensureDownloaded')
let ensureUnzipped = require('./ensureUnzipped')
let readManifest = require('./install/readManifest')
let validateManifest = require('./validateManifest')
let handleInstallFiles = require('./handleInstallFiles')
let handleInstallCommand = require('./handleInstallCommand')
let addInstalledPackage = require('./util/addInstalledPackage')

module.exports = function install (packageString) {
  let pkg = parsePackageString(packageString)
  let manifest
  let folderPath
  let zipPath

  return ensureDownloaded(pkg.name)
  .then(downloadedFile => { pkg.name = downloadedFile })
  .then(() => ensureUnzipped(pkg.name))
  .then(unpackedFolder => {
    folderPath = unpackedFolder
    zipPath = (unpackedFolder !== pkg.name) ? pkg.name : null
  })
  .then(() => readManifest(folderPath))
  .then(result => { manifest = result })
  .then(() => validateManifest(manifest))
  .then(() => handleInstallFiles(manifest.installFiles, folderPath, zipPath))
  .then(() => handleInstallCommand(manifest.installCommand, folderPath))
  .then(() => addInstalledPackage(manifest.name, manifest.version))
}
