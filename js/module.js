import {checkStartBoxIsEnebled, FPScontroller, inputAndAttr, inputEventFun, graphicFun, gameGraphicQuality, saveSettingFun,  clickSound , foodSound, musicSound, gameOverSound} from "./module/aggregating/allModule.js";








// Click Sound Play By CLick
document.querySelectorAll("[clickSoundPlayAttr]")
.forEach(e => e.addEventListener("click",()=> {
    clickSound.volume = Number(localStorage.soundVolume);
    clickSound.play();
}))



// FPS
checkStartBoxIsEnebled();
FPScontroller();
inputAndAttr();
inputEventFun();
graphicFun();
gameGraphicQuality();
saveSettingFun();











// playGameButton

document.querySelector("[playGameButton]")
.addEventListener("click",()=>{
    clickSound.volume = Number(localStorage.soundVolume);
    foodSound.volume = Number(localStorage.soundVolume);
    gameOverSound.volume = Number(localStorage.soundVolume);
    musicSound.volume = Number(localStorage.musicVolume);
    musicSound.play();
    containerStart.style.display = "none";
    checkStartBoxIsEnebled();
})