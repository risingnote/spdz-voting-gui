/**
 * Connect to SPDZ engines and send voter ids and talk ids fixed values.
 */
const spdzGuiLib = require('spdz-gui-lib')
const configForEnv = require('./configForEnv')

const voterIds = configForEnv('voterIds')

const initSPDZ = (spdzProxyList, spdzApiRoot, dhPublicKey) => {
  return spdzGuiLib.connectToProxies(spdzProxyList.map(spdzProxy => spdzProxy.url),
                          spdzApiRoot, dhPublicKey)
    .then((values) => {
      if (spdzGuiLib.allProxiesConnected(values)) {
        return 
      }
      else {
        return Promise.reject(
          new Error('Unable to connect to all Spdz Proxy Servers ' + JSON.stringify(values)))
      }
    })
    .then(() => {
      return sendInputsWithShares(voterIds, true, spdzProxyList, spdzApiRoot, dhPublicKey, 500)
    })
    .then(() => {
      console.log('still need to send talk ids')
      return Promise.resolve()
    })
    .catch((ex) => {
      return Promise.reject(ex)
    })
}

module.exports = initSPDZ