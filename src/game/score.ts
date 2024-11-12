import { player } from "./entity/player"

function createScore () {

  const bonusEl = document.body.querySelector('.score-points')!
  const lifeEl = document.body.querySelector('.score-life')!

  let bonus = 0
  let lifes = 3

  return {
    get bonus () {
      return bonus
    },
    set bonus (points: number) {
      bonus = points
      bonusEl.innerHTML = `${bonus}pts`
    },
    get lifes () {
      return lifes
    },
    set lifes (value: number) {
      lifes = value
      if (lifes >= 0) {
        lifeEl.innerHTML = new Array(value).fill('💜').join('')
      } else {
        // Game over todo
        lifeEl.innerHTML = '☠️'
        player.dies()
      }
    },
  }
}

export const score = createScore()
