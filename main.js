'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  // Move the end piece of the startStack
  // Move it to the end of the selected endStack

  // .pop()
  let start = stacks[startStack].pop();

  // .push() Places item at the end of an array
  stacks[endStack].push(start);

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  let start = stacks[startStack].slice(-1);
  let end = stacks[endStack].slice(-1);
  // is startStack > endStack? no
  // is startStack < endStack? yes
  // is the endStack empty? yes
  // Can I try the piece to the same stack?
  // Conditional to check if piece is smaller than the piece you are trying to stack on
  if (stacks[endStack].length == 0){
    return true;
  } if (start < end) {
    return true;
  } else {
    return false;
  }
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  // Conditional to see if the arrays are in a winning position (All in stack b or c)
  // if ((stacks == {a: [], b: [4, 3, 2, 1], c: []}) || (stacks == {a: [], b: [], c: [4, 3, 2, 1]})) {
  if (stacks["b"].length == 4 || stacks["c"].length == 4) {
    return true;
  } else {
    return false;
  }
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  // Grab args (a and c) and set variables

  // Check to see if legal
  // If legal then move piece
 if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack)
  }

  if (checkForWin()) {
    console.log('You Win')
  }
}


const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
