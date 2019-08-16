/*
  https://octokit.github.io/rest.js/#octokit-routes-git
  https://developer.github.com/v3/git/#git-data

  1. Get the current commit object
  2. Retrieve the tree it points to
  3. Retrieve the content of the blob object that tree has for that particular file path
  4. Change the content somehow and post a new blob object with that new content, getting a blob SHA back
  5. Post a new tree object with that file path pointer replaced with your new blob SHA getting a tree SHA back
  6. Create a new commit object with the current commit SHA as the parent and the new tree SHA, getting a commit SHA back
  7. Update the reference of your branch to point to the new commit SHA
 */

const Listr = require('listr');
const debug = require('debug');
const validateRequiredArgs = require('../../common/validateRequiredArgs');
const error = debug('github-commit-push:error');
const log = debug('github-commit-push:log');

const GitHubApi = require('@octokit/rest');
let gitHub = null;
let gitHubConfig;

const BLOB_INFO = {
	MODE: '100644',
	TYPE: 'blob'
};

/*
  Init options:
  - Token: https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line
  - owner, repo and ref: GET /repo/:owner/:repo/git/refs/:ref
  - forceUpdate
  - commitMessage
 */

const setupConfiguration = (options) => {
	if (!options ||
		!options.owner ||
		!options.repo ||
		!options.files ||
		(options.files.length === 0) ||
		!options.commitMessage) {
		error('Error loading configuration: %j', options);
		throw 'Missing required options: owner, repo, files, commitMessage.';
	}

	gitHub = new GitHubApi({
		auth: `token ${options.token}`
	});

	gitHubConfig = {
		owner: options.owner,
		repo: options.repo,
		files: options.files,
		ref: options.ref,
		forceUpdate: options.forceUpdate || false,
		commitMessage: options.commitMessage
	};

	log('Configuration loaded successfully: %j', gitHubConfig);
};

/*
  Retrieves the current freshest commit and gets its SHA Tree.
  It will be needed later to place a new commit on top of the old one.
 */

const getCommitReference = async () => {
	try {
		log('Retrieving GIT commit reference...');

		const res = await gitHub.git.getRef({
			owner: gitHubConfig.owner,
			repo: gitHubConfig.repo,
			ref: gitHubConfig.ref
		});

		return {sha: res.data.object.sha};
	} catch (e) {
		throw e;
	}
};

/*
  Creates new Blobs for each of the files to add, then returns their newly created SHAs
 */

const createBlobForFile = async (file) => {
	if (!file || typeof file.path !== 'string' || typeof file.content !== 'string') {
		error('File path and content must be string: %s', file.path);
		throw `File path and content must be string: ${file.path}`;
	}

	try {
		log('Creating blob for %s...', file.path);

		let blob = await gitHub.git
			.createBlob({
				owner: gitHubConfig.owner,
				repo: gitHubConfig.repo,
				content: file.content,
				encoding: "utf-8"
			});

		return {
			sha: blob.data.sha,
			path: file.path,
			mode: BLOB_INFO.MODE,
			type: BLOB_INFO.TYPE
		};
	} catch (e) {
		throw e;
	}
};

/*
  Creates a new tree and passes information about the newly created Blobs and the SHA of the old Commit retrieved.
  This will create a relation between the old Commit and the new one.
 */

const createTree = async (referenceCommitInfo) => {
	try {
		const promises = gitHubConfig.files.map(file => {
			return createBlobForFile(file);
		});

		let blobFiles = await Promise.all(promises);

		log('Creating GIT tree: %s', referenceCommitInfo);

		let createdTree = await gitHub.git.createTree(
			{
				owner: gitHubConfig.owner,
				repo: gitHubConfig.repo,
				tree: blobFiles,
				base_tree: referenceCommitInfo.sha
			});

		return {newTreeSha: createdTree.data.sha};
	} catch (e) {
		throw e;
	}
};

/*
  Creates a new Commit using:
  - The SHA of the old Commit retrieved on "getCommitReference"
  - The SHA of the Tree created on "createTree"
 */

