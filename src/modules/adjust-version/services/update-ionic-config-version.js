const debug = require('debug');
const error = debug('update-package-version:error');
const log = debug('update-package-version:log');
const fs = require('fs');
const xml2json = require('xml2json');
const Listr = require('listr');

debug.enable('*');

const checkIonicFlag = (ionicFlag) => {
	let isIonicProject = ionicFlag ? JSON.parse(ionicFlag) : false;

	if (!isIonicProject) {
		return 'Flag "--ionic" not found. File config.xml is only updated for Ionic projects.';
	}
};

const updateVersionAttribute = (version, configJsonData) => {
	configJsonData.widget.version = version;
};

const updateFileContent = (fileTitle, version, configJsonData) => {
	log(`Saving file ${fileTitle} with new widget version ${version}.`);

	const xmlContent = xml2json.toXml(JSON.stringify(configJsonData));
	fs.writeFileSync(fileTitle, xmlContent);

	log(`File ${fileTitle} updated successfully with widget tag version ${version}!`);
};

const parseFileContent = (fileTitle, ctx) => {
	log(`Start parsing of ${fileTitle} file to JSON.`);

	const fileData = fs.readFileSync(fileTitle, 'utf-8');
	ctx.configJsonData = JSON.parse(xml2json.toJson(fileData, {reversible: true}));

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
	checkIonicFlag: checkIonicFlag
};
