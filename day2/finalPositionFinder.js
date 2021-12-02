const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});
let horizontal = 0;
let vertical = 0;
let aim = 0;
rl.on('line', function (text) {
  const commandParts = text.split(" ");
  const command = commandParts[0];
  const commandValue = parseInt(commandParts[1]);
  switch (command) {
    case 'forward':
      horizontal = horizontal + commandValue;
      vertical = vertical + (aim * commandValue);
      break;
    case 'down':
      aim = aim + commandValue;
      break;
    case 'up':
      aim = aim - commandValue;
      break;
  }

});
rl.on('close', function () {
  console.log('horizontal: ' + horizontal);
  console.log('vertical: ' + vertical);
  console.log('product: ' + (horizontal * vertical));
});
