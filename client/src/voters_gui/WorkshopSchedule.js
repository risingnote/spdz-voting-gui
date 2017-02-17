/**
 * Display a list of workshop talks in date order.
 * Optionally allow top three to be selected.
 */
import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { List } from 'immutable'
import DaySchedule from './DaySchedule'

class WorkshopSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }

  render() {
    const talkScheduleDisplay = this.props.talkSchedule.map( (daySchedule) => {
      return <DaySchedule dateHeader={daySchedule.get('displayDate')} 
                dayTalkSchedule={daySchedule.get('talks')} key={daySchedule.get('displayDate')} />      
    })

    return (
      <Grid fluid={true} style={{padding : '0px 2px'}}>
        <Row>
          <Col xs={12} mdOffset={1} md={6}>
            {talkScheduleDisplay}
          </Col> 
        </Row>
      </Grid>
    )
  }
}

WorkshopSchedule.propTypes = {
  talkSchedule: PropTypes.instanceOf(List).isRequired
}

export default WorkshopSchedule
