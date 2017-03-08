/**
 * Connect to SPDZ engines and send voter ids and talk ids fixed values.
 * Currently SPDZ MPC program will send a fixed number of shares,
 *  assuming voter ids limited to 200 and talk ids limited to 50.
 *  Pad out both lists with zeros.   
 */
const spdzGuiLib = require('spdz-gui-lib')
const configForEnv = require('./configForEnv')

// Get fixed values to send at startup
let voterIds = configForEnv('voterIds')
if (voterIds.length > 150) {
  throw new Error(`Up to 150 voter ids supported, got ${voterIds.length}.`)
} else if (voterIds.length < 150) {
  voterIds = voterIds.concat((new Array(150 - voterIds.length)).fill(0))
}

const workshopSchedule = require('../config/workshopSchedule')
let talkIds = workshopSchedule.filter( (talk) => {
  return (talk.infoOnly === undefined || talk.infoOnly === 'false')
 }).map( (talk) => talk.id )

if (talkIds.length > 50) {
  throw new Error(`Up to 50 talk ids supported, got ${talkIds.length}.`)
} else if (talkIds.length < 50) {
  talkIds = talkIds.concat((new Array(50 - talkIds.length)).fill(0))
}


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
      console.log("Sending voter ids to SPDZ Engines.")
      return spdzGuiLib.sendInputsWithShares(voterIds, true, spdzProxyList, spdzApiRoot, dhPublicKey, 1000)
    })
    .then(() => {
      console.log("Sending talk ids to SPDZ Engines.")      
      return spdzGuiLib.sendInputsWithShares(talkIds, true, spdzProxyList, spdzApiRoot, dhPublicKey, 1000)      
    })
}

module.exports = initSPDZ