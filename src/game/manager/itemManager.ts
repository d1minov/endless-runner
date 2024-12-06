import { config } from "../config"
import { createBonus } from "../entity/createBonus"
import { createLife } from "../entity/createLife"

function createItemManager () {
  const list: ReturnType<typeof createBonus>[] = []

  let currentDist = 0
  let nextDistSpawn = 10
  let id = 0

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

    if ((id % config.LIFE_EVERY === config.LIFE_EVERY - 1)) {
      createLife({
        x: config.LINE_POSITIONS[Math.floor(Math.random() * config.LINE_COUNT)],
        y: 1,
        z: -(Math.round(config.INIT_ITEMS_DISTANCE * 1.5) + gap)
      })
    } else {
      createBonus({
        x: config.LINE_POSITIONS[Math.floor(Math.random() * config.LINE_COUNT)],
        y: Math.random() < 0.25 ? 1 : 0,
        z: -(Math.round(config.INIT_ITEMS_DISTANCE * 1.5) + gap)
      })
    }

    id++
  }

  return {
    list,
    tick
  }
}

export const itemManager = createItemManager()
