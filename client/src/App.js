import React, { Component } from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { setupWrapper } from 'spdz-gui-components'

import spdzlogo from './spdz_logo.svg'
import './App.css'
import VotingContainer from './vote/VotingContainer'
import ResultsContainer from './results/ResultsContainer'
import About from './about/About'

const VoteWithSetup = setupWrapper(VotingContainer)

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
          <Link to="/vote">Vote</Link>
        </div>
        <main className="App-main">
          {this.props.children}          
        </main>
      </div>
    )
  }
}

const AppRouter = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ResultsContainer} />
        <Route path="about" component={About} />
        <Route path="vote" component={VoteWithSetup} />
      </Route>
    </Router>    
  )
}

export { AppRouter, App }
