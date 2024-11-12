
import * as THREE from 'three';
import { base3d } from '../3d/base3d';
import { config } from '../config';
import { outTest } from '../physic/outTest';
import { obstacleManager } from '../manager/obstacleManager';
import { player } from './player';
import { hitTest } from '../physic/hitTest';
import { score } from '../score';

const geometry = new THREE.BoxGeometry(1);
const material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );

export function createObstacle ({ x }: { x: number }) {

  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = x
  mesh.position.z = -10

  base3d.scene.add(mesh)

  function tick() {
    mesh.position.z += config.VELOCITY

    if (outTest(mesh.position)) {
      base3d.scene.remove(mesh)
      obstacleManager.list.splice(obstacleManager.list.indexOf(obstacle), 1)
    }

    if (hitTest(mesh.position, player.mesh.position)) {
      base3d.scene.remove(mesh)
      obstacleManager.list.splice(obstacleManager.list.indexOf(obstacle), 1)
      score.lifes--
    }
  }

  const obstacle = {
    tick
  }
  
  obstacleManager.list.push(obstacle)

  return obstacle
}
