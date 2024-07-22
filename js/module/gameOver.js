import {snakeArr} from "./main.js"

function gameOver(snake){
    // if bump into your self
    for(let i=1; i<snakeArr.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true;
        }
    };
    // if bump into the board
    if(snake[0].x >= 21 || snake[0].x <= 0 || snake[0].y >= 21 || snake[0].y <= 0){
        return true;
    }
}




export {gameOver}