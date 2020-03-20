const fs = require('fs');
const path = require('path');
const debug = require('debug');

const error = debug('file-upload-aws-s3:error');
const log = debug('file-upload-aws-s3:log');
const INIT_CWD = process.env.INIT_CWD;

const getFileStream = async (filePath) => {
  const absoluteFilePath = `${INIT_CWD}/${filePath}`;

  if (!fs.existsSync(absoluteFilePath)) {
    error('File not found: %s', absoluteFilePath);
    throw { message: `File "${absoluteFilePath}" not found.` };
  }

  const fileStream = fs.createReadStream(absoluteFilePath);

  fileStream.on('error', (err) => {
    error(`Error creating file stream "%s": %j`, absoluteFilePath, err);
  });

  log('File stream created successfully: %s', absoluteFilePath);

  return {
    stream: fileStream,
    title: path.basename(filePath),
  }
};

module.exports = {
  getFileStream
};
