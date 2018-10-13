## Node Sketch Tool
Helper to extract slices from Sketch.app and help to convert svg to vector drawable.

### How to install[Bash]
```
npm install -g git+https://git@github.com/deepakshrma/node-sketchtool.git
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
  --slice                  Slice it
  --s2v                    Convert SVG 2 Vector
  -F, --formats <formats>  Formats of the exports
  -d, --dir <dir>          Directory of files
  --home <home>            Sketch Home
  -h, --help               output usage information
```
#### Svg2Vector
```
node-sketchtool --dir /Users/deepak/Downloads/drawable
```
#### Sketch Slicing
```
node-sketchtool --slice -f ~/Downloads/icons.sketch
```
#### Sketch Slicing and Svg2Vector convert
```
node-sketchtool --slice --s2v -f ~/Downloads/icons.sketch
```
### Require Node module
```
npm install git+https://git@github.com/deepakshrma/node-sketchtool.git
```
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