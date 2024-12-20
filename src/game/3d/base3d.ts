
import * as THREE from 'three';
import { assets } from '../assets';
import { config } from '../config';

function createBase3D () {

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2355AB)
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  camera.position.y = 2;
  camera.lookAt(scene.position)
  camera.position.y = 4;

  const background = assets.background
  background.position.set(0, 20, -config.INIT_ITEMS_DISTANCE)
  background.scale.multiplyScalar(8)
  background.lookAt(0, -100, background.position.z + 40)
  // background.rotateX(Math.PI / 2)
  scene.add(background)

  const light = new THREE.AmbientLight(0xAAAAFF, 0.7)
  scene.add(light)
  
  const sun = new THREE.DirectionalLight(0xFFFFFF, 2)
  sun.castShadow = true
  sun.position.set(0, 4, 0)
  // sun.lookAt(new THREE.Vector3(0, 0, -4))
  sun.rotateX(Math.PI / 2)
  // sun.lookAt(new THREE.Vector3(sun.position.x, 0, 2 * sun.position.z))
  sun.shadow.camera.near = 0.25
  sun.shadow.camera.far = 9
  sun.shadow.camera.top = config.INIT_ITEMS_DISTANCE - 1
  sun.shadow.camera.bottom = -3
  sun.shadow.camera.left = -10
  sun.shadow.camera.right = 10


  scene.add(sun)

  if (config.DEBUG) {
    const helper = new THREE.DirectionalLightHelper(sun)
    scene.add(helper)
    const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
    scene.add(shadowHelper);
  }

  const renderer = new THREE.WebGLRenderer({
    canvas: document.body.querySelector('canvas')!
  });
  renderer.setSize( window.innerWidth, window.innerHeight, false );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  // document.body.appendChild( renderer.domElement );

  function tick() {
    renderer.render( scene, camera );
  }

  addEventListener("resize",() => {
    const { innerWidth, innerHeight } =  window
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( innerWidth,  innerHeight);
  });

  return {
    scene,
    renderer,
    tick,
    camera
  }
}

export const base3d = createBase3D()
