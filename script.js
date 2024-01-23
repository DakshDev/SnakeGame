let snakeArr = [{x:20, y:30}];
let inputDir = {x:0, y:0};
let food = {x:20, y:10};
let speed = 13;
let lastPaintTime = 0;
let score = 0;
let popUpBox = document.querySelector('.popUp');
let popUpText = document.querySelector('.popUp > h1');
var moveSound = new Audio('move.mp3');
var foodSound = new Audio('food.mp3');
var gameoverSound = new Audio('gameover.mp3');
var musicSound = new Audio('music.mp3');


(()=>{
// FPS Controler
function main(ctime){
window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
window.requestAnimationFrame(main);





// Game Over Logic
function isOver(snake){
    // if bump into your self
    for(let i=1; i<snakeArr.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true;
        }
    };
    // if bump into the board
    if(snake[0].x >= 40 || snake[0].x <= 0 || snake[0].y >= 40 || snake[0].y <= 0){
        return true;
    }
}





// Main Logic
function gameEngine(){
// part1: updating the snake Arr
    // Game Over
    if(isOver(snakeArr)){
        popUpBox.style.backdropFilter = 'blur(20px)';
        popUpBox.style.display = 'grid';
        setTimeout(()=>{
            popUpText.style.height = '15vmin';
        },50);
        snakeArr = [{x:20, y:30}];
        inputDir = {x:0, y:0};
        gameoverSound.play();
        score = 0;
        scoreNum.innerHTML = score;
        window.addEventListener('keypress',()=>{
            playAgainFun();
        });
    }
    // if snake eaten the food, increase the score/snake and regenerate food;
    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 38;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())};
        score++;
        scoreNum.innerHTML = score;
    }
    // Moving the snake
    for(let i=snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y; 

// part2: display the  snake and food
    // Display the snake
    board.innerHTML = '';
    snakeArr.forEach((e,i)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(i === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}





// Keys Logic
window.addEventListener('keydown',function(event){
    moveSound.play();
    switch (event.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "w":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "s":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "a":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "d":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
    console.clear();
});
// Mobile Btns
    up.addEventListener('click',function(){
        moveSound.play();
        inputDir.x = 0;
        inputDir.y = -1;
        console.clear();
    });
    bottom.addEventListener('click',function(){
        moveSound.play();
        inputDir.x = 0;
        inputDir.y = 1;
        console.clear();
    });
    left.addEventListener('click',function(){
        moveSound.play();
        inputDir.x = -1;
        inputDir.y = 0;
        console.clear();
    });
    right.addEventListener('click',function(){
        moveSound.play();
        inputDir.x = 1;
        inputDir.y = 0;
        console.clear();
    });





// Play Again
    playAgain.addEventListener('click',(e)=>{
        playAgainFun()
    });
    function playAgainFun(){
        popUpText.style.height = '0px';
        setTimeout(()=>{
            popUpBox.style.backdropFilter = 'blur(0px)';
            popUpBox.style.display = 'none';
        },100);
    };
})();








// Music Code
(()=>{

    let musicBtn = document.getElementById('musicBtn');
    let soundBtn = document.getElementById('soundBtn');
    musicBtn.parentElement.addEventListener('click',function(){
        if(musicBtn.className === 'musicOff'){
            musicBtn.classList.replace('musicOff','musicOn');
            musicSound.play()
            musicSound.loop = true;
        }else{
            musicBtn.classList.replace('musicOn','musicOff');
            musicSound.pause()
        }
    });
    soundBtn.parentElement.addEventListener('click',function(){
        if(soundBtn.className === 'soundOff'){
            soundBtn.classList.replace('soundOff','soundOn');
            moveSound = new Audio('move.mp3');
            foodSound = new Audio('food.mp3');
            gameoverSound = new Audio('gameover.mp3');
        }else{
            soundBtn.classList.replace('soundOn','soundOff');
            moveSound = new Audio('');
            foodSound = new Audio('');
            gameoverSound = new Audio('');
        }
    });

})();





window.addEventListener('load',function(){
    container.style.opacity = '1';
    loadBox.style.display = 'none';
});