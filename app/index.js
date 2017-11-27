const clear = require('clear-it');
require('@babel/register');
require('@babel/polyfill');

clear();
require('./server/server.js');
