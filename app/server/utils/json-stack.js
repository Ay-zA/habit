import { sep } from 'path';
import parseStack from 'parse-stack';

export const jsonStack = err =>
  parseStack(err)
    .filter(stack => !stack.filepath.includes('node_modules'))
    .map(stack => ({
      name: stack.name,
      filepath: `${stack.filepath.split(sep).join('/')} | ${stack.lineNumber}`
    }));
