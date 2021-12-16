const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});

let connections = [];
let paths = ['start,'];
rl.on('line', function (text) {
  connection = text.trim().split("-");
  let forwardExisted = false;
  let backwardExisted = false;
  connections.forEach((existing) => {
    if (existing.cave.start == connection[0]) {
      forwardExisted = true;
      existing.cave.connections.push(connection[1]);
    }
    if (existing.cave.start == connection[1]) {
      backwardExisted = true;
      existing.cave.connections.push(connection[0]);
    }
  });
  if (!forwardExisted) {
    connections.push({ cave: { start: connection[0], connections: [connection[1]] } });
  }
  if (!backwardExisted) {
    connections.push({ cave: { start: connection[1], connections: [connection[0]] } });
  }
});
rl.on('close', function () {
  console.log('paths count result: ' + countPaths());
});

function aintSeentTwoLowers(path) {
  let doubleAvailable = true;
  let lowersSeent = [];
  path.split(",").forEach((caveInPath) => {
    if (caveInPath.toLowerCase() === caveInPath) {
      //its lower
      if (lowersSeent.includes(caveInPath)) {
        //we've seen this lower before, so not available
        doubleAvailable = false;
      }
      lowersSeent.push(caveInPath);
    }
  });
  lowersSeent = 0;

  return doubleAvailable;
}
function countPaths() {
  let mapUpdated = true;
  while (mapUpdated) {
    mapUpdated = addPossiblePaths();
  };
  return paths.length;
}

function addPossiblePaths() {
  let updatedPaths = false;
  let newPaths = [];
  paths.forEach((path) => {
    let cavesInPath = path.split(",");
    let lastCaveInPath = cavesInPath[cavesInPath.length - 2];
    let doubleAvailable = aintSeentTwoLowers(path);
    if (lastCaveInPath === 'end') {
      newPaths.push(path);
    } else {
      connections.forEach((connection) => {
        if (connection.cave.start === lastCaveInPath) {
          connection.cave.connections.forEach((possibleNextCave) => {
            if (!(possibleNextCave === 'start')) {
              if (possibleNextCave.toLowerCase() === possibleNextCave) {
                // its lower
                if ((possibleNextCave === 'end') || !(cavesInPath.includes(possibleNextCave)) ||
                  ((cavesInPath.indexOf(possibleNextCave) === cavesInPath.lastIndexOf(possibleNextCave)) &&
                    doubleAvailable)) {
                  newPaths.push(path + possibleNextCave + ",");
                  updatedPaths = true;
                }
              } else {
                newPaths.push(path + possibleNextCave + ",");
                updatedPaths = true;
              }
            }
          });
        }
      });
    }
  });
  paths = newPaths;
  return updatedPaths;
}

function doubleAvailable(path) {
  let doubleAvailable = true;
  let lowersSeent = [];
  path.split(",").forEach((caveInPath) => {
    if (caveInPath.toLowerCase() === caveInPath) {
      //its lower
      if (lowersSeent.includes(caveInPath)) {
        //we've seen this lower before, so not available
        doubleAvailable = false;
      }
      lowersSeent.push(caveInPath);
    }
  });
  lowersSeent = 0;

  return doubleAvailable;
}