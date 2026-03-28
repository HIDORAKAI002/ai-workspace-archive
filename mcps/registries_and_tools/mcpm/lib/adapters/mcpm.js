let path = require('path')
let fs = require('fs-extra-promise')

module.exports = function adapterLiteloader (folderPath) {
  return fs.readJsonAsync(path.join(folderPath, 'mcpm-package.json'))
}
