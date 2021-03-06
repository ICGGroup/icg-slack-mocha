Mocha = require('mocha')
fs = require('fs')
path = require('path')
slackReporter = require('mocha-slack-reporter')
program = require('commander')
mocha = new Mocha
pkg = require('../package.json')

program.version(pkg.version)
program.option('-e, --team <value>','team.slack.com')
program.option('-o, --token <value>','https://hooks.slack.com/services/something/something/token')
program.option('-c, --channel <value>','general')
program.option('-f, --testFile <value>','test.js')
program.option('-m, --minimal',"Minimal Output (failures and complete message)", false )
program.option('-a, --failureOnly', "Outputs only failures", false)
program.parse(process.argv)

if not program.team
  console.log('No --team (-e) specified')

if not program.token
  console.log('No --token (-o) specified')

if not program.channel
  console.log('No --channel (-c) specified')

if not program.testFile
  console.log('No --testFile (-f) specified')

if program.team and program.token and program.channel and program.testFile
  reporterOptions = {
    team:program.team,
    token:program.token,
    channel:'#' + program.channel
    minimal:program.minimal
    failureOnly:program.failureOnly
  }
  testFile=program.testFile

  mocha.addFile(testFile)

  mocha.reporter(slackReporter, reporterOptions)

  mocha.run (failures) ->
    process.on "exit", ->
      process.exit failures
      return
    return
