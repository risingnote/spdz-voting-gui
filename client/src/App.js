import React, { Component } from 'react'
import spdzlogo from './spdz_logo.svg'
import './App.css'
import WorkshopSchedule from './voters_gui/WorkshopSchedule'

// TODO temp only
import exampleTalks from './test_support/exampleTalks'
import talkScheduleConverter from './voters_gui/TalkSchedule'

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
          <WorkshopSchedule talkSchedule={talkScheduleConverter(exampleTalks)}/>
        </main>
      </div>
    )
  }
}

export default App
