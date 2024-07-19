import { gameOver } from "./gameOver.js";



const foodSound = new Audio("./sound/food.mp3");
const gameOverSound = new Audio("./sound/gameover.mp3");
const clickSound = new Audio("./sound/move.mp3");
const musicSound = new Audio("./sound/music.mp3");


let inputDir = {x:0, y:0};
let snakeArr = [{x:10, y:15}, {x:10, y:16}, {x:10, y:17}];
let food = {x:5, y:5};
let snakeStart = false;
let ctrlPos = {
    up: true,
    down: false,
    left: true,
    right: true,
}



let keyWork = true;



function gameEngine(){
// part 1: updating the snake and food

    // If snake Collied himself and collied with board
    if(gameOver(snakeArr)){
        musicSound.pause();
        gameOverSound.play();
        snakeStart = false;
        containerGameOver.style.display = "flex";
        inputDir = {x:0, y:0};
        snakeArr = [{x:10, y:15}, {x:10, y:16}, {x:10, y:17}];
        food = {x:5, y:5};
        ctrlPos = {
            up: true,
            down: false,
            left: true,
            right: true,
        }
        keyWork = false;
        // Prank
        prankFunForS();
        playAgainButton.addEventListener("click",()=> afterClickPlayAgain() );
        window.addEventListener("keydown",(e)=>{
            if(e.key == "Enter") {
                afterClickPlayAgain()
                // Prank
                prankWithShazaib.style.display = "none";
            }
        });
        function afterClickPlayAgain(){
            musicSound.play();
            containerGameOver.style.display = "none";
            keyWork = true;
            // Prank
            prankWithShazaib.style.display = "none";
        }
    }

    // If snake eaten the food then make a big snake
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        let a = 2;
        let b = 18;
        food = {
            x: Math.round(a + (b-a) * Math.random()),
            y: Math.round(a + (b-a) * Math.random())
        }
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        })
    }

    // running the snake
    if(snakeStart){
        for(let i=snakeArr.length - 2; i>=0; i--){
            snakeArr[i+1] = {...snakeArr[i]}
        }
        snakeArr[0].y += inputDir.y;
        snakeArr[0].x += inputDir.x;
    }

    if(inputDir.y === -1){
        ctrlPos.up = true;
        ctrlPos.left = true;
        ctrlPos.right = true;
        ctrlPos.down = false;
    }
    if(inputDir.y === 1){
        ctrlPos.down = true;
        ctrlPos.left = true;
        ctrlPos.right = true;
        ctrlPos.up = false;
    }
    if(inputDir.x === -1){
        ctrlPos.left = true;
        ctrlPos.up = true;
        ctrlPos.down = true;
        ctrlPos.right = false;
    }
    if(inputDir.x === 1){
        ctrlPos.right = true;
        ctrlPos.up = true;
        ctrlPos.down = true;
        ctrlPos.left = false;
    }

    

// part 2: display the sanke and food
    board.innerHTML = "";
    // Display the snake
    snakeArr.forEach((e,i) => {
        let snakeElm = document.createElement("div");
        snakeElm.style.gridColumnStart = e.x;
        snakeElm.style.gridRowStart = e.y;
        if(i === 0){
            snakeElm.classList.add("head");
        }else{
            snakeElm.classList.add("snakeBody");
        }
        board.appendChild(snakeElm);
    });
    // Display the food
        let foodElm = document.createElement("div");
        foodElm.style.gridColumnStart = food.x;
        foodElm.style.gridRowStart = food.y;
        foodElm.classList.add("food");
        board.appendChild(foodElm);
}








// Controller
document.addEventListener("keydown", e=>{
    if(keyWork){
        switch (e.key) {
            case "ArrowUp": case "W": case "w":
                if(!ctrlPos.up) return;
                snakeStart = true;
                clickSound.volume = Number(localStorage.soundVolume);
                clickSound.play();
                inputDir.x = 0;
                inputDir.y = -1;
                break;
            case "ArrowDown": case "S": case "s":
                if(!ctrlPos.down) return;
                snakeStart = true;
                clickSound.volume = Number(localStorage.soundVolume);
                clickSound.play();
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            case "ArrowLeft": case "A": case "a":
                if(!ctrlPos.left) return;
                snakeStart = true;
                clickSound.volume = Number(localStorage.soundVolume);
                clickSound.play();
                inputDir.x = -1;
                inputDir.y = 0;
                break;
            case "ArrowRight": case "D": case "d":
                if(!ctrlPos.right) return;
                snakeStart = true;
                clickSound.volume = Number(localStorage.soundVolume);
                clickSound.play();
                inputDir.x = 1;
                inputDir.y = 0;
                break;
        }
    }

})



function checkStartBoxIsEnebled(){
    if(document.querySelector("#containerStart").style.display == ""){
        keyWork = false;
    }else{
        keyWork = true;
    }
}




// Export Data
export {snakeArr, gameEngine, foodSound, gameOverSound, clickSound, musicSound, checkStartBoxIsEnebled}









// Prank
function prankFunForS(){
    switch (localStorage.userName) {
        case "shazaib":
        case "shahzaib":
            prankWithShazaib.style.display = "block";
            break;
    }  
}