function createConfig () {

  const initial = {
    ITEMS_VELOCITY: 0.1,
    INIT_ITEMS_DISTANCE: 50,

    OBSTACLE_DIST: 20,

    PLAYER_VELOCITY_X: 0.25,
    PLAYER_VELOCITY_Y: 0.1,
    PLAYER_JUMP_DIST: 3
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
    options.PLAYER_VELOCITY_Y = POWER_ACCELERATION * initial.PLAYER_VELOCITY_Y
  }

  return options
}

export const config = createConfig()
