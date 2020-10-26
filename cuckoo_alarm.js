/*
 * cuckoo alarm
 */
console.log("start")
const per_minutes = 30
let is_disabled = false


chrome.alarms.onAlarm.addListener(checkAlarm)
setNextAlarm()

function setNextAlarm()
{
  const now = new Date()
  const next = new Date()
  next.setMinutes(Math.floor(now.getMinutes() / 2) * 2 + 2)
  next.setSeconds(0)
  next.setMilliseconds(0)

  if (next - now > 60000) {
    chrome.alarms.create("cuckoo_alarm", { "when": next.getTime() })
  }
  else {
    // less than 1 minute
    setTimeout(checkAlarm, next - now)
  }
}


/*
 * Cuckoo!
 */
const cuckoo = new Audio(chrome.runtime.getURL("alarm.mp3"))

function checkAlarm()
{
  if (new Date().getMinutes() % per_minutes === 0) {
    console.log("cuckoo!")

    if (!is_disabled) {
      cuckoo.play()
    }
  }

  updateIcon()
  setNextAlarm()
}


/*
 * button clicked
 */
chrome.browserAction.onClicked.addListener(() => {
  is_disabled = !is_disabled
  updateIcon()
})

function updateIcon() {
  const icon = is_disabled ? 'icon_disabled' : 'icon128'
  chrome.browserAction.setIcon({ path: `icons/${icon}.png` })
}
