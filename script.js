class ac{
    constructor(){
        this.bg=new Audio("Assets/Audio/Creepy.mp3");
        this.fs=new Audio("Assets/Audio/flip.wav");
        this.ms=new Audio("Assets/Audio/match.wav");
        this.vs=new Audio("Assets/Audio/victory.wav");
        this.gs=new Audio("Assets/Audio/gameover.wav");
        this.bg.volume=0.5; 
        this.bg.loop=true;
    }
    start(){
        this.bg.play();
    }
    stop(){
        this.bg.pause();
        this.bg.currentTime=0;
    }
    flip(){
        this.fs.play();
    }
    match(){
        this.ms.play();
    }
    victory(){
        this.stop();
        this.vs.play();
    }
    gameover(){
        this.stop()
        this.gs.play();
    }
}
class mm{
    constructor(time,cards){
        this.ca=cards;
        this.tt=time;
        this.tr=time;
        this.timer=document.getElementById("time-remaining");
        this.ticker=document.getElementById("flips");
        this.ac=new ac();
    }
    startgame(){ 
        this.check=null;
        this.tc=0;
        this.tr=this.tt;
        this.matchcard=[];
        this.busy=true;
        setTimeout(()=>{
            this.ac.start();
            this.shuffle();
            this.countdown=this.startCountdown();
            this.busy=false;
        },500);
        this.hidecards();
        this.timer.innerText=this.tr;
        this.ticker.innerText=this.tc;   
    }
    hidecards(){
        this.ca.forEach(card=>{
            card.classList.remove("visible");
            card.classList.remove("matched");
        });
    }
    flipcard(card){
        //console.log(card);
        if(this.canflip(card)){
            console
            this.ac.flip();
            this.tc+=1
            this.ticker.innerText=this.tc;
            card.classList.add("visible");
            if(this.check){
                this.checkcardmatch(card);
            }
            else{
                this.check=card; 
            }
        }
    }
    checkcardmatch(card){
        if(this.getcard(card) === this.getcard(this.check)){
            this.cardmatch(card,this.check)
        }
        else{
            this.cardmismatch(card,this.check);
        }
        this.check=null;
    }
    cardmatch(card1,card2){
        this.matchcard.push(card1);
        this.matchcard.push(card2);
        card1.classList.add("matched");
        card2.classList.add("matched");
        this.ac.match()
        if(this.matchcard.length===this.ca.length){
            this.victory();
            this.hidecards();
        }
    }
    cardmismatch(card1,card2){
        this.busy=true;
        setTimeout(() => {
            card1.classList.remove("visible");
            card2.classList.remove("visible");
            this.busy=false;
        }, 1000);
    }
    getcard(card){
        return card.getElementsByClassName("value")[0].src;
    }
    shuffle(){
        for(let i=this.ca.length-1;i>0;i--){
            let ran=Math.floor(Math.random()*(i+1));
            this.ca[ran].style.order=i;
            this.ca[i].style.order=ran;
        }
    }
    startCountdown(){
        return setInterval(() => {
            this.tr-=1
            this.timer.innerText=this.tr;
            if(this.tr===0){
                this.gameover();
            }
        }, 1000);
    } 
    gameover(){
        clearInterval(this.countdown);
        this.ac.gameover();
        this.hidecards();
        document.getElementById("game-over-text").classList.add("visible");
    }
    victory(){
        clearInterval(this.countdown);
        this.ac.victory()
        document.getElementById("victory-text").classList.add("visible");
    }
    canflip(card){
        return (!(this.busy) && !(this.matchcard.includes(card)) && card!=this.check);
    }
}
function ready(){
    let overlay=Array.from(document.getElementsByClassName("overlay-text"));
    let cards=Array.from(document.getElementsByClassName("card"));
    let game=new mm(60,cards);
    overlay.forEach(overlay=>{
        overlay.addEventListener("click",()=>{
            overlay.classList.remove("visible");
            game.startgame();
        });
    })
    cards.forEach(card=>{
        card.addEventListener("click",()=>{
            game.flipcard(card);
        })
    })
}
if(document.readyState==="loading"){
    document.addEventListener("DOMcontentLoaded",ready());
}
else{
    ready();
}