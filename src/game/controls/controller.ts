
export function Controller({
  onLeft, onRight, onJump, onJumpEnd
}: { onLeft: () => void, onRight: () => void, onJump: () => void, onJumpEnd: () => void  }) {
  const values = {
    action: false,
    left: false,
    right: false,
  }

  setInterval(() => {
    const gamepads = navigator.getGamepads()
    const tempValues = {
      action: false,
      left: false,
      right: false,
    }

    for (const gamepad of gamepads) {
      if (gamepad) {
        tempValues.action = gamepad.buttons[0].pressed || gamepad.buttons[1].pressed || gamepad.buttons[2].pressed || gamepad.buttons[3].pressed
        tempValues.left = gamepad.buttons[14].pressed
        tempValues.right = gamepad.buttons[15].pressed
      }
    }

    if (values.action !== tempValues.action) {
      if (tempValues.action) {
        onJump()
      } else {
        onJumpEnd()
      }
      values.action = tempValues.action
    }

    if (values.left !== tempValues.left) {
      if (tempValues.left) {
        onLeft()
      }
      values.left = tempValues.left
    }

    if (values.right !== tempValues.right) {
      if (tempValues.right) {
        onRight()
      }
      values.right = tempValues.right
    }
  }, 1000 / 120)
}