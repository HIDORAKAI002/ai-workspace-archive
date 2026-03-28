/* eslint-env mocha */

let path = require('path')
let proxyquire = require('proxyquire')

describe('util.getMinecraftPath', function () {
  it('returns path to the Minecraft directory (win32)', function () {
    let getMinecraftPath = proxyquire('../../lib/util/getMinecraftPath', {
      'os': {platform: () => 'win32'},
      'home-dir': {directory: 'fakeHome'}
    })

    getMinecraftPath().should.equal(path.join('fakeHome', 'AppData', 'Roaming', '.minecraft'))
  })

  it('returns path to the Minecraft directory (linux)', function () {
    let getMinecraftPath = proxyquire('../../lib/util/getMinecraftPath', {
      'os': {platform: () => 'linux'},
      'home-dir': {directory: 'fakeHome'}
    })

    getMinecraftPath().should.equal(path.join('fakeHome', '.minecraft'))
  })

  it('returns path to the Minecraft directory (darwin)', function () {
    let getMinecraftPath = proxyquire('../../lib/util/getMinecraftPath', {
      'os': {platform: () => 'darwin'},
      'home-dir': {directory: 'fakeHome'}
    })

    getMinecraftPath().should.equal(path.join('fakeHome', 'Library', 'Application Support', 'minecraft'))
  })
})
