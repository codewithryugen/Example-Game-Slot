const slot_screen = document.querySelector("#slot-screen");
const reel = document.querySelectorAll(".reel");
const reels = document.querySelectorAll(".reels");

const stop_btn = document.getElementsByClassName("stop-btn");
const start_btn = document.querySelector("#start-btn");

// console.log(stop_btn);
let sec = 100;
const stopReelFlag = [];
const reelCounts = [];
let slotFrameHeight;
let slotReelsHeight; 
let slotReelItemHeight;
let slotReelStartHeight;

const slot  = {
    init:function(){
        stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
        reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    },
    start:function(){
        this.init();
        for(let index=0;index<3;index++){
            this.animation(index);
        }
    },
    stop:function (i){
        stopReelFlag[i] = true;
        if(stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]){
            start_btn.removeAttribute("disabled");
        }
    },

    resetLocationInfo : function(){
        slotFrameHeight =  slot_screen.offsetHeight;
        slotReelsHeight = reels[0].offsetHeight;
        slotReelItemHeight = reel[0].offsetHeight;
        slotReelStartHeight = -slotReelsHeight;
        slotReelStartHeight += slotFrameHeight-(slotFrameHeight/2)+slotReelItemHeight*3/2;
        for(let i = 0; i<reels>length;i++ ){
            reels[i].style.top = `${slotReelStartHeight} px`;
        }
    },

    animation:function(index){
        if(reelCounts[index]>=8){
            reelCounts[index]=0;
        }
        $(".reels").eq(index).animate({
            "top":slotReelStartHeight+(reelCounts[index]*slotReelItemHeight)
        },{
            duration:sec,
            easing:"linear",
            complete:function(){
                if(stopReelFlag[index]){
                    return;
                }
                reelCounts[index]++;
                slot.animation(index);
            }
        });
    }
};

window.onload = function (){
    slot.init();
    slot.resetLocationInfo();
    start_btn.addEventListener('click',(e)=>{
        e.target.setAttribute("disabled",true);
        slot.start();
        for(let i = 0;i<stop_btn.length;i++){
            stop_btn[i].addEventListener("click",function(e){
                slot.stop(e.target.getAttribute("data-val"));
            })
        }
    });
}