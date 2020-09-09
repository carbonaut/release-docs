module.exports = {
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {
      "changelogTitle": "# Changelog"
    }],
    ["@semantic-release/exec", {
      "prepareCmd": "release-docs-adjust-version --version=${nextRelease.version}",
      "successCmd": "release-docs-changelog-upload-s3 --key=$RELEASE_DOCS_PROJECT_ID --awsAccessKeyId=$RELEASE_DOCS_AWS_ACCESS_KEY_ID --awsSecretAccessKey=$RELEASE_DOCS_AWS_SECRET_ACCESS_KEY_ID --awsBucket=$RELEASE_DOCS_AWS_BUCKET"
    }],
    ["@semantic-release/git", {
      "assets": ["package-lock.json", "package.json", "CHANGELOG.md", "config.xml"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    [
      "semantic-release-slack-bot",
      {
        "notifyOnSuccess": true,
        "markdownReleaseNotes": true
      }
    ],
    "@semantic-release/github"
  ],
  "preset": "angular"
};
