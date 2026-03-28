/* eslint-env mocha */

let proxyquire = require('proxyquire')

describe('util.getClientVersion', function () {
  it("returns 'getCurrentProfile().version'", function (done) {
    let getClientVersion = proxyquire('../../lib/util/getClientVersion', {
      './getCurrentProfile': () => Promise.resolve({version: 'fake-version'})
    })

    getClientVersion().then(result => {
      'fake-version'.should.equal(result)
      done()
    })
  })
})
