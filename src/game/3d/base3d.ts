
import * as THREE from 'three';

function createBase3D () {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  camera.position.y = 2;
  camera.lookAt(scene.position)
  camera.position.y = 4;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.body.querySelector('canvas')!
  });
  renderer.setSize( window.innerWidth, window.innerHeight, false );
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
