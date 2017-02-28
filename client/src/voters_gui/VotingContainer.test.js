import React from 'react'
import { mount, shallow } from 'enzyme'
import { List, is } from 'immutable'

import VotingContainer from './VotingContainer'
import { talks } from '../test_support/exampleTalks'
import WorkshopSchedule from './schedule/WorkshopSchedule'

// Mock out rest call
jest.mock('../voters_lib/VotingApi')
import { getTalks } from '../voters_lib/VotingApi'

afterEach(() => {
  getTalks.mockClear()
})

describe('Checking state changes on voting container', () => {
  it('Store the list of talks in state when component mounts', (done) => {
    getTalks.mockImplementation(() => Promise.resolve(talks))

    window.innerWidth = 760
    const wrapper = mount(<VotingContainer spdzProxyServerList={List()} 
                                           spdzApiRoot={''}
                                           clientPublicKey={''} />)

    //To manage async componentDidMount use timeout
    setTimeout(() => { 
      try {
        //Don't seem to be able to compare immutable structures
        expect(wrapper.state().talkSchedule.size).toEqual(2)
        const day1 = wrapper.state().talkSchedule.get(0)
        expect(day1.get("displayDate")).toEqual("Monday 3rd Apr")        
        expect(day1.get("talks").size).toEqual(3)
        done()
      } catch (err) {
        done.fail(err)
      }
    }, 500)
  })

  it('Set the list of selected talks in state with simulated vote clicks', () => {
    getTalks.mockImplementation(() => Promise.resolve())

    const wrapper = shallow(<VotingContainer spdzProxyServerList={List()} 
                                             spdzApiRoot={''}
                                             clientPublicKey={''} />)

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
