
import * as THREE from 'three';
import { base3d } from '../3d/base3d';
import { config } from '../config';
import { outTest } from '../physic/outTest';
import { hitTest } from '../physic/hitTest';
import { player } from './player';
import { bonusManager } from '../manager/bonusManager';
import { score } from '../score';

const geometry = new THREE.SphereGeometry(0.5);
const material = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );

export function createBonus ({ x }: { x: number }) {

  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = x
  mesh.position.z = -10

  base3d.scene.add(mesh)
  
  function tick() {
    mesh.position.z += config.VELOCITY

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
    tick
  }

  bonusManager.list.push(bonus)

  return bonus
}
