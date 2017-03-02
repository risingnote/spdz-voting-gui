/**
 * Just prove app renders without crashing, sort of integration test.
 * Should be better way using react-router, but at present
 * choose routes manually.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { App } from './App'
import { setupWrapper } from 'spdz-gui-components'
import VotingContainer from './vote/VotingContainer'
import ResultsContainer from './results/ResultsContainer'
import About from './about/About'
import { talks } from './test_support/exampleTalks'

// Mock out rest call
jest.mock('./voters_lib/VotingApi')
import { getTalks } from './voters_lib/VotingApi'

beforeEach(() => {
  getTalks.mockImplementation(() => Promise.resolve(talks))
})

afterEach(() => {
  getTalks.mockClear()
})

const VoteWithSetup = setupWrapper(VotingContainer)

// Mock out REST call (but also mocks out other functions....)
jest.mock('spdz-gui-lib')
import { getProxyConfig, createClientPublicKey, createEncryptionKey } from'spdz-gui-lib'

it('renders app showing vote page without crashing', () => {
  // Mock out componentDidMount ajax calls
  const exampleConfig = 
        {
          "spdzApiRoot": "/spdzapi",
          "spdzProxyList": []
        }
  
  getProxyConfig.mockImplementation(() => Promise.resolve(exampleConfig))
  createClientPublicKey.mockImplementation(() => "1234567")
  createEncryptionKey.mockImplementation(() => "abcdef")

  const div = document.createElement('div')
  ReactDOM.render(<App>{VoteWithSetup}</App>, div)
})

it('renders app showing results page without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App><ResultsContainer/></App>, div)
})

it('renders app showing about page without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App><About/></App>, div)
})

it('stores the list of talks in state when component mounts', (done) => {
  const wrapper = mount(<App><ResultsContainer/></App>)

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
