const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);


// observations 
// 1 = map const elemets to a variable name to fetch the html elements 
// 2 = we have 2 players in this game so we will require to intialise a value to store them that is
//denoted by currentPlayer
//3 = also to store the game happening(win/loose/tie) we create a variable called gameGrid
//4 = we determine a pattern that how one can win a game in this and determine what are the 
//winningpositions and their indexes 
//5 = now a fx is created to initialise the game where we keep the current player is X
//and all the values in the game grid is none then we create a logic that if the box is empty
//the mouse will act as a pointer in that box and in that index of the box
// 6= also we need to remove the new game button when the game init begins so we remove active from button
//then we display the current player on the UI
//then we call init function to initialise the game
//now we need to switch between currentplayers so we write a function to do a swap
//to help us choose either x is playinfg or 0 is playing
//we use loop here and assign the value to the currentplayer variable also we do an update to the html 
//innertext
//then we dd a fx what should happen when we click on the box and we define the logic as fx handleclick()
//and run a event listener for the fx handleclick for each box and indexes
// in the fx handle click we define that if the gamegrid that is on the ui and its index is empty
//we put a innertext inside the box which is x or 0 by that sawp fx we create earlier
//and we also update the gamegrid(index) to current player and we set pointer to none when one is clicked
//then we call the swapand checkgame fx inside this handleclick fx that actives on button click by the 
//eventlistener 
//then we add a new game button event listener that on a click it will activate init fx game logic which 
//was deployed earlier to update the position of x and 0 and do necessary updation to the innertext and
//the box indexes
// now checkgame logic includes that 
//who is winning and how 
//here we initialise an answer and compare values of if 3 boxes in a row of winning position is filled with
// x then x is the winner or 0 is the winner
// if the postion 0 is = x then x is in the place of 123,456,789 and all winning position combos so
// x is the winner or 0 is the winner 
//also disable pointer of mouse once we have a value
// then we add the css green lines to the boxes of position 012 as active 
// and if answer is not equal to none winner text will be changed to winner player answer
//and we will add the new game button again and terminate by return
//game tied logic = if the count of a clicked box in the whole gamegrid is filled we will checkit via for 
//if loop and add the additions to it and if all is filled game is tied since we didnt encounter any x
// in 123,456,789 or any 0 in the same pos 
// now to remove the green winer box we will delete or remove the active class of win in css by
//one more thing is missing, initialise box with css properties again
 // box.classList = `box box${index+1}`;
 // we are iterating through the index here and 