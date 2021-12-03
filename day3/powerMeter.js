function findPowerConsumption(consumptionArray, binaryStringLength) {
  let gamma = "";
  let epsilon = "";
  //loop through input and find the most and least popular (its one or the other)
  //append most common to gamma, the other one to epsilon

  for (let i = 0; i < binaryStringLength; i++) {
    let ones = 0;
    let zeros = 0;
    consumptionArray.forEach((element) => {
      if (parseInt(element[i]) === 1) {
        ones++;
      } else {
        zeros++;
      }
    });
    if (ones > zeros) {
      gamma = gamma + "1";
      epsilon = epsilon + "0"
    } else {
      gamma = gamma + "0";
      epsilon = epsilon + "1"
    }
  }
  //find the decimal value of each
  //return the product
  return (parseInt(gamma, 2) * parseInt(epsilon, 2));
}

//test
const exampleInputArray = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'];
let knownResult = findPowerConsumption(exampleInputArray, 5);
if (knownResult === 198) {
  console.log('we got it');
} else {
  console.log('keep going: ' + knownResult);
}

const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});
const realInputArray = [];
rl.on('line', function (text) {
  realInputArray.push(text);
});
rl.on('close', function () {
  console.log('power result: ' + findPowerConsumption(realInputArray, 12));
  console.log('life support result: ' + findLifeSupportRating(realInputArray, 12));
});

function findLifeSupportRating(consumptionArray, binaryStringLength) {
  let c02 = consumptionArray;
  let o2 = consumptionArray;
  while (c02.length > 1) {
    c02 = filter(c02, 'carbon', binaryStringLength);
  }
  while (o2.length > 1) {
    o2 = filter(o2, 'oxygen', binaryStringLength);
  }
  return (parseInt(c02[0], 2) * parseInt(o2[0], 2));
  //loop through input and find the most and least popular (its one or the other)
  function filter(arrayToFilter, elementString, binaryStringLength) {
    for (let i = 0; i < binaryStringLength; i++) {
      if (arrayToFilter.length === 1) { break; }
      let ones = 0;
      let zeros = 0;
      arrayToFilter.forEach((element) => {
        if (parseInt(element[i]) === 1) {
          ones++;
        } else {
          zeros++;
        }
      });
      if (elementString === 'carbon') {
        if (zeros <= ones) {
          arrayToFilter = arrayToFilter.filter(function (x) {
            return parseInt(x[i]) === 0;
          });
        } else {
          arrayToFilter = arrayToFilter.filter(function (x) {
            return parseInt(x[i]) === 1;
          });
        }
      } else {
        //its 'oxygen'
        //keep only numbers with most common bit in this position, 1 if ===
        if (ones >= zeros) {
          //if we are keeping ones, take out the zeros
          arrayToFilter = arrayToFilter.filter(function (x) {
            return parseInt(x[i]) === 1;
          });
        } else {
          //otherwise we are keeping 0, so take out the ones
          arrayToFilter = arrayToFilter.filter(function (x) {
            return parseInt(x[i]) === 0;
          });
        }
      }
    }
    return arrayToFilter;
  }
}

//test
const exampleSupportInputArray = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'];
knownResult = findLifeSupportRating(exampleSupportInputArray, 5);
if (knownResult === 230) {
  console.log('we got it life support');
} else {
  console.log('keep going: ' + knownResult);
}