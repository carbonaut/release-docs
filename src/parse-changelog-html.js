/*
  https://github.com/showdownjs/showdown

  Parses a CHANGELOG.md file to HTML format using showdown library.
 */

const fs = require('fs');
const debug = require('debug');
const showdown = require('showdown');
const error = debug('parse-changelog-html:error');
const log = debug('parse-changelog-html:log');

const getChangelogHtml = (changelogFilePath = './CHANGELOG.md') => {
  log('Starting file conversion %s to HTML...', changelogFilePath);

  try {
    const converter = new showdown.Converter();
    const changelogOriginal = fs.readFileSync('./CHANGELOG.md', 'utf-8');
    const htmlContent = converter.makeHtml(changelogOriginal);

    log(`File %s converted to HTML successfully!`, changelogFilePath);

    return htmlContent;
  } catch (err) {
    error('%j', err);
    throw err;
  }
};

module.exports = {
  getChangelogHtml: getChangelogHtml
};
