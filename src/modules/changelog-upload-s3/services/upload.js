const AWS = require('aws-sdk');
const debug = require('debug');
const error = debug('file-upload-aws-s3:error');
const log = debug('file-upload-aws-s3:error');

AWS.config.setPromisesDependency(require('bluebird'));

let awsS3 = null;
let awsS3Config = null;

const reset = () => {
  awsS3 = null;
  awsS3Config = null;
};

const setupS3Configuration = (options) => {
  if (!options ||
    !options.accessKeyId ||
    !options.secretAccessKey) {
    error('Error loading configuration: %j', options);
    throw { message: 'Missing required options: accessKeyId, secretAccessKey.' };
  }
  awsS3Config = { ... options };

  awsS3 = new AWS.S3({
    accessKeyId: awsS3Config.accessKeyId,
    secretAccessKey: awsS3Config.secretAccessKey,
  });

  log('Configuration loaded successfully: %j', awsS3Config);
  return awsS3;
};

const uploadFile = async (file, key, bucketTitle) => {
  if (!file ||
    !key ||
    !bucketTitle) {
    error('Missing required fields: %j', { file, key, bucketTitle });
    throw { message: 'Missing required params: file, key, bucketTitle.' };
  }

  log('Uploading file "%s" to bucket "%s"', key, bucketTitle);

  const uploadParams = {
    Bucket: bucketTitle,
    Key: key,
    Body: file,
  };

  try {
    const res = await awsS3.upload(uploadParams).promise();
    log('File uploaded successfully: %j', res);
    return res;
  } catch (err) {
    error(`Error uploading file stream "%s" to S3 bucket "%s": %j`, key, bucketTitle, err);
    throw err;
  }
};

module.exports = {
  reset,
  setupS3Configuration,
  uploadFile
};
