import React from 'react'
import renderer from 'react-test-renderer'
import VotingLayout from './VotingLayout'

describe('Voting layout renders according to window size', () => {
  it('Renders as expected for a desktop size window of 1024', () => {
    window.innerWidth = 1024
    const tree = renderer.create(
      <VotingLayout  workshopSchedule={<div className="workshopSchedule" />} 
                     voteChoice={<div className="voteChoice" />}
                     voteFormContainer={<div className="voteFormContainer" />}
                     connectionStatus={<div className="connectionStatus" />} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
  
  it('Renders as expected for a mobile size window of 760', () => {
    window.innerWidth = 760
    const tree = renderer.create(
      <VotingLayout  workshopSchedule={<div className="workshopSchedule" />} 
                     voteChoice={<div className="voteChoice" />}
                     voteFormContainer={<div className="voteFormContainer" />}
                     connectionStatus={<div className="connectionStatus" />} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })  
})
