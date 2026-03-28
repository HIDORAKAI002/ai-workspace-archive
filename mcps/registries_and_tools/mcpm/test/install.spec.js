/* eslint-env mocha */

let proxyquire = require('proxyquire')
let expect = require('chai').expect

let FAKE_MANIFEST = {
  name: 'fake-name',
  version: 'fake-version',
  installFiles: 'fake-file-list',
  installCommand: 'fake-command'
}

describe('install', function () {
  it('installs from a zip', function (done) {
    let install = proxyquire('../lib/install', {
      './install/parsePackageString': packageString => {
        packageString.should.equal('fake-package')
        return {
          name: 'fake-zip',
          type: 'zip'
        }
      },
      './ensureUnzipped': zipPath => {
        zipPath.should.equal('fake-zip')
        return Promise.resolve('fake-folder')
      },
      './install/readManifest': folderPath => {
        folderPath.should.equal('fake-folder')
        return Promise.resolve(FAKE_MANIFEST)
      },
      './validateManifest': manifest => {
        manifest.should.deep.equal(FAKE_MANIFEST)
        return Promise.resolve()
      },
      './handleInstallFiles': (fileHash, folderPath, zipPath) => {
        fileHash.should.equal(FAKE_MANIFEST.installFiles)
        folderPath.should.equal('fake-folder')
        zipPath.should.equal('fake-zip')
        return Promise.resolve()
      },
      './handleInstallCommand': (command, folderPath) => {
        command.should.equal(FAKE_MANIFEST.installCommand)
        folderPath.should.equal('fake-folder')
        return Promise.resolve()
      },
      './util/addInstalledPackage': (name, version) => {
        name.should.equal(FAKE_MANIFEST.name)
        version.should.equal(FAKE_MANIFEST.version)
        return Promise.resolve()
      }
    })

    install('fake-package').then(done)
  })

  it('installs from a folder', function (done) {
    let install = proxyquire('../lib/install', {
      './install/parsePackageString': () => ({
        name: 'fake-folder',
        type: 'folder'
      }),
      './ensureUnzipped': zipPath => {
        zipPath.should.equal('fake-folder')
        return Promise.resolve('fake-folder')
      },
      './install/readManifest': () => Promise.resolve(FAKE_MANIFEST),
      './validateManifest': () => Promise.resolve(),
      './handleInstallFiles': (fileHash, folderPath, zipPath) => {
        fileHash.should.equal(FAKE_MANIFEST.installFiles)
        folderPath.should.equal('fake-folder')
        expect(zipPath).to.equal(null)
        return Promise.resolve()
      },
      './handleInstallCommand': () => Promise.resolve(),
      './util/addInstalledPackage': () => Promise.resolve()
    })

    install('fake-package').then(done)
  })
})
