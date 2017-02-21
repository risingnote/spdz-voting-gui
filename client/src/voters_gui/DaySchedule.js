/**
 * Display a list of workshop talks for a day. Assumes pre-sorted in time order.
 */
import React, { PropTypes } from 'react'
import { List } from 'immutable'
import DisplayPanel from './DisplayPanel'
import DisplayTalk from './DisplayTalk'

const DaySchedule = (props) => {

  const talkList = props.dayTalkSchedule.map( (talk, index) => {
    return <DisplayTalk talk={talk} voteOn={props.voteOn} selected={props.selectedTalkIds.includes(talk.get('id'))} key={index} />
  })

  return (
    <div className="DaySchedule">
      <DisplayPanel heading={props.dateHeader} collapsible={true} expandedAtStart={true} content={talkList} />        
    </div> 
  )
}

DaySchedule.propTypes = {
  dateHeader: PropTypes.string.isRequired,
  dayTalkSchedule: PropTypes.instanceOf(List).isRequired,
  selectedTalkIds: PropTypes.instanceOf(List).isRequired,    
  voteOn: PropTypes.func.isRequired // (talkId: String, selected: Boolean)
}

export default DaySchedule
