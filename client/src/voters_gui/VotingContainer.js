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
import { talkScheduleConverter, extractVotedTalks } from './TalkSchedule'
import VoteChoice from './VoteChoice'
import VoteForm from './VoteForm'
import Connection from './Connection'

// TODO temp only
import exampleTalks from '../test_support/exampleTalks'

class VotingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileLayout: (window.innerWidth <= 768),
      talkSchedule: talkScheduleConverter(exampleTalks), // Will be moved to REST call in componentDidMount
      selectedTalkIds: List() // List of talk ids
    }
    this.votingClick = this.votingClick.bind(this)
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
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

  /**
   * Update the voting list, add to end and keep list >= 3 talks
   */
  votingClick(talkId, selected) {
    let updatedList
    if (selected) {
      updatedList = this.state.selectedTalkIds.push(talkId).slice(-3)
    }
    else {
      const index = this.state.selectedTalkIds.indexOf(talkId)
      updatedList = (index >=0) ? this.state.selectedTalkIds.remove(index) : this.state.selectedTalkIds
    }
    this.setState({selectedTalkIds: updatedList})
  }

  render() {
    if (this.state.mobileLayout) {
      return (
        <Grid fluid={true} style={{padding : '0px 2px'}}>
          <Row>
            <Col xs={12}>
              <VoteChoice talks={extractVotedTalks(this.state.selectedTalkIds, this.state.talkSchedule)} />
            </Col> 
            <Col xs={12}>
              <WorkshopSchedule talkSchedule={this.state.talkSchedule} 
                      voteOn={this.votingClick} selectedTalkIds={this.state.selectedTalkIds}/>
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
                  <VoteChoice talks={extractVotedTalks(this.state.selectedTalkIds, this.state.talkSchedule)} />
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
                  <WorkshopSchedule talkSchedule={this.state.talkSchedule} 
                          voteOn={this.votingClick} selectedTalkIds={this.state.selectedTalkIds}/>
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
