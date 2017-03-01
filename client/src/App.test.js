/**
 * Just prove app renders without crashing.
 * Should be better way using react-router, but at present
 * choose routes manually.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { setupWrapper } from 'spdz-gui-components'
import VotingContainer from './vote/VotingContainer'
import ResultsContainer from './results/ResultsContainer'
import About from './about/About'

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

  const div = document.createElement('div');
  ReactDOM.render(<App>{VoteWithSetup}</App>, div);
});

it('renders app showing results page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App> <ResultsContainer /></App>, div);
});

it('renders app showing about page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App> <About /></App>, div);
});