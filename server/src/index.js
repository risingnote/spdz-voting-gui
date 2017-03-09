/**
 * Entry point for SPDZ voting demo server.
 * Run a web server to:
 *  - serve the SPDZ GUI
 *  - serve REST endpoints for GUI config at run time.
 * Run a websocket server to:
 *  - push changes in voting results to clients
 * Communicate with SPDZ parties to:
 *  - setup fixed data (talk ids, voter ids)
 *  - poll for voting results.
 */

const express = require('express')
const http = require('http')
const compression = require('compression')
const spdzGuiLib = require('spdz-gui-lib')
// Polyfill for fetch, required when interacting with SPDZ Api functions in spdz-gui-lib.
// Pulls in node-fetch to global scope
require('isomorphic-fetch')

const guiConfig = require('../config/spdzGui.json')
const mgmtProxyConfig = require('../config/spdzProxyMgmt.json')
const configForEnv = require('./configForEnv')

const webRouting = require('./webRouting')
const initSPDZEngines = require('./initSPDZEngines')
const resultsServer = require('./resultsServer')
const logger = require('./logging')

const guiPortNum = guiConfig.portNum || '8080'

/**
 * Load pre-generated DH Key pair.
 * @returns String public key which must match value in SPDZ MPC program
 */
const setupDHKeys = () => {
  const dhKeyPair = configForEnv('dhKeyPair')  
  spdzGuiLib.setDHKeyPair(dhKeyPair.clientPublicKey, dhKeyPair.clientPrivateKey)
  return dhKeyPair.clientPublicKey
}

const app = express()

// Configure web server paths
webRouting(app)

const dhPublicKey = setupDHKeys()
// Setup session encryption keys.
const spdzProxyList = mgmtProxyConfig.spdzProxyList.map( (spdzProxy) => {
  return { url: spdzProxy.url, encryptionKey: spdzGuiLib.createEncryptionKey(spdzProxy.publicKey) }
})

// Setup connection to SPDZ engines and initialise
initSPDZEngines(spdzProxyList, mgmtProxyConfig.spdzApiRoot, dhPublicKey)
  .then(() => {
    const httpServer = http.createServer(app)

    // Setup results server web socket to push changes in voting results 
    // to connected clients.
    resultsServer(spdzProxyList, mgmtProxyConfig.spdzApiRoot, dhPublicKey, httpServer)

    httpServer.listen(guiPortNum, () => {
      logger.info(`Serving gui on port ${guiPortNum}.`)
    })
  })
  .catch((err) => {
    logger.warn("Unable to initialise SPDZ engines, exiting.", err)
  })
