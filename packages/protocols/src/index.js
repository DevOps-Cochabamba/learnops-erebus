import { button, axis, message, custom } from './builder'
import * as gjc from './general-json-command'
import * as gbc from './gamepad-binary-command'

const protocols = { gjc, gbc }
export { button, axis, message, custom, protocols }
