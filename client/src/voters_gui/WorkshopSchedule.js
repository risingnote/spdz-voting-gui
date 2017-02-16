/**
 * Display a list of workshop talks in date order.
 * Optionally allow top three to be selected.
 */
import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import DaySchedule from './DaySchedule'

class WorkshopSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }

  render() {
    return (
      <Grid fluid={true} style={{padding : '0px 2px'}}>
        <Row>
          <Col xs={12} mdOffset={1} md={6}>
            <DaySchedule dateHeader='Monday 6th' dayTalkSchedule={[]} />
            <DaySchedule dateHeader='Tuesday 7th' dayTalkSchedule={[]} />
          </Col> 
        </Row>
      </Grid>
    )
  }
}

WorkshopSchedule.propTypes = {
  talkSchedule: PropTypes.array.isRequired
}

export default WorkshopSchedule
