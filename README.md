# SCSS-Bundling

Watches for changes in your styles directory and generates a `bundle.scss` file that imports all your scss files into it. All you need to do manually is import the `bundle.scss` file.

## Commands
```bash
  scss-bundling watch   # watch and auto-update bundle.scss
  scss-bundling build   # generate bundle.scss once
```
## Configuration
Create a `scss-bundling.config.json` file in your project root.
The generated `bundle.scss` is always ignored by default.

- **rootDir**: directory to watch
- **outputFile**: bundle output
- **ignore**: file names to ignore
```json
{
  "rootDir": "src/styles",
  "outputFile": "src/styles/bundle.scss",
  "ignore": ["globals.scss", "index.scss"]
}
```
