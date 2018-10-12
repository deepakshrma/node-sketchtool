#!/usr/bin/env node

'use strict';
const program = require('commander');
const path = require("path");
// const {spawn} = require('child_process');
const spawn = require('child_process').spawn;

// const {
//   spawn
// } = require('batman-cli/lib/utils.js');
const s2v = require('svg2vectordrawable');
const fs = require('fs');
const fss = require('fs-extra')

const CURRENT_PATH = process.cwd();
const PLATFORM = process.platform;
const PROCESS_ENV = process.env;
const stdout = (message) => console.log('\x1b[33m%s\x1b[0m', message)
const stderr = (message) => console.log('\x1b[31m%s\x1b[0m', message)

program
  .version('0.0.1')
  .option('-f, --file <file>', 'Name of the Sketch File')
  .option('-F, --formats <formats>', 'Formats of the exports')
  .option('-d, --dir <dir>', 'Formats of the exports')
  .option('--home <home>', 'Sketch Home')
  .parse(process.argv);
let appHome = path.resolve(program.home || PROCESS_ENV.SKETCH_HOME || CURRENT_PATH, "Sketch.app");
let binPath = path.resolve(appHome, 'Contents/Resources/sketchtool/bin/sketchtool');
if(!fs.existsSync(binPath)){
  stderr("Sketch.app not found at" + binPath);
  stdout("Mising sketch tool, set --home or environment variable SKETCH_HOME for director of Sketch.app")
}
const exportDir = program.dir || "drawable"
const formats = program.formats || "svg"
const exec = (command, env) => {
  env = Object.assign({}, PROCESS_ENV, env);
  let sh = 'sh';
  let shFlag = '-c';
  if (PLATFORM === 'win32') {
    sh = 'cmd';
    shFlag = '/c';
    command = '"' + command.trim() + '"';
  }
  return spawn(sh, [shFlag, command], {
    env: env,
    windowsVerbatimArguments: PLATFORM === 'win32',
    stdio: 'pipe'
  });
};
const exportSlices = (binPath, file, exportDir, formats) => {
  return new Promise((resolve, reject) => {
    const proc = exec(`${binPath} export slices ${file} --output=${exportDir} --formats=${formats}`);
    let output = "";
    proc.on('close', function (code) {
      code == 0 ? resolve(output) : reject("failed");
    });
    proc.stdout.on('data', function (data) {
      output = output + data.toString();
    });
    proc.on('error', function (err) {
      stderr(err);
      reject(err);
    });
  });
}
// const tempPath = path.resolve(CURRENT_PATH, ".__tmp")
const xportVector = (fileSting) => {
  return new Promise((resolve, reject) => {
    const filesName = (fileSting || "").trim().split("\n").map(x => {
      return path.resolve(exportDir, (x.replace("Exported ", "")));
    });
    const listOfFiles = filesName.filter(f => !fs.lstatSync(f).isDirectory() && path.extname(f) === '.svg').map(file => {
      return new Promise((re, rj) => {
        const fileStr = fs.readFileSync(file);
        stdout("Converting " + file);
        s2v(fileStr)
          .then(xmlCode => {
            fs.writeFileSync(path.resolve(exportDir, file.slice(0, -4) + '.xml'), xmlCode);
            fss.removeSync(file);
            re("done");
          }).catch(err => {
            rj(err);
          });
      });
    });
    Promise.all(listOfFiles)
      .then(resolve)
      .catch(reject);
  });

}
fss.removeSync(exportDir);
exportSlices(binPath, program.file, exportDir, formats)
  .then(xportVector)
  .catch(stderr);