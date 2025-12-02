const chokidar = require('chokidar');
const build = require('./bundler');

module.exports = function watch() {
  let timeout = null;

  const watcher = chokidar.watch('src/styles', {
    persistent: true,
    ignoreInitial: true,
    ignored: /bundle\.scss$/,
  });

  const run = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      build();
    }, 150);
  };

  watcher.on('all', run);
  console.log("Watching SCSS files...");
};
