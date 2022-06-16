let img1 = null;
let img2 = null;
let img3 = null;
let img4 = null;
let bpmSliderElement = null;
let bpmTextElement = null;
let currentImage = 4;
let active = false; 
let intervalId = 0;
let bpm = 60

const audio = new Audio(".\\assets\\sounds\\pye1.wav")
const sleep = ms => new Promise(resolve =>
    setTimeout(resolve, ms)
  );

const start = async () => {
    active = true;
    currentImage = 4
    while (active) {
        await sleep(60000 / bpm).then(() =>{
            audio.currentTime = 0;
            audio.play()
        });
        switchImage()
    }
}

function stop() {
    active = false;
}

function switchImage(){
    if(currentImage == 1){
        fadeOut(img2, 300);
        currentImage = 2;
    }else if(currentImage == 2){
        fadeOut(img3, 300);
        currentImage = 3;
    }else if(currentImage == 3){
        fadeOut(img4, 300);
        currentImage = 4;
    }else{
        fadeOut(img1, 300);
        currentImage = 1;
    }
}

function fadeOut(node, duration) {

    node.style.opacity = 1;
    const startTime = performance.now();

    requestAnimationFrame(function step(timestamp) {

        const progress = 1 - ((timestamp - startTime) / duration);
        //console.log(progress);

        node.style.opacity = Math.max(progress, 0);

        if (progress > -1) {
            requestAnimationFrame(step);
        }
    });
}


function increaseBpm(){
    bpm++;
    bpmSliderElement.value = bpm;
    bpmTextElement.innerText = bpm;
}

function decreaseBpm(){
    bpm--;
    bpmSliderElement.value = bpm;
    bpmTextElement.innerText = bpm
}

window.addEventListener("load", ()=> {
    bpmSliderElement = document.getElementById('bpm-slider');
    bpmTextElement = document.getElementById('bpm-text');
    img1 = document.getElementById("pyai1");
    img2 = document.getElementById("pyai2");
    img3 = document.getElementById("pyai3");
    img4 = document.getElementById("pyai4");
    bpmTextElement.innerText = bpm;
    bpmSliderElement.value = bpm;
    bpmSliderElement.addEventListener("input", (e) => {
        bpm = Number(e.target.value);
        bpmTextElement.innerText = Number(e.target.value);;
    });
});