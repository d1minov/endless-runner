import { Controller } from './controller.ts'
import { Keyboard } from './keyboard.ts'

export function Controls(options: { onLeft?: () => void, onRight?: () => void, onJump?: () => void, onJumpEnd?: () => void  }) {
  Keyboard(options)
  Controller(options)
}