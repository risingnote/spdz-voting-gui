import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import { connectToProxies, disconnectFromProxies, allProxiesConnected, 
         sendInputsWithShares, consumeDataFromProxies, binaryToIntArray } from 'spdz-gui-lib'
import VoteForm from './VoteForm'

/**
 * Manage external interactions with SPDZ for voting.
 */
class VoteFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusMessage: ''
    }
    this.voteOnTalks = this.voteOnTalks.bind(this)
    this.readForResult = this.readForResult.bind(this)
  }

  componentWillUnmount() {
    disconnectFromProxies(this.props.spdzProxyServerList.map( spdzProxy => spdzProxy.url), 
                          this.props.spdzApiRoot, this.props.clientPublicKey)
  }

  /**
   * Read for a status result after voting.
   * @returns {number} status will be 0 - success, 1 - invalid voterid, 2 - invalid talk id.
   */
  readForResult() {
    return consumeDataFromProxies(this.props.spdzProxyServerList.map(spdzProxy => spdzProxy.url),
      this.props.spdzApiRoot, this.props.clientPublicKey, 500)
      .then((values) => {
        if (this.props.spdzProxyServerList.length !== values.length) {
          return Promise.reject(
            new Error(`Expecting ${this.props.spdzProxyServerList.length} results from SPDZ, got ${values.length}.`))
        }
        try {
          const resultsArray = binaryToIntArray(values)
          if (resultsArray.length !== 1) {
            return Promise.reject(
              new Error(`Expecting result to be 1 integer, got ${resultsArray.length}`))
          }
          return Promise.resolve(resultsArray[0])
        } catch (err) {
          return Promise.reject(err)
        }
      })
  }
  
  /**
   * Do the voting by interacting with SPDZ engines. Designed to be atomic
   * @param {number} voterId as 6 digit number 
   */
  voteOnTalks(voterId) {
    if (this.props.selectedTalkIds === undefined || this.props.selectedTalkIds.size === 0 || 
        this.props.selectedTalkIds.size > 3) {
      this.setState({statusMessage: 'Problem submitting vote, between 1 and 3 talks must be selected.'})      
      return
    }
    
    const dataToSend = [voterId, 0, 0, 0]
    for (let i=0; i<this.props.selectedTalkIds.size; i++) {
      dataToSend[i+1] = this.props.selectedTalkIds.get(i)
    }

    connectToProxies(this.props.spdzProxyServerList.map( spdzProxy => spdzProxy.url), 
                                this.props.spdzApiRoot, this.props.clientPublicKey)
      .then( (values) => {
        this.props.proxyStatusChange(values)
        if (allProxiesConnected(values)) {
          this.setState({statusMessage: 'Processing your vote....'})      
          return Promise.resolve()
        }
        else {
          return Promise.reject(new Error('Unable to connect to all Spdz Proxy Servers'))
        }
      })
      .then( () => {
        return sendInputsWithShares(dataToSend, true, this.props.spdzProxyServerList, 
              this.props.spdzApiRoot, this.props.clientPublicKey, 1000)
      })
      .then( () => {
        return this.readForResult()
      })
      .then( (result) => {
        if (result !== 1) {
          return Promise.reject(new Error(`Vote failed with return code ${result}.`))
        } else {
          return Promise.resolve()
        }
      })
      .then( () => {
        return disconnectFromProxies(this.props.spdzProxyServerList.map( spdzProxy => spdzProxy.url), 
                                    this.props.spdzApiRoot, this.props.clientPublicKey)
      })
      .then( (values) => {
        this.props.proxyStatusChange(values)
        this.setState({statusMessage: 'Your vote has been included.'})        
      })
      .catch((ex) => {
        console.log(ex)
        this.setState({statusMessage: 'Problem submitting vote. Please try again. '})
        disconnectFromProxies(this.props.spdzProxyServerList.map( spdzProxy => spdzProxy.url), 
                               this.props.spdzApiRoot, this.props.clientPublicKey)
      })
  }

  render() {
    return (
      <VoteForm submitVote={this.voteOnTalks}
                selectedTalkIds={this.props.selectedTalkIds}
                statusMessage={this.state.statusMessage}
      />
    )
  }
}

VoteFormContainer.propTypes = {
  selectedTalkIds: PropTypes.instanceOf(List).isRequired,
  spdzProxyServerList: PropTypes.array.isRequired,
  spdzApiRoot: PropTypes.string.isRequired,
  clientPublicKey: PropTypes.string.isRequired,
  proxyStatusChange: PropTypes.func.isRequired
}

export default VoteFormContainer
