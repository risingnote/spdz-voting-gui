/**
 * Container to manage about and other help information.
 */
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

import hld from '../voting-demo-hld-web.jpeg'
import './About.css'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileLayout: (window.innerWidth <= 768)
    }
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }
  
  handleWindowSizeChange = () => {
    const isMobile = window.innerWidth <= 768
    this.setState({ mobileLayout: isMobile })
  }

  render() {
    let designImage
    if (this.state.mobileLayout) {
      designImage = <div>
        <a href={hld} target="_blank"><img src={hld} width="300px" alt="Open a design diagram in a new tab." /></a>
        <p style={{paddingLeft: '90px', color: '#999'}}>Tap for larger image.</p>
        </div>
    } else {
      designImage = <img src={hld} alt="Voting demonstrator design diagram." />
    }

    return (
      <div className="About">
        <Row>
          <Col xsOffset={0} xs={12} mdOffset={1} md={10}>
            <h4>What is this?</h4>
            <p>This <a href="http://www.multipartycomputation.com/tpmpc-2017">TPMPC Workshop 2017</a> voting demonstrator allows delegates who have been given a private voting identifier to vote for their top 3 talks using the SPDZ MPC software in a privacy preserving application.</p>
            <p>To vote:</p>
            <ul>
              <li>Click on 'Choose Favourite Talks' to open out the workshop schedule.</li>
              <li>Select between 1 and 3 talks, in the order you wish to place them. Your votes are weighted with 3,2,1 points.</li>
              <li>Enter your previously provided voter id and press vote.</li>
              <li>You will receive a confirmation that the vote was accepted or not.</li>
              <li>You may update your votes at any time.</li>          
            </ul>
            <p>The aggregated top 3 voted talks are displayed on the results page with a points total, these are updated every 10s.</p>
            <p>If you receive a message <i>"Problem submitting vote. Please try again."</i> the most likely reasons are:</p>
            <ul>
              <li>Inputing the wrong voter id,</li>
              <li>Timeouts because of contention with other voters.</li>
            </ul>
            <p>Try again and if in doubt contact <a href="mailto:jon.evans@bristol.ac.uk">Jonathan Evans.</a></p>

            <h4>Implementation Details</h4>
            <p>The main features of this implementation are:</p>
            <ul>
              <li>3 SPDZ parties running the SPDZ software and the <a href="https://gist.github.com/risingnote/f5039cfa3140d4551ae53abf5b71ef6b">voting mpc program</a>.</li>
              <li>Each SPDZ party is hosted on a separate server which runs the SPDZ proxy to translate between client http requests and the SPDZ internal socket protocol. The proxy URLs are displayed at the bottom of the vote page.</li>
              <li>An application server which provides:</li>
              <ul>
                <li>an entry point for the application, serving the client GUI,</li>
                <li>configuration to connect to the SPDZ parties,</li>
                <li>a results server to offload reading results directly from the SPDZ parties.</li>
              </ul>
              <li>Each SPDZ party records its share of votes to disk to support persistence through a restart.</li>
            </ul>

            {designImage}

            <h4>Security Design</h4>
            <p>The client can only vote with a private voter id, provided in advance.</p>
            <p>The client voting information is combined with shares from the SPDZ parties on the clients device.</p> 
            <p>Exchange of information between the client and SPDZ parties is protected with ECDH.</p>
            <p>The public keys of the SPDZ servers are provided by the (trusted) application server. Clients generate an ephemeral public key pair for a vote. The client public key is sent to the SPDZ party with no authorisation, this is provided by the private voter id.</p>
            <p>Communications between the client and application server / SPDZ proxies are only allowed over HTTPS.</p> 
            <p>The application server distributes the voter and talk ids to the SPDZ servers at startup and so, in this implementation, is a trusted party.</p>
            <p>To simplify the implementation and to reduce load on the SPDZ parties, the revealed results are served from the SPDZ parties to be cached by the application server and are not verified. An improvement here would be to send the result shares directly to the client combined with a beaver triple.</p>
            
            <h4>More Information</h4>
            <p>This work is produced by the <a href="https://www.cs.bris.ac.uk/Research/CryptographySecurity/">Bristol Cryptography Group</a> and is funded by the EPSRC.</p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default About
