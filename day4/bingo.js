const readLine = require('readline');
const f = require('fs');
var sampleBoardfile = './data/sampleBoards.txt';
var rl = readLine.createInterface({
  input: f.createReadStream(sampleBoardfile),
  output: process.stdout,
  terminal: false
});
const sampleBoardsArray = [];
let yValue = 0;
let board = 0;
let winningBoards = [];
rl.on('line', function (text) {
  if (!text.trim()) {
    yValue = 0;
    board++;
  } else {
    text = text.replace(/ +(?= )/g, '');
    let rowNumbers = text.trim().split(" ");
    rowNumbers.forEach((spaceValue, xValue) => {
      sampleBoardsArray.push({ x: xValue, y: yValue, value: spaceValue, marked: false, board: board });
    });
    yValue++;
  }

});

var sampleInputFile = './data/sampleNumbers.txt';
var inputRl = readLine.createInterface({
  input: f.createReadStream(sampleInputFile),
  output: process.stdout,
  terminal: false
});

inputRl.on('line', function (text) {
  const inputArray = text.trim().split(",");
  let gameOver = false;
  inputArray.forEach((ball, index) => {
    if (!gameOver) {
      markBoards(ball);
      if (index > 4) {
        const winningScore = checkBoards(ball);
        if (winningScore) {
          console.log(winningScore);
          console.log(ball);
          console.log(winningScore === 1924);
          //gameOver = true;
        }
      }
    }
  })
});

function markBoards(ball) {
  sampleBoardsArray.forEach((space) => {
    if (space.value === ball) {
      space.marked = true;
    }
  });
}

function checkBoards(ball) {
  let score = 0;
  let row1 = 0;
  let row2 = 0;
  let row3 = 0;
  let row4 = 0;
  let row5 = 0;
  let column1 = 0;
  let column2 = 0;
  let column3 = 0;
  let column4 = 0;
  let column5 = 0;
  let squares = 0;
  let backX = 0;
  let winnerFound = false;
  let spaceCounter = 0;

  sampleBoardsArray.forEach((space) => {
    spaceCounter++;
    if (!winnerFound && !winningBoards.includes(space.board)) {
      if (space.marked) {
        switch (space.x) {
          case 0:
            column1++;
            break;
          case 1:
            column2++;
            break;
          case 2:
            column3++;
            break;
          case 3:
            column4++;
            break;
          case 4:
            column5++;
            break;
        }
        switch (space.y) {
          case 0:
            row1++;
            break;
          case 1:
            row2++;
            break;
          case 2:
            row3++;
            break;
          case 3:
            row4++;
            break;
          case 4:
            row5++;
            break;
        }

        if (row1 === 5 || row2 === 5 || row3 === 5 || row4 === 5 || row5 === 5 || column1 === 5 || column2 === 5
          || column3 === 5 || column4 === 5 || column5 === 5) {
          score = calculateScore(space.board, ball);
          // winnerFound = true;
          winningBoards.push(space.board);

        }


      }
    }
    if (spaceCounter === 25) {
      spaceCounter = 0;
      row1 = 0;
      row2 = 0;
      row3 = 0;
      row4 = 0;
      row5 = 0;
      column1 = 0;
      column2 = 0;
      column3 = 0;
      column4 = 0;
      column5 = 0;
      squares = 0;
      backX = 0;
    }
  });
  return score;
}

function calculateScore(boardNumber, ball) {
  let unmarkedSum = 0;
  sampleBoardsArray.forEach((space) => {
    if (space.board === boardNumber) {
      //winning board
      if (!space.marked) {
        unmarkedSum = unmarkedSum + parseInt(space.value);
      }

    }
  });
  return ball * unmarkedSum;
}