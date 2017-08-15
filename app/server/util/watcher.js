import chokidar from 'chokidar';
import { logChange } from '@/util/logger';
import { pathes } from '~/configs';

const watcher = chokidar.watch(['./api'], { cwd: pathes.server });

watcher.on('change', logChange);

watcher.on('ready', function() {
  watcher.on('all', function() {
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\](api)[\/\\]/.test(id)) {
        delete require.cache[id];
        console.log(`Deleting ${id}`);
      }
    });
  });
});
