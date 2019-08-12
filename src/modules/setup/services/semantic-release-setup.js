const execa = require('execa');
const debug = require('debug');
const error = debug('semantic-release-setup:error');
const log = debug('semantic-release-setup:log');
const fs = require('fs');
const releaseConfig = require('../docs/.releaserc.json');
const INIT_CWD = process.env.INIT_CWD;
const CONFIG_FILE_PATH = `${INIT_CWD}/.releaserc.json`;

const checkFileExists = (filePath = CONFIG_FILE_PATH) => {
  if (fs.existsSync(filePath)) {
    return `File ${filePath} found. Keeping current file found.`;
  }
};

const installPackageDependencies = () => {
  const commandLine = `npm i --prefix ${INIT_CWD} semantic-release --save-dev`;

	try {
		log(`Executing command "${commandLine}"`);
		execa('npm', ['--prefix', INIT_CWD, 'i', 'semantic-release', '--save-dev']).all.pipe(process.stdout);
	} catch (err) {
		error(`Error executing command "${commandLine}"`, err);
	}
};

const createConfigurationFile = (filePath = CONFIG_FILE_PATH) => {
  try {
    log(`Creating configuration ${filePath}.`);
    fs.writeFileSync(filePath, JSON.stringify(releaseConfig, null, 2));
    log(`File ${filePath} created successfully!`);
  } catch (err) {
    error(`Error creating file ${filePath}.`, err);
  }
};

module.exports = {
  installPackageDependencies: installPackageDependencies,
  createConfigurationFile: createConfigurationFile,
  checkFileExists: checkFileExists
};
