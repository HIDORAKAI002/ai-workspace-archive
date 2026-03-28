/* eslint-env mocha */

let proxyquire = require('proxyquire')
let path = require('path')

describe('util.getPathToMcpmDir', function () {
  it("returns '<user-settings-dir>/.mcpm'", function () {
    let getPathToMcpmDir = proxyquire('../../lib/util/getPathToMcpmDir', {
      'user-settings-dir' () { return 'fake-dir' }
    })

    let result = getPathToMcpmDir()

    result.should.equal(path.join('fake-dir', '.mcpm'))
  })
})
