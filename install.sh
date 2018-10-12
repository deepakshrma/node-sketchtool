mkdir -p ~/Softwares/node-sketch/
unzip -o dist/node-sketch.zip -d ~/Softwares/node-sketch/
echo "export PATH=\$PATH:~/Softwares/node-sketch/" >> ~/.bash_profile

## Build zip
## zip -r "dist/node-sketch.zip" . --exclude "*.DS_Store*"  --exclude "*.git*" --exclude "*dist*"