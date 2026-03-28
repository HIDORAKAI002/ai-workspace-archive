let getCurrentProfile = require('./getCurrentProfile')

function getClientVersion () {
  return getCurrentProfile().then(profile => profile.version)
}

module.exports = getClientVersion
