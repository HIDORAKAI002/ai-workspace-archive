let path = require('path')
let fs = require('fs')
let getMinecraftPath = require('./getMinecraftPath')

function getCurrentProfile () {
  return new Promise((resolve, reject) => {
    let pathToProfiles = path.join(getMinecraftPath(), 'launcher_profiles.json')

    fs.readFile(pathToProfiles, 'utf8', (err, rawContent) => {
      if (err) return reject(err)

      let launcherProfiles = JSON.parse(rawContent)
      let currentProfileName = launcherProfiles.selectedProfile
      let currentProfile = launcherProfiles.profiles[currentProfileName]

      let version = currentProfile.lastVersionId.split('-')[0]

      if (/^\d+\.\d+$/.test(version)) {
        version += '.0'
      }

      resolve({
        originalInfo: currentProfile,
        installedPackages: currentProfile.mcpmInstalledPackages || [],
        version
      })
    })
  })
}

module.exports = getCurrentProfile
