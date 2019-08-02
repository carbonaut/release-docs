#!/usr/bin/env node

const gitCommitPush = require('./services/github-commit-push');
const parseChangelogHtml = require('./services/parse-changelog-html');
const argv = require('minimist')(process.argv.slice(2));
const Listr = require('listr');

// debug.enable('*');

const init = async () => {
	try {
		const mainTasks = new Listr([
			{
			  title: 'Parsing changelog to HTML format',
				task: () => {
			    return parseChangelogHtml.getChangelogHtml();
        }
			},
			{
			  title: 'Sending HTML changelog to external project',
				task: async ctx => gitCommitPush.init(argv, ctx.htmlContent)
			}], {collapse: false});

		await mainTasks.run();
	} catch (err) {
		throw err;
	}
};

init();
