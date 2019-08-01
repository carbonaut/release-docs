#!/usr/bin/env node

const gitCommitPush = require('./src/github-commit-push');
const parseChangelogHtml = require('./src/parse-changelog-html');
const argv = require('minimist')(process.argv.slice(2));
const debug = require('debug');

debug.enable('*');

const gitCommitPushChangelog = async (changelogHtmlContent) => {
  gitCommitPush.init({
    owner: argv.owner || null,
    repo: argv.repo || null,
    files: [
      {path: `${argv.project}.html`, content: changelogHtmlContent}
    ],
    ref: argv.ref || null,
    forceUpdate: false,
    commitMessage: `feat(changelog): update file after release from project ${argv.project}.`,
    token: argv.token || null
  });

  await gitCommitPush.commitAndPush();
};

const init = async () => {
  try {
    let changelogHtmlContent = parseChangelogHtml.getChangelogHtml();
    await gitCommitPushChangelog(changelogHtmlContent);
  } catch (err) {
    throw err;
  }
};

init();
