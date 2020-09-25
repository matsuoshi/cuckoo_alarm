var per_minutes = 30
var cuckoo = new Audio(chrome.runtime.getURL("alarm.mp3"))

console.log("start")

function checkAlarm()
{
  if (new Date().getMinutes() % per_minutes === 0) {
    cuckoo.play()
    console.log("cuckoo!")
  }
}

setTimeout(function(){
  checkAlarm()
  chrome.alarms.create("alcuckoo", {"periodInMinutes": 1})
  console.log("alarm created")
}, (60 - new Date().getSeconds()) * 1000)

chrome.alarms.onAlarm.addListener(checkAlarm)
