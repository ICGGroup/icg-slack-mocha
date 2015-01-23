#!/usr/bin/env node
(function() {
  var Mocha, fs, mocha, path, program, reporterOptions, slackReporter, testFile, testFilePath;

  Mocha = require('mocha');

  fs = require('fs');

  path = require('path');

  slackReporter = require('mocha-slack-reporter');

  program = require('commander');

  mocha = new Mocha;

  program.version('0.0.1');

  program.option('-e, --team <value>', 'team.slack.com');

  program.option('-o, --token <value>', 'https://hooks.slack.com/services/something/something/token');

  program.option('-c, --channel <value>', '#general');

  program.option('-f, --testFile <value>', 'test.js');

  program.parse(process.argv);

  if (!program.team) {
    console.log('No --team (-e) specified');
  }

  if (!program.token) {
    console.log('No --token (-o) specified');
  }

  if (!program.channel) {
    console.log('No --channel (-c) specified');
  }

  if (!program.testFile) {
    console.log('No --testFile (-f) specified');
  }

  if (program.team && program.token && program.channel && program.testFile) {
    reporterOptions = {
      team: program.team,
      token: program.token,
      channel: '#' + program.channel
    };
    testFile = program.testFile;
    testFilePath = process.argv[2];
    mocha.addFile(testFile);
    mocha.reporter(slackReporter, reporterOptions);
    mocha.run(function(failures) {
      process.on("exit", function() {
        process.exit(failures);
      });
    });
  }

}).call(this);
