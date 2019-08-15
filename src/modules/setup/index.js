#!/usr/bin/env node

const Listr = require('listr');
const semanticReleaseSetup = require('./services/semantic-release-setup');

const init = async () => {
	const tasks = [
		// {
		// 	title: `Installing "semantic-release" package...`,
		// 	task: () => semanticReleaseSetup.installPackageDependencies()
		// },
		{
			title: `Creating .releaserc.json config...`,
      skip: () => semanticReleaseSetup.checkFileExists(),
			task: () => semanticReleaseSetup.createConfigurationFile()
		}];

	const listr = new Listr(tasks, {collapse: false, clearOutput: false});
	await listr.run();
};

init();
