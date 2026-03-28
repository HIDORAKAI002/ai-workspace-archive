/* eslint-env mocha */

let proxyquire = require('proxyquire')
let path = require('path')

let profileName = '1.8 + Forge + LiteLoader'
let fakeLauncherProfiles = require('../fixtures/launcher_profiles.json')
let fakeNewProfile = {whatever: 5}

describe('util.setCurrentProfile', function () {
  it('rejects when readFile fails', function (done) {
    let setCurrentProfile = proxyquire('../../lib/util/setCurrentProfile', {
      './getMinecraftPath': () => 'fake-mc-path',
      'fs': {
        readFile: (filename, encoding, callback) => {
          filename.should.equal(`fake-mc-path${path.sep}launcher_profiles.json`)
          callback('fake-error')
        }
      }
    })

    setCurrentProfile(fakeNewProfile).then(() => {
      done(new Error('Should have rejected!'))
    }, error => {
      console.log(error)
      'fake-error'.should.equal(error)
      done()
    })
  })

  it('rejects when writeFile fails', function (done) {
    let setCurrentProfile = proxyquire('../../lib/util/setCurrentProfile', {
      './getMinecraftPath': () => 'fake-mc-path',
      'fs': {
        readFile: (filename, encoding, callback) => {
          filename.should.equal(`fake-mc-path${path.sep}launcher_profiles.json`)
          'utf8'.should.equal(encoding)
          callback(null, JSON.stringify(fakeLauncherProfiles))
        },
        writeFile: (filename, json, callback) => {
          filename.should.equal(`fake-mc-path${path.sep}launcher_profiles.json`)
          JSON.parse(json).profiles[profileName].should.deep.equal(fakeNewProfile)
          callback('fake-error')
        }
      }
    })

    setCurrentProfile(fakeNewProfile).then(() => {
      done(new Error('Should have rejected!'))
    }, error => {
      'fake-error'.should.equal(error)
      done()
    })
  })

  it('rewrites current profile with specified object', function (done) {
    let setCurrentProfile = proxyquire('../../lib/util/setCurrentProfile', {
      './getMinecraftPath': () => 'fake-mc-path',
      'fs': {
        readFile: (filename, encoding, callback) => {
          filename.should.equal(`fake-mc-path${path.sep}launcher_profiles.json`)
          'utf8'.should.equal(encoding)
          callback(null, JSON.stringify(fakeLauncherProfiles))
        },
        writeFile: (filename, json, callback) => {
          filename.should.equal(`fake-mc-path${path.sep}launcher_profiles.json`)
          JSON.parse(json).profiles[profileName].should.deep.equal(fakeNewProfile)
          callback()
        }
      }
    })

    setCurrentProfile(fakeNewProfile).then(done)
  })
})
