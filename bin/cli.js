#!/usr/bin/env node

const watch = require('../src/watch');
const build = require('../src/bundler');

const args = process.argv.slice(2);

if (args[0] === "watch") {
  watch();
} else if (args[0] === "build") {
  build();
} else {
  console.log(`
Usage:
  scss-bundling watch   # watch and auto-update bundle.scss
  scss-bundling build   # generate bundle.scss once
  `);
}
