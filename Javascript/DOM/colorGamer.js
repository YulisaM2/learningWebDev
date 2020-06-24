
var colors = [];
var pickedColor;
var numSquares = 6;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message")
var h1 = document.querySelector("h1");

var bttnReset = document.querySelector("#reset");
var bttnEasy = document.querySelector("#easy");
var bttnHard = document.querySelector("#hard");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    setUpModeButtons();
    setUpSquares();
    reset();
}


function setUpModeButtons(){
    for (var i = 0; i < modeButtons.length; ++i){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // Only display 3 squares if easy mode selected, 6 if hard mode selected
            if(this.textContent === "Easy"){
                // alert("Easy detected");
                numSquares = 3;
            }else{
                numSquares = 6;
                // alert("Hard detected");
            }
            reset();
        });
    }
}

function setUpSquares(){
    for(var i = 0; i < squares.length; ++i){
        // Adding event so that when clicked, game checks if user guessed right
        squares[i].addEventListener("click", function(){
            // Check if color selected matches color displayed
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!"
                bttnReset.textContent = "Play Again?"
                h1.style.backgroundColor = pickedColor;
                changeColors(clickedColor);
            }else{
                // If wrong guess, make square disappear (match background color)
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again!"
            }
        });
    }
}

// Generate random colors, pick a new winner color and change squares' background
function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    
    bttnReset.textContent = "New Colors";
    messageDisplay.textContent = "";

    for(var i = 0; i < squares.length; ++i){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }
    }

    h1.style.backgroundColor = "steelblue";
}

// // Easy = only 3 colors
// bttnEasy.addEventListener("click", function(){
//     bttnEasy.classList.add("selected");
//     bttnHard.classList.remove("selected");

//     // Pick new 3 colors
//     numSquares = 3;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     messageDisplay.textContent = ""

//     // Hide the last 3 squares
//     for(var i = 0; i < squares.length; ++i){
//         if(colors[i]){
//             squares[i].style.backgroundColor = colors[i];
//         }else{
//             squares[i].style.display = "none";
//         }
//     }
// });

// // Hard = 6 colors
// bttnHard.addEventListener("click", function(){
//     bttnHard.classList.add("selected");
//     bttnEasy.classList.remove("selected");

//     // Pick new 6 colors
//     numSquares = 6;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     messageDisplay.textContent = ""

//     // Display 6 squares
//     for(var i = 0; i < squares.length; ++i){
//             squares[i].style.backgroundColor = colors[i];
//             squares[i].style.display = "block";
//     }
// });


bttnReset.addEventListener("click",function(){
   reset()
});

// When winning, change every square to correct color
function changeColors(color){
    for(var i = 0; i < squares.length; ++i){
        squares[i].style.backgroundColor = color;
    }
}

// Random color picker (winner color)
function pickColor(){
    // Get a random int number from 0 to length (max) of possibilites (easy = 3, hard = 6)
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Start game with 3 or 6 random RGB combinations to pick from
function generateRandomColors(num){
    var arr = [];
    for(var i = 0; i < num; ++i){
        arr.push(randomColor())
    }
    return arr;
}

// Get random RGB combination
function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}