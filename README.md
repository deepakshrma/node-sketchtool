## Node Sketch Tool
Helper to extract slices from Sketch.app and help to convert svg to vector drawable.

### How to install[Bash]
```
npm install -g deepak/node-sketch
```
### Help Print
```bash
node-sketchtool -h
```
#### Full Commands
```
Usage: node-sketchtool [options]

Options:
  -V, --version            output the version number
  -f, --file <file>        Name of the Sketch File
  -F, --formats <formats>  Formats of the exports
  -d, --dir <dir>          Formats of the exports
  --home <home>            Sketch Home
  -h, --help               output usage information
```
### Require Node module
```
const {
  slices,
  svg2Vector,
  stderr
} = require("node-sketch");
process.env.SKETCH_HOME = "Directory of the Sketch.app"
slices(inputFilePath, exportDir, formats)
  .then(()=> svg2Vector(exportDir))
  .catch(stderr);
```