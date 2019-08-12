cd $INIT_CWD
PACKAGE_TITLE=release-docs
npm i semantic-release --save-dev

cp ./node_modules/$PACKAGE_TITLE/scripts/docs/.releaserc.json .

json -I -f package.json -e 'this.scripts["semantic-release"]="semantic-release"'
