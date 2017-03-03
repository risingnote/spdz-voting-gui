/**
 * Run a socket io server to send out result updates when notified.
 * Currently clients are stateless so a page refresh will be a disconnect and join.
 */
'use strict'

const Io = require('socket.io')

// Hold current results as Array of {talkId:String, count:Number}
let results = []

// Manages all connected sockets
let ns = undefined

/**
 * Send out results to all connected cients.
 * @param {Array<Object>} newResults 
 */
const updateResults = (newResults) => {
  results = newResults
  if (ns === undefined) {
    console.log("Trying to update vote results before results server has been initialised.")
  } else {
    ns.emit('results', results)
  }
}

/**
 * Configure and start Socket io server.
 * @param {HttpServer} httpServer 
 */
const init = (httpServer) => {
    const io = new Io(httpServer)
    ns = io.of('/voteresults')
    console.log('Listening for results web socket connections at /voteresults.')

    ns.on('connection', (socket) => {

      socket.emit('results', results)

      socket.once('disconnect', () => {
        socket.disconnect(true)
      })
    });
  }

module.exports = {
  init: init,
  updateResults: updateResults 
}
