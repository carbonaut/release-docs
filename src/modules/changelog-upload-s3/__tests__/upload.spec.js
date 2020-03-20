const expect = require('chai').expect;
const AWSMock = require('aws-sdk-mock');
const uploadService = require('../services/upload');
const S3Mock = require('./mocks/S3.mock');

const setupS3ConfigurationEntries = require('./entries/upload/setupS3Configuration.json');
const uploadFileEntries = require('./entries/upload/uploadFile.json');
AWSMock.Promise = require('bluebird');

describe('setupS3Configuration', () => {
  beforeEach(() => {
    uploadService.reset();
  });

  setupS3ConfigurationEntries.error.forEach(entry => {
    it(`Should throw an error since required options are missing: ${entry.description}`, async () => {
      try {
        const res = await uploadService.setupS3Configuration(entry.params);
        expect(res).to.be.null;
      } catch (err) {
        expect(err.message).to.equal('Missing required options: accessKeyId, secretAccessKey.');
      }
    });
  });

  it('Should setup a S3 instance successfully', async () => {
    try {
      const res = await uploadService.setupS3Configuration(uploadFileEntries.awsCredentialsMock);
      expect(res).to.be.an('object');
    } catch (err) {
      expect(err).to.be.null;
    }
  });
});

describe('uploadFile', () => {
  afterEach(() => {
    uploadService.reset();
    AWSMock.restore('S3');
  });

  it('Should throw an error since params are not set', async () => {
    try {
      await uploadService.setupS3Configuration(uploadFileEntries.awsCredentialsMock);
      const res = await uploadService.uploadFile(null, null, null);
      expect(res).to.be.null;
    } catch (err) {
      expect(err.message).to.equal('Missing required params: file, key, bucketTitle.');
    }
  });

  it('Should throw an error since S3 credentials are invalid', async () => {
    AWSMock.mock('S3', 'upload', S3Mock.invalidAwsCredentials);

    try {
      await uploadService.setupS3Configuration(uploadFileEntries.awsCredentialsMock);
      const res = await uploadService.uploadFile(uploadFileEntries.uploadParams.file,
                                                  uploadFileEntries.uploadParams.key,
                                                  uploadFileEntries.uploadParams.bucket,);
      expect(res).to.be.null;
    } catch (err) {
      expect(err.message).to.equal('The AWS Access Key Id you provided does not exist in our records.');
      expect(err.code).to.equal('InvalidAccessKeyId');
      expect(err.statusCode).to.equal(403);
    }
  });

  it('Should throw an error since bucket name is invalid', async () => {
    AWSMock.mock('S3', 'upload', S3Mock.invalidBucket);

    try {
      await uploadService.setupS3Configuration(uploadFileEntries.awsCredentialsMock);
      const res = await uploadService.uploadFile(uploadFileEntries.uploadParams.file,
                                                  uploadFileEntries.uploadParams.key,
                                                  uploadFileEntries.uploadParams.bucket,);
      expect(res).to.be.null;
    } catch (err) {
      expect(err.message).to.equal('The specified bucket does not exist');
      expect(err.code).to.equal('NoSuchBucket');
      expect(err.statusCode).to.equal(404);
    }
  });

  it('Should upload a file successfully', async () => {
    AWSMock.mock('S3', 'upload', S3Mock.successUpload);

    await uploadService.setupS3Configuration(uploadFileEntries.awsCredentialsMock);

    try {
      const res = await uploadService.uploadFile(uploadFileEntries.uploadParams.file,
                                                  uploadFileEntries.uploadParams.key,
                                                  uploadFileEntries.uploadParams.bucket,);

      expect(res.Key).to.equal(uploadFileEntries.uploadParams.key);
      expect(res.Bucket).to.equal(uploadFileEntries.uploadParams.bucket);
    } catch (err) {
      expect(err).to.be.null;
    }
  });
});
