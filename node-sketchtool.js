#!/usr/bin/env node

const {
  slices,
  svg2Vector,
  stderr,
  stdout
} = require("./index");
const program = require('commander');

program
  .version('0.0.1')
  .option('-f, --file <file>', 'Name of the Sketch File')
  .option('--slice', 'Slice it')
  .option('--s2v', 'Convert SVG 2 Vector')
  .option('-F, --formats <formats>', 'Formats of the exports')
  .option('-d, --dir <dir>', 'Directory of files')
  .option('--home <home>', 'Sketch Home')
  .parse(process.argv);
const exportDir = program.dir || "drawable"
const formats = program.formats || "svg"
process.env.SKETCH_HOME = program.home || process.env.SKETCH_HOME
if (program.slice && program.s2v) {
  slices(program.file, exportDir, formats)
    .then(() => svg2Vector(exportDir, true))
    .then(() => stdout("Slicing and Converting done."))
    .catch(stderr);
}
if (program.slice) {
  slices(program.file, exportDir, formats)
    .then(() => stdout("Slicing done."))
    .catch(stderr);
} else {
  svg2Vector(exportDir, true)
    .then(() => stdout("svg2Vector done."))
    .catch(stderr);
}
