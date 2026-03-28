/* eslint-env mocha */

let proxyquire = require('proxyquire')

describe('handleInstallCommand', function () {
  it('invokes install executable', function (done) {
    let handleInstallCommand = proxyquire('../lib/handleInstallCommand', {
      './util/getMinecraftPath': () => 'fake-mcpath',
      'child_process': {
        exec: (command, opts, callback) => {
          command.should.equal('fake-command')
          opts.cwd.should.equal('fake-folder')
          opts.env.should.have.property('MCPM', '1')
          opts.env.should.have.property('PATH_TO_MINECRAFT', 'fake-mcpath')
          callback()
        }
      }
    })
    handleInstallCommand('fake-command', 'fake-folder')
    .then(done)
  })

  it("reject when 'child_process.exec' throws", function (done) {
    let handleInstallCommand = proxyquire('../lib/handleInstallCommand', {
      './util/getMinecraftPath': () => 'fake-mcpath',
      'child_process': {
        exec: (command, opts, callback) => {
          callback(new Error('Something went wrong!'))
        }
      }
    })
    handleInstallCommand('fake-command', 'fake-folder')
    .catch(error => {
      error.should.be.an.instanceof(Error)
      done()
    })
  })
})
