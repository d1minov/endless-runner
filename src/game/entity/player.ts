
import * as THREE from 'three';
import { Keyboard } from '../controls/keyboard';

function Player3d () {

  const geometry = new THREE.SphereGeometry(0.5);
  const material = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = 1

  Keyboard({
    onLeft() {
      mesh.position.x -= 1
    },
    onRight() {
      mesh.position.x += 1
    },
    onJump() {
      // todo
    },
  })

  return {
    mesh
  }
}

export const player3d = Player3d()
