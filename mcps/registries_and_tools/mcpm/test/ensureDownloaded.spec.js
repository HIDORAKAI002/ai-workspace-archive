/* eslint-env mocha */

let proxyquire = require('proxyquire')

describe('ensureDownloaded', function () {
  it('returns passed path when it is actually a local path', function (done) {
    let ensureDownloaded = proxyquire('../lib/ensureDownloaded', {
      'got': {
        stream: () => {
          done(new Error('Should not have called got.stream!'))
        }
      }
    })

    ensureDownloaded('fake-path').then(resultPath => {
      resultPath.should.equal('fake-path')
      done()
    })
  })

  it('downloads to a temp file and returns the path', function (done) {
    let ensureDownloaded = proxyquire('../lib/ensureDownloaded', {
      'tmp-promise': {
        file: () => Promise.resolve({path: 'fake-temp-file'})
      },
      'fs': {
        createWriteStream: filePath => {
          filePath.should.equal('fake-temp-file')
        }
      },
      'got': {
        stream: () => ({
          pipe: () => ({
            on: (event, listener) => setImmediate(listener)
          })
        })
      }
    })

    ensureDownloaded('http://example.com/').then(result => {
      result.should.equal('fake-temp-file')
      done()
    })
  })
})
