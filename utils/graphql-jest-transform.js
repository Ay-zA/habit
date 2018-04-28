const fs = require('fs');
const path = require('path');

const getLines = file => file.split(/(\r\n|\r|\n)/);
const filterComments = lines => lines.filter(line => line[0] === '#');
const filterImports = lines => lines.filter(line => line.slice(1).split(' ')[0] === 'import');
const getImportPathes = lines => lines.map(line => line.slice(1).split(' ')[1]);
const getValidPathes = pathes => pathes.map(_path => _path && _path.match(/^["'](.+)["']/)[1]);
const resolveImportPathes = (importPathes, srcPath) =>
  importPathes.map((importPath) => {
    const sourceDir = path.dirname(srcPath);
    return path.resolve(sourceDir, importPath);
  });
const importContents = (resolvedImportPathes, src) =>
  resolvedImportPathes.reduce(
    (accumulator, importPath) => accumulator + fs.readFileSync(importPath).toString(),
    src
  );
const exportContent = content => `module.exports = \`${content}\``;

const resolveImports = (src, srcPath) => {
  const lines = getLines(src);
  const comments = filterComments(lines);
  const imports = filterImports(comments);
  const importPathes = getImportPathes(imports);
  const validImportPathes = getValidPathes(importPathes);
  const resolvedImportPathes = resolveImportPathes(validImportPathes, srcPath);
  const content = importContents(resolvedImportPathes, src);

  return content;
};

module.exports = {
  process(src, srcPath) {
    const content = resolveImports(src, srcPath);
    const dist = exportContent(content);

    return dist;
  }
};
