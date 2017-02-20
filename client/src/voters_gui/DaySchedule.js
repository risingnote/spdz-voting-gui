/**
 * Display a list of workshop talks in time order for a specific day.
 */
import React, { Component, PropTypes } from 'react'
import { Panel, Row, Col } from 'react-bootstrap'
import { List } from 'immutable'
import PanelHeader from './PanelHeader'
import './DaySchedule.css'

class DaySchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }

  render() {
    const talkList = this.props.dayTalkSchedule.map( (talk) => {
      return <Row className="DaySchedule-row" key={talk.get('id')}>
              <Col xs={2} md={2} className="DaySchedule-col">{talk.get('displayTime')}</Col>
              <Col xs={10} md={3} className="DaySchedule-author">{talk.get('speaker')}</Col>
              <Col xsOffset={2} xs={10} mdOffset={0} md={7} className="DaySchedule-col">{talk.get('title')}</Col>
             </Row>
    })

    return (
      <div className="DaySchedule">
        <PanelHeader heading={this.props.dateHeader}
                     open={this.state.open}
                     onClickState={() => this.setState({ open: !this.state.open })} />
        <Panel className="DaySchedule-content" collapsible expanded={this.state.open}>
          {talkList}
        </Panel>
      </div> 
    )
  }
}

DaySchedule.propTypes = {
  dateHeader: PropTypes.string.isRequired,
  dayTalkSchedule: PropTypes.instanceOf(List).isRequired
}

export default DaySchedule
