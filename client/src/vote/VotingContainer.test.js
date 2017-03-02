import React from 'react'
import { shallow } from 'enzyme'
import { List } from 'immutable'

import VotingContainer from './VotingContainer'

// Mock out rest call
jest.mock('../voters_lib/VotingApi')
import { getTalks } from '../voters_lib/VotingApi'

afterEach(() => {
  getTalks.mockClear()
})

describe('Checking state changes on voting container', () => {
  it('Set the list of selected talks in state with simulated vote clicks', () => {
    getTalks.mockImplementation(() => Promise.resolve())

    const wrapper = shallow(<VotingContainer spdzProxyServerList={List()} 
                                             spdzApiRoot={''}
                                             clientPublicKey={''}
                                             talkSchedule={List()} />)

    wrapper.instance().votingClick(1, true)
    expect(wrapper.state().selectedTalkIds).toEqual(List([1]))

    wrapper.instance().votingClick(2, true)
    wrapper.instance().votingClick(3, true)
    expect(wrapper.state().selectedTalkIds).toEqual(List([1,2,3]))

    wrapper.instance().votingClick(4, true)
    wrapper.instance().votingClick(5, true)
    expect(wrapper.state().selectedTalkIds).toEqual(List([3,4,5]))

    wrapper.instance().votingClick(4, false)
    expect(wrapper.state().selectedTalkIds).toEqual(List([3,5]))                                           

    wrapper.instance().votingClick(3, false)
    wrapper.instance().votingClick(5, false)    
    expect(wrapper.state().selectedTalkIds).toEqual(List())                                           

    wrapper.instance().votingClick(99, false)    
    expect(wrapper.state().selectedTalkIds).toEqual(List())                                           
  })  
})
