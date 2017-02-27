/**
 * Container to manage:
 *  voting page high level layout
 *  coordinate presentation components
 *  external actions (via REST) ?
 */
import React, { PropTypes, Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { List } from 'immutable'

import WorkshopSchedule from './WorkshopSchedule'
import { talkScheduleConverter, extractVotedTalks } from './TalkSchedule'
import VoteChoice from './VoteChoice'
import VoteFormContainer from './VoteFormContainer'
import ConnectionStatus from './ConnectionStatus'

// TODO temp only
import exampleTalks from '../test_support/exampleTalks'

class VotingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileLayout: (window.innerWidth <= 768),
      talkSchedule: talkScheduleConverter(exampleTalks), // Will be moved to REST call in componentDidMount
      selectedTalkIds: List(), // List of selected talk ids
      spdzProxyStatus: []
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
   * @params {talkId} String identifier for talk
   * @params {selected} boolean, true meaning adding, false meaning removing
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
              <div style={{marginBottom: '1rem'}}>            
                <WorkshopSchedule talkSchedule={this.state.talkSchedule} 
                        voteOn={this.votingClick} selectedTalkIds={this.state.selectedTalkIds}/>
              </div>
            </Col> 
            <Col xs={12}>
              <div style={{marginBottom: '1rem'}}>            
                <VoteChoice talks={extractVotedTalks(this.state.selectedTalkIds, this.state.talkSchedule)} />
              </div>
            </Col> 
            <Col xs={12}>
              <div style={{marginBottom: '1rem'}}>                        
                <VoteFormContainer selectedTalkIds={this.state.selectedTalkIds} 
                                   spdzProxyServerList={this.props.spdzProxyServerList}                 
                                   spdzApiRoot={this.props.spdzApiRoot}
                                   clientPublicKey={this.props.clientPublicKey}/>
              </div>
            </Col> 
            <Col xs={12}>
              <ConnectionStatus spdzProxyServerList={this.props.spdzProxyServerList} 
                                spdzProxyStatus={this.state.spdzProxyStatus} />    
            </Col> 
          </Row>
        </Grid>
      )
    }
    else {
      return (
        <Grid fluid={true} style={{padding : '0px 2px', marginTop: '1rem'}}>
          <Row>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <div style={{marginBottom: '1rem'}}>
                    <VoteChoice talks={extractVotedTalks(this.state.selectedTalkIds, this.state.talkSchedule)} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <VoteFormContainer selectedTalkIds={this.state.selectedTalkIds}
                                     spdzProxyServerList={this.props.spdzProxyServerList} 
                                     spdzApiRoot={this.props.spdzApiRoot}
                                     clientPublicKey={this.props.clientPublicKey}/>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <div style={{marginBottom: '1rem'}}>                                        
                    <WorkshopSchedule talkSchedule={this.state.talkSchedule} 
                            voteOn={this.votingClick} selectedTalkIds={this.state.selectedTalkIds}/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <ConnectionStatus spdzProxyServerList={this.props.spdzProxyServerList} 
                                    spdzProxyStatus={this.state.spdzProxyStatus} />    
                </Col>
              </Row>
            </Col> 
          </Row>
        </Grid>
      )
    }
  }
}

VotingContainer.propTypes = {
  spdzProxyServerList: PropTypes.instanceOf(List).isRequired,
  spdzApiRoot: PropTypes.string.isRequired,
  clientPublicKey: PropTypes.string.isRequired
}

export default VotingContainer
