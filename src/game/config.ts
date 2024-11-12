function createConfig () {

  const initial = {
    ITEMS_VELOCITY: 0.1,
    ITEMS_DISTANCE: 50,

    PLAYER_VELOCITY_X: 0.25,
    PLAYER_JUMP_POWER: 0.15,
    PLAYER_JUMP_GRAVITY: 0.01,
  }

  const options = {
    ...initial,

    LINE_COUNT: 5,
    LINE_POSITIONS: [-2, -1, 0, 1, 2],

    tick
  }

  function tick() {
    const ACCELERATION = 0.0001
    options.ITEMS_VELOCITY += ACCELERATION
    
    const POWER_ACCELERATION = options.ITEMS_VELOCITY / initial.ITEMS_VELOCITY

    options.PLAYER_VELOCITY_X = POWER_ACCELERATION * initial.PLAYER_VELOCITY_X
    options.PLAYER_JUMP_POWER = POWER_ACCELERATION * initial.PLAYER_JUMP_POWER
    options.PLAYER_JUMP_GRAVITY = initial.PLAYER_JUMP_GRAVITY * POWER_ACCELERATION

  }

  return options
}

export const config = createConfig()
