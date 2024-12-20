function createConfig () {

  const urlParams = new URLSearchParams(window.location.search);
  const level = Number(urlParams.get('level'));

  const initial = {
    DEBUG: true,

    ITEMS_VELOCITY: [0.1, 0.2, 0.3][level],
    INIT_ITEMS_DISTANCE: 50,

    OBSTACLE_DIST: [20, 15, 10][level],

    PLAYER_VELOCITY_X: 0.25,
    PLAYER_VELOCITY_Y: 0.1,
    PLAYER_JUMP_DIST: [5, 4, 3][level],

    LIFE_COUNT: [3, 2, 1][level],
    LIFE_EVERY: [15, 20, 30][level],
    LIFE_MAX: 7,
  }

  const options = {
    ...initial,

    LINE_COUNT: ([3, 5, 5] as const)[level],
    LINE_POSITIONS: [-2, -1, 0, 1, 2],

    tick
  }

  switch (options.LINE_COUNT) {
    case 3:
      options.LINE_POSITIONS = [-1, 0, 1]
      break
    case 5:
      options.LINE_POSITIONS = [-2, -1, 0, 1, 2]
      break
  }

  function tick() {
    const ACCELERATION = [0.00005, 0.0001, 0.0001][level]
    options.ITEMS_VELOCITY += ACCELERATION
    
    const POWER_ACCELERATION = options.ITEMS_VELOCITY / initial.ITEMS_VELOCITY

    options.PLAYER_VELOCITY_X = POWER_ACCELERATION * initial.PLAYER_VELOCITY_X
    options.PLAYER_VELOCITY_Y = POWER_ACCELERATION * initial.PLAYER_VELOCITY_Y
  }

  return options
}

export const config = createConfig()
