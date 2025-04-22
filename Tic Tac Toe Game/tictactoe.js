let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newGame=document.querySelector("#newGame");
let msgCon=document.querySelector(".msgContainer");
let msgTxt=document.querySelector("#msg");

let playerX=true;
reset.classList.remove("hiding");
let disableCount=0;
let winFound=false;

const winningPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [2,1,0],
    [6,3,0],
    [8,4,0],
    [6,7,8],
    [8,7,6],
    [8,5,2],
    [2,8,5],
    [2,4,6],
    [6,4,2],
    [3,4,5],
    [5,4,3],
    [1,4,7],
    [7,4,1],
];

(function (){
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(playerX){//similar to playerX==true
            box.style.color="blue";
            box.innerText="X";
            playerX=false;
            disableCount++;
        }
        else{
            box.style.color="red";
            box.innerText="O";
            playerX=true;
            disableCount++;
        }
        box.disabled=true;
        winnerCheck();
        checkDraw();
    });
}

);
})();


const checkDraw=()=>{
    if (winFound==false && disableCount===9) {
            stopPlaying();
            msgTxt.innerText = `It's a Draw!`
    }
};


reset.addEventListener("click",()=>{
    ResetToInitial();
});


newGame.addEventListener("click",()=>{
    ResetToInitial();
});

const ResetToInitial=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
    playerX=true;
    disableCount=0;
    winFound=false;
    reset.classList.remove("hiding");
    msgCon.classList.add("hiding");
};


const stopPlaying=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
    reset.classList.add("hiding");
    msgCon.classList.remove("hiding");
};

const showMsg=(winPlayer)=>{
    stopPlaying();
    msgTxt.innerText=`The Winner is: Player${winPlayer}, Congratulations!`;
}

const winnerCheck=()=>{
    for(let pattern of winningPatterns){
        let position1=boxes[pattern[0]].innerText;
        let postion2=boxes[pattern[1]].innerText;
        let postion3=boxes[pattern[2]].innerText;

        if(position1!="" && postion2!="" && postion3!=""){
            if(position1==postion2 && postion2==postion3){
                winFound=true;
                showMsg(position1);
            }
        }
        
    }
}