# slack-mocha
A Mocha Utility/Reporter for Slack
Reports the result of mochajs test to Slack.
##Instalation

```bash
npm install -g slack-mocha
```
##Usage
###Runnning
```bash
slackMocha -e <team> -o <token> -c <channel> -f <test file>
```

####Options
*-e, --team* _youteam_.slack.com

*-c, --channel* The channel you want alerts to be posted to, no #.

*-o, --token* Your token (https://hooks.slack.com/services/something/something/token)

*-f, --testFile* The icon you want to display for successes.
