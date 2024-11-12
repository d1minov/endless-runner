
import * as THREE from 'three';
import { Keyboard } from '../controls/keyboard';
import { base3d } from '../3d/base3d';
import { config } from '../config';

function createPlayer () {

  const geometry = new THREE.SphereGeometry(0.5);
  const material = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = 0

  base3d.scene.add(mesh)

  Keyboard({
    onLeft() {
      mesh.position.x = Math.max(mesh.position.x - 1, -Math.floor(config.LINE_COUNT / 2))
    },
    onRight() {
      mesh.position.x = Math.min(mesh.position.x + 1, Math.floor(config.LINE_COUNT / 2))
    },
    onJump() {
      // todo
    },
  })

  function dies() {
    mesh.position.set(config.LINE_COUNT * 1000, -1000, base3d.camera.position.z + 1000)
    base3d.scene.remove(mesh)
  }

  return {
    mesh,
    dies
  }
}

export const player = createPlayer()
