/* eslint-env mocha */

let proxyquire = require('proxyquire')

describe('handleInstallFiles', function () {
  it('resolves when no fileHash', function (done) {
    let handleInstallFiles = proxyquire('../lib/handleInstallFiles', {
      './install/flattenFileHash': () => {
        done(new Error('Should not have called flattenFileHash!'))
      },
      './install/copyFiles': () => {
        done(new Error('Should not have called copyFiles!'))
      }
    })

    handleInstallFiles(null, 'fake-folder', 'fake-zip').then(done)
  })

  it('calls flattenFileHash and then copyFiles', function (done) {
    let handleInstallFiles = proxyquire('../lib/handleInstallFiles', {
      './install/flattenFileHash': (fileHash, folderPath, zipPath) => {
        fileHash.should.deep.equal({foo: 'bar'})
        folderPath.should.equal('fake-folder')
        zipPath.should.equal('fake-zip')
        return Promise.resolve({foo: 'flattened'})
      },
      './install/copyFiles': (fileHash, folderPath, zipPath) => {
        fileHash.should.deep.equal({foo: 'flattened'})
        folderPath.should.equal('fake-folder')
        zipPath.should.equal('fake-zip')
        return Promise.resolve()
      }
    })

    handleInstallFiles({foo: 'bar'}, 'fake-folder', 'fake-zip').then(done)
  })
})
