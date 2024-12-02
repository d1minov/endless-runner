import { config } from "../config"
import { createObstacle } from "../entity/createObstacle"

function createObstacleManager () {
  const list: ReturnType<typeof createObstacle>[] = []

  let currentDist = 0
  let nextDistSpawn = 10

  function tick() {
    const obstacles = [...list]
    for (const obstacle of obstacles) {
      obstacle.tick()
    }

    currentDist += config.ITEMS_VELOCITY
    if (currentDist >= nextDistSpawn) {
      spawnNew(currentDist - nextDistSpawn)
      nextDistSpawn = Math.floor(currentDist) + config.OBSTACLE_DIST
    }
   }

  function spawnNew(gap: number) {
    const min = 1
    const max = config.LINE_COUNT
    const count = Math.floor((Math.random() ** 2) * (max - min) + min)
    const positions: number[] = []
    while (positions.length < count) {
      const x = config.LINE_POSITIONS[Math.floor(Math.random() * config.LINE_COUNT)]
      if (positions.indexOf(x) === -1) {
        positions.push(x)
      }
    }

    for(const x of positions) {
      createObstacle({ x, y: 0, z: -(config.INIT_ITEMS_DISTANCE + gap)})
    }
  }

  return {
    list,
    tick
  }
}

export const obstacleManager = createObstacleManager()
