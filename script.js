const body = document.querySelector("body");

function chooseRoleDOM(){
    const xBtn = document.createElement("button");
    xBtn.id = "x-button";
    xBtn.textContent = "X";
    xBtn.style.backgroundColor = "yellow";

    const oBtn = document.createElement("button");
    oBtn.id = "o-button";
    oBtn.textContent = "O";
    oBtn.style.backgroundColor = "#EFEFEF";

    const btns = document.createElement("div");
    btns.className = "sign-choice";
    body.appendChild(btns);

    btns.appendChild(xBtn);
    btns.appendChild(oBtn);

    xBtn.addEventListener("click", () => {
        if(!isGameStart() && !duo){
            player1.sign = 'x';
            player2.sign = 'o';
            xBtn.style = "background-color: yellow";
            oBtn.style = "background-color: #EFEFEF";
        }
    })

    oBtn.addEventListener('click', () => {
        if(!isGameStart() && !duo){
            player1.sign = 'o';
            player2.sign = 'x';
            oBtn.style = "background-color: yellow;";
            xBtn.style = "background-color: #EFEFEF;";
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
    const oBtn = document.querySelector("#o-button");
    const xBtn = document.querySelector("#x-button");
    if(!isBoardFull() && !finish){
        const row = boardItem.id[2];
        const col = boardItem.id[3];
        if(gameBoard[row][col] === undefined){
            gameBoard[row][col] = player.sign;
            boardItem.textContent = player.sign;
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
                if(player.sign === 'x'){
                    player1.sign = 'o'
                    oBtn.style = "background-color: yellow;";
                    xBtn.style = "background-color: #EFEFEF;";
                }
                else{
                    player1.sign = 'x';
                    xBtn.style = "background-color: yellow";
                    oBtn.style = "background-color: #EFEFEF";
                }
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
    const playDuo = document.querySelector("#play-duo");
    if(playDuo){
        body.insertBefore(result, playDuo);
    } else{
        body.appendChild(result);
    }
    const name1Input = document.querySelector("#name1");
    const name2Input = document.querySelector("#name2");
    if(duo === false || (duo === true && name1Input && name2Input &&(name1Input.value === "" || name2Input.value === ""))){
        if(winCheck() === "tie"){
            result.textContent = "Tie";
        }
        else{
            result.textContent = `${winCheck()} wins. It was hard game`;
        }
    }
    else{
        if(winCheck() === "tie"){
            result.textContent = "Tie";
        }
        else{
            result.textContent = `${(winCheck() === 'x')?name1Input.value:name2Input.value} wins. It was hard game`;
            
        }
    }
    
    const names = document.querySelector("#names");
    if(names){
        names.remove();
    }

    const subBtn = document.querySelector("#submit-names");
    if(subBtn){
        subBtn.remove();
    }

    const playBot = document.createElement("button");
    if(duo === true){
        playBot.id = "play-bot";
        playBot.textContent = "Play with bot";
        body.appendChild(playBot);
        playBot.addEventListener("click", () => {
            duo = false;            
            cleanBoard();
            result.remove();
            startNew.remove();
            playBot.remove();
            player1.sign = 'x';
            player2.sign = 'o';
        })        
    }
    else if(!playDuo){
        duoGame();
    }
    const startNew = document.createElement("button");
    startNew.textContent = "Start new game";
    startNew.className = "start";
    startNew.id = "start-new";
    body.appendChild(startNew);
    
    startNew.addEventListener("click", () => {
        player1.sign = 'x';
        player2.sign = 'o';
        cleanBoard();
        if(names){
            body.appendChild(names);
        }
        if(subBtn){
            body.appendChild(subBtn);
        }
        result.remove();
        startNew.remove();
        playBot.remove();
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
    const oBtn = document.querySelector("#o-button");
    const xBtn = document.querySelector("#x-button");
    xBtn.style = "background-color: yellow";
    oBtn.style = "background-color: #EFEFEF";

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

function duoGame(){
    const playDuo = document.createElement("button");
    playDuo.textContent = "Play with friend";
    playDuo.className = "start";
    playDuo.id = "play-duo";
    body.appendChild(playDuo);
    playDuo.addEventListener("click", () => {
        playDuoDOM();
        playDuo.remove();
    })
}

function playDuoDOM(){
    cleanBoard();
    duo = true;

    const names = document.createElement("div");
    names.id = "names";
    const name1Div = document.createElement("div");
    name1Div.className = "name1";
    const name2Div = document.createElement("div");
    name2Div.className = "name2";

    const subBtn = document.createElement("button");
    subBtn.id = "submit-names";
    subBtn.textContent = "Submit";

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
    body.appendChild(subBtn);

    const result = document.querySelector(".result");
    if(result){
        result.remove();
    }

    const startNew = document.querySelector("#start-new");
    if(startNew){
        startNew.remove();
    }

    const playDuo = document.querySelector("#play-duo");
    if(playDuo){
        playDuo.remove();
    }

    subBtn.addEventListener("click", () => {
        player1.role = name1Input.value;
        player2.role = name2Input.value;
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

duoGame();