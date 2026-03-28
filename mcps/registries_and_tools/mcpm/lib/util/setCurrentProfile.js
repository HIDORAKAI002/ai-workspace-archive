let path = require('path')
let fs = require('fs')
let getMinecraftPath = require('./getMinecraftPath')

// TODO: merge with getCurrentProfile, separate out common `readFile` logic.
function setCurrentProfile (newProfile) {
  return new Promise((resolve, reject) => {
    let pathToProfiles = path.join(getMinecraftPath(), 'launcher_profiles.json')

    fs.readFile(pathToProfiles, 'utf8', (error, rawProfiles) => {
      if (error) return reject(error)

      let profiles = JSON.parse(rawProfiles)
      profiles.profiles[profiles.selectedProfile] = newProfile
      let serializedProfiles = JSON.stringify(profiles, null, 2)

      fs.writeFile(pathToProfiles, serializedProfiles, (error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  })
}

module.exports = setCurrentProfile
