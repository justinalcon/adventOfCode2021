const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});
const points = [];
let y = 0;
let maxX = 0;
rl.on('line', function (text) {
  const lineValues = text.trim().split("");
  maxX = lineValues.length - 1;
  lineValues.forEach((lineValue, index) => {
    points.push({ x: index, y: y, value: parseInt(lineValue.trim()) });
  });
  y++;
});
rl.on('close', function () {
  console.log('smoke result: ' + aimLow(points, y - 1, maxX));
});

function aimLow(points, maxY, maxX) {
  lowPoints = [];
  points.forEach((guineaPig) => {
    let higherAdjacents = 0;
    points.forEach((possibleAdjacent) => {
      if (((possibleAdjacent.x === guineaPig.x && (Math.abs(possibleAdjacent.y - guineaPig.y) === 1))
        || (possibleAdjacent.y === guineaPig.y && (Math.abs(possibleAdjacent.x - guineaPig.x) === 1)))
        && possibleAdjacent.value > guineaPig.value) {
        higherAdjacents++;
        if (guineaPig.x === 0 || guineaPig.x === maxX) {
          //first or last char of line
          if (guineaPig.y === 0 || guineaPig.y === maxY) {
            //first or last line
            if (higherAdjacents === 2) {
              lowPoints.push(guineaPig);
              return;
            }
          } else {
            //edge but not corner
            if (higherAdjacents === 3) {
              lowPoints.push(guineaPig);
              return;
            }
          }
        } else {
          if (guineaPig.y === 0 || guineaPig.y === maxY) {
            //edge but not corner
            if (higherAdjacents === 3) {
              lowPoints.push(guineaPig);
              return;
            }
          } else {
            //middle
            if (higherAdjacents === 4) {
              lowPoints.push(guineaPig);
              return;
            }
          }

        }
      }
    });
  });

  let basins = [];
  lowPoints.forEach((lowPoint, index) => {
    let basin = [lowPoint];
    let lastLength = 1;
    let newLength = 0;
    while (lastLength !== newLength) {
      lastLength = basin.length;
      basin = getAdjacentNonNines(basin, points);
      newLength = basin.length;
    }
    basins.push({ basinNumber: index, basin });
  });
  let sizes = [];
  basins.forEach((basin) => {
    sizes.push(basin.basin.length);
  });
  sizes.sort(function (a, b) {
    return a - b;
  });
  console.log(sizes);

  return sizes[sizes.length - 1] * sizes[sizes.length - 2] * sizes[sizes.length - 3];
}

function getAdjacentNonNines(arrayOfLowPoints, allPoints) {
  let toReturn = arrayOfLowPoints;
  arrayOfLowPoints.forEach((point) => {
    allPoints.forEach((possibleBasinPoint) => {
      if (!(possibleBasinPoint.value === 9) && !(toReturn.includes(possibleBasinPoint))) {
        if (possibleBasinPoint.x === point.x && (Math.abs(possibleBasinPoint.y - point.y) === 1)) {
          toReturn.push(possibleBasinPoint);
        } else if (possibleBasinPoint.y === point.y && (Math.abs(possibleBasinPoint.x - point.x) === 1)) {
          toReturn.push(possibleBasinPoint);
        }
      }
    });
  });
  return toReturn;
}

