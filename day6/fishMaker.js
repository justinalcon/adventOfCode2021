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
  console.log('fish result: ' + spawn(lines[0], 256));
});

function spawn(fishString, days) {
  let toReturn = {
    ones: 0, twos: 0, threes: 0, fours: 0
    , fives: 0, sixes: 0, zeros: 0, eights: 0, sevens: 0
  };
  let initFish = fishString.split(",");
  initFish.forEach((fish) => {
    switch (parseInt(fish)) {
      case 0:
        toReturn.zeros++;
        break;
      case 1:
        toReturn.ones++;
        break;
      case 2:
        toReturn.twos++;
        break;
      case 3:
        toReturn.threes++;
        break;
      case 4:
        toReturn.fours++;
        break;
      case 5:
        toReturn.fives++;
        break;
      case 6:
        toReturn.sixes++;
        break;
      case 7:
        toReturn.sevens++;
        break;
      case 8:
        toReturn.eights++;
        break;
    }

  });
  console.log(toReturn);
  for (let i = 0; i < days; i++) {
    toReturn = doAFishDay(toReturn);
  }
  console.log(toReturn);
  return toReturn.ones + toReturn.twos + toReturn.threes + toReturn.fours +
    toReturn.fives + toReturn.sixes + toReturn.sevens + toReturn.eights + toReturn.zeros;
}

function doAFishDay(fishes) {
  let toReturn = {
    ones: 0, twos: 0, threes: 0, fours: 0
    , fives: 0, sixes: 0, zeros: 0, eights: 0, sevens: 0
  };
  toReturn.zeros = fishes.ones;
  toReturn.ones = fishes.twos;
  toReturn.twos = fishes.threes;
  toReturn.threes = fishes.fours;
  toReturn.fours = fishes.fives;
  toReturn.fives = fishes.sixes;
  toReturn.sixes = fishes.sevens + fishes.zeros;
  toReturn.sevens = fishes.eights;
  toReturn.eights = fishes.zeros
  return toReturn;
}