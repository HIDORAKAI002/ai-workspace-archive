/* eslint-env mocha */

let proxyquire = require('proxyquire')

describe('ensureUnzipped', function () {
  it('returns passed path when it is actually a folder', function (done) {
    let ensureUnzipped = proxyquire('../lib/ensureUnzipped', {
      'fs-extra-promise': {
        isDirectoryAsync: () => Promise.resolve(true)
      }
    })

    ensureUnzipped('fake-path').then(resultPath => {
      resultPath.should.equal('fake-path')
      done()
    })
  })

  it('unzips to a temp directory and returns it', function (done) {
    let ensureUnzipped = proxyquire('../lib/ensureUnzipped', {
      'fs-extra-promise': {
        isDirectoryAsync: () => Promise.resolve(false)
      },
      'tmp-promise': {
        dir: () => Promise.resolve({path: 'fake-temp-dir'})
      },
      'adm-zip': function (pathToArchive) {
        pathToArchive.should.equal('fake-path')
        this.extractAllTo = path => {
          path.should.equal('fake-temp-dir')
        }
      }
    })

    ensureUnzipped('fake-path').then(result => {
      result.should.equal('fake-temp-dir')
      done()
    })
  })
})
