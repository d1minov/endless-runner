import { BufferGeometry, InstancedMesh, Material, Matrix4, Vector3 } from "three";
import { config } from "../config"
import { getYFromZ } from "../3d/position";
import { base3d } from "../3d/base3d";
import { assets } from "../assets";

function createCylindersManager ({ xInit, geometry, material, random }: { xInit: number, material: Material, geometry: BufferGeometry, random: boolean }) {
  const count = config.INIT_ITEMS_DISTANCE
  const road = new InstancedMesh(
    geometry,
    material,
    count
  );
  let z = 0

  for (let i = 0; i < count; i++) {
    const y = -1
    const currentZ = z + 1 - i

    const matrix = new Matrix4();
    const vector3 = new Vector3(xInit, getYFromZ(currentZ, y), currentZ)
    if (random) {
      matrix.makeScale(Math.random() > 0.5 ? -1 : 1, 1, Math.random() > 0.5 ? -1 : 1)
    } else {
      matrix.makeScale(1 , 1, 1.1)
    }
    matrix.setPosition(vector3)
    road.setMatrixAt( i, matrix );
  }
  
  base3d.scene.add(road)

  const matrix = new Matrix4();
  const vector3 = new Vector3()
  function tick() {
    
    z = (z + config.ITEMS_VELOCITY)

    for (let i = 0; i < count; i++) {
      const y = -1
      const currentZ = (((z + 1 - i) + count - 3) % count) - (count - 3)
  
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
    material: config.LINE_COUNT === 3 ? assets.road3.material : assets.road5.material,
    geometry: config.LINE_COUNT === 3 ? assets.road3.geometry : assets.road5.geometry,
    random: false
  })

  const borderWidth = 10
  const leftGround = createCylindersManager({
    xInit: -(config.LINE_COUNT + borderWidth) / 2,
    material: assets.grassGround.material,
    geometry: assets.grassGround.geometry,
    random: false
  })
  const rightGround = createCylindersManager({
    xInit: (config.LINE_COUNT + borderWidth) / 2,
    material: assets.grassGround.material,
    geometry: assets.grassGround.geometry,
    random: false
  })
  const leftGrass = createCylindersManager({
    xInit: -(config.LINE_COUNT + borderWidth) / 2,
    material: assets.grass.material,
    geometry: assets.grass.geometry,
    random: true
  })
  const rightGrass = createCylindersManager({
    xInit: (config.LINE_COUNT + borderWidth) / 2,
    material: assets.grass.material,
    geometry: assets.grass.geometry,
    random: true
  })

  function tick() {
    road.tick()
    leftGround.tick()
    leftGrass.tick()
    rightGround.tick()
    rightGrass.tick()
  }

  return {
    tick
  }
}

export const groundManager = createGroundManager()
