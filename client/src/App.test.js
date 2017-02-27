import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Mock out REST call (but also mocks out other functions....)
jest.mock('spdz-gui-lib')
import { getProxyConfig, createClientPublicKey, createEncryptionKey } from'spdz-gui-lib'

it('renders without crashing', () => {
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
  ReactDOM.render(<App />, div);
});
