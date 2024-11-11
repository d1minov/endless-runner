export function Keyboard({
  onLeft, onRight, onJump
}: { onLeft: () => void, onRight: () => void, onJump: () => void,  }) {
  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case "ArrowLeft":
          onLeft()
          // Left pressed
          break;
      case "ArrowRight":
        onRight()
          // Right pressed
          break;
      case "Space":
        onJump()
        break;
    }
  })
}