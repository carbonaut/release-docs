[![CircleCI](https://circleci.com/gh/carbonaut-io/release-docs.svg?style=svg&circle-token=73ff7147b9024522ade955b02af304759d85cdf4)](https://circleci.com/gh/carbonaut-io/release-docs)

# @carbounaut/release-docs

[**semantic-release**](https://github.com/semantic-release/semantic-release) shareable configuration to publish Angular and Ionic GitHub projects and to deploy the `changelog` file as a JSON to an external GitHub project.

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
4. Update the package version to the next release version on the following files:
    - `package.json`: property `version` (**this file is required**)
    - `config.xml`: attribute `version` (**this file is optional**)
5. Commit release assets to the project's git repository with the commit message `chore(release): ${nextRelease.version} [skip ci] ${nextRelease.notes}`. The following files are committed:
    - `package-lock.json`
    - `package.json`
    - `CHANGELOG.md`
    - `config.xml`
6. Publish a GitHub release and comment on released Pull Requests/Issues ([`@semantic-release/github`](https://github.com/semantic-release/github))
7. Update the external GitHub project with the new generated CHANGELOG:
    - Convert the CHANGELOG.md file to JSON format
    - Send the JSON changelog version to the external project set on `$CHANGELOG_PROJECT_REPO_URL` with the file title `$PROJECT_TITLE`.

## Install

```bash
$ npm install --save-dev semantic-release @carbonaut/release-docs
```

## Usage

When installing this package for the first time, the following shareable configuration (`.releaserc.json`) is automatically added to your project root folder:

```json
{
  "extends": "@carbonaut/release-docs"
}
```

## Configuration

Ensure that your CI configuration has the following environment variables set:

- **GH_TOKEN**: [GitHub personal access](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) token to access the external changelog project

- **CHANGELOG_PROJECT_REPO_URL**: GitHub project URL which maintains the external changelog project. E.g.: `https://github.com/<owner>/<project>` 

- **PROJECT_TITLE**: ID to identify the project on the external changelog project

### Overwritten options

This following options are set by this shareable config:

| Option                                                                                      | Value                                                                     |
|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| [`@semantic-release/exec: prepareCmd`](https://github.com/semantic-release/exec#preparecmd) | `release-docs-adjust-version --version=${nextRelease.version}`            |
| [`@semantic-release/exec: successCmd`](https://github.com/semantic-release/exec#successCmd) | `release-docs-update-changelog-project`                                   |
| [`@semantic-release/git: assets`](https://github.com/semantic-release/git#assets)           | `["package-lock.json", "package.json", "CHANGELOG.md", "config.xml"]`     |
| [`@semantic-release/git: message`](https://github.com/semantic-release/git#message)         | `chore(release): ${nextRelease.version} [skip ci] ${nextRelease.notes}`   |

Other options use their default values. See each [plugin](#plugins) documentation for available options.
