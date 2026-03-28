/* eslint-env mocha */

let proxyquire = require('proxyquire')
let path = require('path')

let FOLDER_PATH = 'path-to-unpacked'
let ZIP_PATH = 'path-to-zip'

let FAKE_FILE_LIST = {
  'mods/1.8/./../1.8': 'fake.mod',
  './config': 'configfiles/*.cfg'
}

let flattenedFakeFileList = {
  [`mods${path.sep}1.8`]: ['fake.mod'],
  'config': [`configfiles${path.sep}1.cfg`, `configfiles${path.sep}2.cfg`]
}

let flattenFileHash = proxyquire('../../lib/install/flattenFileHash', {
  'glob': (glob, opts, callback) => {
    opts.cwd.should.equal(FOLDER_PATH)
    if (glob === 'configfiles/*.cfg') {
      setImmediate(() => callback(null, ['configfiles/1.cfg', 'configfiles/2.cfg']))
    } else {
      setImmediate(() => callback(null, [glob]))
    }
  }
})

describe('install.flattenFileHash', function () {
  it('treats items as globs', function (done) {
    flattenFileHash(FAKE_FILE_LIST, FOLDER_PATH, ZIP_PATH)
    .then(result => {
      result.should.deep.equal(flattenedFakeFileList)
      done()
    })
  })

  it('rejects when folder is not specified', function (done) {
    flattenFileHash(FAKE_FILE_LIST)
    .catch(error => {
      error.should.be.an.instanceof(Error)
      done()
    })
  })

  it('rejects when trying to copy from outside of the package', function (done) {
    flattenFileHash({'malicious': 'whatever/../..'}, FOLDER_PATH, ZIP_PATH)
    .catch(error => {
      error.should.be.an.instanceof(Error)
      done()
    })
  })

  it('rejects when trying to copy from an absolute path', function (done) {
    flattenFileHash({'malicious': path.resolve('whatever')}, FOLDER_PATH, ZIP_PATH)
    .catch(error => {
      error.should.be.an.instanceof(Error)
      done()
    })
  })

  it('rejects when trying to copy to outside of Minecraft', function (done) {
    flattenFileHash({'whatever/../..': 'malicious'}, FOLDER_PATH, ZIP_PATH)
    .catch(error => {
      error.should.be.an.instanceof(Error)
      done()
    })
  })

  it('rejects when trying to copy to an absolute path', function (done) {
    flattenFileHash({[path.resolve('whatever')]: 'malicious'}, FOLDER_PATH, ZIP_PATH)
    .catch(error => {
      error.should.be.an.instanceof(Error)
      done()
    })
  })

  it('allows to specify arrays of globs', function (done) {
    let list = {
      'mods/1.8/./../1.8': [ 'fake.mod' ],
      './config': 'configfiles/*.cfg'
    }

    flattenFileHash(list, FOLDER_PATH, ZIP_PATH)
    .then(result => {
      result.should.deep.equal(flattenedFakeFileList)
      done()
    })
  })

  it('handles several denormalized paths pointing to the same folder', function (done) {
    let list = {
      'mods/1.8/./../1.8': 'foo',
      './mods/1.8': 'bar',
      'mods/1.8': 'qux'
    }

    flattenFileHash(list, FOLDER_PATH, ZIP_PATH)
    .then(result => {
      result.should.deep.equal({[`mods${path.sep}1.8`]: [ 'foo', 'bar', 'qux' ]})
      done()
    })
  })

  it("allows to specify '@' as a way to copy an archive with the package", function (done) {
    flattenFileHash({'mods/1.8': '@'}, FOLDER_PATH, ZIP_PATH)
    .then(result => {
      result.should.deep.equal({[`mods${path.sep}1.8`]: [ ZIP_PATH ]})
      done()
    })
  })

  it("ignores '@' when installing from a folder", function (done) {
    flattenFileHash({'mods/1.8': [ '@', 'other-file' ]}, 'path-to-unpacked')
    .then(result => {
      result.should.deep.equal({[`mods${path.sep}1.8`]: [ 'other-file' ]})
      done()
    })
  })
})
