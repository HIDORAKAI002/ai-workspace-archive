const os = require('os')
const path = require('path')
const homeDir = require('home-dir').directory

let customPath

function getMinecraftPath () {
  if (customPath) return customPath

  switch (os.platform()) {
    case 'win32': return path.join(homeDir, 'AppData/Roaming/.minecraft')
    case 'linux': return path.join(homeDir, '.minecraft')
    case 'darwin': return path.join(homeDir, 'Library/Application Support/minecraft')
  }
}

getMinecraftPath.set = function setMinecraftPath (newPath) {
  customPath = newPath
}

module.exports = getMinecraftPath
