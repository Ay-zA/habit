const clear = require('clear-it');
require('babel-register');
require('babel-polyfill');

clear();
const server = require('./server');

server.start();
