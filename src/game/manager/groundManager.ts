import { CylinderGeometry, InstancedMesh, Material, Matrix4, MeshBasicMaterial, MeshNormalMaterial, Vector3 } from "three";
import { config } from "../config"
import { getYFromZ } from "../3d/position";
import { base3d } from "../3d/base3d";

function createCylindersManager ({ xInit, material, width }: { xInit: number, material: Material, width: number }) {
  const count = config.INIT_ITEMS_DISTANCE
  const road = new InstancedMesh(
    new CylinderGeometry(0.5, 0.5, width),
    material,
    count
  );
  let z = 0

  for (let i = 0; i < count; i++) {

    const y = -1
    const currentZ = z + 1 - i

    const matrix = new Matrix4();
    const vector3 = new Vector3(xInit, getYFromZ(currentZ, y), currentZ)
    matrix.makeRotationZ(Math.PI / 2)
    matrix.setPosition(vector3)
    road.setMatrixAt( i, matrix );
  }
  
  base3d.scene.add(road)

  const matrix = new Matrix4();
  const vector3 = new Vector3()
  function tick() {
    z = (z + config.ITEMS_VELOCITY) % 1
    for (let i = 0; i < count; i++) {
      const y = -1
      const currentZ = z + 1 - i
  
      road.getMatrixAt(i, matrix)
      vector3.set(xInit, getYFromZ(currentZ, y), currentZ)
      matrix.setPosition(vector3)
      road.setMatrixAt(i, matrix)
    }

    road.instanceMatrix.needsUpdate = true;
  }

  return {
    tick
  }
}

function createGroundManager () {
  const road = createCylindersManager({
    xInit: 0,
    material: new MeshNormalMaterial(),
    width: config.LINE_COUNT
  })

  const borderWidth = 10
  const material = new MeshBasicMaterial({ color: 0x331111 })
  const left = createCylindersManager({
    xInit: -(config.LINE_COUNT + borderWidth) / 2,
    material,
    width: borderWidth
  })
  const right = createCylindersManager({
    xInit: (config.LINE_COUNT + borderWidth) / 2,
    material,
    width: borderWidth
  })

  function tick() {
    road.tick()
    left.tick()
    right.tick()
  }

  return {
    tick
  }
}

export const groundManager = createGroundManager()
