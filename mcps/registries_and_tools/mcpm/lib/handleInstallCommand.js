let childProcess = require('child_process')
let _ = require('lodash')
let winston = require('winston')
let getMinecraftPath = require('./util/getMinecraftPath')

module.exports = function invokeInstallExecutable (command, folderPath) {
  return new Promise((resolve, reject) => {
    winston.info(`Executing command: ${command}`)
    childProcess.exec(command, {
      cwd: folderPath,
      env: _.defaults({
        MCPM: '1',
        PATH_TO_MINECRAFT: getMinecraftPath()
      }, process.env)
    }, error => {
      if (error) return reject(error)
      resolve()
    })
  })
}
