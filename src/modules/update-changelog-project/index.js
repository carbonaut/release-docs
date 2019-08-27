#!/usr/bin/env node

const gitCommitPush = require('./services/github-commit-push');
const parseChangelogHtml = require('./services/parse-changelog-html');
const parseChangelogJson = require('./services/parse-changelog-json');
const argv = require('minimist')(process.argv.slice(2));
const Listr = require('listr');

// debug.enable('*');

const init = async () => {
	try {
	  const changelogFormat = argv['changelog_format'] || 'json';

		const mainTasks = new Listr([
			{
        skip: () => changelogFormat !== 'html',
			  title: 'Parsing changelog to HTML format',
				task: () => {
			    return parseChangelogHtml.getChangelog();
        }
			},
      {
        skip: () => changelogFormat !== 'json',
        title: 'Parsing changelog to JSON format',
        task: () => {
          return parseChangelogJson.getChangelog();
        }
      },
			{
			  title: 'Sending HTML changelog to external project',
				task: async ctx => gitCommitPush.init(argv, ctx.changelogParsedContent)
			}
			], {collapse: false});

		await mainTasks.run();
	} catch (err) {
		throw err;
	}
};

init();
