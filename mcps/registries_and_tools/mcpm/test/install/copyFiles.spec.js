/* eslint-env mocha */

let proxyquire = require('proxyquire')
let path = require('path')

describe('install.copyFiles', function () {
  it('safely copies files and folders using fs-extra#copy', function (done) {
    let copyFiles = proxyquire('../../lib/install/copyFiles', {
      '../util/getMinecraftPath': () => 'mcpath',
      'fs-extra': {
        copy (from, to, callback) {
          if (from.includes('from.file')) {
            to.should.equal(path.join('mcpath', 'foo/bar/to/from.file'))
          } else {
            to.should.equal(path.join('mcpath', 'foo/bar/to/dir'))
          }
          setTimeout(callback)
        }
      }
    })

    copyFiles({'foo/bar/to': ['whatever/from.file', 'whatever/from/dir']}, 'pkgpath')
    .then(done)
  })

  it('copies the package zip when trying to copy it', function (done) {
    let copyFiles = proxyquire('../../lib/install/copyFiles', {
      '../util/getMinecraftPath': () => 'mcpath',
      'fs-extra': {
        copy (from, to, callback) {
          from.should.equal('/fake/path/to/package.zip')
          to.should.equal(path.join('mcpath', 'foo/bar/to/package.zip'))
          setTimeout(callback)
        }
      }
    })

    copyFiles({'foo/bar/to': ['/fake/path/to/package.zip']}, 'pkgpath', '/fake/path/to/package.zip')
    .then(done)
  })

  it('returns an error if fs.copy fails', function (done) {
    let copyFiles = proxyquire('../../lib/install/copyFiles', {
      '../util/getMinecraftPath': () => 'mcpath',
      'fs-extra': {
        copy (from, to, callback) {
          setTimeout(() => callback(new Error('Oh, snap!')))
        }
      }
    })

    copyFiles({'oh': ['snap']}, 'pkgpath')
    .catch(error => {
      error.should.be.an.instanceof(Error)
      done()
    })
  })
})
