const execa = require('execa');
const debug = require('debug');
const error = debug('update-package-version:error');
const log = debug('update-package-version:log');

const updatePackageVersion = async (version) => {
	try {
		log(`Executing command "npm version --no-git-tag-version ${version}"`);
		execa('npm', ['version', '--no-git-tag-version', version]);
	} catch (err) {
		error('Error executing command "npm version --no-git-tag-version ${version}"', err);
	}
};

module.exports = {
	updatePackageVersion: updatePackageVersion
};
