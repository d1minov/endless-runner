import { Controls } from "../game/controls"

const btnSelectors = [
  '.btn-easy',
  '.btn-normal',
  '.btn-hard',
  '.btn-home',
]

Controls({
  onLeft() {
    const index = ((getCurrentActiveIndex() - 1) + btnSelectors.length) % btnSelectors.length
    setActive(index)
  },
  onRight() {
    const index = (getCurrentActiveIndex() + 1) % btnSelectors.length
    setActive(index)
  },
  onJumpEnd() {
    getCurrentActive().click()
  }
})

function setActive(index: number) {
  return (document.body.querySelector(btnSelectors[index]) as HTMLLinkElement).focus()
}

function getCurrentActive() {
  const btnList = btnSelectors.map(selector => document.body.querySelector(selector)) as HTMLLinkElement[]
  return (btnList.indexOf(document.activeElement as HTMLLinkElement) > -1 ? document.activeElement : btnList[0]) as HTMLLinkElement
}

function getCurrentActiveIndex() {
  const btnList = btnSelectors.map(selector => document.body.querySelector(selector)) as HTMLLinkElement[]
  const currentBtn = getCurrentActive()
  return btnList.indexOf(currentBtn)
}

