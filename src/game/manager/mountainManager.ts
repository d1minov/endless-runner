import { CylinderGeometry, InstancedMesh, Matrix4, MeshNormalMaterial, Vector3 } from "three";
import { config } from "../config"
import { getYFromZ } from "../3d/position";
import { base3d } from "../3d/base3d";
import { assets } from "../assets";


function createMountainManager () {
  const FOLIAGE_HEIGHT = 2.2
  const y = -0.5
  const count = 350
  const trunks = new InstancedMesh(
    assets.treeTrunk.geometry,
    assets.treeTrunk.material,
    count
  );
  trunks.castShadow = true
  trunks.receiveShadow = true
  const foliages = new InstancedMesh(
    assets.treeFoliage.geometry,
    assets.treeFoliage.material,
    count
  );
  foliages.castShadow = true
  foliages.receiveShadow = true

  for (let i = 0; i < count; i++) {
    const isLeft = (i % 2) === 0
    const currentZ = -(i - (isLeft ? 0 : 1)) * (config.INIT_ITEMS_DISTANCE * 2) / count
    const matrix1 = new Matrix4();
    const scale = 0.5 + Math.random()
    const vector3 = new Vector3(
      (Math.random() - 0.5) * 6 + (isLeft ? -7 : 7),
      getYFromZ(currentZ, y),
      currentZ
    )
    
    matrix1.makeRotationY(Math.random() * Math.PI * 2)
    matrix1.setPosition(vector3)
    matrix1.scale(new Vector3(scale, scale, scale))
    
    const matrix2 = new Matrix4();
    matrix2.makeRotationY(Math.random() * Math.PI * 2)
    vector3.y = getYFromZ(currentZ, y + FOLIAGE_HEIGHT * scale )
    matrix2.setPosition(vector3)
    matrix2.scale(new Vector3(scale, scale, scale))

    trunks.setMatrixAt( i, matrix1 );
    foliages.setMatrixAt( i, matrix2 );
  }
  
  base3d.scene.add(trunks)
  base3d.scene.add(foliages)

  const matrix = new Matrix4();
  const vector3 = new Vector3()
  const scale = new Vector3()
  function tick() {
    for (let i = 0; i < count; i++) {  
      trunks.getMatrixAt(i, matrix)
      vector3.setFromMatrixPosition(matrix)
      vector3.z += config.ITEMS_VELOCITY
      if (vector3.z > 8) {
        vector3.z -= config.INIT_ITEMS_DISTANCE
      }
      vector3.y = getYFromZ(vector3.z, y)
      matrix.setPosition(vector3)
      trunks.setMatrixAt(i, matrix)
      scale.setFromMatrixScale(matrix)
      
      // Foliage
      foliages.getMatrixAt(i, matrix)
      vector3.setFromMatrixPosition(matrix)
      vector3.z += config.ITEMS_VELOCITY
      if (vector3.z > 8) {
        vector3.z -= config.INIT_ITEMS_DISTANCE
      }
      vector3.y = getYFromZ(vector3.z, y + FOLIAGE_HEIGHT * scale.y)
      matrix.setPosition(vector3)
      foliages.setMatrixAt(i, matrix)
    }

    trunks.instanceMatrix.needsUpdate = true;
    foliages.instanceMatrix.needsUpdate = true;
  }

  return {
    tick
  }
}

export const mountainManager = createMountainManager()
