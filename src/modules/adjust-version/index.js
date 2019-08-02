#!/usr/bin/env node

const Listr = require('listr');
const argv = require('minimist')(process.argv.slice(2));
const updatePackageJson = require('./services/update-package-version');
const updateIonicConfigVersion = require('./services/update-ionic-config-version');

const init = async () => {
	let version = argv.version;
	let isIonicProject = argv.ionic ? JSON.parse(argv.ionic) : false;

	const tasks = [
		{
			title: `Validating version parameter`,
			task: () => updatePackageJson.checkVersion(version)
		},
		{
			title: `Updating package.json version to ${version}`,
			task: () => updatePackageJson.updatePackageVersion(version)
		},
		{
			title: `Updating config.xml version to ${version}`,
			skip: () => {
				if (!isIonicProject) {
					return 'Flag "--ionic" not found. File config.xml is only updated for Ionic projects.';
				}
			},
			task: () => updateIonicConfigVersion.updateWidgetTagVersion(version)
		}];

	const listr = new Listr(tasks, {collapse: false});
	await listr.run();
};

init();
