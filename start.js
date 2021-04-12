import { extendStringProtype } from "./src/utils/string"
import { configureLogColors } from "./src/utils/console"

export function start() {
  extendStringProtype()
  configureLogColors()
}
