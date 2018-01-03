'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-env node, mocha */
const chai_1 = require("chai");
const log_1 = require("../src/log");
describe('log', () => {
    let log;
    beforeEach(done => {
        log = new log_1.default();
        done();
    });
    afterEach(done => {
        log.off();
        done();
    });
    describe('debug()', () => {
        it('should emit a debug event when debug method is called', done => {
            log.on('debug', (message) => {
                chai_1.assert.strictEqual(message, 'test');
                done();
            });
            log.debug('test');
        });
    });
    describe('info()', () => {
        it('should emit a info event when info method is called', done => {
            log.on('info', (message) => {
                chai_1.assert.strictEqual(message, 'test');
                done();
            });
            log.info('test');
        });
    });
    describe('warn()', () => {
        it('should emit a warn event when warn method is called', done => {
            log.on('warn', (message) => {
                chai_1.assert.strictEqual(message, 'test');
                done();
            });
            log.warn('test');
        });
    });
    describe('error()', () => {
        it('should emit a error event when error method is called', done => {
            log.on('error', (message) => {
                chai_1.assert.strictEqual(message, 'test');
                done();
            });
            log.error('test');
        });
    });
    describe('formating strings', () => {
        it('should format a string message with util.format syntax', done => {
            log.on('debug', (message) => {
                chai_1.assert.strictEqual(message, 'test something');
                done();
            });
            log.debug('test %s', 'something');
        });
        it('should not format a non-string message', done => {
            const expected = { test: 'something' };
            log.on('debug', (message) => {
                chai_1.assert.deepEqual(message, expected);
                done();
            });
            log.debug(expected);
        });
    });
});
