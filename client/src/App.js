import React, { Component } from 'react'
import spdzlogo from './spdz_logo.svg'
import './App.css'
import VotingContainer from './voters_gui/VotingContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <a title="Bristol Crypt Group SPDZ software" href="https://www.cs.bris.ac.uk/Research/CryptographySecurity/SPDZ/">
            <img src={spdzlogo} className='App-spdzlogo' alt="SPDZ logo" />
          </a>
          <h3 style={ {margin: '10px'} }>Voting Demonstrator</h3>                    
          <h4><a href="http://www.multipartycomputation.com/tpmpc-2017">TMPC Workshop 2017</a></h4>
        </div>
        <main className="App-main">
          <VotingContainer />
        </main>
      </div>
    )
  }
}

export default App
