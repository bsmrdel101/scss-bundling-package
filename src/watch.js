const chokidar = require('chokidar');
const generateBundle = require('./bundler');
const fs = require('fs');
const path = require('path');

module.exports = function watch() {
  let timeout = null;
  let options = {};

  const configPath = path.resolve('scss-bundling.config.json');
  if (fs.existsSync(configPath)) {
    options = require(configPath);
  }

  const watcher = chokidar.watch(options.rootDir || 'src/styles', {
    persistent: true,
    ignoreInitial: true,
    ignored: (filePath) => {
      const fileName = path.basename(filePath);
      const customIgnored = options.ignore || [];
      if (['bundle.scss', ...customIgnored].includes(fileName)) return true;
      return false;
    }
  });

  const run = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      generateBundle(options);
    }, 150);
  };

  watcher.on('all', run);
  console.log(`Watching SCSS files in ${options.rootDir || 'src/styles'}...`);
};
