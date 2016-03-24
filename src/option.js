'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const Path = require('path');

// Set default options
const defaults = {
  parser: { language: 'javascript', engine: 'espree', version: '6' },
  compiler: {
    file: {
      name: 'files',
      format: 'json',
    },
    template: {
      path: null,
      engine: 'jade',
    },
  },
  theme: { name: 'mr-doc-theme-default', path: null },
  log: { level: 'info', silent: false },
  project: { name: '#', homepage: '#', repository: '#' },
};

/** @class Option - A class that represents an option. */
class Option {
  /**
   * Create an options util.
   * @param  {Object} options - The options for Mr. Doc.
   */
  constructor(options) {
    this._options = options || {};
  }
  /**
   * Get the options.
   * @return {Object} - An object with helper methods.
   * @example
   * // Get the options;
   * const options = (new Option(myoptions)).options();
   *
   * // Get the options for parser
   * const parserOp = options.parser();
   *
   * // Get the options for compiler
   * const compilerOp = options.compiler();
   *
   * // Get the options for theme
   * const themeOp = options.theme();
   *
   * // Get the options for project
   * const projectOp = options.project();
   *
   * // Get the default options
   * const defaultOp = options.project();
   *
   * // Merge yarg options.
   * const yargOp = options.merge(Yarg.argv);
   *
   * // Get CLI options.
   * const cliOp = options.cli();
   */
  options() {
    return {
      parser: () => Option.parser(this._options.parser),
      compiler: () => Option.compiler(this._options.compiler),
      theme: () => Option.theme(this._options.theme),
      log: () => Option.log(this._options.log),
      project: () => Option.project(this._options.project),
      defaults: () => Option.defaults(),
      merge: (opts) => Option.merge(opts),
      cli: () => Option.cli(),
    };
  }
  /**
   * Get the parser options.
   * @static
   * @param  {Object} options - The options for the parser.
   * @return {Object}         - The extended options for the parser.
   */
  static parser(options) {
    return _.merge(defaults.parser, options || {});
  }
  /**
   * Get the compiler options.
   * @static
   * @param  {Object} options - The options for the compiler.
   * @return {Object}         - The extended options for the compiler.
   */
  static compiler(options) {
    return _.merge(defaults.compiler, options || {});
  }
  /**
   * Get the theme options.
   * @static
   * @param  {Object} options - The options for the theme.
   * @return {Object}         - The extended options for the theme.
   */
  static theme(options) {
    return _.merge(defaults.theme, options || {});
  }
  /**
   * Get the log options.
   * @param  {Object} options - The options for the log.
   * @return {Object}         - The extended options for the log.
   */
  static log(options) {
    return _.merge(defaults.log, options || {});
  }
  /**
   * Get the project options.
   * @static
   * @param  {Object} options - The options for the project.
   * @return {Object}         - The extended options for the project.
   */
  static project(options) {
    return _.merge(defaults.project, options || {});
  }
  /**
   * Get the default options.
   * @static
   * @return {Object} The default options for Mr. Doc.
   */
  static defaults() {
    return defaults;
  }
  /**
   * Merge CLI options.
   * @param  {Object} options - The yarg options to merge.
   * @return {Object}         - The merged options.
   */
  static merge(options) {
    return {
      mrdoc: {
        source: options.source || options.s,
        output: options.output || options.o,
        cwd: options.cwd,
      },
      compiler: Option.compiler({
        file: {
          name: options.formatName,
          format: options.format,
        },
        template: {
          path: options.template || options.b || null,
          engine: options.compilerEngine,
        },
      }),
      parser: Option.parser({
        language: options.parserLang,
        engine: options.parserEngine,
        version: options.parserVersion,
      }),
      theme: Option.theme({
        name: !File.lstatSync(options.theme).isDirectory() ?
        options.theme : 'Custom theme',
        path: File.lstatSync(options.theme).isDirectory() ?
        options.theme : null,
      }),
    };
  }
  /**
   * Get CLI options.
   * @return {Object} - The CLI options.
   */
  static cli() {
    return {
      version: {
        alias: 'v',
        type: 'boolean',
        describe: chalk.gray('Print the global version.'),
      },
      mrdocrc: {
        type: 'string',
        default: Path.join(process.cwd(), '.mrdocrc'),
        describe: chalk.gray(
          `Set the path to .mrdocrc.
          This will set the cwd to the rc's directory as well.`),
      },
      cwd: {
        type: 'string',
        default: Path.normalize(process.cwd()),
        describe: chalk.gray('Set the cwd.'),
      },
      'compiler-engine': {
        type: 'string',
        default: 'jade',
        describe: chalk.gray('Set the compiler engine specific to the output format.'),
      },
      source: {
        alias: 's',
        type: 'string',
        describe: chalk.gray(
          'Set the source directory(-ies). Note: Glob notation is allowed.'),
      },
      output: {
        alias: 'o',
        type: 'string',
        default: Path.join(process.cwd(), 'docs/'),
        describe: chalk.gray('Set the output directory.'),
      },
      format: {
        alias: 'f',
        type: 'string',
        default: 'html',
        describe: chalk.gray('Set the output format. Formats: html, json, md'),
      },
      'format-name': {
        type: 'string',
        default: 'docs',
        describe: chalk.gray('Set the output name. Note: Only in json and md format.'),
      },
      template: {
        alias: 'b',
        type: 'string',
        describe: chalk.gray('Set the template file to use.'),
      },
      theme: {
        alias: 't',
        type: 'string',
        // TODO: Replace this with mr-doc-theme-default
        default: 'mr-doc-theme-starter-kit',
        describe: chalk.gray('Set the theme to use. Note: Name or path is allowed.'),
      },
      'parser-lang': {
        type: 'string',
        default: 'javascript',
        describe: chalk.gray(
          'Set the language of the sources. Note: This is automatically detected.'),
      },
      'parser-engine': {
        alias: 'e',
        type: 'string',
        default: 'espree',
        describe: chalk.gray(
          'Set the parser engine (if applicable). i.e. espree, babylon, etc.'),
      },
      'parser-version': {
        alias: 'y',
        type: 'number',
        default: 6,
        describe: chalk.gray('Set the parser version. i.e. "6"'),
      },
      log: {
        alias: 'l',
        type: 'string',
        describe: chalk.gray(`Set the log level. Levels: ${[
          chalk.green('debug'),
          chalk.blue('info'),
          chalk.yellow('warn'),
          chalk.red('error'),
          chalk.gray('silent'),
        ].join(', ')}`),
        required: false,
        default: 'info, warn',
      },
    };
  }
}

module.exports = Option;
