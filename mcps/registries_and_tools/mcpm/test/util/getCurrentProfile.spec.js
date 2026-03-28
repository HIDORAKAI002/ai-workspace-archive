/* eslint-env mocha */

let proxyquire = require('proxyquire')
let path = require('path')

let fakeLauncherProfilesOriginal = require('../fixtures/launcher_profiles.json')
let fakeLauncherProfiles
let fakeError

let getCurrentProfile = proxyquire('../../lib/util/getCurrentProfile', {
  './getMinecraftPath': () => 'fake-mc-path',
  'fs': {
    readFile: (filePath, encoding, callback) => {
      encoding.should.equal('utf8')
      filePath.should.equal(`fake-mc-path${path.sep}launcher_profiles.json`)
      callback(fakeError, JSON.stringify(fakeLauncherProfiles))
    }
  }
})

describe('util.getCurrentProfile', function () {
  beforeEach(() => {
    fakeLauncherProfiles = JSON.parse(JSON.stringify(fakeLauncherProfilesOriginal))
    fakeError = null
  })

  it('returns current profile in originalInfo property', function (done) {
    getCurrentProfile().then(currentProfile => {
      fakeLauncherProfiles.profiles['1.8 + Forge + LiteLoader']
        .should.deep.equal(currentProfile.originalInfo)
      done()
    })
  })

  it('returns current Minecraft version in version property', function (done) {
    getCurrentProfile().then(currentProfile => {
      '1.8.0'.should.equal(currentProfile.version)
      done()
    })
  })

  it("normalizes version to 'x.x.0' when specified as 'x.x'", function (done) {
    fakeLauncherProfiles.profiles['1.8 + Forge + LiteLoader'].lastVersionId = '1.8'
    getCurrentProfile().then(currentProfile => {
      '1.8.0'.should.equal(currentProfile.version)
      done()
    })
  })

  it('returns installed packages in installedPackages property', function (done) {
    getCurrentProfile().then(currentProfile => {
      currentProfile.installedPackages.should.deep.equal({
        fake: '1.2.3',
        package: '2.3.4'
      })
      done()
    })
  })

  it('rejects when cannot read launcher_profiles.json', function (done) {
    fakeError = 'fake-error'
    getCurrentProfile().then(() => {
      done(new Error('Should have rejected!'))
    }, error => {
      fakeError.should.equal(error)
      done()
    })
  })
})
