
import { BufferGeometry, Color, Material, Mesh, MeshPhysicalMaterial, NormalBufferAttributes, Object3DEventMap } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

type GMesh = Mesh<BufferGeometry<NormalBufferAttributes>, Material, Object3DEventMap>

async function createAssets() {
  const loader = new GLTFLoader().setPath( '/assets/' );
  return new Promise<{
    chickenBeak: GMesh,
    chickenBody: GMesh,
    chickenCrest: GMesh,
    chickenLegs: GMesh,
    treeTrunk: GMesh,
    treeFoliage: GMesh,
    bonus: GMesh,
    life: GMesh,
    road3: GMesh,
    road5: GMesh,
    bush: GMesh,
    grass: GMesh,
    rock: GMesh,
    background: GMesh,
  }>((resolve) => {
    loader.load( 'assets.gltf', async function ( gltf ) {
      console.log(gltf.scene)

      resolve({
        chickenBeak: gltf.scene.children.find(mesh => mesh.name === 'ChickenBeak') as GMesh,
        chickenBody: gltf.scene.children.find(mesh => mesh.name === 'ChickenBody') as GMesh,
        chickenCrest: gltf.scene.children.find(mesh => mesh.name === 'ChickenCrest') as GMesh,
        chickenLegs: gltf.scene.children.find(mesh => mesh.name === 'ChickenLegs') as GMesh,
        treeTrunk: gltf.scene.children.find(mesh => mesh.name === 'TreeTrunk2') as GMesh,
        treeFoliage: gltf.scene.children.find(mesh => mesh.name === 'TreeFoliage2') as GMesh,
        bonus: gltf.scene.children.find(mesh => mesh.name === 'Bonus') as GMesh,
        bush: gltf.scene.children.find(mesh => mesh.name === 'Bush') as GMesh,
        life: gltf.scene.children.find(mesh => mesh.name === 'Life') as GMesh,
        road3: gltf.scene.children.find(mesh => mesh.name === 'Road3') as GMesh,
        road5: gltf.scene.children.find(mesh => mesh.name === 'Road5') as GMesh,
        grass: gltf.scene.children.find(mesh => mesh.name === 'Grass2') as GMesh,
        rock: gltf.scene.children.find(mesh => mesh.name === 'Rock') as GMesh,
        background: gltf.scene.children.find(mesh => mesh.name === 'Background') as GMesh,
      })

      // wait until the model can be added to the scene without blocking due to shader compilation
      // await renderer.compileAsync( model, camera, scene );
    
      // scene.add( model );
    
      // render();
    
    } );
  }) 
}

export const assets = await createAssets()
