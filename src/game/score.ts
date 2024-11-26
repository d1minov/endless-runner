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
        lifeEl.innerHTML = '☠️'
        player.dies()
        setTimeout(() => window.location.href = `score.html?score=${bonus}`, 1000)
      }
    },
  }
}

export const score = createScore()
