'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MochaWrapper = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _environmentVariableParsers = require('../environment-variable-parsers');

var _escapeRegExp = require('../utils/escape-reg-exp');

var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../babel-register');
var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path'),
    exit = require('exit'),
    glob = require('glob'),
    ui = require('./mocha-fiberized-ui'),
    _ = require('underscore');

var MochaWrapper = function MochaWrapper() {
  (0, _classCallCheck3.default)(this, MochaWrapper);

  var mochaConfig = JSON.parse(process.env.mochaConfig);
  var mochaCommandLineOptions = process.env['chimp.mochaCommandLineOptions'] ? JSON.parse(process.env['chimp.mochaCommandLineOptions']) : false;
  if (mochaCommandLineOptions && _.isObject(mochaCommandLineOptions)) {
    _.extend(mochaConfig, mochaCommandLineOptions);
  }
  mochaConfig.ui = 'fiberized-bdd-ui';
  if (!mochaConfig.grep && (0, _environmentVariableParsers.parseBoolean)(process.env['chimp.watch'])) {
    mochaConfig.grep = new RegExp((0, _environmentVariableParsers.parseString)(process.env['chimp.watchTags']).split(',').map(_escapeRegExp2.default).join('|'));
  } else if (!mochaConfig.grep) {
    mochaConfig.grep = new RegExp((0, _environmentVariableParsers.parseString)(mochaConfig.tags).split(',').map(_escapeRegExp2.default).join('|'));
  }

  var mocha = new Mocha(mochaConfig);

  mocha.addFile(path.join(path.resolve(__dirname, path.join('mocha-helper.js'))));
  if (process.argv.length > 3) {
    process.argv.splice(3).forEach(function (spec) {
      mocha.addFile(spec);
    });
  } else {
    // Add each .js file in the tests dir to the mocha instance
    var testDir = process.env['chimp.path'];
    glob.sync(path.join(testDir, '**')).filter(function (file) {
      // Only keep the .js files
      return file.substr(-3) === '.js';
    }).forEach(function (file) {
      mocha.addFile(file);
    });

    if (process.env['chimp.files']) {
      // Add each file specified by the "files" option to the mocha instance
      glob.sync(process.env['chimp.files']).forEach(function (file) {
        mocha.addFile(file);
      });
    }
  }

  try {
    // Run the tests.
    mocha.run(function (failures) {
      exit(failures);
    });
  } catch (e) {
    throw e;
  }
};

exports.MochaWrapper = MochaWrapper;