/**
 * A timer to periodically retrieve results from SPDZ.
 */

let tempResults = [{talkId: 101, count: 0}, {talkId: 104, count: 0}]

const startResultsTimer = (pollingIntervalMs, callback) => {
  setInterval(() => {
    
    // Interact with SPDZ (see BankersContainer in bankers gui)
   tempResults[0].count += 2
   tempResults[1].count += 1 
   callback(tempResults)

  }, pollingIntervalMs)
  
  console.log(`Started timer to poll for voting results every ${pollingIntervalMs} ms.`)
}

module.exports = startResultsTimer
