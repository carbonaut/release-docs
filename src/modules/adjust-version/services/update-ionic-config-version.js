const debug = require('debug');
const error = debug('update-package-version:error');
const log = debug('update-package-version:log');
const fs = require('fs');
const Listr = require('listr');
var convert = require('xml-js');

debug.enable('*');

const checkFileExists = (fileTitle = 'config.xml') => {
	if (!fs.existsSync(fileTitle)) {
		return `File ${fileTitle} not found.`;
	}
	else {
		error(`File ${fileTitle} found.`);
	}
};

const updateVersionAttribute = (version, configJsonData) => {
	try {
		configJsonData.elements[0].attributes.version = version;
	} catch (e) {
		error('[updateVersionAttribute] Error updating version attribute from widget tag: %j', e);
		throw 'Error updating version attribute from widget tag.';
	}
};

const updateFileContent = (fileTitle, version, configJsonData) => {
	log(`Saving file ${fileTitle} with new widget version ${version}.`);

	const xmlContent = convert.json2xml(configJsonData, {spaces: 4});
	fs.writeFileSync(fileTitle, xmlContent);

	log(`File ${fileTitle} updated successfully with widget tag version ${version}!`);
};

const parseFileContent = (fileTitle, ctx) => {
	log(`Start parsing of ${fileTitle} file to JSON.`);

	var fileData = fs.readFileSync(fileTitle, 'utf8');
	ctx.configJsonData = convert.xml2js(fileData);

	log(`File ${fileTitle} read and parsed to JSON successfully!`);

	return ctx.configJsonData;
};

const updateWidgetTagVersion = (version, fileTitle = 'config.xml') => {
	return new Listr([
		{
			title: `Reading and parsing file ${fileTitle}...`,
			task: (ctx) => parseFileContent(fileTitle, ctx)
		},
		{
			title: `Updating version...`,
			task: (ctx) => updateVersionAttribute(version, ctx.configJsonData)
		},
		{
			title: `Saving file ${fileTitle}...`,
			task: (ctx) => updateFileContent(fileTitle, version, ctx.configJsonData)
		}
	]);
};

module.exports = {
	updateWidgetTagVersion: updateWidgetTagVersion,
	checkFileExists: checkFileExists
};
