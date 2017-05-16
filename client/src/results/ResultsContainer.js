/**
 * Container to manage retrieving results from server.
 */
import React, { Component, PropTypes } from 'react'
import Io from 'socket.io-client'
import { List } from 'immutable'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'

import { resultsEnriched } from '../vote/schedule/TalkSchedule'
import Results from './Results'

// See App.js for explanation
const PUBLIC_URL_WITH_DEFAULT = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/'

class ResultsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: undefined,
      results: []
    }
  }

  /**
   * Setup socket.io connection to GUI server listening for results message.
   */
  componentDidMount() {
    const socket = Io('/voteresults', {path: '/voters/socket.io'})
    this.setState({socket: socket})
    
    // Expect array of {talkId:String, count:Number} when sent results message.
    socket.on('results', (msg) => {
      // Ensure in high -> low order
      msg.sort((a,b) => b.count - a.count)
      this.setState({results: msg})
    });
  }

  componentWillUnmount() {
    this.state.socket.disconnect()
  }

  render() {
    const resultsWithDescs = resultsEnriched(this.state.results, this.props.talkSchedule)
    return (
      <div>
        <Row>
          <Col xsOffset={0} xs={12} mdOffset={2} md={8}>
            <Results votes={resultsWithDescs} />
            
          </Col>
        </Row>
        <Row>
          <Col xsOffset={0} xs={12} mdOffset={2} md={8} style={{color: '#777', paddingTop: '20px'}}>
             <p>Changed your mind ? You can <Link to={PUBLIC_URL_WITH_DEFAULT+'/vote'}>update your vote.</Link></p> 
          </Col>
        </Row>
      </div>
    )
  }
}

ResultsContainer.propTypes = {
  talkSchedule: PropTypes.instanceOf(List) 
}

export default ResultsContainer
