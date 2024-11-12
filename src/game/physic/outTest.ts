import { Vector3 } from "three";
import { base3d } from "../3d/base3d";

export function outTest(position: Vector3) {
  return position.z > base3d.camera.position.z
}