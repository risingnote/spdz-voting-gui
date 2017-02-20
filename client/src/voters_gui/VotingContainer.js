/**
 * Container to manage stateful changes for voting page.
 */
import React, { Component } from 'react'
import WorkshopSchedule from './WorkshopSchedule'
import talkScheduleConverter from './TalkSchedule'

// TODO temp only
import exampleTalks from '../test_support/exampleTalks'

class VotingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <WorkshopSchedule talkSchedule={talkScheduleConverter(exampleTalks)}/>
    )
  }
}

export default VotingContainer
