var seconds = 00;
var tens = 00;
var OutputSeconds = document.getElementById("second");
var OutputTens = document.getElementById("tens");
var buttonStart = document.getElementById("start");
var buttonStop = document.getElementById("stop");
var buttonReset = document.getElementById("reset");
var interval;



// @task
// function hello(){
//   return "hello AS string";
// }

// let hello = ()=>"hello as String"

buttonStart.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(setTime, 10);
});

buttonStop.addEventListener("click", () => {
  clearInterval(interval);
});

buttonReset.addEventListener("click", () => {
  clearInterval(interval);
  seconds = "00";
  tens = "00";
  OutputSeconds.innerHTML = seconds;
  OutputTens.innerHTML = tens;
});

function setTime() {
  tens++;
  if (tens <= 9) {
    OutputTens.innerHTML = "0" + tens;
  }
  if (tens > 9) {
    OutputTens.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    OutputSeconds.innerHTML = "0" + seconds;
    tens = 0;
    OutputTens.innerHTML= "0" + tens;
  }
  if(seconds> 9){
      OutputSeconds.innerHTML= seconds;
  }
}
