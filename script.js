if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("serviceWorker.js",{scope:"/so_tired/"})
      .then(res => console.log("service worker registered",res))
      .catch(err => console.log("service worker not registered", err))
  })
}
window.addEventListener("load",()=>{
const performances = ["熱炒魷魚!","主動一點啦!","這還差不多!","嗯，還可以","厚啦!給你調薪1%!"]; 
let bgm = document.querySelector("audio");  
let playground = document.getElementById("playground");
let title = document.getElementById("title");
let characters = document.querySelectorAll('.character');
let backWord = document.getElementById("back-word");
let start = document.getElementById("start");
let score = document.getElementById("score");
let scorePoint = 0;
let time = document.getElementById("time");
let timeLeft = 60;
let gameTimerInterval;
let generateParticleTimerInterval;
let middlePanel = document.getElementById("panel");
let finalScore = document.getElementById("final-score");
let performance = document.getElementById("performance");
let back = document.getElementById("back");
let nextRound = document.getElementById("next-round");
for(let i=0;i<characters.length;i++){
  setTimeout(()=>{
    characters[i].style.opacity='1';
  },i*500);
}
setTimeout(()=>{
  start.style.opacity='1';
  backWord.style.animation='bar 1s steps(1) infinite'
},2500);

score.innerHTML=scorePoint;
time.innerHTML=timeLeft;
 bgm.loop=true;   



             
                
 start.addEventListener("click",startGame);             
 start.addEventListener("touchstart",startGame);             
 back.addEventListener("click",backToHomePage);
 back.addEventListener("touchstart",backToHomePage);
 nextRound.addEventListener("click",readyForNextRound);              
 nextRound.addEventListener("touchstart",readyForNextRound);              
               
                   
                
                   
                 
                
          
                  

                    
                 
 function generateParticle(){
    let x=0;
    let y =0;
    if(window.innerWidth<=700){
       x = Math.random()*(window.innerWidth*0.9);
       y = Math.random()*(window.innerHeight - window.innerWidth*0.1);
    }else{
       x = Math.random()*(window.innerWidth*0.95);
       y = Math.random()*(window.innerHeight - window.innerWidth*0.05);
    }
    let picChoice = Math.random();
    let particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left=x+'px';
    particle.style.top=y+'px';
    if(picChoice<0.02){particle.style.backgroundImage="url('assets/fire_document.svg')";
    particle.style.backgroundSize='80%';
  }
    else if(picChoice>=0.02&&picChoice<0.08){particle.style.backgroundImage="url('assets/boss.svg')";
    particle.style.backgroundSize='80%';
  }
    else if(picChoice>=0.08&&picChoice<0.25){particle.style.backgroundImage="url('assets/mobile.svg')";
    particle.style.backgroundSize='50%';
  }
    else if(picChoice>=0.25&&picChoice<0.65){particle.style.backgroundImage="url('assets/email.svg')";
    particle.style.backgroundSize='80%';
    particle.style.backgroundPosition='50% 70%';
  }
    else if(picChoice>=0.65&&picChoice<0.96){particle.style.backgroundImage="url('assets/tel.svg')";
    particle.style.backgroundSize='80%';
    particle.style.backgroundPosition='50% 50%';
  }
   else {
    particle.style.backgroundImage="url('assets/drink.svg')";
    particle.style.backgroundSize='30%';
  }
   particle.addEventListener("click",scoreRule);
   particle.addEventListener("touchstart",scoreRule);
   playground.appendChild(particle);
 }                
                 
             
function scoreRule(){
  switch (this.style.backgroundImage) {
    case 'url("assets/fire_document.svg")':
      playground.removeChild(this);
      timeLeft=0;
      time.innerHTML=timeLeft;
      break;
  case 'url("assets/boss.svg")':
      playground.removeChild(this);
      scorePoint-=5;
      score.innerHTML=scorePoint;
      timeLeft-=5;
      time.innerHTML=timeLeft;
      break;
  case  'url("assets/mobile.svg")':
    playground.removeChild(this);
    scorePoint+=5;
    score.innerHTML=scorePoint;
    break;
    case 'url("assets/email.svg")':
      playground.removeChild(this);
      scorePoint+=2;
      score.innerHTML=scorePoint;
      break;
      case 'url("assets/tel.svg")':
        playground.removeChild(this);
        scorePoint+=3;
        score.innerHTML=scorePoint;
        break;
      case 'url("assets/drink.svg")':
        playground.removeChild(this);
        timeLeft+=5;
        time.innerHTML=timeLeft;
        break;  
  }
}

function startGame(){
  title.style.display='none';
  start.style.display='none';
  score.style.display='block';
  time.style.display='block';
  let bg = document.querySelectorAll("img");
  for(let i=0;i<bg.length;i++){
    bg[i].style.filter="grayscale(25%) blur(3px)";
  }
  bgm.play();
  gameTimerInterval = setInterval(checkGameProcess,1000);
  generateParticleTimerInterval = setInterval(generateParticle,600); 
}
function backToHomePage(){
    middlePanel.close();
    scorePoint=0;
    timeLeft=60;
    score.innerHTML=scorePoint;
    time.innerHTML=timeLeft;
    let bg = document.querySelectorAll('img');
    for(let i=0;i<bg.length;i++){
    bg[i].style.filter='none';
  }
    title.style.display='block';
    start.style.display='inline';
}
function checkGameProcess(){
  if(timeLeft>0){
      timeLeft--;
      time.innerHTML=timeLeft;
    }else{
      clearInterval(gameTimerInterval);
      clearInterval(generateParticleTimerInterval);
      bgm.pause();
     while(playground.children.length!=0){
      playground.removeChild(playground.firstElementChild);
     }
     score.style.display='none';
     time.style.display='none';
     finalScore.innerHTML='分數:'+scorePoint;
     if(scorePoint<=100){
      performance.innerHTML = '表現:'+performances[0];
     }else if(scorePoint>100&&scorePoint<=300){
      performance.innerHTML = '表現:'+performances[1];
     }else if(scorePoint>300&&scorePoint<=500){
      performance.innerHTML = '表現:'+performances[2];
     }else{
      performance.innerHTML = '表現:'+performances[3];
     }
     middlePanel.showModal();
     }
}

function readyForNextRound(){
    middlePanel.close();
    scorePoint=0;
    timeLeft=60;
    score.innerHTML=scorePoint;
    time.innerHTML=timeLeft;
    score.style.display='block';
    time.style.display='block';
    bgm.play();
  gameTimerInterval = setInterval(checkGameProcess,1000);
  generateParticleTimerInterval = setInterval(generateParticle,600); 
}
})
