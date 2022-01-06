const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});

let strang = "";
let rules = [];
let counts = [];
let pairs = [];
rl.on('line', function (text) {
  if (text.trim()) {
    let splitLine = text.trim().split(" -> ");
    if (splitLine[0] === text.trim()) {
      text.trim().split('').forEach((char) => {
        strang += char;
        updateCounts(char, 1);
      });
    } else {
      //its a rule
      rules.push({ pair: splitLine[0], insert: splitLine[1] });
    }
  }
});

rl.on('close', function () {
  insertByRulesFaster();
  // make sure that this is really larger than the values
  let least = 99999999999999999999999999;
  let most = 0;
  counts.forEach(count => {
    if (count.count < least) {
      least = count.count;
    }
    if (count.count > most) {
      most = count.count;
    }

  });
  console.log(most - least);
});
function insertByRulesFaster() {
  for (let i = 0; i < strang.length - 1; i++) {
    let pairString = strang[i] + strang[i + 1];
    let pairFound = false;
    pairs.forEach(pairObj => {
      if (pairObj.pair === pairString) {
        pairFound = true;
        pairObj.count++;
      }
    });
    if (!pairFound) {
      pairs.push({ pair: pairString, count: 1 });
    }
  }

  for (let j = 0; j < 40; j++) {
    let newPairs = [];
    pairs.forEach(pair => {
      rules.forEach((rule) => {
        let foundPairRule = false;
        let foundRulePair = false;
        if (rule.pair === pair.pair && pair.count > 0) {
          updateCounts(rule.insert, pair.count);
          newPairs.forEach(pairsToCheck => {
            if (pairsToCheck.pair === pair.pair.split("")[0] + rule.insert) {
              pairsToCheck.count = pairsToCheck.count + pair.count;
              foundPairRule = true;
            }
            if (pairsToCheck.pair === rule.insert + pair.pair.split("")[1]) {
              pairsToCheck.count = pairsToCheck.count + pair.count;
              foundRulePair = true;
            }
          });
          if (!foundPairRule) {
            newPairs.push({ pair: pair.pair.split("")[0] + rule.insert, count: pair.count });
          }
          if (!foundRulePair) {
            newPairs.push({ pair: rule.insert + pair.pair.split("")[1], count: pair.count });
          }
        }
      });
    });
    pairs = newPairs;
  }
}

function updateCounts(letter, amount) {
  let foundCount = false;
  counts.forEach(count => {
    if (count.letter === letter) {
      foundCount = true;
      count.count = count.count + amount;
    }
  });
  if (!foundCount) {
    counts.push({ letter: letter, count: amount });
  }
}