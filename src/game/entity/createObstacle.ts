
import * as THREE from 'three';
import { base3d } from '../3d/base3d';
import { config } from '../config';
import { outTest } from '../physic/outTest';
import { obstacleManager } from '../manager/obstacleManager';
import { player } from './player';
import { hitTest } from '../physic/hitTest';
import { score } from '../score';
import { getYFromZ } from '../3d/position';

const DEBUG = true

const geometry = new THREE.BoxGeometry(1);
const material = new THREE.MeshNormalMaterial();


export function createObstacle ({ x, y, z }: { x: number, y: number, z: number }) {

  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(x, getYFromZ(z, y), z)
  
  base3d.scene.add(mesh)

  function tick() {
    mesh.position.z += config.ITEMS_VELOCITY
    mesh.position.y = getYFromZ(mesh.position.z, y)

    if (outTest(mesh.position)) {
      base3d.scene.remove(mesh)
      obstacleManager.list.splice(obstacleManager.list.indexOf(obstacle), 1)
    }

    if (hitTest(mesh.position, player.mesh.position)) {
      base3d.scene.remove(mesh)
      obstacleManager.list.splice(obstacleManager.list.indexOf(obstacle), 1)
      
      if (!DEBUG) {
        score.lifes--
      }
    }
  }

  const obstacle = {
    tick,
    mesh
  }
  
  obstacleManager.list.push(obstacle)

  return obstacle
}
