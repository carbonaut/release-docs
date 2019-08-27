/*
  https://github.com/showdownjs/showdown

  Parses a CHANGELOG.md file to HTML format using showdown library.
 */

const Listr = require('listr');
const fs = require('fs');
const debug = require('debug');
const showdown = require('showdown');
const log = debug('parse-changelog-html:log');

const getChangelog = (changelogFilePath = './CHANGELOG.md') => {
  return new Listr([
    {
      title: `Starting file conversion ${changelogFilePath} to HTML...`,
      task: ctx => {
        log('Starting file conversion %s to HTML...', changelogFilePath);
        ctx.changelogOriginal = fs.readFileSync('./CHANGELOG.md', 'utf-8');
      }
    },
    {
      title: 'Converting changelog.md to HTML...',
      task: ctx => {
        const converter = new showdown.Converter();
        ctx.changelogParsedContent = converter.makeHtml(ctx.changelogOriginal);

        log(`File %s converted to HTML successfully!`, changelogFilePath);
      }
    }]);
};

module.exports = {
  getChangelog: getChangelog
};
