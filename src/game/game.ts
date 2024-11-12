import { base3d } from "./3d/base3d"
import { config } from "./config";
import { player } from "./entity/player";
import { bonusManager } from "./manager/bonusManager";
import { obstacleManager } from "./manager/obstacleManager";
import { score } from "./score";

function Game () {

  base3d.renderer.setAnimationLoop( mainLoop );

  score.bonus = 0
  score.lifes = 3

  function mainLoop() {
    player.tick()
    base3d.tick()
    bonusManager.tick()
    obstacleManager.tick()
    config.tick()
    // bonus.tick()
  }
}

export const game = Game()
