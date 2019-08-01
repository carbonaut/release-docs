cd $INIT_CWD

npm i semantic-release @semantic-release/changelog @semantic-release/exec @semantic-release/git --save-dev

cp ./node_modules/semantic-release-wellabe/scripts/docs/.releaserc.json .

json -I -f package.json -e 'this.scripts["adjust-version"]="npm version --no-git-tag-version $VERSION"'
json -I -f package.json -e 'this.scripts["semantic-release"]="semantic-release"'
json -I -f package.json -e 'this.scripts["release-success"]="semantic-release-wellabe --owner=$GH_CHANGELOG_REPO_OWNER --repo=$GH_CHANGELOG_REPO --ref=$GH_CHANGELOG_REF --token=$GH_TOKEN --project=$PROJECT_TITLE"'
