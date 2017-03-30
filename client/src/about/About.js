/**
 * Container to manage about and other help information.
 */
import React from 'react'

import hld from '../voting-demo-hld-web.jpeg'

const About = (props) =>  {
    const hdrStyle= {color: '#e85a32'}
    return (
      <div style={{textAlign: 'left'}}>
        <h4 style={hdrStyle}>What is this?</h4>
        <p>This <a href="http://www.multipartycomputation.com/tpmpc-2017">TPMPC Workshop 2017</a> voting demonstrator allows delegates who have been given a private voting identifier to vote for their top 3 talks using the SPDZ MPC software in a privacy preserving application.</p>
        <p>From the vote page:</p>
        <ul>
          <li>Click on 'Choose Favourite Talks' to open out the workshop schedule.</li>
          <li>Select between 1 and 3 talks, in the order you wish to place them. Your votes are weighted with 3,2,1 points.</li>
          <li>Enter your previously provided voter id and press vote.</li>
          <li>You should expect to receive a confirmation that the vote was accepted or not.</li>
          <li>You may update your votes at any time.</li>          
        </ul>
        <p>The aggregated top 3 voted talks are displayed on the results page with a points total, these are updated every 10s.</p>
        <p>If you receive a message <i>"Problem submitting vote. Please try again."</i> the most likely reasons are:</p>
        <ul>
          <li>Inputing the wrong voter id.</li>
          <li>Timeouts because of contention with other voters.</li>
        </ul>
        <p>Try again and if in doubt contact <a href="mailto:jon.evans@bristol.ac.uk">Jonathan Evans.</a></p>

        <h4 style={hdrStyle}>Implementation Details</h4>
        <p>The main features of this implementation are:</p>
        <p>An application server provides....</p>
        <p>There are 3 SPDZ parties which the client interacts with directly over an https connection. The party URLs are displayed at the bottom of the vote page.</p>
        <img src={hld} alt="Voting demonstrator design diagram." />

        <h4 style={hdrStyle}>Security assumptions</h4>

        <h4 style={hdrStyle}>More Information</h4>

      </div>
    )
}

export default About
