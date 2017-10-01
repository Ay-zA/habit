/* eslint-disable */
import chokidar from 'chokidar';
import { logChange } from '@/util/logger';
import { log } from '@/util/logger';
import { pathes } from '~/configs';

const watcher = chokidar.watch(['./api'], { cwd: pathes.server });

watcher.on('change', logChange);

watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache).forEach(id => {
      if (/[\/\\](api)[\/\\]/.test(id)) {
        delete require.cache[id];
        log.info(`Updating ${id.split('\\').slice(-1)}`);
      }
    });
  });
});
