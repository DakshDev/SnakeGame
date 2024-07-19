import { foodSound, gameOverSound, clickSound, musicSound } from "./main.js";


const snakeSpeedInput = document.getElementById("snakeSpeedInput")
const snakeSpeedAttr = document.querySelector("[snakeSpeedAttr]");

const musicVolumeInput = document.getElementById("musicVolumeInput")
const musicVolumeAttr = document.querySelector("[musicVolumeAttr]");

const soundVolumeInput = document.getElementById("soundVolumeInput")
const soundVolumeAttr = document.querySelector("[soundVolumeAttr]");


let speedSnake = 0;
let musicVol = 0;
let soundVol = 0;

let mainMusicVol = 0;
let mainSoundVol = 0;

function volumeFun(){
    foodSound.volume = soundVol;
    gameOverSound.volume = soundVol;
    clickSound.volume = soundVol;
    musicSound.volume = musicVol;
}


function inputAndAttr(){
    snakeSpeedAttr.innerHTML = Number(snakeSpeedInput.value);
    speedSnake = Number(snakeSpeedInput.value);

    musicVolumeAttr.innerHTML = parseInt(musicVolumeInput.value);
    musicVol = parseInt(musicVolumeInput.value)/100;
    mainMusicVol = parseInt(musicVolumeInput.value);

    soundVolumeAttr.innerHTML = parseInt(soundVolumeInput.value);
    soundVol = parseInt(soundVolumeInput.value)/100;
    mainSoundVol = parseInt(soundVolumeInput.value);
}

function inputEventFun(){
    snakeSpeedInput.addEventListener("input",() => {
        inputAndAttr();
    });
    musicVolumeInput.addEventListener("input",() => {
        volumeFun();
        inputAndAttr();
    });
    soundVolumeInput.addEventListener("input",() => {
        volumeFun();
        inputAndAttr();
    });
}



let graphicQuality = document.getElementById("graphicQualityBox").children;
function graphicFun(){
    for (let i = 0; i < graphicQuality.length; i++) {
        
        graphicQuality[i].addEventListener("click",function(){
            for (let j = 0; j < graphicQuality.length; j++) {
                graphicQuality[j].style.backgroundColor = "transparent";
            }
            this.style.backgroundColor = "#2ecc71";
        }) 

    }

}






function gameGraphicQuality(){
    for (let i = 0; i < graphicQuality.length; i++) {
        graphicQuality[i].addEventListener("click",function(){
            innerFun();
        })
    }


    function innerFun(){
        let one = getComputedStyle(graphicQuality[0]).getPropertyValue("background-color") == "rgb(46, 204, 113)";
        let two = getComputedStyle(graphicQuality[1]).getPropertyValue("background-color") == "rgb(46, 204, 113)";
        let three = getComputedStyle(graphicQuality[2]).getPropertyValue("background-color") == "rgb(46, 204, 113)";


        if(one){
            container.className = "low";
            board.className = "blur1";
            console.log("LOW Graphic");
        }else if(two){
            container.className = "medium";
            board.className = "blur2";
            console.log("medium Graphic");
        }else if(three){
            container.className = "high";
            board.className = "blur3";
            console.log("High Graphic");
        }
    }
    innerFun();
}




function settingBoxVisible(){
    if(settingBtnFlag) {
        settingBox.style.display = "grid";
        settingBtnFlag = false;
        settingTag.style.top = "-"+settingTag.clientHeight/2+"px";

    }else{
        settingBox.style.display = "none";
        settingBtnFlag = true;
    }
}

let settingBtnFlag = true;
settingBtn.addEventListener("click",()=> settingBoxVisible() );
document.querySelector("[settingGameButton]")
.addEventListener("click",()=> settingBoxVisible() )

closeBtn.addEventListener("click",()=>{
    settingBox.style.display = "none";
    settingBtnFlag = true;
})






localStorage.saveSettingFalg = false;

function saveSettingFun(){
    let saveButton = document.querySelector("button[name='saveSetting']");

    saveButton.addEventListener("click",function(){
        if(checkIfSave()){
            localStorage.speed = speedSnake;
            localStorage.musicVolume = musicVol;
            localStorage.soundVolume = soundVol;
            localStorage.mainMusicVolume = mainMusicVol;
            localStorage.mainSoundVolume = mainSoundVol;
            settingBox.style.display = "none";
            settingBtnFlag = true;
        }
    })

    function checkIfSave(){
        if(localStorage.speed === undefined || localStorage.musicVolume === undefined || localStorage.soundVolume === undefined || localStorage.mainMusicVolume === undefined || localStorage.mainSoundVolume === undefined){
            localStorage.speed = 10;
            localStorage.musicVolume = 0.5;
            localStorage.soundVolume = 0.5;
            localStorage.mainMusicVolume = 50;
            localStorage.mainSoundVolume= 50;
            localStorage.saveSettingFalg = true;
            return false;
        }else{
            return true;
        }
    }
    checkIfSave();


    function localValueSet(){
        let x = Boolean(localStorage.saveSettingFalg);
        if(x){
            snakeSpeedInput.value = Number(localStorage.speed);
            snakeSpeedAttr.innerHTML = localStorage.speed;

            musicVolumeInput.value = Number(localStorage.mainMusicVolume)
            musicVolumeAttr.innerHTML = Number(localStorage.musicVolume)

            soundVolumeInput.value = Number(localStorage.mainSoundVolume)
            soundVolumeAttr.innerHTML = Number(localStorage.soundVolume)

            inputAndAttr()
        }
    }
    localValueSet();

}





// Reset Setting
let resetSetting = document.querySelector("button[name='resetSetting']");

resetSetting.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})






export {inputAndAttr, inputEventFun, speedSnake, graphicFun, gameGraphicQuality, saveSettingFun};