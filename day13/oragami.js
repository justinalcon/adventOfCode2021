const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});

let highestX = 0;
let highestY = 0;
let litPoints = [];
let folds = [];
let board = [];
rl.on('line', function (text) {
  if (text.trim()) {
    let splitLine = text.trim().split(",");
    if (isNumeric(splitLine[0])) {
      let x = parseInt(splitLine[0]);
      let y = parseInt(splitLine[1]);
      if (x > highestX) {
        highestX = x;
      }
      if (y > highestY) {
        highestY = y;
      }
      litPoints.push({ x: x, y: y });
    } else {
      //its a fold
      splitLine = text.trim().split(" ");
      let splitCommand = splitLine[2].split("=");
      folds.push({ axis: splitCommand[0], value: splitCommand[1] });
    }
  }
});
rl.on('close', function () {
  buildTheBoard();
  console.log('folding result: ' + makeSwan());
});

function updateLit(boardToCheckForLights) {
  litPoints = [];
  boardToCheckForLights.forEach(point => {
    if (point.lit) {
      litPoints.push({ x: point.x, y: point.y });
    }
  });
}
function foldBoard(boardToFold, fold) {
  let toReturn = [];
  let xMax = 0;
  let yMax = 0;
  boardToFold.forEach((spot) => {
    if (spot.x > xMax) {
      xMax = spot.x;
    }
    if (spot.y > yMax) {
      yMax = spot.y;
    }
  });
  if (fold.axis === 'y') {
    yMax = parseInt(fold.value);
    for (let i = 0; i <= yMax; i++) {
      for (let k = 0; k <= xMax; k++) {
        let foldY = yMax + (yMax - i)
        let lit = false;
        litPoints.forEach((litPoint) => {
          if (litPoint.x === k && (litPoint.y === i || litPoint.y === foldY)) {
            lit = true;
          }
        });
        toReturn.push({ x: k, y: i, lit: lit });
      }
    }
  } else {
    //its x
    let xMax = parseInt(fold.value);
    for (let i = 0; i <= yMax; i++) {
      for (let k = 0; k <= xMax; k++) {
        let foldX = xMax + (xMax - k)
        let lit = false;
        litPoints.forEach((litPoint) => {
          if ((litPoint.x === k || litPoint.x === foldX) && litPoint.y === i) {
            lit = true;
          }
        });
        toReturn.push({ x: k, y: i, lit: lit });
      }
    }
  }
  updateLit(toReturn);
  return toReturn;
}
function makeSwan() {
  let newBoard = foldBoard(board, folds[0]);
  folds.forEach((fold, index) => {
    if (index > 0) {
      newBoard = foldBoard(newBoard, fold);
    }
  });
  drawBoard(newBoard);
  return newBoard.filter((spot) => {
    return spot.lit
  }).length;
}
function drawBoard(boardToDraw) {
  let xSize = 0;
  let ySize = 0;
  boardToDraw.forEach(point => {
    if (point.x > xSize) {
      xSize = point.x;
    }
    if (point.y > ySize) {
      ySize = point.y;
    }
  });
  for (let i = 0; i <= ySize; i++) {
    let line = '';
    for (let k = 0; k <= xSize; k++) {
      let isLit = false;
      boardToDraw.forEach(point => {
        if (point.x === k && point.y === i && point.lit) {
          isLit = true;
        }
      });
      if (isLit) {
        line = line + " *";
      } else {
        line = line + " .";
      }
      if (k === xSize) {
        console.log(line);
      }
    }
  }
}
function buildTheBoard() {
  for (let i = 0; i <= highestY; i++) {
    for (let k = 0; k <= highestX; k++) {
      let lit = false;
      litPoints.forEach((litPoint) => {
        if (litPoint.x === k && litPoint.y === i) {
          lit = true;
        }
      });
      board.push({ x: k, y: i, lit: lit });
    }
  }
}
function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}