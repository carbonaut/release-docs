# Changelog

# [4.0.0](https://github.com/carbonaut/release-docs/compare/v3.0.0...v4.0.0) (2020-09-11)


* Development (#33) ([19e094f](https://github.com/carbonaut/release-docs/commit/19e094f71e08b47f86b6282baa1fe90bc0816c46)), closes [#33](https://github.com/carbonaut/release-docs/issues/33) [#32](https://github.com/carbonaut/release-docs/issues/32)


### Features

* **slack-bot:** integrates with semantic-release-slack-bot plugin. ([f5f3056](https://github.com/carbonaut/release-docs/commit/f5f3056aee933a311c6faf9670ff33d4e12f8756))


### BREAKING CHANGES

* major semantic-release and related dependencies update.

* docs(README): improve documentation.

* docs(README): content improvement.

Co-authored-by: Arthur <artfloriani@gmail.com>

* docs(README): content improvement.

Co-authored-by: Arthur <artfloriani@gmail.com>

* docs(README): content improvement.

Co-authored-by: Arthur <artfloriani@gmail.com>

* docs(README): fix mispelling.

* feat(slack-bot): integrates with semantic-release-slack-bot plugin.
* new environment variable SLACK_WEBHOOK required.

* build(): integrates with slack-bot plugin.

* docs(README): adds information about slack-bot plugin.
* **slack-bot:** major semantic-release and related dependencies update.

* docs(README): improve documentation.

* docs(README): content improvement.

Co-authored-by: Arthur <artfloriani@gmail.com>

* docs(README): content improvement.

Co-authored-by: Arthur <artfloriani@gmail.com>

* docs(README): content improvement.

Co-authored-by: Arthur <artfloriani@gmail.com>

* docs(README): fix mispelling.

* feat(slack-bot): integrates with semantic-release-slack-bot plugin.
* **slack-bot:** new environment variable SLACK_WEBHOOK required.

* build(): integrates with slack-bot plugin.

* docs(README): adds information about slack-bot plugin.

Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>
Co-authored-by: Arthur <artfloriani@gmail.com>

# [3.0.0](https://github.com/carbonaut/release-docs/compare/v2.1.0...v3.0.0) (2020-08-31)


### Build System

* **dependencies:**  updates all dependencies to its latest version. ([fd4bd2a](https://github.com/carbonaut/release-docs/commit/fd4bd2a54f454ffd4598c598158b1eee35586a80))


### BREAKING CHANGES

* **dependencies:** major semantic-release and related dependencies update.

* docs(README): improve documentation.

* docs(README): content improvement.

Co-authored-by: Arthur <artfloriani@gmail.com>

* docs(README): content improvement.

Co-authored-by: Arthur <artfloriani@gmail.com>

* docs(README): content improvement.

Co-authored-by: Arthur <artfloriani@gmail.com>

* docs(README): fix mispelling.

Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>
Co-authored-by: Arthur <artfloriani@gmail.com>

# [2.1.0](https://github.com/carbonaut/release-docs/compare/v2.0.0...v2.1.0) (2020-07-01)


### Bug Fixes

* **deployment:** update jobs dependency. Relates to [#14](https://github.com/carbonaut/release-docs/issues/14) ([2464b49](https://github.com/carbonaut/release-docs/commit/2464b49))


### Features

* **github-actions:** integrate CI/CD process with GitHub Actions. Relates to [#14](https://github.com/carbonaut/release-docs/issues/14) ([ab9f2e1](https://github.com/carbonaut/release-docs/commit/ab9f2e1))
* **github-actions:** remove Circle CI integration. Relates to [#14](https://github.com/carbonaut/release-docs/issues/14) ([ee8dfe3](https://github.com/carbonaut/release-docs/commit/ee8dfe3))

# [2.0.0](https://github.com/carbonaut-io/release-docs/compare/v1.21.0...v2.0.0) (2020-03-20)


### Features

* force major update version. Relates to [#6](https://github.com/carbonaut-io/release-docs/issues/6) ([fe7a76c](https://github.com/carbonaut-io/release-docs/commit/fe7a76c))


### BREAKING CHANGES

* deprecated command release-docs-update-changelog-project. Use release-docs-changelog-upload-s3 instead.

# [1.21.0](https://github.com/carbonaut-io/release-docs/compare/v1.20.0...v1.21.0) (2020-03-20)


### Features

* **changelog-upload-s3:** create changelog upload s3 script. Relates to [#4](https://github.com/carbonaut-io/release-docs/issues/4) ([87013eb](https://github.com/carbonaut-io/release-docs/commit/87013eb))
* **changelog-upload-s3:** create service to handle S3 bucket file upload. Relates to [#4](https://github.com/carbonaut-io/release-docs/issues/4) ([ddc0952](https://github.com/carbonaut-io/release-docs/commit/ddc0952))
* **changelog-upload-s3:** Show uploaded file URL. Relates to [#4](https://github.com/carbonaut-io/release-docs/issues/4) ([65be3b8](https://github.com/carbonaut-io/release-docs/commit/65be3b8))
* **parse-changelog:** BREAKING CHANGE remove support to commit changelog to github projects. Relates to [#4](https://github.com/carbonaut-io/release-docs/issues/4) ([2062fdd](https://github.com/carbonaut-io/release-docs/commit/2062fdd))
* **shareable-configuration:** update successCmd script. Relates to [#4](https://github.com/carbonaut-io/release-docs/issues/4) ([8d86e3b](https://github.com/carbonaut-io/release-docs/commit/8d86e3b))

# [1.20.0](https://github.com/carbonaut-io/release-docs/compare/v1.19.0...v1.20.0) (2019-09-04)


### Features

* **github-commit-push:** remove "skip ci" tag from commit message. ([2d04d93](https://github.com/carbonaut-io/release-docs/commit/2d04d93))

# [1.19.0](https://github.com/carbonaut-io/release-docs/compare/v1.18.0...v1.19.0) (2019-09-04)


### Features

* **github-commit-push:** add "skip ci" tag to commit message. ([e186385](https://github.com/carbonaut-io/release-docs/commit/e186385))

# [1.18.0](https://github.com/carbonaut-io/release-docs/compare/v1.17.0...v1.18.0) (2019-09-04)


### Features

* **shareable-configuration:** set changelogTitle. ([1d09791](https://github.com/carbonaut-io/release-docs/commit/1d09791))

- latest version ${nextRelease.version}

# [1.17.0](https://github.com/carbonaut-io/release-docs/compare/v1.16.0...v1.17.0) (2019-09-04)


### Features

* **shareable-configuration:** set changelogTitle. ([aaa90ff](https://github.com/carbonaut-io/release-docs/commit/aaa90ff))

Changelog

# [1.16.0](https://github.com/carbonaut-io/release-docs/compare/v1.15.0...v1.16.0) (2019-09-04)


### Features

* test release. ([c242ec5](https://github.com/carbonaut-io/release-docs/commit/c242ec5))

# [1.15.0](https://github.com/carbonaut-io/release-docs/compare/v1.14.2...v1.15.0) (2019-09-02)


### Features

* trigger release. ([a274182](https://github.com/carbonaut-io/release-docs/commit/a274182))

## [1.14.2](https://github.com/carbonaut-io/release-docs/compare/v1.14.1...v1.14.2) (2019-08-27)


### Bug Fixes

* **parse-changelog-html:** variable's title refactor. ([473aeb9](https://github.com/carbonaut-io/release-docs/commit/473aeb9))

## [1.14.1](https://github.com/carbonaut-io/release-docs/compare/v1.14.0...v1.14.1) (2019-08-20)


### Bug Fixes

* **github-commit-push:** set file_path as required. ([2c191a4](https://github.com/carbonaut-io/release-docs/commit/2c191a4))

# [1.14.0](https://github.com/carbonaut-io/release-docs/compare/v1.13.0...v1.14.0) (2019-08-20)


### Features

* **release-docs-update-changelog-project:** use args variables. ([0af1e2a](https://github.com/carbonaut-io/release-docs/commit/0af1e2a))

# [1.13.0](https://github.com/carbonaut-io/release-docs/compare/v1.12.0...v1.13.0) (2019-08-17)


### Features

* **shareable-configuration:** update config file. ([a3d6d41](https://github.com/carbonaut-io/release-docs/commit/a3d6d41))

# [1.12.0](https://github.com/carbonaut-io/release-docs/compare/v1.11.0...v1.12.0) (2019-08-17)


### Features

* **package:** move devDependencies to dependencies. ([eef3fe8](https://github.com/carbonaut-io/release-docs/commit/eef3fe8))

# [1.11.0](https://github.com/carbonaut-io/release-docs/compare/v1.10.0...v1.11.0) (2019-08-17)


### Features

* **shareable-configuration:** update way to load config. ([8e2fdda](https://github.com/carbonaut-io/release-docs/commit/8e2fdda))

# [1.10.0](https://github.com/carbonaut-io/release-docs/compare/v1.9.0...v1.10.0) (2019-08-17)


### Features

* **index:** add release configuration into index.js. ([dab4144](https://github.com/carbonaut-io/release-docs/commit/dab4144))

# [1.9.0](https://github.com/carbonaut-io/release-docs/compare/v1.8.0...v1.9.0) (2019-08-17)


### Features

* **shareable-configuration:** update to JSON file. ([4f40a3c](https://github.com/carbonaut-io/release-docs/commit/4f40a3c))

# [1.8.0](https://github.com/carbonaut-io/release-docs/compare/v1.7.1...v1.8.0) (2019-08-16)


### Features

* **update-changelog-project:** variables name improvements; using environments variables. ([950655a](https://github.com/carbonaut-io/release-docs/commit/950655a))

## [1.7.1](https://github.com/carbonaut-io/release-docs/compare/v1.7.0...v1.7.1) (2019-08-15)


### Bug Fixes

* **shareable-configuration:** set GH_REPO_URL variable. ([c77df92](https://github.com/carbonaut-io/release-docs/commit/c77df92))

# [1.7.0](https://github.com/carbonaut-io/release-docs/compare/v1.6.0...v1.7.0) (2019-08-15)


### Features

* **shareable-configuration:** export shareable config to be used. ([d01bd74](https://github.com/carbonaut-io/release-docs/commit/d01bd74))

# [1.6.0](https://github.com/carbonaut-io/release-docs/compare/v1.5.3...v1.6.0) (2019-08-12)


### Features

* **setup:** improve debug message. Remove logs. ([8a67c33](https://github.com/carbonaut-io/release-docs/commit/8a67c33))

## [1.5.3](https://github.com/carbonaut-io/release-docs/compare/v1.5.2...v1.5.3) (2019-08-12)


### Bug Fixes

* **setup:** set prefix to install dependency. ([f4020cc](https://github.com/carbonaut-io/release-docs/commit/f4020cc))

## [1.5.2](https://github.com/carbonaut-io/release-docs/compare/v1.5.1...v1.5.2) (2019-08-12)


### Bug Fixes

* **setup:** remove branch configuration. ([0067102](https://github.com/carbonaut-io/release-docs/commit/0067102))

## [1.5.1](https://github.com/carbonaut-io/release-docs/compare/v1.5.0...v1.5.1) (2019-08-12)


### Bug Fixes

* **semantic-release-setup:** prepend INIT_CWD to config file path. ([5aadf2a](https://github.com/carbonaut-io/release-docs/commit/5aadf2a))

# [1.5.0](https://github.com/carbonaut-io/release-docs/compare/v1.4.2...v1.5.0) (2019-08-12)


### Bug Fixes

* **package:** add semantic-release script. ([69eba49](https://github.com/carbonaut-io/release-docs/commit/69eba49))


### Features

* **setup:** create nodejs script for the initial setup. ([5fb5e8b](https://github.com/carbonaut-io/release-docs/commit/5fb5e8b))

## [1.4.2](https://github.com/carbonaut-io/release-docs/compare/v1.4.1...v1.4.2) (2019-08-12)


### Bug Fixes

* **setup:** update package title. ([09a46f3](https://github.com/carbonaut-io/release-docs/commit/09a46f3))

## [1.4.1](https://github.com/carbonaut-io/release-docs/compare/v1.4.0...v1.4.1) (2019-08-12)


### Bug Fixes

* **setup:** update package title. ([3096cdf](https://github.com/carbonaut-io/release-docs/commit/3096cdf))

# [1.4.0](https://github.com/carbonaut-io/release-docs/compare/v1.3.12...v1.4.0) (2019-08-12)


### Features

* **package:** update version to match NPM version. ([15fbde2](https://github.com/carbonaut-io/release-docs/commit/15fbde2))

# [1.2.0](https://github.com/carbonaut-io/release-docs/compare/v1.1.1...v1.2.0) (2019-08-12)


### Features

* **package:** set package version. ([5585175](https://github.com/carbonaut-io/release-docs/commit/5585175))

## [1.1.1](https://github.com/carbonaut-io/release-docs/compare/v1.1.0...v1.1.1) (2019-08-12)


### Bug Fixes

* **setup:** fix package path. ([6617b86](https://github.com/carbonaut-io/release-docs/commit/6617b86))

# [1.1.0](https://github.com/carbonaut-io/release-docs/compare/v1.0.0...v1.1.0) (2019-08-12)


### Features

* **setup:** add "semantic-release" to package scripts. ([e71fde3](https://github.com/carbonaut-io/release-docs/commit/e71fde3))

# 1.0.0 (2019-08-05)


### Features

* **.editorconfig:** add editor config file. ([a1cb4ba](https://github.com/carbonaut-io/release-docs/commit/a1cb4ba))
* **.releaserc.json:** add semantic-release config. ([8d5a5b5](https://github.com/carbonaut-io/release-docs/commit/8d5a5b5))
* **adjust-version:** call method "checkFileExists" for Ionic config.xml. ([8fc1bf4](https://github.com/carbonaut-io/release-docs/commit/8fc1bf4))
* **adjust-version:** create service to adjust project versions. ([d1b2f16](https://github.com/carbonaut-io/release-docs/commit/d1b2f16))
* **adjust-version:** integrate with service validateRequiredArgs and create method checkIonicFlag. ([818d751](https://github.com/carbonaut-io/release-docs/commit/818d751))
* **github-commit-push:** integrate with service validateArgs and create method parseInfoFromRepoUrl to get infos from new command line arg "repo_url". ([b81beca](https://github.com/carbonaut-io/release-docs/commit/b81beca))
* **scripts:** add config.xml to update. ([e994fdb](https://github.com/carbonaut-io/release-docs/commit/e994fdb))
* **update-changelog-project:** create module to update changelog project. ([23bb7e1](https://github.com/carbonaut-io/release-docs/commit/23bb7e1))
* **update-ionic-config-version:** use library xml-js. Automatically detect config.xml file. ([43f6b94](https://github.com/carbonaut-io/release-docs/commit/43f6b94))
* **validateArgs:** create generic service to validate required command line args. ([49930ce](https://github.com/carbonaut-io/release-docs/commit/49930ce))
* initial project version. ([51f5411](https://github.com/carbonaut-io/release-docs/commit/51f5411))

# 1.0.0 (2019-08-05)


### Features

* **.editorconfig:** add editor config file. ([a1cb4ba](https://github.com/carbonaut-io/release-docs/commit/a1cb4ba))
* **.releaserc.json:** add semantic-release config. ([8d5a5b5](https://github.com/carbonaut-io/release-docs/commit/8d5a5b5))
* **adjust-version:** call method "checkFileExists" for Ionic config.xml. ([8fc1bf4](https://github.com/carbonaut-io/release-docs/commit/8fc1bf4))
* **adjust-version:** create service to adjust project versions. ([d1b2f16](https://github.com/carbonaut-io/release-docs/commit/d1b2f16))
* **adjust-version:** integrate with service validateRequiredArgs and create method checkIonicFlag. ([818d751](https://github.com/carbonaut-io/release-docs/commit/818d751))
* **github-commit-push:** integrate with service validateArgs and create method parseInfoFromRepoUrl to get infos from new command line arg "repo_url". ([b81beca](https://github.com/carbonaut-io/release-docs/commit/b81beca))
* **scripts:** add config.xml to update. ([e994fdb](https://github.com/carbonaut-io/release-docs/commit/e994fdb))
* **update-changelog-project:** create module to update changelog project. ([23bb7e1](https://github.com/carbonaut-io/release-docs/commit/23bb7e1))
* **update-ionic-config-version:** use library xml-js. Automatically detect config.xml file. ([43f6b94](https://github.com/carbonaut-io/release-docs/commit/43f6b94))
* **validateArgs:** create generic service to validate required command line args. ([49930ce](https://github.com/carbonaut-io/release-docs/commit/49930ce))
* initial project version. ([51f5411](https://github.com/carbonaut-io/release-docs/commit/51f5411))

# 1.0.0 (2019-08-05)


### Features

* **.editorconfig:** add editor config file. ([a1cb4ba](https://github.com/carbonaut-io/release-docs/commit/a1cb4ba))
* **.releaserc.json:** add semantic-release config. ([8d5a5b5](https://github.com/carbonaut-io/release-docs/commit/8d5a5b5))
* **adjust-version:** call method "checkFileExists" for Ionic config.xml. ([8fc1bf4](https://github.com/carbonaut-io/release-docs/commit/8fc1bf4))
* **adjust-version:** create service to adjust project versions. ([d1b2f16](https://github.com/carbonaut-io/release-docs/commit/d1b2f16))
* **adjust-version:** integrate with service validateRequiredArgs and create method checkIonicFlag. ([818d751](https://github.com/carbonaut-io/release-docs/commit/818d751))
* **github-commit-push:** integrate with service validateArgs and create method parseInfoFromRepoUrl to get infos from new command line arg "repo_url". ([b81beca](https://github.com/carbonaut-io/release-docs/commit/b81beca))
* **scripts:** add config.xml to update. ([e994fdb](https://github.com/carbonaut-io/release-docs/commit/e994fdb))
* **update-changelog-project:** create module to update changelog project. ([23bb7e1](https://github.com/carbonaut-io/release-docs/commit/23bb7e1))
* **update-ionic-config-version:** use library xml-js. Automatically detect config.xml file. ([43f6b94](https://github.com/carbonaut-io/release-docs/commit/43f6b94))
* **validateArgs:** create generic service to validate required command line args. ([49930ce](https://github.com/carbonaut-io/release-docs/commit/49930ce))
* initial project version. ([51f5411](https://github.com/carbonaut-io/release-docs/commit/51f5411))

# 1.0.0 (2019-08-05)


### Features

* **.editorconfig:** add editor config file. ([a1cb4ba](https://github.com/carbonaut-io/release-docs/commit/a1cb4ba))
* **.releaserc.json:** add semantic-release config. ([8d5a5b5](https://github.com/carbonaut-io/release-docs/commit/8d5a5b5))
* **adjust-version:** call method "checkFileExists" for Ionic config.xml. ([8fc1bf4](https://github.com/carbonaut-io/release-docs/commit/8fc1bf4))
* **adjust-version:** create service to adjust project versions. ([d1b2f16](https://github.com/carbonaut-io/release-docs/commit/d1b2f16))
* **adjust-version:** integrate with service validateRequiredArgs and create method checkIonicFlag. ([818d751](https://github.com/carbonaut-io/release-docs/commit/818d751))
* **github-commit-push:** integrate with service validateArgs and create method parseInfoFromRepoUrl to get infos from new command line arg "repo_url". ([b81beca](https://github.com/carbonaut-io/release-docs/commit/b81beca))
* **scripts:** add config.xml to update. ([e994fdb](https://github.com/carbonaut-io/release-docs/commit/e994fdb))
* **update-changelog-project:** create module to update changelog project. ([23bb7e1](https://github.com/carbonaut-io/release-docs/commit/23bb7e1))
* **update-ionic-config-version:** use library xml-js. Automatically detect config.xml file. ([43f6b94](https://github.com/carbonaut-io/release-docs/commit/43f6b94))
* **validateArgs:** create generic service to validate required command line args. ([49930ce](https://github.com/carbonaut-io/release-docs/commit/49930ce))
* initial project version. ([51f5411](https://github.com/carbonaut-io/release-docs/commit/51f5411))
