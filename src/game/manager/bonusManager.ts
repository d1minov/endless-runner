import { config } from "../config"
import { createBonus } from "../entity/createBonus"

const DELAY = 3000

function createBonusManager () {
  const list: ReturnType<typeof createBonus>[] = []

  setInterval(spawnNew, DELAY)

  function tick() {
    for (const bonus of list) {
      bonus.tick()
    }
  }

  function spawnNew() {
    createBonus({ x: config.LINE_POSITIONS[Math.floor(Math.random() * config.LINE_COUNT)]})
  }

  return {
    list,
    tick
  }
}

export const bonusManager = createBonusManager()
