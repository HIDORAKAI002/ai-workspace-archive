let path = require('path')
let getUserSettingsDir = require('user-settings-dir')

function getPathToMcpmDir () {
  return path.join(getUserSettingsDir(), '.mcpm')
}

module.exports = getPathToMcpmDir
