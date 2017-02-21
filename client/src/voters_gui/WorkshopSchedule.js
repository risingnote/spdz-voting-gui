/**
 * Display a list of workshop talks in date order.
 * Allow all talks to be collapsed.
 */
import React, { PropTypes } from 'react'
import { List } from 'immutable'

import DisplayPanel from './DisplayPanel'
import DaySchedule from './DaySchedule'

const WorkshopSchedule = (props) => {

  const talkScheduleDisplay = props.talkSchedule.map( (daySchedule) => {
    return <DaySchedule dateHeader={daySchedule.get('displayDate')} 
                        dayTalkSchedule={daySchedule.get('talks')} 
                        selectedTalkIds={props.selectedTalkIds}
                        voteOn={props.voteOn} 
                        key={daySchedule.get('displayDate')} />      
  })

  return (
    <DisplayPanel heading={'Choose Favourite Talks'} collapsible={true} 
      expandedAtStart={false} noBorder={true} content={talkScheduleDisplay} />
  )
}

 
WorkshopSchedule.propTypes = {
  talkSchedule: PropTypes.instanceOf(List).isRequired,
  selectedTalkIds: PropTypes.instanceOf(List).isRequired,  
  voteOn: PropTypes.func.isRequired // (talkId: String, selected: Boolean)
}

export default WorkshopSchedule
