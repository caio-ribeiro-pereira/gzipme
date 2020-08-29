/* global describe, it, expect, beforeEach, afterEach */
const fs = require('fs');
const { exec } = require('child_process');
const gzipme = require('../index.js');

const testPath = `${__dirname}/compress`;
const testFile = `${testPath}/test.json`;
const testOutputFile = `${testPath}/output.json`;
const testGzipFile = `${testFile}.gz`;
const testFileContent = JSON.stringify({ test: 'this is a test.json' });

describe('gzipme', () => {
  beforeEach((done) => {
    exec(`mkdir -p ${testPath}`, () => {
      fs.writeFileSync(testFile, testFileContent);
      done();
    });
  });

  afterEach((done) => exec(`rm -rf ${testPath}`, done));

  it('compress test.json to test.json.gz using default params', async () => {
    try {
      await gzipme(testFile);
      const existGzip = fs.existsSync(testGzipFile);
      expect(existGzip).toBe(true);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it('compress test.json using best compress mode', async () => {
    try {
      await gzipme(testFile, { compress: 'best' });
      const existGzip = fs.existsSync(testGzipFile);
      expect(existGzip).toBe(true);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it('compress test.json using fast compress mode', async () => {
    try {
      await gzipme(testFile, { compress: 'fast' });
      const existGzip = fs.existsSync(testGzipFile);
      expect(existGzip).toBe(true);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it('compress test.json overwrite to test.json', async () => {
    try {
      await gzipme(testFile, { overwrite: true });
      const existGzip = fs.existsSync(testFile);
      expect(existGzip).toBe(true);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it('compress test.json to new name file when set output params', async () => {
    try {
      await gzipme(testFile, { output: testOutputFile });
      const existDefault = fs.existsSync(testGzipFile);
      const existGzip = fs.existsSync(testOutputFile);
      expect(existDefault).toBe(false);
      expect(existGzip).toBe(true);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it('fails when use invalid compress mode', async () => {
    try {
      await gzipme(testFile, { compress: 'best' });
    } catch (err) {
      expect(err).toMatch('Mode not allowed.');
    }
  });

  it('fails when file not exists', async () => {
    const invalidFile = 'unknown.json';
    try {
      await gzipme(invalidFile);
    } catch (err) {
      expect(err).toStrictEqual(new Error(`File ${invalidFile} doesn't exist.`));
    }
  });

  it('fails when file is not a string', async () => {
    const invalidFile = {};
    try {
      await gzipme(invalidFile);
    } catch (err) {
      expect(err).toStrictEqual(new Error('File must be a string.'));
    }
  });

  it('fails when params is an array', async () => {
    try {
      await gzipme(testFile, []);
    } catch (err) {
      expect(err).toStrictEqual(new Error('Params must be an object.'));
    }
  });

  it('fails when params is a string', async () => {
    try {
      await gzipme(testFile, 'invalid');
    } catch (err) {
      expect(err).toStrictEqual(new Error('Params must be an object.'));
    }
  });

  it('fails when params is a date', async () => {
    try {
      await gzipme(testFile, new Date());
    } catch (err) {
      expect(err).toStrictEqual(new Error('Params must be an object.'));
    }
  });

  it('fails when params is a number', async () => {
    try {
      await gzipme(testFile, 1111);
    } catch (err) {
      expect(err).toStrictEqual(new Error('Params must be an object.'));
    }
  });

  it('fails when params is a boolean', async () => {
    try {
      await gzipme(testFile, true);
    } catch (err) {
      expect(err).toStrictEqual(new Error('Params must be an object.'));
    }
  });

  it('fails when file is empty', async () => {
    try {
      await gzipme();
    } catch (err) {
      expect(err).toStrictEqual(new Error('File must be a string.'));
    }
  });
});
