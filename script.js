const Game = function(){

}

const Player = function(role, sign){

}

function createPlayer(role, sign){
    return {role, sign};
}

const GameBoard = function(){
    console.log("Hello");
    const board = document.createElement("div");
    const body = document.querySelector("body");
    body.appendChild(board);
    board.className = 'board'
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            const boardItem = document.createElement("div");
            boardItem.id = `el${i}${j}`;
            boardItem.className = 'boardItem';
            board.appendChild(boardItem);
        }
    }
}

GameBoard();

function createGameboard(){
    return [[], [], []];
}

const arr = [['o', 'o', 'o'], ['x', 'o', 'x'], ['o', 'x', 'x']]

function winCheck(gameBoard){
   for(element of gameBoard){
        if(element[0] === element[1] && element[1] === element[2]){
            return element[0];
        }
    };
    if(gameBoard[0][0] === gameBoard[1][1] &&  gameBoard[1][1] === gameBoard[2][2]){
        return gameBoard[0][0];
    }
    for(let i = 0; i < 2; i++){
        if(gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]){
            return gameBoard[0][i];
        }
    }
    return 'draw';
}


function arrCheck(gameBoard){
    if(gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][1] === gameBoard[0][2]){
        return gameBoard[0][0];
    }
}
console.log(winCheck(arr));