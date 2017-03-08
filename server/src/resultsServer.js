/**
 * Run a socket io server to send out result updates when notified.
 * Currently clients are stateless so a page refresh will be a disconnect and join.
 */
const pollForResults = require('./retrieveResults')
const logger = require('./logging')
const Io = require('socket.io')

// Hold current results as Array of {talkId:String, count:Number}
let results = []

// Manages all connected sockets
let ns = undefined

/**
 * Configure and start Socket io server.
 * @param {HttpServer} httpServer 
 */
const resultsServer = (spdzProxyList, spdzApiRoot, dhPublicKey, httpServer) => {
    const io = new Io(httpServer)
    ns = io.of('/voteresults')
    logger.info('Listening for results web socket connections at /voteresults.')

    ns.on('connection', (socket) => {
      socket.emit('results', results)

      socket.once('disconnect', () => {
        socket.disconnect(true)
      })
    });

    pollForResults(spdzProxyList, spdzApiRoot, dhPublicKey, 10000, (resultsJson) => {
      logger.debug('Got new vote results. ', resultsJson)
      results = resultsJson
      if (ns === undefined) {
        logger.warn("Trying to update vote results before results server has been initialised.")
      } else {
        ns.emit('results', results)
      }
    })

  }

module.exports = resultsServer
