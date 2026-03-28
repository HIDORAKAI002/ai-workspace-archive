/* eslint-env mocha */

let parsePackageString = require('../../lib/install/parsePackageString')

describe('install.parsePackageString', function () {
  let names = [null, undefined, 100, {}, ['folder:some/path']]
  names.forEach(obj => it(`classifies non-strings as 'invalid': ${obj}`, function () {
    let parsed = parsePackageString(obj)
    parsed.should.deep.equal({
      type: 'unknown'
    })
  }))

  names = ['', '-', '1sdf', 'π', 'mcpm/mcpm']
  names.forEach(str => it(`classifies any '.zip'-suffixed string as 'zip': ${str}.zip`, function () {
    let parsed = parsePackageString(`${str}.zip`)
    parsed.should.deep.equal({
      type: 'zip',
      name: `${str}.zip`
    })
  }))

  names = ['', '-', '1sdf', 'π', 'mcpm/mcpm']
  names.forEach(str => it(`classifies any other non-prefixed string as 'folder': ${str}`, function () {
    let parsed = parsePackageString(str)
    parsed.should.deep.equal({
      type: 'folder',
      name: str
    })
  }))

  names = ['', '-', '1sdf', 'π', 'mcpm/mcpm']
  names.forEach(str => it(`classifies 'folder'-prefixed string as 'folder': ${str}`, function () {
    let parsed = parsePackageString(`folder:${str}`)
    parsed.should.deep.equal({
      type: 'folder',
      name: str
    })
  }))

  names = ['', '-', '1sdf', 'π', 'mcpm/mcpm']
  names.forEach(str => it(`classifies 'zip'-prefixed string as 'zip': ${str}`, function () {
    let parsed = parsePackageString(`zip:${str}`)
    parsed.should.deep.equal({
      type: 'zip',
      name: str
    })
  }))

  names = ['a@b', '@', '-@-', '../..@0.0.0', 'mcpm@1.0.0']
  names.forEach(str => it(`classifies strings with '@' as 'cache': ${str}`, function () {
    let parsed = parsePackageString(str)
    parsed.should.deep.equal({
      type: 'cache',
      name: str.split('@')[0],
      version: str.split('@')[1]
    })
  }))

  names = ['github', 'http', '', 'whatever', 'C']
  names.forEach(prefix => it(`treats any other prefix as a part of path: ${prefix}`, function () {
    let parsed = parsePackageString(`${prefix}:some/path`)
    parsed.should.deep.equal({
      type: 'folder',
      name: `${prefix}:some/path`
    })
  }))

  it("classifies strings with multiple ':' as 'invalid'", function () {
    let parsed = parsePackageString('folder:wtf:is:this')
    parsed.should.deep.equal({
      type: 'unknown'
    })
  })
})
