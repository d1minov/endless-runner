export function Keyboard({
  onLeft, onRight, onJump, onJumpEnd
}: { onLeft?: () => void, onRight?: () => void, onJump?: () => void, onJumpEnd?: () => void  }) {
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case "ArrowLeft":
        onLeft && onLeft()
        break;
      case "ArrowRight":
        onRight && onRight()
        break;
      case " ":
        onJump && onJump()
        break;
    }
  })

  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case " ":
        onJumpEnd && onJumpEnd()
        break;
    }
  })
}