let getCurrentProfile = require('./getCurrentProfile')
let setCurrentProfile = require('./setCurrentProfile')

function addInstalledPackage (name, version) {
  return getCurrentProfile()
  .then(profile => profile.originalInfo)
  .then(rawProfile => {
    rawProfile.mcpmInstalledPackages = rawProfile.mcpmInstalledPackages || {}
    rawProfile.mcpmInstalledPackages[name] = version
    return setCurrentProfile(rawProfile)
  })
}

module.exports = addInstalledPackage
