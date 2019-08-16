# @carbounaut/release-docs

[**semantic-release**](https://github.com/semantic-release/semantic-release) shareable config to publish Angular and Ionic projects.

## Plugins

This shareable configuration use the following plugins:
- [`@semantic-release/commit-analyzer`](https://github.com/semantic-release/commit-analyzer)
- [`@semantic-release/release-notes-generator`](https://github.com/semantic-release/release-notes-generator)
- [`@semantic-release/changelog`](https://github.com/semantic-release/changelog)
- [`@semantic-release/github`](https://github.com/semantic-release/github)
- [`@semantic-release/exec`](https://github.com/semantic-release/exec)
- [`@semantic-release/git`](https://github.com/semantic-release/git)

## Install

```bash
$ npm install --save-dev semantic-release @carbonaut/release-docs
```

## Usage

The shareable config is automatically added to `.release.json` file int the root folder:

```json
{
  "extends": "@carbonaut/release-docs"
}
```

## Configuration

The following environments variables are required:

- **GH_TOKEN**: [GitHub personal access](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) token to access the external changelog project.

- **CHANGELOG_PROJECT_REPO_URL**: GitHub project URL which maintains the external changelog project. E.g.: `https://github.com/<owner>/<project>` 

- **PROJECT_TITLE**: ID to identify the project on the external changelog project.

### Overwritten options

This following options are set by this shareable config:

| Option                                                                                      | Value                                                                     |
|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| [`@semantic-release/exec: prepareCmd`](https://github.com/semantic-release/exec#preparecmd) | `release-docs-adjust-version --version=${nextRelease.version}`            |
| [`@semantic-release/exec: successCmd`](https://github.com/semantic-release/exec#successCmd) | `release-docs-update-changelog-project`                                   |
| [`@semantic-release/git: assets`](https://github.com/semantic-release/git#assets)           | `["package-lock.json", "package.json", "CHANGELOG.md", "config.xml"]`     |
| [`@semantic-release/git: message`](https://github.com/semantic-release/git#message)         | `chore(release): ${nextRelease.version} [skip ci] ${nextRelease.notes}`   |

Other options use their default values. See each [plugin](#plugins) documentation for available options.
