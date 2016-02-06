var HanoiGame = function() {
  this.stacks = [[3,2,1],[],[]];

};

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

HanoiGame.prototype.run = function () {
  console.log(this);
  console.log(this.stacks);

  var that = this;

  var moveCallback = function(a, b) {
    that.startTowerIdx = a;
    that.endTowerIdx = b;
  };

  while (this.isWon() === false) {
    var moves = this.promptMove(moveCallback);
    if (this.isValidMove(that.startTowerIdx, that.endTowerIdx)) {
      this.move(that.startTowerIdx, that.endTowerIdx);
    }
    this.print();
    break;
  }

  console.log("Congratulations! You've Won Nothing!!");
  reader.close();
};

HanoiGame.prototype.print = function() {
  for (var i = 0; i < 3; i++) {
    console.log(this.stacks[i]);
  }
};

HanoiGame.prototype.isWon = function() {
  if (this.stacks[2] === [3,2,1] || this.stacks[1] === [3,2,1]) {
    return true;
  }
  else {
    return false;
  }
};

HanoiGame.prototype.promptMove = function (callback) {
  this.print();
  var fromMove = "";
  var toMove = "";

  reader.question("Move from? ", function(userFrom) {
    reader.question("Move to? ", function(userTo) {
      toMove = userTo;
      fromMove = userFrom;
      reader.close();

      // console.log(toMove);
      // console.log(userFrom);
      // console.log("moves1: " + [parseInt(fromMove), parseInt(toMove)]);
      // return [parseInt(fromMove), parseInt(toMove)];

      callback(fromMove, toMove);
    });
  });

};

Array.prototype.last = function () {
  return this[this.length - 1];
};

Array.prototype.empty = function() {
  return this === [];
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  var pieceFrom = this.stacks[startTowerIdx];
  var pieceTo = this.stacks[endTowerIdx];

  if ((startTowerIdx >= 0 && startTowerIdx <= 2) &&
  (endTowerIdx <= 2 && endTowerIdx >= 0)) {
    if (pieceTo.empty || pieceFrom.last > pieceTo.last) {
      return true;
    }
  }
  else {
    return false;
  }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  var movedFrom = this.stacks[startTowerIdx].pop();
  this.stacks[endTowerIdx].push(movedFrom);
  console.log(this.stacks);
};

var game = new HanoiGame();
// var callback = function (a, b) {
//   console.log("moves2: " + [a,b]);
// };
// game.promptMove(callback);
game.run();
