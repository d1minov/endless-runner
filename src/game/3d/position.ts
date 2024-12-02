import { config } from "../config";

export function getYFromZ(z: number, y = 0) {
  return y - Math.exp(Math.abs(z / (config.INIT_ITEMS_DISTANCE / 3)))
}