#!/usr/bin/env node

const gitCommitPush = require('./services/github-commit-push');
const parseChangelogHtml = require('./services/parse-changelog-html');
const envVars = process.env;
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
				task: async ctx => gitCommitPush.init(envVars, ctx.htmlContent)
			}], {collapse: false});

		await mainTasks.run();
	} catch (err) {
		throw err;
	}
};

init();
