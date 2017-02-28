import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import VoteForm from './VoteForm'

class VoteFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusMessage: ''
    }
    this.voteOnTalks = this.voteOnTalks.bind(this)
  }

  voteOnTalks(voterId) {
    console.log(`Vote on talks called with ${voterId}.`)
    this.setState({statusMessage: 'Your vote has been submitted.'})
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
  selectedTalkIds: PropTypes.instanceOf(List).isRequired
}

export default VoteFormContainer
