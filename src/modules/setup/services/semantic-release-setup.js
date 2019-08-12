const execa = require('execa');
const debug = require('debug');
const error = debug('semantic-release-setup:error');
const log = debug('semantic-release-setup:log');
const fs = require('fs');
const releaseConfig = require('../docs/.releaserc.json');
const CONFIG_FILE_TITLE = '.releaserc.json';

debug.enable('*');

const checkFileExists = (fileTitle = CONFIG_FILE_TITLE) => {
  if (fs.existsSync(fileTitle)) {
    return `File ${fileTitle} found. Keeping current file found.`;
  }
};

const installPackageDependencies = async () => {
	try {
		log(`Executing command "npm i semantic-release --save-dev"`);
		execa('npm', ['i', 'semantic-release', '--save-dev']).all.pipe(process.stdout);
	} catch (err) {
		error('Error executing command "npm i semantic-release --save-dev"', err);
	}
};

const createConfigurationFile = async (fileTitle = CONFIG_FILE_TITLE) => {
  try {
    log(`Creating configuration ${fileTitle}.`);
    fs.writeFileSync(fileTitle, JSON.stringify(releaseConfig, null, 2));
    log(`File ${fileTitle} created successfully!`);
  } catch (err) {
    error(`Error creating file ${fileTitle}.`, err);
  }
};

module.exports = {
  installPackageDependencies: installPackageDependencies,
  createConfigurationFile: createConfigurationFile,
  checkFileExists: checkFileExists
};
