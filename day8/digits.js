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
  const lineParts = text.split("|");
  lines.push({ ten: lineParts[0].trim(), four: lineParts[1].trim() });
});
rl.on('close', function () {
  console.log('display result: ' + cypher(lines));
});

function cypher(lines) {
  let total = 0;
  lines.forEach((line) => {
    const display = line.four;
    const input = line.ten;
    const inputDigits = input.split(" ");
    const displayDigits = display.split(" ");
    const allDigits = displayDigits.concat(inputDigits);
    let onePattern;
    let sevenPattern;
    let fourPattern;
    let eightPattern;
    let allPatterns = [];
    allDigits.forEach((displayDigit) => {
      switch (displayDigit.length) {
        case 2:
          // its the digit 1
          onePattern = displayDigit;
          allPatterns.push({ pattern: displayDigit, value: 1 });
          break;
        case 3:
          //its a 7
          sevenPattern = displayDigit;
          allPatterns.push({ pattern: displayDigit, value: 7 });
          break;
        case 4:
          //its a 4
          fourPattern = displayDigit;
          allPatterns.push({ pattern: displayDigit, value: 4 });
          break;
        case 7:
          //its an 8
          eightPattern = displayDigit;
          allPatterns.push({ pattern: displayDigit, value: 8 });
          break;
        default:
          allPatterns.push({ pattern: displayDigit, value: -1 });
          break;
      }
    });
    let patternDetermined = {
      'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g'
    }

    const lettersToCheck = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    lettersToCheck.forEach((letter) => {
      let appearsIn = 0;
      inputDigits.forEach((inputPattern) => {
        if (inputPattern.includes(letter)) {
          appearsIn++;
        }
      });
      switch (appearsIn) {
        case 9:
          patternDetermined.f = letter;
          break;
        case 8:
          if (!onePattern.includes(letter)) {
            patternDetermined.a = letter;
          } else {
            patternDetermined.c = letter;
          }
          break;
        case 7:
          if (!fourPattern.includes(letter)) {
            patternDetermined.g = letter;
          } else {
            patternDetermined.d = letter;
          }
          break;
        case 6:
          patternDetermined.b = letter;
          break;
        case 4:
          patternDetermined.e = letter;
          break;
      }
    });
    let valueString = "";
    displayDigits.forEach((displayDigit) => {
      switch (displayDigit.length) {
        case 2:
          valueString = valueString.concat("1");
          break;
        case 3:
          //its a 7
          valueString = valueString.concat("7");
          break;
        case 4:
          //its a 4
          valueString = valueString.concat("4");
          break;
        case 7:
          valueString = valueString.concat("8");
          break;
        default:
          if (displayDigit.length === 6 && displayDigit.includes(patternDetermined.a) && displayDigit.includes(patternDetermined.b) && displayDigit.includes(patternDetermined.c) && displayDigit.includes(patternDetermined.e) && displayDigit.includes(patternDetermined.g) && displayDigit.includes(patternDetermined.f)) {
            valueString = valueString.concat("0");
          } else if (displayDigit.length === 5
            && displayDigit.includes(patternDetermined.a) && displayDigit.includes(patternDetermined.c)
            && displayDigit.includes(patternDetermined.d) && displayDigit.includes(patternDetermined.e)
            && displayDigit.includes(patternDetermined.g)) {
            valueString = valueString.concat("2");
          } else if (displayDigit.length === 5
            && displayDigit.includes(patternDetermined.a) && displayDigit.includes(patternDetermined.c)
            && displayDigit.includes(patternDetermined.d) && displayDigit.includes(patternDetermined.f)
            && displayDigit.includes(patternDetermined.g)) {
            valueString = valueString.concat("3");
          } else if (displayDigit.length === 5
            && displayDigit.includes(patternDetermined.a) && displayDigit.includes(patternDetermined.b)
            && displayDigit.includes(patternDetermined.d) && displayDigit.includes(patternDetermined.f)
            && displayDigit.includes(patternDetermined.g)) {
            valueString = valueString.concat("5");
          } else if (displayDigit.length === 6
            && displayDigit.includes(patternDetermined.a) && displayDigit.includes(patternDetermined.b)
            && displayDigit.includes(patternDetermined.d) && displayDigit.includes(patternDetermined.e)
            && displayDigit.includes(patternDetermined.g) && displayDigit.includes(patternDetermined.f)) {
            valueString = valueString.concat("6");
          } else if (displayDigit.length === 6
            && displayDigit.includes(patternDetermined.a) && displayDigit.includes(patternDetermined.b)
            && displayDigit.includes(patternDetermined.d) && displayDigit.includes(patternDetermined.c)
            && displayDigit.includes(patternDetermined.g) && displayDigit.includes(patternDetermined.f)) {
            valueString = valueString.concat("9");
          }
          break;
      }
    });
    total = total + parseInt(valueString);
  });
  return total;
}