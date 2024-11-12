import { base3d } from "./3d/base3d"
import { player } from "./entity/player";
import { bonusManager } from "./manager/bonusManager";
import { obstacleManager } from "./manager/obstacleManager";
import { score } from "./score";

function Game () {

  base3d.renderer.setAnimationLoop( mainLoop );
  player
  bonusManager
  obstacleManager

  score.bonus = 0
  score.lifes = 3

  function mainLoop() {
    base3d.tick()
    bonusManager.tick()
    obstacleManager.tick()
    // bonus.tick()
  }
}

export const game = Game()
