import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Nav, NavItem, Navbar } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
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
          <h4>TMPC Workshop 2017</h4>                    
          <Navbar inverse collapseOnSelect style={{marginBottom: '0', border: '0'}}>

            <Navbar.Header>
              <Navbar.Brand>
                <span style={{color: 'lightblue', padding: '10px 15px'}}>Voting Demonstrator</span>
              </Navbar.Brand>                
              <Navbar.Toggle style={{marginTop: '2px'}}/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <IndexLinkContainer to="/">
                  <NavItem>Results</NavItem>
                </IndexLinkContainer>
                <IndexLinkContainer to="/vote">
                  <NavItem>Vote</NavItem>
                </IndexLinkContainer>
                <IndexLinkContainer to="/about">
                  <NavItem >About</NavItem>
                </IndexLinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
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
