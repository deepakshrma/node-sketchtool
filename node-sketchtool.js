#!/usr/bin/env node

const {
  slices,
  svg2Vector,
  stderr
} = require("./index");
const program = require('commander');
program
  .version('0.0.1')
  .option('-f, --file <file>', 'Name of the Sketch File')
  .option('-F, --formats <formats>', 'Formats of the exports')
  .option('-d, --dir <dir>', 'Formats of the exports')
  .option('--home <home>', 'Sketch Home')
  .parse(process.argv);
const exportDir = program.dir || "drawable"
const formats = program.formats || "svg"
process.env.SKETCH_HOME = program.home || process.env.SKETCH_HOME
slices(program.file, exportDir, formats)
  .then(() => svg2Vector(exportDir))
  .catch(stderr);