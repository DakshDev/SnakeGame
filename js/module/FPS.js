import {gameEngine} from "./main.js"
import { speedSnake} from  "./settingBox.js"

let lastPaintTime = 0;
let speed = speedSnake;
function FPScontroller(ctime){
window.requestAnimationFrame(FPScontroller);
    if((ctime - lastPaintTime)/1000 < 1/speed) return;
    lastPaintTime = ctime;
    gameEngine();
    speed = speedSnake;
}
window.requestAnimationFrame(FPScontroller);



export {FPScontroller}