/**
 * Provides both the top level App (inserted into body of html) 
 * and routing rules AppRouter.
 * App is responsible for getting talk schedule from GUI server. 
 */
import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Nav, NavItem, Navbar } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
import { setupWrapper } from 'spdz-gui-components'
import { List } from 'immutable'

import spdzlogo from './spdz_logo.svg'
import './App.css'
import VotingContainer from './vote/VotingContainer'
import ResultsContainer from './results/ResultsContainer'
import About from './about/About'
import { getTalks } from './voters_lib/VotingApi'
import { talkScheduleConverter } from './vote/schedule/TalkSchedule'

/*
 * envifying magic from create react app to give package.json homepage deploy path.
 * Expect empty value in dev or /voters in production.
 */
const PUBLIC_URL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : ''
const PUBLIC_URL_WITH_DEFAULT = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/'

const VoteWithSetup = setupWrapper(VotingContainer, '/voters/spdzProxyConfig')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      talkSchedule: List()
    }
  }

  componentDidMount() {
    getTalks()
      .then((json) => {
        this.setState({talkSchedule: talkScheduleConverter(json)}) 
      })
      .catch((ex) => {
        console.log(ex)
      })
  }

  render() {
    // Only seems possible to pass props to react router chosen child using this technique.
    // Note all get the prop even if don't want it.
    const childWithTalkSchedule = React.Children.map(
      this.props.children,
      child => React.cloneElement(child,
        {
          talkSchedule: this.state.talkSchedule
        })
    )
    return (
      <div className="App">
        <div className="App-header">
          <a title="Bristol Crypt Group SPDZ software" href="https://www.cs.bris.ac.uk/Research/CryptographySecurity/SPDZ/">
            <img src={spdzlogo} className='App-spdzlogo' alt="SPDZ logo" />
          </a>
          <h4>TPMPC Workshop 2017</h4>                    
          <Navbar inverse collapseOnSelect style={{marginBottom: '0', border: '0'}}>
            <Navbar.Header>
              <Navbar.Brand>
                <span style={{color: 'lightblue', padding: '10px 15px'}}>Voting Demonstrator</span>
              </Navbar.Brand>                
              <Navbar.Toggle style={{marginTop: '2px'}}/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <IndexLinkContainer to={PUBLIC_URL_WITH_DEFAULT}>
                  <NavItem>Results</NavItem>
                </IndexLinkContainer>
                <IndexLinkContainer to={PUBLIC_URL+'/vote'}>
                  <NavItem>Vote</NavItem>
                </IndexLinkContainer>
                <IndexLinkContainer to={PUBLIC_URL+'/about'}>
                  <NavItem >About</NavItem>
                </IndexLinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        
        <main className="App-main">
          {childWithTalkSchedule}
        </main>
      </div>
    )
  }
}

const AppRouter = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path={PUBLIC_URL_WITH_DEFAULT} component={App}>
        <IndexRoute component={ResultsContainer} />
        <Route path="about" component={About} />
        <Route path="vote" component={VoteWithSetup} />
        <Route path="results" component={ResultsContainer} />
      </Route>
    </Router>    
  )
}

export { AppRouter, App }
