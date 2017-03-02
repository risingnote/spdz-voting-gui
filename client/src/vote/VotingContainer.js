/**
 * Container to manage:
 *  coordination of state between presentation components
 *  external actions:
 *    read list of workshop talks from REST endpoint
 */
import React, { PropTypes, Component } from 'react'
import { List } from 'immutable'

import WorkshopSchedule from './schedule/WorkshopSchedule'
import { extractVotedTalks } from './schedule/TalkSchedule'
import VoteChoice from './other/VoteChoice'
import VoteFormContainer from './other/VoteFormContainer'
import ConnectionStatus from './other/ConnectionStatus'
import VotingLayout from './VotingLayout'

class VotingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTalkIds: List(), // List of selected talk ids
      spdzProxyStatus: []
    }
    this.votingClick = this.votingClick.bind(this)
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
    const workshopSchedule = <WorkshopSchedule talkSchedule={this.props.talkSchedule} 
                                               voteOn={this.votingClick}
                                               selectedTalkIds={this.state.selectedTalkIds}/>

    const voteChoice = <VoteChoice talks={extractVotedTalks(this.state.selectedTalkIds, this.props.talkSchedule)} />                                               

    const voteFormContainer = <VoteFormContainer selectedTalkIds={this.state.selectedTalkIds} 
                                                 spdzProxyServerList={this.props.spdzProxyServerList}                 
                                                 spdzApiRoot={this.props.spdzApiRoot}
                                                 clientPublicKey={this.props.clientPublicKey}
                                                 proxyStatusChange={(newStatus) => this.setState({spdzProxyStatus: newStatus })}/>

    const connectionStatus = <ConnectionStatus spdzProxyServerList={this.props.spdzProxyServerList} 
                                               spdzProxyStatus={this.state.spdzProxyStatus} />

    return (
      <VotingLayout workshopSchedule={workshopSchedule} voteChoice={voteChoice}
                    voteFormContainer={voteFormContainer} connectionStatus={connectionStatus} />
    )
  }
}

VotingContainer.propTypes = {
  talkSchedule: PropTypes.instanceOf(List),
  spdzProxyServerList: PropTypes.instanceOf(List).isRequired,
  spdzApiRoot: PropTypes.string.isRequired,
  clientPublicKey: PropTypes.string.isRequired
}

export default VotingContainer
