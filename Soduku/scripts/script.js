let numSelected = null;
let tileSelected = null;
let solvedTiles = 0;

let errors = 0;

// let board = [
//   "--74916-5",
//   "2---6-3-9",
//   "-----7-1-",
//   "-586----4",
//   "--3----9-",
//   "--62--187",
//   "9-4-7---2",
//   "67-83-----",
//   "81--45---",
// ];

// const solution = [
//   "387491625",
//   "241568379",
//   "569327418",
//   "758619234",
//   "123784596",
//   "496253187",
//   "934176852",
//   "675832941",
//   "812945763",
// ];

//GENERATE BOARD

let completeBoard = [];
let completeSolutionBoard = [];

const encodeBoard = (sudokuBoard) =>
  sudokuBoard.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${
        i === sudokuBoard.length - 1 ? "" : "%2C"
      }`,
    ""
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
    .join("&");

async function genBoard() {
  let response = await fetch(
    "https://sugoku.herokuapp.com/board?difficulty=hard"
  );
  let sudokuBoard = await response.json();
  return sudokuBoard;
}
genBoard().then((sudokuBoard) => {
  // console.log(sudokuBoard.board[0]);
  // const newBoard = function () {

  for (i = 0; i < sudokuBoard.board.length; i++) {
    let newRow = sudokuBoard.board[i].toString();
    newRow = newRow.replaceAll(",", "");
    completeBoard.push(newRow);
  }

  //GENERATE SOLUTION BOARD
  // fetch("https://sugoku.herokuapp.com/solve", {
  //   method: "POST",
  //   body: encodeParams(sudokuBoard),
  //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
  // })
  //   .then((response) => response.json())
  //   .then((response) => console.log(response.solution))
  //   .then((response) => console.log(response.solution))

  //   .catch(console.warn);

  async function genSolutionBoard() {
    let response = await fetch("https://sugoku.herokuapp.com/solve", {
      method: "POST",
      body: encodeParams(sudokuBoard),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    let sudokuSolutionBoard = await response.json();
    return sudokuSolutionBoard;
  }

  genSolutionBoard().then((sudokuSolutionBoard) => {
    for (i = 0; i < sudokuSolutionBoard.solution.length; i++) {
      let newSolutionRow = sudokuSolutionBoard.solution[i].toString();
      newSolutionRow = newSolutionRow.replaceAll(",", "");
      completeSolutionBoard.push(newSolutionRow);
    }
  });
});

window.onload = function () {
  setGame();
};

function setGame() {
  //for digits 1-9
  for (let i = 1; i <= 9; i++) {
    //<div id=1 class=number>1</div>
    let number = document.createElement("div");
    number.id = i;
    number.id.dark = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  //Board 9x9
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();

      //Generates numbers on board on click
      button.addEventListener("click", generateBoard);

      function generateBoard() {
        if (completeBoard[r][c] != "0") {
          tile.innerText = completeBoard[r][c];
          tile.classList.add("tile-dark");
        }
      }

      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      return;
    }

    //0-0, 3-1, etc...
    let coords = this.id.split("-"); //[0, 0]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (completeSolutionBoard[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
      if (typeof this.innerText == "string") {
        this.classList.add("tile-dark");
        solvedTiles++;
      }

      //WIN CONDITION
      const modal = document.getElementById("winModal");
      let tileSolved = document.getElementsByClassName("tile-dark").length;

      if (tileSolved === 81) {
        console.log("YOU WIN");
        modal.style.display = "block";
      }
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors;
    }
  }
}
//Button press to start timer
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("button");
  button.addEventListener("click", startStopWatch);

  //Modal Window
  const modal = document.getElementById("winModal");
  const span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  };

  // window.onclick = function (event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // };
});

//COUNT-UP TIMER
let seconds = 0;
let minutes = 0;

let interval = null;
let statusStopWatch = "stopped";

let displaySeconds = 0;
let displayMinutes = 0;

//logic when to increment next value

function stopWatch() {
  seconds++;

  //Change seconds to minutes
  if (seconds / 60 === 1) {
    seconds = 0;
    minutes++;
  }

  if (seconds < 10) {
    displaySeconds = "0" + seconds.toString();
  } else {
    displaySeconds = seconds;
  }

  if (minutes < 10) {
    displayMinutes = "0" + minutes.toString();
  } else {
    displayMinutes = minutes;
  }

  document.getElementById("display").innerHTML =
    displayMinutes + ":" + displaySeconds;
}

function startStopWatch() {
  if (statusStopWatch === "stopped") {
    window.setInterval(stopWatch, 1000);
  }
}
