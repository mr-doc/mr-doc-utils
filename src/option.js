'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const _ = require("lodash");
const chalk_1 = require("chalk");
function options(option = {}) {
    return _.assign({
        parser: {
            language: 'javascript',
        },
        compiler: {
            file: {
                name: 'docs',
                format: 'html',
            },
        },
        log: {
            level: 'info, warn',
            silent: false,
        },
        project: {
            name: '#',
            url: {
                home: '#',
                repo: '#',
            },
        },
        mrdoc: {
            source: 'src/',
            output: 'doc/',
            cwd: process.cwd(),
            watch: false,
            include: [],
            exclude: []
        },
    }, option);
}
exports.options = options;
function assign(opt) {
    return {
        mrdoc: {
            source: opt.source || opt.s,
            output: opt.output || opt.o,
            cwd: opt.cwd,
            watch: opt.watch || opt.w,
        },
        compiler: {
            file: {
                name: opt.formatName,
                format: opt.format,
            },
        },
        parser: {
            language: opt.parserLang,
            version: opt.parserVersion,
        },
        include: [],
        exclude: []
    };
}
exports.assign = assign;
function cli() {
    return {
        version: {
            alias: 'v',
            type: 'boolean',
            describe: chalk_1.default.gray('Print the global version.'),
        },
        mrdocrc: {
            type: 'string',
            default: Path.join(process.cwd(), '.docrc'),
            describe: chalk_1.default.gray(`Set the path to .docrc.
        This will set the cwd to the rc's directory as well.`),
        },
        cwd: {
            type: 'string',
            default: Path.normalize(process.cwd()),
            describe: chalk_1.default.gray('Set the cwd.'),
        },
        source: {
            alias: 's',
            type: 'string',
            describe: chalk_1.default.gray('Set the source directory(-ies). Note: Glob notation is allowed.'),
        },
        output: {
            alias: 'o',
            type: 'string',
            default: Path.join(process.cwd(), 'docs/'),
            describe: chalk_1.default.gray('Set the output directory.'),
        },
        format: {
            alias: 'f',
            type: 'string',
            default: options().compiler.file.format,
            describe: chalk_1.default.gray('Set the output format. Formats: html, json, md.'),
        },
        'format-name': {
            type: 'string',
            default: options().compiler.file.name,
            describe: chalk_1.default.gray('Set the output name. Note: Only in json and md format.'),
        },
        'parser-lang': {
            type: 'string',
            default: options().parser.language,
            describe: chalk_1.default.gray('Set the language of the sources. Note: This is automatically detected.'),
        },
        'project-name': {
            type: 'string',
            default: options().project.name,
            describe: chalk_1.default.gray('Set the project name.'),
        },
        'project-homepage': {
            type: 'string',
            default: options().project.url.home,
            describe: chalk_1.default.gray('Set the project homepage url.'),
        },
        'project-repo': {
            type: 'string',
            default: options().project.url.repo,
            describe: chalk_1.default.gray('Set the project url.'),
        },
        log: {
            alias: 'l',
            type: 'string',
            describe: chalk_1.default.gray(`Set the log level. Levels: ${[
                chalk_1.default.green('debug'),
                chalk_1.default.blue('info'),
                chalk_1.default.yellow('warn'),
                chalk_1.default.red('error'),
                chalk_1.default.gray('silent'),
            ].join(', ')}`),
            required: false,
            default: options().log.level,
        },
        watch: {
            alias: 'w',
            type: 'boolean',
            default: false,
            describe: chalk_1.default.gray('Allow changes and additions to be watched.'),
        },
    };
}
exports.cli = cli;
function merge(opt, normalize) {
    return _.merge(options(), normalize ? assign(opt) : opt);
}
exports.merge = merge;
exports.default = {
    options,
    assign,
    merge,
    cli,
};
