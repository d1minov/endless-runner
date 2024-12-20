
import * as THREE from 'three';
import { base3d } from '../3d/base3d';
import { config } from '../config';
import { outTest } from '../physic/outTest';
import { hitTest } from '../physic/hitTest';
import { player } from './player';
import { itemManager } from '../manager/itemManager';
import { score } from '../score';
import { getYFromZ } from '../3d/position';
import { assets } from '../assets';

export function createBonus ({ x, y, z }: { x: number, y: number, z: number }) {
  const mesh = new THREE.Mesh( assets.bonus.geometry, assets.bonus.material );
  mesh.position.set(x, getYFromZ(z, y), z)
  mesh.scale.multiplyScalar(0.5)
  mesh.castShadow = true

  base3d.scene.add(mesh)
  
  function tick() {
    mesh.position.z += config.ITEMS_VELOCITY
    mesh.position.y = getYFromZ(mesh.position.z, y)

    if (outTest(mesh.position)) {
      base3d.scene.remove(mesh)
      itemManager.list.splice(itemManager.list.indexOf(bonus), 1)
    }

    if (hitTest(mesh.position, player.mesh.position)) {
      base3d.scene.remove(mesh)
      itemManager.list.splice(itemManager.list.indexOf(bonus), 1)
      score.bonus += 10
    }
  }

  const bonus = {
    tick,
    mesh
  }

  itemManager.list.push(bonus)

  return bonus
}
