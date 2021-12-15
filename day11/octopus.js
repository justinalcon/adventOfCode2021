const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});

let octopi = [];
let flashes = 0;
let yIndex = 0;
rl.on('line', function (text) {
  octos = text.trim().split("");
  octos.forEach((octo, x) => {
    octopi.push({ value: parseInt(octo), x: x, y: yIndex, flashable: true });
  });
  yIndex++;
});
rl.on('close', function () {
  console.log('octos flashes count result: ' + count100StepsFlashes());
});

function count100StepsFlashes() {
  for (let i = 0; i < 1000; i++) {
    let stepIsBrightStep = true;
    octopi.forEach((point) => {
      point.value = point.value + 1;
      point.flashable = true;
    });
    octopi.forEach((point) => {
      if (point.value > 9) {
        point = flashAPoint(point);
      }
    });
    octopi.forEach((point) => {
      if (point.flashable === true) {
        stepIsBrightStep = false;
      }
    });
    if (stepIsBrightStep) {
      console.log((i + 1) + " is the bright step");
      i = 1000;
    }
  }
  return flashes;
}

function flashAPoint(point) {
  point.value = 0;
  if (point.flashable) {
    flashes++;
    point.flashable = false;
    let xMinusOne = point.x - 1;
    let yMinusOne = point.y - 1;
    let xPlusOne = point.x + 1;
    let yPlusOne = point.y + 1;
    if (xMinusOne > -1 && yMinusOne > -1) {
      bumpPointValue(xMinusOne, yMinusOne);
    }
    if (yMinusOne > -1) {
      bumpPointValue(point.x, yMinusOne);
    }
    if (xPlusOne < 10 && yMinusOne > -1) {
      bumpPointValue(xPlusOne, yMinusOne);
    }
    if (xPlusOne < 10) {
      bumpPointValue(xPlusOne, point.y);
    }
    if (xPlusOne < 10 && yPlusOne < 10) {
      bumpPointValue(xPlusOne, yPlusOne);
    }
    if (yPlusOne < 10) {
      bumpPointValue(point.x, yPlusOne);
    }
    if (xMinusOne > -1 && yPlusOne < 10) {
      bumpPointValue(xMinusOne, yPlusOne);
    }
    if (xMinusOne > -1) {
      bumpPointValue(xMinusOne, point.y);
    }
    ///
    if (xMinusOne > -1 && yMinusOne > -1) {
      flashCheckPointValue(xMinusOne, yMinusOne);
    }
    if (yMinusOne > -1) {
      flashCheckPointValue(point.x, yMinusOne);
    }
    if (xPlusOne < 10 && yMinusOne > -1) {
      flashCheckPointValue(xPlusOne, yMinusOne);
    }
    if (xPlusOne < 10) {
      flashCheckPointValue(xPlusOne, point.y);
    }
    if (xPlusOne < 10 && yPlusOne < 10) {
      flashCheckPointValue(xPlusOne, yPlusOne);
    }
    if (yPlusOne < 10) {
      flashCheckPointValue(point.x, yPlusOne);
    }
    if (xMinusOne > -1 && yPlusOne < 10) {
      flashCheckPointValue(xMinusOne, yPlusOne);
    }
    if (xMinusOne > -1) {
      flashCheckPointValue(xMinusOne, point.y);
    }

  }
  return point;
}

function bumpPointValue(x, y) {
  octopi.forEach((point) => {
    if (point.x === x && point.y === y && point.flashable) {
      point.value = point.value + 1;
    }
  });
}
function flashCheckPointValue(x, y) {
  octopi.forEach((point) => {
    if (point.x === x && point.y === y) {
      if (point.value > 9 && point.flashable) {
        point = flashAPoint(point);
      }
    }
  });
}