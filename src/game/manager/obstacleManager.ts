import { config } from "../config"
import { createObstacle } from "../entity/createObstacle"

const DELAY = 1000

function createObstacleManager () {
  const list: ReturnType<typeof createObstacle>[] = []

  setTimeout(() => {
    setInterval(spawnNew, DELAY)
  }, DELAY / 2)

  function tick() {
    for (const obstacle of list) {
      obstacle.tick()
    }
  }

  function spawnNew() {
    createObstacle({ x: config.LINE_POSITIONS[Math.floor(Math.random() * config.LINE_COUNT)]})
  }

  return {
    list,
    tick
  }
}

export const obstacleManager = createObstacleManager()
