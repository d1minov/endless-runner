export function Keyboard({
  onLeft, onRight, onJump, onJumpEnd
}: { onLeft: () => void, onRight: () => void, onJump: () => void, onJumpEnd: () => void  }) {
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case "ArrowLeft":
        onLeft()
        // Left pressed
        break;
      case "ArrowRight":
        onRight()
        // Right pressed
        break;
      case " ":
        onJump()
        break;
    }
  })

  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case " ":
        onJumpEnd()
        break;
    }
  })
}