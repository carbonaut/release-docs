#!/usr/bin/env node

const Listr = require('listr');
const argv = require('minimist')(process.argv.slice(2));
const updatePackageJson = require('./services/update-package-version');
const updateIonicConfigVersion = require('./services/update-ionic-config-version');
const validateRequiredArgs = require('./../common/validateRequiredArgs');

const init = async () => {
	let version = argv.version;

	const tasks = [
		{
			title: `Validating version parameter`,
			task: () => validateRequiredArgs(argv, ['version'])
		},
		{
			title: `Updating package.json version to ${version}`,
			task: () => updatePackageJson.updatePackageVersion(version)
		},
		{
			title: `Updating config.xml version to ${version}`,
			skip: () => updateIonicConfigVersion.checkFileExists(),
			task: () => updateIonicConfigVersion.updateWidgetTagVersion(version)
		}];

	const listr = new Listr(tasks, {collapse: false, clearOutput: false});
	await listr.run();
};

init();
