/**
 * Container to manage:
 *  voting page high level layout
 *  coordinate presentation components
 *  external actions (via REST) ?
 */
import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { List } from 'immutable'

import WorkshopSchedule from './WorkshopSchedule'
import talkScheduleConverter from './TalkSchedule'
import VoteChoice from './VoteChoice'
import VoteForm from './VoteForm'
import Connection from './Connection'

// TODO temp only
import exampleTalks from '../test_support/exampleTalks'

class VotingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileLayout: (window.innerWidth <= 768)
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }
  
  handleWindowSizeChange = () => {
    const isMobile = window.innerWidth <= 768
    this.setState({ mobileLayout: isMobile })
  }

  render() {
    if (this.state.mobileLayout) {
      return (
        <Grid fluid={true} style={{padding : '0px 2px'}}>
          <Row>
            <Col xs={12}>
              <VoteChoice talks={List()} />
            </Col> 
            <Col xs={12}>
              <WorkshopSchedule talkSchedule={talkScheduleConverter(exampleTalks)}/>
            </Col> 
            <Col xs={12}>
              <VoteForm />
            </Col> 
            <Col xs={12}>
              <Connection />
            </Col> 
          </Row>
        </Grid>
      )
    }
    else {
      return (
        <Grid fluid={true} style={{padding : '0px 2px'}}>
          <Row>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <VoteChoice talks={List()} />                
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <VoteForm />                
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <Connection />                
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <WorkshopSchedule talkSchedule={talkScheduleConverter(exampleTalks)}/>
                </Col>
              </Row>
            </Col> 
          </Row>
        </Grid>
      )
    }
  }
}

export default VotingContainer
