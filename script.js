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
    body.appendChild(boardDOM, boardDOM);
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            createBoardItem(i, j, boardDOM);
        }
    }
}

function createBoardItem(i, j, boardDOM){
    const boardItem = document.createElement("div");
    boardItem.id = `el${i}${j}`;
    boardItem.className = 'boardItem';
    boardItem.addEventListener("click", () => {
        playerMove(player1, boardItem);    
    });
    boardDOM.appendChild(boardItem);
}

function playerMove(player, boardItem){
    if(!isBoardFull() && !finish){
        const row = boardItem.id[2];
        const col = boardItem.id[3];
        if(gameBoard[row][col] === undefined){
            gameBoard[row][col] = player.sign;
            boardItem.textContent = player.sign;
            if(player.sign === 'x'){
                player1.sign = 'o'
            }
            else{
                player1.sign = 'x';
            }
            if(duo === false){
                if(winCheck() != undefined){
                    finish = true;
                    result();
                }
                else{
                    computerMove();
                }
            }
            else{
                if(winCheck() != undefined){
                    finish = true;
                    result();
                }
            }
            
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

function playDuo(){
    const playDuo = document.createElement("button");
    playDuo.textContent = "Play with friend";
    playDuo.className = "start";
    body.appendChild(playDuo);
    playDuo.addEventListener("click", () => {
        playDuoDOM();
        playDuo.remove();
    })
}

function playDuoDOM(){
    const names = document.createElement("div");
    const name1Div = document.createElement("div");
    const name2Div = document.createElement("div");

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start";

    const name1Label = document.createElement("label")
    name1Label.setAttribute("for", "name1");
    name1Label.textContent = "1 Player's name (x)"
    const name1Input = document.createElement("input");
    name1Input.id = "name1";

    name1Div.appendChild(name1Label);
    name1Div.appendChild(name1Input);

    const name2Label = document.createElement("label");
    name2Label.setAttribute("for", "name2");
    name2Label.textContent = "2 Player's name (o)";
    const name2Input = document.createElement("input");
    name2Input.id = "name2";

    name2Div.appendChild(name2Label);
    name2Div.appendChild(name2Input);

    names.appendChild(name1Div);
    names.appendChild(name2Div);

    body.appendChild(names);
    body.appendChild(startBtn);

    startBtn.addEventListener("click", () => {
        player1.role = name1Input.value;
        player2.role = name2Input.value;
        console.log(player1.role);
        console.log(player2.role);
        duo = true;
        player2.sign = 'o';
    })

}

let duo = false;
let finish = false;
let player1 = createPlayer('user', 'x');
let player2 = createBot(player1.sign);

chooseRoleDOM();

const gameBoard = createGameBoard();

gameBoardDOM();

playDuo();