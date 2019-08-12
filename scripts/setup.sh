cd $INIT_CWD

npm i semantic-release --save-dev

cp ./node_modules/semantic-release-wellabe/scripts/docs/.releaserc.json .

json -I -f package.json -e 'this.scripts["semantic-release"]="semantic-release"'
