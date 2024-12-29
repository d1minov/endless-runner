
import { BufferGeometry, Material, Mesh, MeshBasicMaterial, MeshStandardMaterial, NormalBufferAttributes, Object3DEventMap } from 'three';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';

type GMesh = Mesh<BufferGeometry<NormalBufferAttributes>, Material, Object3DEventMap>

function getMesh(gltf: GLTF, name: string) {
  const mesh = gltf.scene.children.find(mesh => mesh.name === name) as GMesh

  const map = (mesh.material as MeshStandardMaterial).map
  const emissiveMap = (mesh.material as MeshStandardMaterial).emissiveMap
  const color = (mesh.material as MeshStandardMaterial).color

  mesh.material = new MeshBasicMaterial({
    ...(map ? { map } : emissiveMap ? { map: emissiveMap } : {color})
  })
  
  return mesh 
}


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
    grassGround: GMesh,
    rock: GMesh,
    background: GMesh,
  }>((resolve) => {
    loader.load( 'assets.gltf', async function ( gltf ) {
      console.log(gltf.scene)

      const grassGround = getMesh(gltf, 'Grass2')

      // Merge all grass
      const geometries = [];
      for ( const child of grassGround.children ) {
        const instanceGeometry = (child as GMesh).geometry.clone();
        instanceGeometry.applyMatrix4( (child as GMesh).matrix );
        geometries.push( instanceGeometry );
      }
      const mergedGeometry = BufferGeometryUtils.mergeGeometries( geometries );
      const grass = new Mesh( mergedGeometry,
        new MeshBasicMaterial({
          map: ((grassGround.children[0] as GMesh).material as MeshStandardMaterial).emissiveMap
        })
      )



      resolve({
        chickenBeak: getMesh(gltf, 'ChickenBeak'),
        chickenBody: getMesh(gltf, 'ChickenBody'),
        chickenCrest: getMesh(gltf, 'ChickenCrest'),
        chickenLegs: getMesh(gltf, 'ChickenLegs'),
        treeTrunk: getMesh(gltf, 'TreeTrunk2'),
        treeFoliage: getMesh(gltf, 'TreeFoliage2'),
        bonus: getMesh(gltf, 'Bonus'),
        bush: getMesh(gltf, 'Bush'),
        life: getMesh(gltf, 'Life'),
        road3: getMesh(gltf, 'Road3'),
        road5: getMesh(gltf, 'Road5'),
        grass,
        grassGround,
        rock: getMesh(gltf, 'Rock'),
        background: getMesh(gltf, 'Background'),
      })

      // wait until the model can be added to the scene without blocking due to shader compilation
      // await renderer.compileAsync( model, camera, scene );
    
      // scene.add( model );
    
      // render();
    
    } );
  }) 
}

export const assets = await createAssets()
