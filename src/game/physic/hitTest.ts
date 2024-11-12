import { Vector3 } from "three";

export function hitTest(a: Vector3, b: Vector3, distance: number= 0.7) {
  return a.distanceTo(b) <= distance
}