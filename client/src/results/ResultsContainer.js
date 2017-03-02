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

class ResultsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [{talkId: 101, count: 123}, {talkId: 104, count: 33}]
    }
    this.socket = undefined
  }

  /**
   * Setup socket.io connection to GUI server listening for results message.
   */
  componentDidMount() {
    this.socket = Io('/voteresults')

    // Expect list of {talkId:String, count:Number} when sent results message.
    this.socket.on('results', (msg) => {
      this.setState({results: msg})
    });

    this.socket.on('disconnect', () => console.log('Got a server side disconnect from results server.'))
  }

  componentWillUnmount() {
    this.socket.disconnect()
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
             <p>Changed your mind ? You can <Link to="/vote">update your vote.</Link></p> 
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
