import { config } from "../config"
import { createObstacle } from "../entity/createObstacle"

const DELAY = 1000

function createObstacleManager () {
  const list: ReturnType<typeof createObstacle>[] = []

  setTimeout(() => {
    setInterval(spawnNew, DELAY)
  }, DELAY / 2)

  function tick() {
    const obstacles = [...list]
    for (const obstacle of obstacles) {
      obstacle.tick()
    }
   }

  function spawnNew() {

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
      createObstacle({ x })
    }
  }

  return {
    list,
    tick
  }
}

export const obstacleManager = createObstacleManager()
