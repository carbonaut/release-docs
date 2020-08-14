![deployment](https://github.com/carbonaut/release-docs/workflows/deployment/badge.svg?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# @carbounaut/release-docs

[**semantic-release**](https://github.com/semantic-release/semantic-release) shareable configuration to publish Angular and Ionic GitHub projects and to deploy the `changelog` file as a JSON or HTML format to an external GitHub project.

## Plugins

This shareable configuration uses the following plugins:
- [`@semantic-release/commit-analyzer`](https://github.com/semantic-release/commit-analyzer)
- [`@semantic-release/release-notes-generator`](https://github.com/semantic-release/release-notes-generator)
- [`@semantic-release/changelog`](https://github.com/semantic-release/changelog)
- [`@semantic-release/github`](https://github.com/semantic-release/github)
- [`@semantic-release/exec`](https://github.com/semantic-release/exec)
- [`@semantic-release/git`](https://github.com/semantic-release/git)

## Summary

This shareable configuration performs the following actions:

1. Analyze commits ([`@semantic-release/commit-analyzer`](https://github.com/semantic-release/commit-analyze))
2. Generate changelog content ([`@semantic-release/release-notes-generator`](https://github.com/semantic-release/release-notes-generator))
3. Create or update a changelog file generated by **step 2** ([`@semantic-release/changelog`](https://github.com/semantic-release/changelog))
4. Update the package version to the next release version ([release-docs-adjust-version](#release-docs-adjust-version))
5. Commit release assets to the project's git repository with the commit message `chore(release): ${nextRelease.version} [skip ci] ${nextRelease.notes}`. The following files are committed:
    - `package-lock.json`
    - `package.json`
    - `CHANGELOG.md`
    - `config.xml`
6. Publish a GitHub release and comment on released Pull Requests/Issues ([`@semantic-release/github`](https://github.com/semantic-release/github))
7. Upload the new generated CHANGELOG to a S3 bucket ([release-docs-changelog-upload-s3](#release-docs-changelog-upload-s3))

## Install

```bash
$ npm install --save-dev semantic-release@17 @carbonaut/release-docs
```

## Usage

### Project Setup

When installing this package for the first time, the following shareable configuration (`.releaserc.json`) is automatically added to your project root folder:

```json
{
  "extends": "@carbonaut/release-docs"
}
```

Add the following `semantic-release` command into the scripts section on your `package.json`:

```json
...
"scripts": {
    "semantic-release": "semantic-release"
  }
...
```

### Environment Variables Configuration

Ensure that your CI configuration has the following environment variables set:

- **GH_TOKEN**: A GitHub [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token);

- **RELEASE_DOCS_PROJECT_ID**: Unique project identifier. It will be used as the changelog file title on the S3 bucket;

- **RELEASE_DOCS_AWS_ACCESS_KEY_ID**: [AWS access key](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html) from the S3 bucket where the changelog file will be hosted; 

- **RELEASE_DOCS_AWS_SECRET_ACCESS_KEY_ID**: [AWS secret access key](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html) from the S3 bucket where the changelog file will be hosted.

### Triggering a Releasing Locally

```bash
$ RELEASE_DOCS_PROJECT_ID=<project ID> RELEASE_DOCS_AWS_ACCESS_KEY_ID=<AWS access key> RELEASE_DOCS_AWS_SECRET_ACCESS_KEY_ID=<AWS secret access key> RELEASE_DOCS_AWS_BUCKET=<AWS bucket> GH_TOKEN=<GitHub token> npm run semantic-release --dry-run=false --no-ci
```

### Automation With CI

First, setup all the required [environment variables](#Configuration) on your CI environment. Then just call the following script in your CI configuration file to trigger the release process:

```bash
$ npm run semantic-release
```

### Scripts

The following scripts are also available to be used separately.

#### release-docs-adjust-version

Update the package version to the next release version on the following files:
 - package.json: property version (this file is required)
 - config.xml: attribute version (this file is optional)

```bash
release-docs-adjust-version --version=<version>
```

#### release-docs-changelog-upload-s3

Upload the new generated CHANGELOG to a S3 bucket:

1. Convert the CHANGELOG.md file to JSON format;
2. Send the parsed changelog content to the S3 bucket `RELEASE_DOCS_AWS_BUCKET`. This file will be available at _https://s3.eu-central-1.amazonaws.com/<RELEASE_DOCS_AWS_BUCKET>/<RELEASE_DOCS_PROJECT_ID>.json_.
  
```bash
release-docs-changelog-upload-s3 --key=<ṕroject ID> --awsAccessKeyId=<AWS access key> --awsSecretAccessKey<AWS secret access key> --awsBucket=<AWS bucket>"
```

### Overwritten Options

This following options are set by this shareable config:

| Option                                                                                      | Value                                                                                                                                                         |
|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`@semantic-release/exec: prepareCmd`](https://github.com/semantic-release/exec#preparecmd) | `release-docs-adjust-version --version=${nextRelease.version}`                                                                                                |
| [`@semantic-release/exec: successCmd`](https://github.com/semantic-release/exec#successCmd) | `release-docs-changelog-upload-s3 --key=<ṕroject ID> --awsAccessKeyId=<AWS access key> --awsSecretAccessKey<AWS secret access key> --awsBucket=<AWS bucket>"` |
| [`@semantic-release/git: assets`](https://github.com/semantic-release/git#assets)           | `["package-lock.json", "package.json", "CHANGELOG.md", "config.xml"]`                                                                                         |
| [`@semantic-release/git: message`](https://github.com/semantic-release/git#message)         | `chore(release): ${nextRelease.version} [skip ci] ${nextRelease.notes}`                                                                                       |

Other options use their default values. See each [plugin](#plugins) documentation for available options.
