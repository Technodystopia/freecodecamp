document.addEventListener("DOMContentLoaded", () => {
    const pads = document.querySelectorAll(".drum-pad");
    const display = document.getElementById("display");
  
    pads.forEach(pad => {
      pad.addEventListener("click", () => {
        playSound(pad);
      });
    });
  
    document.addEventListener("keydown", (e) => {
      const key = e.key.toUpperCase();
      const pad = document.getElementById(key).parentElement;
      if (pad) {
        playSound(pad);
      }
    });
  
    function playSound(pad) {
      const audio = pad.querySelector(".clip");
      audio.currentTime = 0;
      audio.play();
      display.innerText = pad.id;
    }
  });
  