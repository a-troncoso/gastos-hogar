import { extendStringProtype } from "./src/utils/string"
import { extendArrayPrototype } from "./src/utils/array"
import { configureLogColors } from "./src/utils/console"

export function start() {
  extendStringProtype()
  extendArrayPrototype()
  configureLogColors()
}
