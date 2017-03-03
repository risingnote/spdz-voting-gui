import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import { List } from 'immutable'

import DisplayPanel from '../common/DisplayPanel'
import '../common/DisplayTalk.css'

const Results = (props) => {

  const displayResults = [0,1,2].map( (index) => {
    const medalColor = {
      backgroundColor: ['goldenrod', 'silver', 'tan'][index]
    }
    const result = props.votes.get(index)
    if (result !== undefined) {      
      return <Row className="DisplayTalk-row" style={{margin: '0px'}} key={result.get('id')}>
               <Col xs={2} md={2} className="DisplayTalk-col">
                 <div className="DisplayTalk-result" style={medalColor}>{result.get('count')}</div>
              </Col>
              <Col xs={10} md={10}>
                <Row>
                  <Col xs={12} md={4} className="DisplayTalk-author">{result.get('speaker')}</Col>
                  <Col xs={12} md={8} className="DisplayTalk-col">{result.get('title')}</Col>
                </Row>
              </Col>
            </Row>
    }
    else {
      return <Row className="DisplayTalk-row" style={{margin: '0px'}} key={`notChosen$${index}`}>
               <Col xs={2} md={2} className="DisplayTalk-col">
                 <div className="DisplayTalk-result" style={medalColor}></div>
              </Col>
              
               <Col xsOffset={0} xs={10} mdOffset={3} md={7} className="DisplayTalk-result-missing">
                  Not enough votes yet.
               </Col>
            </Row>
    }
  })

  return (
    <DisplayPanel heading={'Latest Voting Results'} collapsible={false} expandedAtStart={true} content={displayResults} />
  )
}

Results.propTypes = {
  votes: PropTypes.instanceOf(List).isRequired
}

export default Results
