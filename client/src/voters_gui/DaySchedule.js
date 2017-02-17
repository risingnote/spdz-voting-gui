/**
 * Display a list of workshop talks in time order for a specific day.
 */
import React, { Component, PropTypes } from 'react'
import { Button, Panel, Glyphicon, Row, Col } from 'react-bootstrap'
import { List } from 'immutable'
import './DaySchedule.css'

class DaySchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }

  render() {
    const upDownGlyph = this.state.open ? 'arrow-up' : 'arrow-down'
    const upDownAltText = this.state.open ? "Hide Schedule For This Day" : "Show Schedule For This Day"

    const talkList = this.props.dayTalkSchedule.map( (talk) => {
      return <Row className="DaySchedule-row" key={talk.get('id')}>
              <Col xs={2} md={2} className="DaySchedule-col">{talk.get('displayTime')}</Col>
              <Col xs={10} md={3} className="DaySchedule-author">{talk.get('speaker')}</Col>
              <Col xsOffset={2} xs={10} mdOffset={0} md={7} className="DaySchedule-col">{talk.get('title')}</Col>
             </Row>
    })

    return (
      <div className="DaySchedule">
        <div className="DaySchedule-header">
          <h4>{this.props.dateHeader}</h4>
          <Button bsSize="large" onClick={ () => this.setState({ open: !this.state.open }) }>
            <Glyphicon glyph={upDownGlyph} aria-label={upDownAltText} />
          </Button>
        </div>

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
