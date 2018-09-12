/** @format */

const babelCore = require('babel-core');
const path = require('path');
const fs = require('fs');

const source = fs.readFileSync(path.join(__dirname, '/src/index.js'), 'utf8');
const code = babelCore.transform(source, {
  babelrc: false,
  presets: ['env', 'flow'],
  plugins: ['transform-object-rest-spread', 'babel-plugin-inferno', 'syntax-jsx']
}).code;
const codeMin = babelCore.transform(source, {
  babelrc: false,
  presets: ['env', 'flow', 'minify'],
  plugins: ['transform-object-rest-spread', 'babel-plugin-inferno', 'syntax-jsx']
}).code;

fs.writeFileSync(path.join(__dirname, '/lib/index.js'), code, 'utf8');
fs.writeFileSync(path.join(__dirname, '/lib/index.min.js'), codeMin, 'utf8');
fs.writeFileSync(path.join(__dirname, '/example/src/lib.js'), code, 'utf8');
