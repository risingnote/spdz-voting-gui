import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import { List } from 'immutable'

import DisplayPanel from '../common/DisplayPanel'
import '../schedule/DisplayTalk.css'

const VoteChoice = (props) => {

  const displayTalks = [0,1,2].map( (talkPosn) => {
    const talk = props.talks.get(talkPosn)
    if (talk !== undefined) {      
      return <Row className="DisplayTalk-row" style={{margin: '0px'}} key={talk.get('id')}>
               <Col xs={2} md={2} className="DisplayTalk-col">{talkPosn+1}</Col>
               <Col xs={10} md={3} className="DisplayTalk-author">{talk.get('speaker')}</Col>
               <Col xsOffset={2} xs={10} mdOffset={0} md={7} className="DisplayTalk-col">{talk.get('title')}</Col>
            </Row>
    }
    else {
      return <Row className="DisplayTalk-row" style={{margin: '0px'}} key={`notChosen$${talkPosn}`}>
               <Col xs={2} md={2} className="DisplayTalk-col">{talkPosn+1}</Col>
               <Col xs={10} md={10} className="DisplayTalk-missing">select a talk from the list</Col>
            </Row>
    }
  })

  return (
    <DisplayPanel heading={'Selected Talks'} collapsible={false} expandedAtStart={true} content={displayTalks} />
  )
}

VoteChoice.propTypes = {
  talks: PropTypes.instanceOf(List).isRequired
}

export default VoteChoice
