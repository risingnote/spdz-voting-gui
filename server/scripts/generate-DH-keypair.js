/**
 * Use to generate offline the GUI server key pair, used to communicate with SPDZ proxies.
 * See config/dhKeyPair.json
 */

const spdzGuiLib = require('spdz-gui-lib')

// But want both - need to include sodium and copy code from lib
console.log(JSON.stringify(spdzGuiLib.createDHKeyPair()))
