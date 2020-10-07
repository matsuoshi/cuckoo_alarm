/*
 * cuckoo alarm
 */
console.log("start")
const per_minutes = 30
let is_disabled = false


/*
 * init
 */
const waitingSeconds = 60 - new Date().getSeconds()

setTimeout(() => {
  checkAlarm()
  chrome.alarms.create("cuckoo_alarm", {"periodInMinutes": 1})
  chrome.alarms.onAlarm.addListener(checkAlarm)
  console.log("alarm created")
}, waitingSeconds * 1000)


/*
 * alarm
 */
const cuckoo = new Audio(chrome.runtime.getURL("alarm.mp3"))

function checkAlarm()
{
  if (is_disabled) {
    return false
  }

  if (new Date().getMinutes() % per_minutes !== 0) {
    return false
  }

  cuckoo.play()
  console.log("cuckoo!")
  return true
}


/*
 * button clicked
 */
chrome.browserAction.onClicked.addListener(() => {
  is_disabled = ! is_disabled

  const icon = is_disabled ? 'icon_disabled' : 'icon128'
  chrome.browserAction.setIcon({path: `icons/${icon}.png`})

  console.log({is_disabled})
})
