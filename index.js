'use strict';
const path = require("path");
const spawn = require('child_process').spawn;
const s2v = require('svg2vectordrawable');
const fs = require('fs');
const fss = require('fs-extra')
const CURRENT_PATH = process.cwd();
const PLATFORM = process.platform;
const stdout = (message) => console.log('\x1b[33m%s\x1b[0m', message)
const stderr = (message) => console.log('\x1b[31m%s\x1b[0m', message)

const exec = (command, env) => {
    env = Object.assign({}, process.env, env);
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
const exportSlices = (file, exportDir, formats) => {
    let appHome = path.resolve(process.env.SKETCH_HOME || CURRENT_PATH, "Sketch.app");
    let binPath = path.resolve(appHome, 'Contents/Resources/sketchtool/bin/sketchtool');
    if (!fs.existsSync(binPath)) {
        stderr("Sketch.app not found at" + binPath);
        stdout("Mising sketch tool, set --home or environment variable SKETCH_HOME for director of Sketch.app")
    }
    // fss.removeSync(exportDir);
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
const hasExt = (ext) => {
    return (file) => path.extname(file) === ext;
}
const svg2Vector = (dir, deleteWhenDone) => {
    return new Promise((resolve, reject) => {
        if (!fs.lstatSync(dir).isDirectory()) {
            return reject(`dir: ${dir} not found`);
        }
        const files = fs.readdirSync(dir).filter(hasExt('.svg'));
        stdout("files to convert" + fileName);
        const listPromies = files.map(file => {
            const fileName = path.resolve(dir, file);
            return new Promise((re, rj) => {
                const fileStr = fs.readFileSync(fileName);
                stdout("Converting " + fileName);
                s2v(fileStr)
                    .then(xmlCode => {
                        fs.writeFileSync(path.resolve(dir, fileName.slice(0, -4) + '.xml'), xmlCode, {
                            flag: 'w'
                        });
                        if(deleteWhenDone){
                            fss.removeSync(fileName);
                        }
                        stdout("convertion done" + fileName);
                        re("done");
                    }).catch(err => {
                        stderr(err);
                    });
            });
        });
        Promise.all(listPromies)
            .then(resolve)
            .catch(reject);
    });
}

exports.slices = exportSlices;
exports.stdout = stdout;
exports.stderr = stderr;
exports.svg2Vector = svg2Vector;