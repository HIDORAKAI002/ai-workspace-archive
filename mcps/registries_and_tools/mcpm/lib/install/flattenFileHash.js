let _ = require('lodash')
let path = require('path')
let glob = require('glob')
let async = require('async')

module.exports = function flattenFileList (hash, folderPath, zipPath) {
  return new Promise((resolve, reject) => {
    if (!folderPath) {
      throw new Error('Package directory not specified!')
    }

    // Convert string values to arrays with a single element.
    let normalizedHash = _.mapValues(hash, _.castArray)

    // Each value of the hash is an array of globs. Let's deglob asynchronously.
    async.mapValuesSeries(normalizedHash, (globList, key, doneList) => {
      async.mapSeries(globList, (oneGlob, doneOne) => {
        if (oneGlob === '@') return setImmediate(() => doneOne(null, '@'))
        glob(oneGlob, {cwd: folderPath}, doneOne)
      }, doneList)
    }, (err, deglobbedHash) => {
      if (err) throw err

      let flattenedHash = _(deglobbedHash)
        // Now each value is an array of arrays of file paths. Let's flatten.
        .mapValues(_.flatten)
        // Let's also remove nulls (globs with nothing found).
        .mapValues(_.compact)
        // Remove keys with empty lists.
        .omitBy(_.isEmpty)
        // Normalize file paths.
        .mapValues(fileList => _.map(fileList, path.normalize))
        // Merge lists with same normalized destination.
        .transform((result, fromList, toKey) => {
          let normalizedTo = path.normalize(toKey)
          result[normalizedTo] = (result[normalizedTo] || []).concat(fromList)
        })
        // Remove duplicate file paths.
        .mapValues(_.uniq)
        // End the chain, get result.
        .value()

      // Some file paths can be malicious or just dumb (copy all from `/`) - let's check.
      try {
        let thingsToCheckForMaliciousPaths = [
          {array: _.keys(flattenedHash), preposition: 'to'},
          {array: _.flatten(_.values(flattenedHash)), preposition: 'from'}
        ]
        thingsToCheckForMaliciousPaths.forEach(thing => {
          if (thing.array.some(item => item !== '@' && item.startsWith(`..${path.sep}`) || item === '..')) {
            throw new Error(`Trying to copy ${thing.preposition} outside of Minecraft!`)
          }
          if (thing.array.some(path.isAbsolute)) {
            throw new Error(`Trying to copy ${thing.preposition} an absolute path!`)
          }
        })
      } catch (error) {
        reject(error)
      }

      resolve(flattenedHash)
    })
  })
}
