/* eslint-env node, mocha */
const assert = require('chai').assert;
const Option = require('../src/option');

describe('option', () => {
  it('should return helper methods', () => {
    assert.isDefined((new Option().options()));
  });
  describe('option.parser()', () => {
    it('should return an object', () => {
      assert.isObject(Option.parser());
    });
    it('should return an extended object', () => {
      assert.deepEqual(Option.parser({
        engine: 'babylon',
      }), {
        language: 'javascript',
        engine: 'babylon',
        version: '6',
      });
    });
  });
  describe('option.compiler()', () => {
    it('should return an object', () => {
      assert.isObject(Option.compiler());
    });
    it('should return an extended object', () => {
      assert.deepEqual(Option.compiler({
        file: {
          format: 'html',
        },
      }), {
        file: {
          name: 'files',
          format: 'html',
        },
        template: {
          path: null,
          engine: 'jade',
        },
      });
    });
  });
  describe('option.theme()', () => {
    it('should return an object', () => {
      assert.isObject(Option.theme());
    });
    it('should return an extended object', () => {
      assert.deepEqual(Option.theme({ path: '/test' }),
      { name: 'mr-doc-theme-default', path: '/test' });
    });
  });
  describe('option.log()', () => {
    it('should return an object', () => {
      assert.isObject(Option.log());
    });
    it('should return an extended object', () => {
      assert.deepEqual(Option.log({ level: 'warn' }),
      { level: 'warn', silent: false });
    });
  });
  describe('option.project()', () => {
    it('should return an object', () => {
      assert.isObject(Option.project());
    });
    it('should return an extended object', () => {
      assert.deepEqual(Option.project({ name: 'Mr. Doc' }),
      { name: 'Mr. Doc', homepage: '#', repository: '#' });
    });
  });
  describe('option.defaults()', () => {
    it('should return an object', () => {
      assert.isObject(Option.defaults());
    });
  });
});
