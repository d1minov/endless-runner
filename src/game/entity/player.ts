
import * as THREE from 'three';
import { Keyboard } from '../controls/keyboard';
import { base3d } from '../3d/base3d';
import { config } from '../config';

function createPlayer () {

  const geometry = new THREE.SphereGeometry(0.5);
  const material = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = 0

  let xTarget = 0
  let yTarget = 0
  let jumpDist = 0

  base3d.scene.add(mesh)

  Keyboard({
    onLeft() {
      if (mesh.position.y === 0) {
        xTarget = Math.max(xTarget - 1, -Math.floor(config.LINE_COUNT / 2))
      }
    },
    onRight() {
      if (mesh.position.y === 0) {
        xTarget = Math.min(xTarget + 1, Math.floor(config.LINE_COUNT / 2))
      }
    },
    onJump() {
      if (mesh.position.y <= 0) {
        jumpDist = 0
        yTarget = 1
      }
    },
    onJumpEnd() {
      yTarget = 0
    }
  })

  function tick() {
    if (mesh.position.y > 0) {
      jumpDist += config.ITEMS_VELOCITY
      if (jumpDist >= config.PLAYER_JUMP_DIST) {
        yTarget = 0
      }
    }

    if (Math.abs(mesh.position.x - xTarget) <= config.PLAYER_VELOCITY_X) {
      mesh.position.x = xTarget
    }

    if (Math.abs(mesh.position.y - yTarget) <= config.PLAYER_VELOCITY_Y) {
      mesh.position.y = yTarget
    }
    
    if (mesh.position.x > xTarget) {
      mesh.position.x -= config.PLAYER_VELOCITY_X
    } else if (mesh.position.x < xTarget) {
      mesh.position.x += config.PLAYER_VELOCITY_X
    }

    if (mesh.position.y > yTarget) {
      mesh.position.y -= config.PLAYER_VELOCITY_Y
    } else if (mesh.position.y < yTarget) {
      mesh.position.y += config.PLAYER_VELOCITY_Y
    }
  }

  function dies() {
    mesh.position.set(config.LINE_COUNT * 1000, -1000, base3d.camera.position.z + 1000)
    base3d.scene.remove(mesh)
  }

  return {
    mesh,
    dies,
    tick
  }
}

export const player = createPlayer()
