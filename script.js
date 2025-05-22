const body = document.querySelector("body");

function chooseRoleDOM(){
    const continueBtn = document.createElement("button");
    continueBtn.textContent = "X";
    continueBtn.style.backgroundColor = "yellow";

    const changeSign = document.createElement("button");
    changeSign.textContent = "O";

    const btns = document.createElement("div");
    btns.className = "sign-choice";
    body.appendChild(btns);

    btns.appendChild(continueBtn);
    btns.appendChild(changeSign);

    continueBtn.addEventListener("click", () => {
        if(!isGameStart()){
            player1.sign = 'x';
            player2.sign = 'o';
            continueBtn.style = "background-color: yellow";
            changeSign.style = "background-color: #EFEFEF";
        }
    })

    changeSign.addEventListener('click', () => {
        if(!isGameStart()){
            player1.sign = 'o';
            player2.sign = 'x';
            changeSign.style = "background-color: yellow;";
            continueBtn.style = "background-color: #EFEFEF;";
            computerMove();
        }
    })
}

function createPlayer(role, sign){
    return {role, sign};
}

function createBot(sign){
    if(sign === 'x'){
        return createPlayer('bot', 'o');
    } else{
        return createPlayer('bot', 'x');
    }
}

const gameBoardDOM = function(){
    const boardDOM = document.createElement("div");
    boardDOM.className = 'board';
    body.appendChild(boardDOM);
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            const boardItem = document.createElement("div");
            boardItem.id = `el${i}${j}`;
            boardItem.className = 'boardItem';
            boardItem.addEventListener("click", () => {
                if(!isBoardFull() && !finish){
                    const row = boardItem.id[2];
                    const col = boardItem.id[3];
                    if(gameBoard[row][col] === undefined){
                        gameBoard[row][col] = player1.sign;
                        boardItem.textContent = player1.sign;
                        if(winCheck() != undefined){
                            finish = true;
                            result();
                        }
                        else{
                            computerMove();
                        }
                    }
                }                
            });
            boardDOM.appendChild(boardItem);
        }
    }
}

function computerMove(){
    if(isBoardFull()){
        return;
    }
    let row;
    let col;
    while(true){
        row = Math.floor(Math.random()*3);
        col = Math.floor(Math.random()*3);
        if(gameBoard[row][col] === undefined){
            break;
        }
    }     
    gameBoard[row][col] = player2.sign;
    document.querySelector(`#el${row}${col}`).textContent = player2.sign;
    if(winCheck() != undefined){
        finish = true;
        result();
    }
}

function createGameBoard(){
    return [[], [], []];
}

function result(){
    const result = document.createElement("div");
    result.className = 'result';
    body.appendChild(result);
    if(winCheck() === "tie"){
        result.textContent = "Tie";
    }
    else{
        result.textContent = `${winCheck()} wins. It was hard game`;
    }
    const startNew = document.createElement("button");
    startNew.textContent = "Start new game";
    startNew.className = "start";
    body.appendChild(startNew);
    startNew.addEventListener("click", () => {
        cleanBoard();
        result.remove();
        startNew.remove();
    })

}

function cleanBoard(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            gameBoard[i][j] = undefined;
            document.querySelector(`#el${i}${j}`).textContent = '';
            finish = false;
        }
    }

}

function winCheck(){
   for(element of gameBoard){
        if(element[0] === element[1] && element[1] === element[2]){
            return element[0];
        }
    };
    if(gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] ||
       gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]
    ){
        return gameBoard[1][1];
    }
    for(let i = 0; i < 3; i++){
        if(gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]){
            return gameBoard[0][i];
        }
    }
    if(isBoardFull()){
        return 'tie';
    }
    return undefined;
}

function isBoardFull(){
    let count = 0;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(gameBoard[i][j] === undefined){
                count++;
            }
        }
    }
    if(count === 0){
        return true;
    }
    return false;
}

function isGameStart(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(gameBoard[i][j] != undefined){
                return true;
            }
        }
    }
    return false;
}

let finish = false;
const player1 = createPlayer('user', 'x');
const player2 = createBot(player1.sign);

chooseRoleDOM();

const gameBoard = createGameBoard();

gameBoardDOM();