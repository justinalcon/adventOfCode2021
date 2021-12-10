const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});

let input = [];
rl.on('line', function (text) {
  input.push(text);
});
rl.on('close', function () {
  console.log('syntax error result: ' + parseInput(input));
});

function parseInput(input) {
  let errorChars = { paren: 0, square: 0, curly: 0, greaterGator: 0 };
  const openers = ['(', '{', '[', '<'];
  const closers = [')', '}', ']', '>'];
  let incompleteTotals = [];
  input.forEach((line) => {
    let open = [];
    let correupt = false;
    let lineChars = line.trim().split("");
    let seentOne = false;
    lineChars.forEach((char) => {
      if (!seentOne) {
        if (openers.includes(char)) {
          open.push(char);
        } else if (closers.includes(char)) {
          const guineaPig = open.pop();
          if (((guineaPig === '(') && !(char === ')'))
            || ((guineaPig === '{') && !(char === '}')
              || ((guineaPig === '[') && !(char === ']'))
              || ((guineaPig === '<') && !(char === '>')))) {
            switch (char) {
              case ')':
                errorChars.paren++;
                seentOne = true;
                correupt = true;
                break;
              case '}':
                errorChars.curly++;
                seentOne = true;
                correupt = true;
                break;
              case ']':
                errorChars.square++;
                seentOne = true;
                correupt = true;
                break;
              case '>':
                errorChars.greaterGator++;
                seentOne = true;
                correupt = true;
                break;
            }
          }
        }
      }
    });

    if (!correupt) {
      let totalScore = 0;
      const pops = open.length;
      for (let i = 0; i < pops; i++) {
        switch (open.pop()) {
          case '{':
            totalScore = (5 * totalScore) + 3;
            break;
          case '[':
            totalScore = (5 * totalScore) + 2;
            break;
          case '<':
            totalScore = (5 * totalScore) + 4;
            break;
          case '(':
            totalScore = (5 * totalScore) + 1;
            break;
        }
      }
      incompleteTotals.push(totalScore);
    }
  });

  return incompleteTotals.sort(function (a, b) {
    return a - b;
  })[(incompleteTotals.length / 2) - .5];
}