import { CylinderGeometry, InstancedMesh, Matrix4, MeshNormalMaterial, Vector3 } from "three";
import { config } from "../config"
import { getYFromZ } from "../3d/position";
import { base3d } from "../3d/base3d";


function createMountainManager () {

  const y = 0
  const distanceBetweenMountain = 8
  const count = config.INIT_ITEMS_DISTANCE * 2 / distanceBetweenMountain
  const mountains = new InstancedMesh(
    new CylinderGeometry(0, 6, 6, 5, 1),
    new MeshNormalMaterial(),
    count
  );

  for (let i = 0; i < count; i++) {
    const isLeft = (i % 2) === 0
    const currentZ = -(i - (isLeft ? 0 : 1)) * distanceBetweenMountain / 2
    const matrix = new Matrix4();
    const vector3 = new Vector3(isLeft ? -7 : 7, getYFromZ(currentZ, y), currentZ)
    // matrix.makeRotationZ(Math.PI / 2)
    matrix.setPosition(vector3)
    mountains.setMatrixAt( i, matrix );
  }
  
  base3d.scene.add(mountains)

  const matrix = new Matrix4();
  const vector3 = new Vector3()
  function tick() {
    for (let i = 0; i < count; i++) {  
      mountains.getMatrixAt(i, matrix)
      vector3.setFromMatrixPosition(matrix)
      vector3.z += config.ITEMS_VELOCITY
      if (vector3.z > 8) {
        vector3.z -= config.INIT_ITEMS_DISTANCE
      }
      vector3.y = getYFromZ(vector3.z, y)
      matrix.setPosition(vector3)
      mountains.setMatrixAt(i, matrix)
    }

    mountains.instanceMatrix.needsUpdate = true;
  }

  return {
    tick
  }
}

export const mountainManager = createMountainManager()
