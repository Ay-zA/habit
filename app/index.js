import clear from 'clear-it';
import config from '~/configs';
import { start } from './server';

clear();
start(config);
