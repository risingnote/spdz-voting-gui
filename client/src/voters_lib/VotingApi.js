/**
 * Manage external REST calls specific to this App.
 */

const isJson = (headers) => {
  return headers.has('Content-Type') &&
          headers.get('Content-Type').startsWith('application/json')
}

/**
 * Extract out body into a json object if it is JSON. 
 * Unsure because errors return a JSON body with (status, message, stack (in dev)).
 * Return json and response.
 */
const parseIfJson = (response) => {
  if (isJson(response.headers)) {
    return response.json()
      .then( (json) => {
        return {
          response: response,
          jsonData: json
        }
      })
  } else {
    return Promise.resolve({
      response: response,
      jsonData: null
    })
  }
}  

/**
 * Get the list of SPDZ proxy servers from the GUI Rest endpoint /spdzPRoxyConfig.
 * @returns {Promise} resolve to json from server or reject with Error.
 */
const getTalks = () => {
  return fetch('/api/talks',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        mode: 'same-origin'
      })
      .then(parseIfJson)
      .then( (result) => {
        if (result.response.ok) {
          return Promise.resolve(result.jsonData)
        } else {
          let error = new Error(`Unable to read workshop talks. Status: ${result.response.status}.`)
          error.reason = result.jsonData
          return Promise.reject(error)
        }
      })
}

export { getTalks }