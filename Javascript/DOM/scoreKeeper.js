var bttnP1 = document.querySelector("#p1");
var bttnP2 = document.querySelector("#p2");
var bttnReset = document.querySelector("#reset");
var numInput = document.querySelector("input");
var pWinningScore = document.querySelector("p span");

var displayP1 = document.querySelector("#p1Display");
var displayP2 = document.querySelector("#p2Display");

var scoreP1 = 0;
var scoreP2 = 0;

var gameOver = false;
var winningScore = 5;

bttnP1.addEventListener("click", function(){
    if(!gameOver){
        ++scoreP1;
        if(scoreP1 === winningScore){
            gameOver = true;
            displayP1.classList.add("winner");
        }
        displayP1.textContent = scoreP1;
    }
    
});

bttnP2.addEventListener("click", function(){
    if (!gameOver){
        ++scoreP2;
        if(scoreP2 === winningScore){
            gameOver = true;
            displayP2.classList.add("winner");
        }
        displayP2.textContent = scoreP2;
    }
});

function resetGame(){
    gameOver = false;
    scoreP1 = 0;
    scoreP2 = 0;

    displayP1.textContent = scoreP1;
    displayP2.textContent = scoreP2;

    displayP1.classList.remove("winner");
    displayP2.classList.remove("winner");
}


bttnReset.addEventListener("click", resetGame);

numInput.addEventListener("change", function(){
    pWinningScore.textContent = this.value;
    // Casted value because it's string (otherwise === comparisons on button events wont ever be true as they take into account value type)
    winningScore = Number(this.value);

    resetGame();
});