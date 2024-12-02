
import * as THREE from 'three';
import { base3d } from '../3d/base3d';
import { config } from '../config';
import { outTest } from '../physic/outTest';
import { hitTest } from '../physic/hitTest';
import { player } from './player';
import { bonusManager } from '../manager/bonusManager';
import { score } from '../score';
import { getYFromZ } from '../3d/position';

const geometry = new THREE.SphereGeometry(0.5);
const material = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );

export function createBonus ({ x, y, z }: { x: number, y: number, z: number }) {
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(x, getYFromZ(z, y), z)

  base3d.scene.add(mesh)
  
  function tick() {
    mesh.position.z += config.ITEMS_VELOCITY
    mesh.position.y = getYFromZ(mesh.position.z, y)

    if (outTest(mesh.position)) {
      base3d.scene.remove(mesh)
      bonusManager.list.splice(bonusManager.list.indexOf(bonus), 1)
    }

    if (hitTest(mesh.position, player.mesh.position)) {
      base3d.scene.remove(mesh)
      bonusManager.list.splice(bonusManager.list.indexOf(bonus), 1)
      score.bonus += 10
    }
  }

  const bonus = {
    tick,
    mesh
  }

  bonusManager.list.push(bonus)

  return bonus
}
