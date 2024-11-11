import { base3d } from "./3d/base3d"
import { player3d } from "./entity/player";

function Game () {

  base3d.renderer.setAnimationLoop( mainLoop );
  base3d.scene.add(player3d.mesh)

  

  function mainLoop() {
    base3d.tick()
  }
}

export const game = Game()
