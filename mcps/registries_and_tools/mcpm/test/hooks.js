/* eslint-env mocha */

// See "Root-level hooks": http://mochajs.org/#hooks

let chai = require('chai')
chai.should()
chai.use(require('sinon-chai'))

// Disabling logging in tests.
require('winston').level = Infinity
