/**
 * Display a list of workshop talks in date order.
 * Allow all talks to be collapsed.
 */
import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { List } from 'immutable'

import './WorkshopSchedule.css'
import PanelHeader from './PanelHeader'
import DaySchedule from './DaySchedule'

class WorkshopSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      talkScheduleOpen: false
    }
  }

  render() {
    const talkScheduleDisplay = this.props.talkSchedule.map( (daySchedule) => {
      return <DaySchedule dateHeader={daySchedule.get('displayDate')} 
                dayTalkSchedule={daySchedule.get('talks')} key={daySchedule.get('displayDate')} />      
    })

    return (
      <Grid className="WorkshopSchedule" fluid={true} style={{padding : '0px 2px'}}>
        <Row>
          <Col xs={12} mdOffset={1} md={6}>
            <PanelHeader heading={'Choose 3 Talks'}
                         open={this.state.talkScheduleOpen}
                         onClickState={() => this.setState({ talkScheduleOpen: !this.state.talkScheduleOpen })} />
            <Panel className="WorkshopSchedule-panel" collapsible expanded={this.state.talkScheduleOpen}>
              {talkScheduleDisplay}
            </Panel>
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
