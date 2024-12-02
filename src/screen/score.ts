import { Controls } from "../game/controls"

Controls({
  onJumpEnd() {
    (document.body.querySelector('.btn-replay') as HTMLLinkElement).click()
  }
})