const invalidAwsCredentials = (params, callback) => {
  callback({
    "message": "The AWS Access Key Id you provided does not exist in our records.",
    "code": "InvalidAccessKeyId",
    "region": null,
    "time": "2020-03-19T08:45:15.461Z",
    "requestId": "AE99589C5E1C2A7D",
    "extendedRequestId": "0CZqVjAm2mKKEAPAnYafhiKhe/v6GTMotlZOf6zAiEb2xdMeNtHusb/71M1kXI8MO4EzwjJ+7zg=",
    "statusCode": 403,
    "retryable": false,
    "retryDelay": 23.737623859828496
  }, null);
};

const invalidBucket = (params, callback) => {
  callback({
    "message": "The specified bucket does not exist",
    "code": "NoSuchBucket",
    "region": null,
    "time": "2020-03-19T08:22:12.071Z",
    "requestId": "F53D1BDD70EBB8A0",
    "extendedRequestId": "ydmLFV6XiSfm5HAvrLnxHgHQHfPZEu51miUWAzS6824Jl9cFNGmSyATnuR9k8akTF3aVhXHfmhY=",
    "statusCode": 404,
    "retryable": false,
    "retryDelay": 43.5318857873034
  }, null);
};

const successUpload = (params, callback) => {
  callback(null, {
    "ETag": '\"75220dc8ce6c74b370e156f6962f274e\"',
    "Location": "https://s3.eu-central-1.amazonaws.com/releases.wellabe.fit/CHANGELOG-EXAMPLE.md",
    "key": "CHANGELOG-EXAMPLE.md",
    "Key": "CHANGELOG-EXAMPLE.md",
    "Bucket": "releases.wellabe.fit"
  });
};

module.exports = {
  invalidAwsCredentials,
  invalidBucket,
  successUpload,
};
