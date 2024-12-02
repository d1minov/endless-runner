import { config } from "../config"
import { createBonus } from "../entity/createBonus"

function createBonusManager () {
  const list: ReturnType<typeof createBonus>[] = []

  let currentDist = 0
  let nextDistSpawn = 10

  function tick() {
    for (const bonus of list) {
      bonus.tick()
    }

    currentDist += config.ITEMS_VELOCITY
    if (currentDist >= nextDistSpawn) {
      spawnNew(currentDist - nextDistSpawn)
      nextDistSpawn = Math.floor(currentDist) + config.OBSTACLE_DIST
    }
  }

  function spawnNew(gap: number) {
    createBonus({
      x: config.LINE_POSITIONS[Math.floor(Math.random() * config.LINE_COUNT)],
      y: Math.random() < 0.25 ? 1 : 0,
      z: -(Math.round(config.INIT_ITEMS_DISTANCE * 1.5) + gap)
    })
  }

  return {
    list,
    tick
  }
}

export const bonusManager = createBonusManager()
