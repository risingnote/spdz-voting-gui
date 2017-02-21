/**
 * Display a list of workshop talks for a day. Assumes pre-sorted in time order.
 */
import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import { List } from 'immutable'
import DisplayPanel from './DisplayPanel'
import './DisplayTalk.css'

const DaySchedule = (props) => {

  const talkList = props.dayTalkSchedule.map( (talk) => {
    return <Row className="DisplayTalk-row" style={{margin: '0px'}} key={talk.get('id')}>
             <Col xs={2} md={2} className="DisplayTalk-col">{talk.get('displayTime')}</Col>
             <Col xs={10} md={3} className="DisplayTalk-author">{talk.get('speaker')}</Col>
             <Col xsOffset={2} xs={10} mdOffset={0} md={7} className="DisplayTalk-col">{talk.get('title')}</Col>
           </Row>
  })

  return (
    <div className="DaySchedule">
      <DisplayPanel heading={props.dateHeader} collapsible={true} expandedAtStart={true} content={talkList} />        
    </div> 
  )
}

DaySchedule.propTypes = {
  dateHeader: PropTypes.string.isRequired,
  dayTalkSchedule: PropTypes.instanceOf(List).isRequired
}

export default DaySchedule