const createCommit = async (referenceCommitInfo, treeInfo) => {
	try {
		log('Creating GIT commit. Reference commit info %j. Tree info: %j.', referenceCommitInfo, treeInfo);

		const newCommit = await gitHub.git.createCommit(
			{
				owner: gitHubConfig.owner,
				repo: gitHubConfig.repo,
				message: gitHubConfig.commitMessage || "commit",
				tree: treeInfo.newTreeSha,
				parents: [referenceCommitInfo.sha]
			});

		return {newCommitSha: newCommit.data.sha};
	} catch (e) {
		throw e;
	}
};

/*
  Updates the pointer of the branch to point to the newly created Commit
 */

const updateCommitReference = async (commitInfo) => {
	try {
		log('Updating GIT commit reference. Commit info %j', commitInfo);

		gitHub.git.updateRef(
			{
				owner: gitHubConfig.owner,
				repo: gitHubConfig.repo,
				ref: gitHubConfig.ref,
				sha: commitInfo.newCommitSha,
				force: gitHubConfig.forceUpdate
			});
	} catch (e) {
		throw e;
	}
};

const commitAndPush = (tasks) => {
  try {
    tasks.push({
      title: `Getting commit reference...`,
      task: async (ctx) => {
        log('Starting GitHub process to push content to %s', `/repos/${gitHubConfig.owner}/${gitHubConfig.repo}/git/refs/${gitHubConfig.ref}`);
        ctx.referenceCommitInfo = await getCommitReference();
      }
    });

    tasks.push({
      title: `Creating new tree...`,
      task: async (ctx) => {
        ctx.treeInfo = await createTree(ctx.referenceCommitInfo);
      }
    });

    tasks.push({
      title: `Creating commit...`,
      task: async (ctx) => {
        ctx.commitInfo = await createCommit(ctx.referenceCommitInfo, ctx.treeInfo);
      }
    });

    tasks.push({
      title: `Updating commit reference...`,
      task: async (ctx) => {
        await updateCommitReference(ctx.commitInfo);

        log('New commit and push finished successfully! %j', {
          location: `/repos/${gitHubConfig.owner}/${gitHubConfig.repo}/git/refs/${gitHubConfig.ref}`,
          commitMessage: gitHubConfig.commitMessage
        });
      }
    });
	} catch (err) {
		error('%j', err);
	}
};

const parseInfoFromRepoUrl = (repoUrl) => {
	log(`Parsing info from parameter "repo_url": ${repoUrl}`);

	let repoUrlSplit = repoUrl.split('/');

	if ((repoUrlSplit[3] === undefined) ||
			(repoUrlSplit[4] === undefined)) {
		error(`Error parsing info from parameter "repo_url": %j`, repoUrlSplit);
		throw new Error('Owner and repo informations not found on parameter "repo_url". Set this as: "--repo_url=http://github.com/:owner/:repo"');
	}
	else {
		return {
			owner: repoUrlSplit[3],
			repo: repoUrlSplit[4]
		}
	}
};

const init = async (envVars, changelogHtmlContent) => {
	let tasks = [
		{
			title: `Validating required environment variables...`,
			task: () => validateRequiredArgs(envVars, ['CHANGELOG_PROJECT_REPO_URL', 'GH_TOKEN', 'PROJECT_TITLE'])
		},
		{
			title: `Setting up GIT configuration variables...`,
			task: () => {
				let infoRepoUrl = parseInfoFromRepoUrl(envVars.CHANGELOG_PROJECT_REPO_URL);

				setupConfiguration({
					owner: infoRepoUrl.owner || null,
					repo: infoRepoUrl.repo || null,
					files: [
						{path: `${envVars.PROJECT_TITLE}.html`, content: changelogHtmlContent}
					],
					ref: envVars.CHANGELOG_PROJECT_REF || 'heads/master',
					forceUpdate: false,
					commitMessage: `feat(changelog): update file after release from project ${envVars.PROJECT_TITLE}.`,
					token: envVars.GH_TOKEN || null
				});
			}
		}];

	commitAndPush(tasks);
	return new Listr(tasks, {collapse: false});
};

module.exports = {
	init: init
};
