let semver = require('semver')
let getClientVersion = require('./util/getClientVersion')
let _ = require('lodash')

module.exports = function validateManifest (manifest) {
  return getClientVersion()
  .then(clientVersion => {
    if (!manifest.name || !/^[a-z]([\w-]*[a-z])?$/i.test(manifest.name)) {
      throw new Error('Invalid package name!')
    }

    if (!semver.valid(manifest.version)) {
      throw new Error('Invalid package version!')
    }

    if (!manifest.mc || !semver.validRange(manifest.mc)) {
      throw new Error('Invalid package mc!')
    }

    let compatibleRange = manifest.mc
    if (!semver.satisfies(clientVersion, compatibleRange)) {
      throw new Error('The package is incompatible with the current Minecraft version! ' +
        `Compatible version range: ${compatibleRange}`)
    }

    if (!manifest.installFiles && !manifest.installCommand) {
      throw new Error('No installFiles and installCommand!')
    }

    if (manifest.installFiles && !_.isPlainObject(manifest.installFiles)) {
      throw new Error('Specified installFiles is not an object!')
    }

    return true
  })
}
