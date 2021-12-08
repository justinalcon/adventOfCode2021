const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});
const lines = [];
rl.on('line', function (text) {
  lines.push(text);
});
rl.on('close', function () {
  console.log('crab result: ' + moveCrabs(lines[0]));
});

function moveCrabs(crabPositions) {
  let minimumFuel = -1;
  let positionsArray = crabPositions.split(",");
  positionsArray.forEach(positionOnWhichToAlign => {
    let currentPositionFuel = 0;
    positionsArray.forEach(positionToTest => {
      for (let i = 1; i <= Math.abs(parseInt(positionOnWhichToAlign) - parseInt(positionToTest)); i++) {
        currentPositionFuel = currentPositionFuel + i;
      }
    });
    console.log(currentPositionFuel);
    if (minimumFuel === -1 || currentPositionFuel < minimumFuel) {
      minimumFuel = currentPositionFuel;
    }
  });
  return minimumFuel;
}