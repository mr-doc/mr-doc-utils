'use strict';

const Util = require('util');
const chalk = require('chalk');
const sparkles = require('sparkles');
import * as _ from 'lodash';
import { EventEmitter } from 'events';

/**
 * Format the messagse
 * @param  {*} message - The message to format.
 * @return {*}         - The formatted message.
 */
function format() {
  return _.isString(arguments[0]) ? Util.format.apply(null, arguments) : arguments[0];
}
/**
 * Create an emitter
 * @ignore
 * @return function - The emitter function that emits the message.
 */
const emitter = (level: string) => 
function emit(this: EventEmitter, ...args: any[]) {
  this.emit(level, format.apply(null, args));
};

/** @class Log - A class that represents a logger. */
export default 
class Log {
  private event: any
  /**
   * The namespace of the logger's instance
   * @param namespace: string = 'mrdoc'
   */
  constructor(namespace: string = 'mrdoc') {
    this.event = sparkles(namespace);
    Log.levels.forEach(level => { this.event[level] = emitter(level); });
  }
  /**
   * Call the debug logger.
   */
  debug(...args: any[]) {
    this.event.debug(...args);
  }
  /**
   * Call the debug logger.
   */
  info(...args: any[]) {
    this.event.info(...args);
  }
  /**
   * Call the debug logger.
   */
  warn(...args: any[]) {
    this.event.warn(...args);
  }
  /**
   * Call the debug logger.
   */
  error(...args: any[]) {
    this.event.error(...args);
  }
  /**
   * Catch the event based on log level.
   */
  on(...args: any[]) {
    this.event.on(...args);
  }
  /**
   * Unsubscribe to the current namespace.
   */
  off() {
    this.event.remove();
  }
  /**
   * Get the available levels.
   * @static
   * @return {Array<string>} - The available levels in Log.
   */
  static get levels() {
    return ['debug', 'info', 'warn', 'error'];
  }
  /**
   * Get an instance of Chalk.
   * @return {Chalk} - An instance of Chalk.
   */
  static get color() {
    return chalk;
  }
}