#!/usr/bin/env node

const validateRequiredArgs = require('../common/validateRequiredArgs');
const uploadService = require('./services/upload');
const parseChangelogJson = require('../parse-changelog/services/parse-changelog-json');
const argv = require('minimist')(process.argv.slice(2));
const Listr = require('listr');
''
const init = async () => {
  const mainTasks = new Listr([
    {
      title: 'Validating required parameters...',
      task: () => validateRequiredArgs(argv, ['key', 'awsAccessKeyId', 'awsSecretAccessKey', 'awsBucket']),
    },
    {
      title: 'Parsing changelog to JSON format...',
      task: () => parseChangelogJson.getChangelog(argv['path'] || './CHANGELOG.md'),
    },
    {
      title: 'Uploading changelog to S3 bucket...',
      task: async (ctx, task) => {
        uploadService.setupS3Configuration({
          accessKeyId: argv['awsAccessKeyId'],
          secretAccessKey: argv['awsSecretAccessKey']
        });
        const res = await uploadService.uploadFile(ctx.changelogParsedContent, argv['key'], argv['awsBucket']);
        task.title = `File uploaded successfully to ${res.Location}`;
      }
    }
  ], { collapse: false, clearOutput: false });

  await mainTasks.run();
};

init();
