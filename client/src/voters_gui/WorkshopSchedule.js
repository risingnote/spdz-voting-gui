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
              dayTalkSchedule={daySchedule.get('talks')} key={daySchedule.get('displayDate')} />      
  })

  return (
    <DisplayPanel heading={'Choose Favourite Talks'} collapsible={true} 
      expandedAtStart={false} noBorder={true} content={talkScheduleDisplay} />
  )
}

WorkshopSchedule.propTypes = {
  talkSchedule: PropTypes.instanceOf(List).isRequired
}

export default WorkshopSchedule
