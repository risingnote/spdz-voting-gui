/**
 * A timer to periodically retrieve results from SPDZ.
 */
const spdzGuiLib = require('spdz-gui-lib')

const retrieveResults = (spdzProxyList, spdzApiRoot, clientId) => {
  return spdzGuiLib.consumeDataFromProxies(spdzProxyList.map(spdzProxy => spdzProxy.url), spdzApiRoot, clientId)
    .then((values) => {
      if (spdzProxyList.length !== values.length) {
        return Promise.reject(new Error(`Expecting ${spdzProxyList.length} results from SPDZ, got ${values.length}.`))
      }
      try {
        const resultsArray = spdzGuiLib.binaryToIntArray(values)
        if (resultsArray.length % 2 !== 0 || resultsArray.length > 6) {
          return Promise.reject(
            new Error(`Expecting vote results to contain 0,2,4 or 6 integers, got ${resultsArray.length}`))
        }
        let resultsJson = []
        for (let i=0; i < resultsArray.length; i+=2) {
          resultsJson.push({talkId: resultsArray[i], count: resultsArray[i+1]})
        }
        return Promise.resolve(resultsJson)
      } catch (err) {
        return Promise.reject(err)
      }
    })
}

const startResultsTimer = (spdzProxyList, spdzApiroot, clientId, pollingIntervalMs, callback) => {
  setInterval(() => {
    retrieveResults(spdzProxyList, spdzApiroot, clientId)
    .then( resultsJson => {
      callback(resultsJson)
    })
    .catch( err => {
      if (err instanceof spdzGuiLib.NoContentError) {
        // Keep going, no new results
        console.log('No new results available.')        
      }
      else {
        console.log('Problem when polling for result.', err)
      }
    })
  }, pollingIntervalMs)
  
  console.log(`Started timer to poll for voting results every ${pollingIntervalMs} ms.`)
}

module.exports = startResultsTimer
