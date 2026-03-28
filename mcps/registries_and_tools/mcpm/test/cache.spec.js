/* eslint-env mocha */

let expect = require('chai').expect
let sinon = require('sinon')
let proxyquire = require('proxyquire')
let path = require('path')

let checkThatItRejects = (promise, done, additionalChecks = () => {}) => {
  promise.then(() => {
    done(new Error('Should have rejected!'))
  }, err => {
    expect(err).to.be.an.instanceof(Error)
    additionalChecks(err)
    done()
  })
}

let checkThatItResolves = (promise, done, additionalChecks = () => {}) => {
  promise.then(result => {
    additionalChecks(result)
    done()
  }, () => {
    done(new Error('Should have rejected!'))
  })
}

describe('cache', function () {
  describe('get', function () {
    it("rejects when package name isn't specified", function (done) {
      let fakeExists = sinon.stub().throws()

      let cache = proxyquire('../lib/cache', {
        './util/getPathToMcpmDir': () => 'fake-.mcpm',
        'fs-extra': {
          exists: fakeExists
        }
      })

      checkThatItRejects(cache.get(undefined, undefined), done)
    })

    let names = [ '', '-', '1sdf', 'π', 'mcpm/mcpm' ]
    names.forEach(name => it(`rejects when package name isn't valid: ${name}`, function (done) {
      let fakeExists = sinon.stub().throws()

      let cache = proxyquire('../lib/cache', {
        './util/getPathToMcpmDir': () => 'fake-.mcpm',
        'fs-extra': {
          exists: fakeExists
        }
      })

      checkThatItRejects(cache.get(name, '1.0.0'), done)
    })
    )

    it("rejects when specified version isn't semantic", function (done) {
      let fakeExists = sinon.stub().throws()

      let cache = proxyquire('../lib/cache', {
        './util/getPathToMcpmDir': () => 'fake-.mcpm',
        'fs-extra': {
          exists: fakeExists
        },
        'semver': {
          valid () { return false }
        }
      })

      checkThatItRejects(cache.get('whatever', 'this is not a valid version'), done)
    })

    it("when the version is semantic, rejects if it's not cached", function (done) {
      let pathToZip = path.join('fake-.mcpm', 'cache', 'whatever', '1.0.0', 'mcpm-package.zip')
      let fakeExists = sinon.mock()
        .once()
        .withArgs(pathToZip, sinon.match.func)
        .callsArgWithAsync(1, false)

      let cache = proxyquire('../lib/cache', {
        './util/getPathToMcpmDir': () => 'fake-.mcpm',
        'fs-extra': {
          exists: fakeExists
        }
      })

      checkThatItRejects(cache.get('whatever', '1.0.0'), done, () => {
        fakeExists.verify()
      })
    })

    it('when the version is semantic, returns path to zip if it exists', function (done) {
      let pathToZip = path.join('fake-.mcpm', 'cache', 'whatever', '1.0.0', 'mcpm-package.zip')
      let fakeExists = sinon.mock()
        .once()
        .withArgs(pathToZip, sinon.match.func)
        .callsArgWithAsync(1, true)

      let cache = proxyquire('../lib/cache', {
        './util/getPathToMcpmDir': () => 'fake-.mcpm',
        'fs-extra': {
          exists: fakeExists
        }
      })

      checkThatItResolves(cache.get('whatever', '1.0.0'), done, result => {
        result.should.equal(pathToZip)
        fakeExists.verify()
      })
    })
  })

  describe('add', function () {
    it("doesn't do anything when trying to cache the cached zip itself", function (done) {
      let fakeManifest = {
        name: 'fake-package',
        version: '1.2.3'
      }
      let dest = path.join('fake-.mcpm', 'cache', fakeManifest.name, fakeManifest.version)
      let pathToZip = path.join(dest, 'mcpm-package.zip')

      let fakeCopy = sinon.stub()
      let fakeOutputJson = sinon.stub()

      let cache = proxyquire('../lib/cache', {
        './util/getPathToMcpmDir': () => 'fake-.mcpm',
        'fs-extra': {
          copy: fakeCopy,
          outputJson: fakeOutputJson
        }
      })

      checkThatItResolves(cache.add(pathToZip, fakeManifest), done, () => {
        fakeCopy.should.not.have.been.called
        fakeOutputJson.should.not.have.been.called
      })
    })

    it('adds specified zip to cache', function (done) {
      let dest = path.join('fake-.mcpm', 'cache', 'fake-package', '1.2.3')
      let fakeManifest = {
        name: 'fake-package',
        version: '1.2.3'
      }

      let fakeCopy = sinon.mock()
        .once()
        .withArgs('path/to/src.zip', path.join(dest, 'mcpm-package.zip'), sinon.match.func)
        .callsArgAsync(2)

      let fakeOutputJson = sinon.stub()
        .callsArgAsync(2)

      let cache = proxyquire('../lib/cache', {
        './util/getPathToMcpmDir': () => 'fake-.mcpm',
        'fs-extra': {
          copy: fakeCopy,
          outputJson: fakeOutputJson
        }
      })

      checkThatItResolves(cache.add('path/to/src.zip', fakeManifest), done, () => {
        fakeCopy.verify()
      })
    })

    it('rejects when fs.copy fails', function (done) {
      let fakeManifest = {
        name: 'fake-package',
        version: '1.2.3'
      }

      let fakeCopy = sinon.mock()
        .once()
        .callsArgWithAsync(2, new Error('Oh, snap!'))

      let fakeOutputJson = sinon.stub()
        .throws()

      let cache = proxyquire('../lib/cache', {
        './util/getPathToMcpmDir': () => 'fake-.mcpm',
        'fs-extra': {
          copy: fakeCopy,
          outputJson: fakeOutputJson
        }
      })

      checkThatItRejects(cache.add('path/to/src.zip', fakeManifest), done, () => {
        fakeCopy.verify()
      })
    })

    it('adds the package manifest to cache', function (done) {
      let dest = path.join('fake-.mcpm', 'cache', 'fake-package', '1.2.3')
      let fakeManifest = {
        name: 'fake-package',
        version: '1.2.3'
      }

      let fakeCopy = sinon.stub()
        .callsArgAsync(2)

      let fakeOutputJson = sinon.mock()
        .once()
        .withArgs(path.join(dest, 'mcpm-package.json'), fakeManifest)
        .callsArgAsync(2)

      let cache = proxyquire('../lib/cache', {
        './util/getPathToMcpmDir': () => 'fake-.mcpm',
        'fs-extra': {
          copy: fakeCopy,
          outputJson: fakeOutputJson
        }
      })

      checkThatItResolves(cache.add('path/to/src.zip', fakeManifest), done, () => {
        fakeOutputJson.verify()
      })
    })

    it('rejects when fs.outputJson fails', function (done) {
      let dest = path.join('fake-.mcpm', 'cache', 'fake-package', '1.2.3')
      let fakeManifest = {
        name: 'fake-package',
        version: '1.2.3'
      }

      let fakeCopy = sinon.stub()
        .callsArgAsync(2)

      let fakeOutputJson = sinon.mock()
        .once()
        .withArgs(path.join(dest, 'mcpm-package.json'), fakeManifest)
        .callsArgWithAsync(2, new Error('Oh, snap!'))

      let cache = proxyquire('../lib/cache', {
        './util/getPathToMcpmDir': () => 'fake-.mcpm',
        'fs-extra': {
          copy: fakeCopy,
          outputJson: fakeOutputJson
        }
      })

      checkThatItRejects(cache.add('path/to/src.zip', fakeManifest), done, () => {
        fakeOutputJson.verify()
      })
    })
  })
})

