#!/usr/bin/env node

let commander = require('commander')
let winston = require('winston')
let async = require('async')
let install = require('../lib/install')
let getCurrentProfile = require('../lib/util/getCurrentProfile')
let getClientVersion = require('../lib/util/getClientVersion')

winston.setLevels(winston.config.cli.levels)
winston.cli()

let verbosityLevels = [ 'info', 'debug', 'verbose', 'silly' ]
let increaseVerbosity = function (v, total) {
  winston.level = verbosityLevels[total]
  return total + (total < verbosityLevels.length - 1)
}

function setPathToMinecraft (path) {
  const getMinecraftPath = require('../lib/util/getMinecraftPath')
  getMinecraftPath.set(path)
}

commander
  .version(require('../package.json').version)
  .option('-v, --verbose', 'increase verbosity', increaseVerbosity, 0)
  .option('-m, --minecraft-path <path>', 'custom path to .minecraft', setPathToMinecraft)

commander
  .command('install <packages...>')
  .alias('i')
  .description('install one or more packages')
  .action(packages => {
    getCurrentProfile().then(startProfile => {
      winston.info(`Current Minecraft version: ${startProfile.version}`)
      winston.info(`Current profile name: ${startProfile.originalInfo.name}`)
      console.log()

      async.forEachSeries(packages, (pkg, done) => {
        winston.info(`Installing ${pkg}`)
        install(pkg)
        .then(() => done())
        .catch(error => {
          winston.error(`${pkg}: ${error.name}: ${error.message}`)
          done(error)
        })
      }, (error) => {
        if (error) return winston.error(`Something went wrong! ${error.message}`)

        winston.info('Done!')
        getCurrentProfile().then(endProfile => {
          if ((endProfile.version !== startProfile.version) ||
            (endProfile.originalInfo.name !== startProfile.originalInfo.name)) {
            console.log()
            winston.info(`Current Minecraft version: ${endProfile.version}`)
            winston.info(`Current profile name: ${endProfile.originalInfo.name}`)
          }
        })
      })
    })
  })

commander
  .command('minecraft-version')
  .alias('mc')
  .description('display currently selected Minecraft version')
  .action(function () {
    getClientVersion().then(version => console.log(version))
  })

commander.on('--help', () => console.log([
  '  Examples:',
  '',
  '    Install a package from a remote archive',
  '      $ mcpm install "https://example.com/path/to/mod"',
  '',
  '    Install a package from directory ./foo',
  '      $ mcpm install ./foo',
  '',
  '    Install a package from the archive ./foo.zip',
  '      $ mcpm install ./foo.zip',
  '',
  '    Show Minecraft version of the currently selected profile',
  '      $ mcpm mc',
  '',
  '  Packages:',
  '',
  '    A package is a ZIP archive with "mcpm-package.json" file inside.',
  '      See https://github.com/mcpm/mcpm/wiki/mcpm-Package-Manifest',
  '      for more details.',
  '',
  '  Other supported formats: ',
  '',
  '   - Forge mods ("mcmod.info" inside)',
  '   - LiteLoader mods ("litemod.json" inside)'
].join('\n')))

commander
  .parse(process.argv)
