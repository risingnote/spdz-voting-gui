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
 * Expect to be run behind an nginx reverse proxy in prod to provide SSL.
 */

const express = require('express')
const http = require('http')
const spdzGuiLib = require('spdz-gui-lib')
// Polyfill for fetch, required when interacting with SPDZ Api functions in spdz-gui-lib.
// Pulls in node-fetch to global scope
require('isomorphic-fetch')

// Special version for this server, problem in deployment not able to get SSL connection 
// via external network.
const proxyConfigInternal = require('../config/spdzProxyInternal.json')
const configForEnv = require('./configForEnv')

const webRouting = require('./webRouting')
const initSPDZEngines = require('./initSPDZEngines')
const resultsServer = require('./resultsServer')
const logger = require('./logging')

const environ = process.env.NODE_ENV || 'development'

logger.debug(`Starting GUI server in ${environ}.`)

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

// Setup session encryption keys.
const dhPublicKey = setupDHKeys()
const spdzProxyList = proxyConfigInternal.spdzProxyList.map( (spdzProxy) => {
  return { url: spdzProxy.url, encryptionKey: spdzGuiLib.createEncryptionKey(spdzProxy.publicKey) }
})

const webServer = http.createServer(app)
const guiPortNum = (environ === 'development') ? '3001' : '8080'

// Setup connection to SPDZ engines and initialise
initSPDZEngines(spdzProxyList, proxyConfigInternal.spdzApiRoot, dhPublicKey)
  .then(() => {
    // Setup results server web socket to push changes in voting results 
    // to connected clients.
    resultsServer(spdzProxyList, proxyConfigInternal.spdzApiRoot, dhPublicKey, webServer)

    webServer.listen(guiPortNum, () => {
      logger.info(`Serving GUI on port ${guiPortNum}.`)
    })
  })
  .catch((err) => {
    logger.warn("Unable to initialise SPDZ engines, exiting.", err)
  })
