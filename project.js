class DrumKit
{
    constructor()
    {
       this.pads= document.querySelectorAll(".pad");
        this.playBtn=document.querySelector(".play");
        this.KickAudio= document.querySelector(".Kick-sound");
        this.SnareAudio= document.querySelector(".Snare-sound");
        this.HihatAudio= document.querySelector(".Hihat-sound");
        this.currentKick="allSounds/kick-classic.wav";
        this.currentSnare="allSounds/snare-acoustic01.wav";
        this.currentHihat="allSounds/hihat-acoustic01.wav";
        this.selects=document.querySelectorAll("select");
        this.muteBtns=document.querySelectorAll(".mute");
        this.index=0;
        this.bpm=150;
        this.isPlaying=null;
    }
 
    activePad()
    {
        this.classList.toggle("active");
    }
    repeat()
    {
        let step=this.index%8;
        const activeBars=document.querySelectorAll(`.b${step}`);
       activeBars.forEach(bar =>{
          bar.style.animation =`playTrack 0.3s alternate ease-in-out 2`;
           
           if(bar.classList.contains("active")){
                   
                if(bar.classList.contains("kick-pad"))
                    {
                        this.KickAudio.currentTime=0;
                        this.KickAudio.play();
                    }
                     
               if(bar.classList.contains("snare-pad"))
                    {
                        this.SnareAudio.currentTime=0;
                        this.SnareAudio.play();
                    }
               if(bar.classList.contains("hihat-pad"))
                    {
                        this.HihatAudio.currentTime=0;
                        this.HihatAudio.play();
                    }
               }
       });
        this.index++;
        
    }
    updateBtn()
    {
        if(this.isPlaying!=null)
            {
                this.playBtn.innerText="Stop";
                this.playBtn.classList.add("active");
            }
        else
            {
              this.playBtn.innerText="Play";  
                  this.playBtn.classList.remove("active");
            }
    }
    start()
    {
        const interval=(60/this.bpm)*1000;
        if(this.isPlaying==null)
            {
        this.isPlaying=setInterval(()=>{
           this.repeat(); 
        },interval)
            }
        else
            {
                clearInterval(this.isPlaying);
                this.isPlaying=null;
            }
    }
    changeSound(e)
    {
        const selectionName=e.target.name;
        const selectionValue=e.target.value;
        switch(selectionName)
            {
                case "kick-select":
                    this.KickAudio.src=selectionValue;
                    break;
                    
                    case "snare-select":
                    this.SnareAudio.src=selectionValue;
                    break;
                    
                    
                    case "hihat-select":
                    this.HihatAudio.src=selectionValue;
                    break;
            }
    }
    
    mute(e)
    {
        const muteIndex=e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        
        if(e.target.classList.contains("active"))
            {
               switch(muteIndex)
                   {
                       case "0":
                 {
                    this.KickAudio.volume=0; 
                     break;
                }
                       case "1":
                 {
                    this.SnareAudio.volume=0; 
                     break;
                }
                       case "2":
                 {
                    this.HihatAudio.volume=0;   
                     break;
                }
                   }
            }
        
        
        
         else
            {
               switch(muteIndex)
                   {
                       case "0":
                 {
                    this.KickAudio.volume=1; 
                     break;
                }
                       case "1":
                 {
                    this.SnareAudio.volume=1; 
                     break;
                }
                       case "2":
                 {
                    this.HihatAudio.volume=1;   
                     break;
                }
                   }
            }
    }
}

const drumKit=new DrumKit();

drumKit.pads.forEach(pad=>{
    pad.addEventListener("click",drumKit.activePad);
    pad.addEventListener("animationend",function(){
        this.style.animation="";
    });
});

drumKit.playBtn.addEventListener("click",function(){
    drumKit.start();
    drumKit.updateBtn();
});



drumKit.selects.forEach(select=>{
   
    select.addEventListener("change",function(e){
       
        drumKit.changeSound(e);
    });
});


drumKit.muteBtns.forEach(btn=>{
    
  btn.addEventListener("click",function(e){
      
      drumKit.mute(e);
  })  
});

