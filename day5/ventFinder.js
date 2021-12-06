const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});
const lines = [];
let count = 0;
rl.on('line', function (text) {
  count++;
  let lineParts = text.split("->");
  let firstCoord = lineParts[0].trim().split(",");
  let secondCoord = lineParts[1].trim().split(",");
  let xStart = parseInt(firstCoord[0]);
  let yStart = parseInt(firstCoord[1]);
  let xEnd = parseInt(secondCoord[0]);
  let yEnd = parseInt(secondCoord[1]);
  if (xStart === xEnd || yStart === yEnd
    || Math.abs(xStart - xEnd) === Math.abs(yStart - yEnd)) {
    lines.push({ xStart: xStart, yStart: yStart, xEnd: xEnd, yEnd: yEnd });
  }

});
rl.on('close', function () {
  console.log('vent result: ' + findVents(lines));
});

function findVents(lines) {
  //create the board
  console.log(count);
  console.log(lines.length);
  let board = [];
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      board.push({ x: i, y: j, covered: 0 })
    }
  }
  board.forEach((point) => {
    console.log(point);
    lines.forEach((inputLine) => {
      if (inputLine.xStart === point.x && point.x === inputLine.xEnd) {
        if ((inputLine.yStart >= point.y && point.y >= inputLine.yEnd)
          || (inputLine.yEnd >= point.y && point.y >= inputLine.yStart)) {
          point.covered++;
          console.log(inputLine);
          console.log('counted');
        }
      } else if (inputLine.yStart === point.y && point.y === inputLine.yEnd) {
        if ((inputLine.xStart >= point.x && point.x >= inputLine.xEnd)
          || (inputLine.xEnd >= point.x && point.x >= inputLine.xStart)) {
          point.covered++
          console.log(inputLine);
          console.log('counted');
        }
      } else if (Math.abs(inputLine.xStart - inputLine.xEnd)
        === Math.abs(inputLine.yStart - inputLine.yEnd)) {
        for (let i = 0; i <= Math.abs(inputLine.xStart - inputLine.xEnd); i++) {
          let xOnTheLine = null;
          let yOnTheLine = null;
          if (inputLine.xStart - inputLine.xEnd > 0) {
            xOnTheLine = inputLine.xStart - i;
            if (inputLine.yStart - inputLine.yEnd > 0) {
              yOnTheLine = inputLine.yStart - i;
            } else {
              yOnTheLine = inputLine.yStart + i;
            }
          } else {
            xOnTheLine = inputLine.xStart + i;
            if (inputLine.yStart - inputLine.yEnd > 0) {
              yOnTheLine = inputLine.yStart - i;
            } else {
              yOnTheLine = inputLine.yStart + i;
            }
          }
          if (xOnTheLine === point.x && yOnTheLine === point.y) {
            point.covered++
          }
        }
      }
    });
  });

  return board.filter((point) => { return point.covered > 1 }).length;
}