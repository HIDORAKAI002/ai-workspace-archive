/* eslint-env mocha */

let proxyquire = require('proxyquire')

describe('util.addInstalledPackage', function () {
  it("adds specified module to 'mcpmInstalledPackages'", function (done) {
    let addInstalledPackage = proxyquire('../../lib/util/addInstalledPackage', {
      './getCurrentProfile': () => Promise.resolve({
        originalInfo: {
          mcpmInstalledPackages: {
            'whatever': '1.2.3'
          }
        }
      }),
      './setCurrentProfile': (newProfile) => {
        newProfile.mcpmInstalledPackages.should.deep.equal({
          'whatever': '1.2.3',
          'fake-package': '0.1.0'
        })
        return Promise.resolve(true)
      }
    })

    addInstalledPackage('fake-package', '0.1.0').then(result => {
      true.should.equal(result)
      done()
    })
  })

  it("adds 'mcpmInstalledPackages' field if it's not there yet", function (done) {
    let addInstalledPackage = proxyquire('../../lib/util/addInstalledPackage', {
      './getCurrentProfile': () => Promise.resolve({
        originalInfo: {}
      }),
      './setCurrentProfile': (newProfile) => {
        '0.1.0'.should.equal(newProfile.mcpmInstalledPackages['fake-package'])
        return Promise.resolve(true)
      }
    })

    addInstalledPackage('fake-package', '0.1.0').then(result => {
      true.should.equal(result)
      done()
    })
  })
})
