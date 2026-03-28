let fs = require('fs-extra')
let path = require('path')
let async = require('async')
let winston = require('winston')
let getMinecraftPath = require('../util/getMinecraftPath')

module.exports = function copyFiles (fileList, packageRoot, zipPath) {
  return new Promise((resolve, reject) => {
    let minecraftRoot = getMinecraftPath()

    return async.forEachOfSeries(fileList, (fromList, to, done) => {
      async.eachSeries(fromList, (from, done) => {
        let absoluteFrom = (from === '@') ? path.resolve(zipPath) : path.join(packageRoot, from)
        let absoluteTo = path.join(minecraftRoot, to, (from === '@') ? '' : path.basename(from))

        winston.info(`Copying from ${from} (${absoluteFrom}) to ${to} (${absoluteTo})`)

        return fs.copy(absoluteFrom, absoluteTo, done)
      }, done)
    }, error => {
      if (error) return reject(error)
      resolve()
    })
  })
}
