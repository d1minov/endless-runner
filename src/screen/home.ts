import { Controls } from "../game/controls"

Controls({
  onJumpEnd() {
    (document.body.querySelector('.btn-start') as HTMLLinkElement).click()
  }
})