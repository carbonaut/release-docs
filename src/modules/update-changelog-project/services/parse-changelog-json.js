/*
  https://github.com/hypermodules/changelog-parser

  Parses a CHANGELOG.md file to JSON format using changelog-parser library.
 */

const Listr = require('listr');
const debug = require('debug');
const parseChangelog = require('changelog-parser');
const log = debug('parse-changelog-json:log');
const error = debug('parse-changelog-json:error');

const getChangelog = (changelogFilePath = './CHANGELOG.md') => {
  return new Listr([
    {
      title: `Starting file conversion ${changelogFilePath} to JSON...`,
      task: async ctx => {
        log('Starting file conversion %s to JSON...', changelogFilePath);

        try {
          ctx.changelogParsedContent = await parseChangelog(changelogFilePath);
          log(`File %s converted to JSON successfully!`, changelogFilePath);
        } catch (err) {
          error('Error converting changelog to JSON', err);
          throw err;
        }
      }
    }]);
};

module.exports = {
  getChangelog: getChangelog
};
