const readLine = require('readline');
const f = require('fs');
var file = './data/input.txt';
const readDir = './persistence/read/';
const writeDir = './persistence/write/';
const tmpDir = './persistence/tmp/';
var rl = readLine.createInterface({
  input: f.createReadStream(file),
  output: process.stdout,
  terminal: false
});

let strang = "";
let rules = [];
let counts = [];
rl.on('line', function (text) {
  if (text.trim()) {
    let splitLine = text.trim().split(" -> ");
    if (splitLine[0] === text.trim()) {
      text.trim().split('').forEach((char) => {
        strang += char;
        updateCounts(char);
      });
    } else {
      //its a rule
      rules.push({ pair: splitLine[0], insert: splitLine[1] });
    }
  }
});

rl.on('close', function () {
  f.writeFileSync(readDir + 'stringholder.txt', strang);
  insertByRules();
});

function insertByRules() {
  for (let j = 0; j < 10; j++) {
    console.log('loop: ' + j);
    let strandedInsert = "";
    let filenames = f.readdirSync(readDir);

    filenames.forEach(function (filename) {

      const options = { encoding: 'utf-8', flag: 'r' };
      const stringToCheck = f.readFileSync(readDir + filename, options);
      let newStrang = strandedInsert;
      if (strandedInsert === "") {
        newStrang = stringToCheck.charAt(0);
      }

      for (let i = 0; i < stringToCheck.length - 1; i++) {
        let pair = stringToCheck[i] + stringToCheck[i + 1];

        rules.forEach((rule) => {
          if (rule.pair === pair) {
            newStrang = newStrang + rule.insert + stringToCheck[i + 1];
            updateCounts(rule.insert);
            if (newStrang.length > 999999 || i === stringToCheck.length - 2) {
              f.writeFileSync(writeDir + filename + i, newStrang);
              if (stringToCheck[i + 2]) {
                newStrang = stringToCheck[i + 2];
              }
            }
          }
        });
      }
    });

    f.renameSync(readDir, tmpDir);
    f.renameSync(writeDir, readDir);
    f.renameSync(tmpDir, writeDir);
  }
  console.log(counts);
}

function updateCounts(letter) {
  let foundCount = false;
  counts.forEach(count => {
    if (count.letter === letter) {
      foundCount = true;
      count.count = count.count + 1;
    }
  });
  if (!foundCount) {
    counts.push({ letter: letter, count: 1 });
  }
  let least = 9999999999;
  let most = 0;
  counts.forEach(count => {
    if (count.count < least) {
      least = count.count;
    }
    if (count.count > most) {
      most = count.count;
    }

  });
  //console.log(most - least);
}