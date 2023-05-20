document.querySelector('.start-button').addEventListener('click', setTime);

let sound = new Audio('sound.mp3');

var hours;
var minutes;
var seconds;

var tempH;
var tempM;
var tempS;

function setTime(){
  
  hours = document.querySelector('.time-hours').value;
  minutes = document.querySelector('.time-minutes').value;
  seconds = document.querySelector('.time-seconds').value;
  if(checkData(hours, minutes, seconds)){
    document.querySelector('.wrong-data').innerHTML = '';
    startStopwatch(hours, minutes, seconds);
  }
  else{
    document.querySelector('.wrong-data').innerHTML = 'Set good values!';
  }
  
}

function startStopwatch(hours, minutes, seconds){

  if(!hours) hours = 0;
  if(!minutes) minutes = 0;
  if(!seconds) seconds = 0;
  
  setResult(hours, minutes, seconds);
  // alert(hours+minutes+seconds);

  document.querySelector('.setting-time').style.display = 'none';
  document.querySelector('.time-left').style.display = 'block';
  document.querySelector('.start-div').style.display = 'none';
  document.querySelector('.going-stopwatch').style.display = 'block';

  intervalId = setInterval(() => {
    if(seconds === 0 && minutes === 0 && hours === 0){
      clearInterval(intervalId);
      sound.play();
      document.querySelector('.b1').style.display = 'none';
      document.querySelector('.time').style.color = 'green';
    }
    else{
      if(seconds>0){
        seconds--;
      }
      else{
        seconds=59;
        if(minutes>0){
          minutes--;
        }
        else{
          minutes=59;
          hours--;
        }    
      }
    }

    tempH = hours;
    tempM = minutes;
    tempS = seconds;

    setResult(hours, minutes, seconds);      

  }, 1000);

}





document.querySelector('.reset-button').addEventListener('click', () => {
  clearInterval(intervalId);
  document.querySelector('.b1').style.display = 'block';
  document.querySelector('.time').style.color = 'white';
  sound.pause();
  sound.currentTime = 0;
  document.querySelector('.setting-time').style.display = 'block';
  document.querySelector('.time-left').style.display = 'none';
  document.querySelector('.start-div').style.display = 'block';
  document.querySelector('.going-stopwatch').style.display = 'none';
});




function setResult(hours, minutes, seconds){
  let result = '';
  // console.log(typeof hours);
  if(hours<10) result+='0'+hours+':';
  else result+=hours+':';
  // console.log(hours);

  if(minutes<10) result+='0'+minutes+':';
  else result+=minutes+':';

  if(seconds<10) result+='0'+seconds;
  else result+=seconds;

  document.querySelector('.time').innerHTML = result;
}





let stopTimer = false;

document.querySelector('.stop-button').addEventListener('click', () => {
  console.log(hours, minutes, seconds);
  if(!stopTimer){
    clearInterval(intervalId);
    document.querySelector('.stop-button').innerHTML = 'Resume';
    // document.querySelector('.stop-button').style.backgroundColor = 'orange';
    document.querySelector('.stop-button').classList.add('light-green');
    stopTimer=true;
  }
  else{
    startStopwatch(tempH, tempM, tempS);
    document.querySelector('.stop-button').innerHTML = 'Stop';
    // document.querySelector('.stop-button').style.backgroundColor = 'rgb(158, 90, 7)';
    document.querySelector('.stop-button').classList.remove('light-green');
    stopTimer=false;
  }
});

function checkData(){
  let ok;
  if(hours<0) ok=false;
  else if(minutes<0 || minutes>59) ok=false;
  else if(seconds<0 || seconds>59) ok=false;
  else ok=true;
  return ok;
}
