const stream = require('stream');
const expect = require('chai').expect;
const readFile = require('../services/read');
const readFileEntries = require('./entries/upload/readFile.json');

describe('readFileStream', () => {
  before(() => {
    readFileEntries.error.expectedResponse.message = readFileEntries.error.expectedResponse.message.replace('{INIT_CWD}', process.env.INIT_CWD);
  });

  it('Should get a file stream successfully', async () => {
    try {
      const res = await readFile.getFileStream(readFileEntries.success.params.filePath);

      expect(res.stream).to.be.an.instanceOf(stream.Stream);
      expect(res.title).to.equal(readFileEntries.success.expectedResponse.title);
    } catch (err) {
      expect(err).to.be.null;
    }
  });

  it('Should throw an error since file path is required', async () => {
    try {
      const res = await readFile.getFileStream(readFileEntries.error.params.filePath);
      expect(res).to.be.null;
    } catch (err) {
      expect(err.message).to.equal(readFileEntries.error.expectedResponse.message);
    }
  });
});
