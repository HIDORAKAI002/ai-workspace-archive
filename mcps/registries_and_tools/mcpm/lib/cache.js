let semver = require('semver')
let path = require('path')
let fs = require('fs-extra')
let getPathToMcpmDir = require('./util/getPathToMcpmDir')

function add (pathToZip, manifest) {
  return new Promise((resolve, reject) => {
    let pathToPackageCache = path.join(getPathToMcpmDir(), 'cache', manifest.name, manifest.version)
    let manifestFilename = path.join(pathToPackageCache, 'mcpm-package.json')
    let targetPathToZip = path.join(pathToPackageCache, 'mcpm-package.zip')

    if (targetPathToZip === pathToZip) return resolve()

    fs.copy(pathToZip, targetPathToZip, err => {
      if (err) return reject(err)
      fs.outputJson(manifestFilename, manifest, err => {
        if (err) reject(err)
        else resolve()
      })
    })
  })
}

function get (name, version) {
  return new Promise((resolve, reject) => {
    if (!name || !/^[a-z]([\w-]*[a-z])?$/i.test(name)) {
      return reject(new Error('Invalid package name!'))
    }

    if (!semver.valid(version)) {
      return reject(new Error('Invalid package version!'))
    }

    let pathToMcpm = getPathToMcpmDir()
    let pathToZip = path.join(pathToMcpm, 'cache', name, version, 'mcpm-package.zip')
    fs.exists(pathToZip, isFound => {
      if (isFound) resolve(pathToZip)
      else reject(new Error("Can't find specified package in the cache!"))
    })
  })
}

module.exports = {
  add,
  get
}
