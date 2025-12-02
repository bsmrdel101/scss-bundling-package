const fs = require('fs');
const path = require('path');


module.exports = function generateBundle(options = {}) {
  const rootDir = path.resolve(options.rootDir || 'src/styles');
  const outputFile = path.resolve(options.outputFile || path.join(rootDir, 'bundle.scss'));
  const ignoredFiles = ['bundle.scss', ...options.ignore || []];

  function getScssFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files = files.concat(getScssFiles(fullPath));
      } else if (
        entry.isFile() &&
        entry.name.endsWith('.scss') &&
        !ignoredFiles.includes(entry.name)
      ) {
        files.push(fullPath);
      }
    }
    return files;
  }

  function normalize(filePath) {
    const relative = path.relative(path.dirname(outputFile), filePath).replace(/\\/g, '/');
    const noUnderscore = relative.replace(/^_/, '').replace(/\.scss$/, '');
    return `@use '${noUnderscore}';`;
  }


  const scssFiles = getScssFiles(rootDir);
  const newImports = new Set(scssFiles.map(normalize));

  let currentLines = [];
  if (fs.existsSync(outputFile)) {
    currentLines = fs.readFileSync(outputFile, 'utf8')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
  }

  const currentImports = new Set(currentLines);

  const toAdd = [...newImports].filter(line => !currentImports.has(line));
  const toRemove = [...currentImports].filter(line => !newImports.has(line));

  if (toAdd.length === 0 && toRemove.length === 0) {
    console.log('No changes needed.');
    return;
  }

  const updatedLines = currentLines
    .filter(line => !toRemove.includes(line))
    .concat(toAdd);

  fs.writeFileSync(outputFile, updatedLines.join('\n') + '\n');
  console.log('bundle.scss updated.');
}
