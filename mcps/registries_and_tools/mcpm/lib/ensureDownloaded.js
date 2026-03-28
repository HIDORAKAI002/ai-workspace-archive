let fs = require('fs')
let tmp = require('tmp-promise')
let got = require('got')
let winston = require('winston')

module.exports = function ensureUnzipped (pathToArchive) {
  if (!/https?:\/\//i.test(pathToArchive)) return Promise.resolve(pathToArchive)

  return tmp.file({prefix: 'mcpm-', postfix: '.zip'})
  .then(tempFile => new Promise((resolve, reject) => {
    winston.info(`Downloading to ${tempFile.path}`)
    got.stream(pathToArchive)
      .pipe(fs.createWriteStream(tempFile.path))
      .on('close', () => {
        resolve(tempFile.path)
      })
  }))
}
