/* eslint-env mocha */

let proxyquire = require('proxyquire')
let path = require('path')

describe('install.readManifest', function () {
  it('reads manifest from folder', function (done) {
    let readManifest = proxyquire('../../lib/install/readManifest', {
      'fs-extra-promise': {
        readFileAsync: (filename, encoding) => {
          filename.should.equal(`fake-folder${path.sep}mcpm-package.json`)
          encoding.should.equal('utf8')
          return Promise.resolve('{"foo": "bar"}')
        }
      }
    })

    readManifest('fake-folder')
    .then(result => {
      result.should.deep.equal({foo: 'bar'})
      done()
    })
  })

  it('returns null when manifest not found', function (done) {
    let readManifest = proxyquire('../../lib/install/readManifest', {
      'fs-extra-promise': {
        readFileAsync: () => Promise.reject('fake-error')
      }
    })

    readManifest('fake-folder')
    .catch(error => {
      error.should.equal('fake-error')
      done()
    })
  })
})
