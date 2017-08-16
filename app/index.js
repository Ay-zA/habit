process.stdout.write('\033c');
require('babel-polyfill');
require('babel-register');
require('./server/server.js');
