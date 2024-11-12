
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
  let yVelocity = 0

  base3d.scene.add(mesh)

  Keyboard({
    onLeft() {
      if (yVelocity === 0) {
        xTarget = Math.max(xTarget - 1, -Math.floor(config.LINE_COUNT / 2))
      }
    },
    onRight() {
      if (yVelocity === 0) {
        xTarget = Math.min(xTarget + 1, Math.floor(config.LINE_COUNT / 2))
      }
    },
    onJump() {
      if (mesh.position.y <= 0) {
        yVelocity = config.PLAYER_JUMP_POWER
      }
    },
  })

  function tick() {

    if (Math.abs(mesh.position.x - xTarget) <= config.PLAYER_VELOCITY_X) {
      mesh.position.x = xTarget
    }

    if (yVelocity !== 0) {
      mesh.position.y += yVelocity
      yVelocity -= config.PLAYER_JUMP_GRAVITY
    }

    if (yVelocity < 0 && mesh.position.y < 0) {
      yVelocity = 0
      mesh.position.y = 0
    }

    if (mesh.position.x > xTarget) {
      mesh.position.x -= config.PLAYER_VELOCITY_X
    } else if (mesh.position.x < xTarget) {
      mesh.position.x += config.PLAYER_VELOCITY_X
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
