import { base3d } from "./3d/base3d"
import { config } from "./config";
import { player } from "./entity/player";
import { itemManager } from "./manager/itemManager";
import { groundManager } from "./manager/groundManager";
import { mountainManager } from "./manager/mountainManager";
import { obstacleManager } from "./manager/obstacleManager";
import { score } from "./score";

function Game () {

  base3d.renderer.setAnimationLoop( mainLoop );

  score.bonus = 0
  score.lifes = config.LIFE_COUNT

  function mainLoop() {
    player.tick()
    base3d.tick()
    itemManager.tick()
    obstacleManager.tick()
    groundManager.tick()
    mountainManager.tick()
    config.tick()
    // bonus.tick()
  }
}

export const game = Game()
