var per_minutes = 30
var cuckoo = new Audio(chrome.runtime.getURL("alarm.mp3"))

function checkAlarm()
{
  if (new Date().getMinutes() % per_minutes === 0) {
    cuckoo.play()
    console.log(new Date())
  }
}

setTimeout(function(){
  checkAlarm()
  chrome.alarms.create("alcuckoo", {"periodInMinutes": 1})
}, (60 - new Date().getSeconds()) * 1000)

chrome.alarms.onAlarm.addListener(checkAlarm)
