## Node Sketch Tool
Helper to extract slices from Sketch.app and help to convert svg to vector drawable.

### How to install[Bash]
Clone and run install.sh

```bash
git clone https://github.com/deepakshrma/node-sketchtool.git
cd node-sketch && ./install.sh
```
### How to install[Node Style]
```
git clone https://github.com/deepakshrma/node-sketchtool.git
cd node-sketch && npm install && npm install -g .
```
### How to run
```bash
## Run ~/Softwares/node-sketch/node-sketchtool
## OR
## ~/Softwares/node-sketch/node-sketchtool.js
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