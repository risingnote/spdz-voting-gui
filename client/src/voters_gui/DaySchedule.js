/**
 * Display a list of workshop talks in time order for a specific day.
 */
import React, { Component, PropTypes } from 'react'
import { Button, Panel, Glyphicon, Row, Col } from 'react-bootstrap'
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

    return (
      <div className="DaySchedule">
        <div style={ { borderRadius: '3px', display: 'flex', justifyContent: 'space-between', textAlign: 'right', background:'lightblue'}}>
          <h4 style={ {paddingLeft: '1rem'} }>{this.props.dateHeader}</h4>
          <Button style={ {background:'lightblue'} } bsSize="large" onClick={ () => this.setState({ open: !this.state.open }) }>
            <Glyphicon glyph={upDownGlyph} aria-label={upDownAltText} />
          </Button>
        </div>

        <Panel className="DaySchedule-content" collapsible expanded={this.state.open}>

          <Row className="DaySchedule-row">
            <Col xs={2} md={2} className="DaySchedule-col">16:30</Col>
            <Col xs={10} md={3} className="DaySchedule-author">Ran Cohen</Col>
            <Col xsOffset={2} xs={10} mdOffset={0} md={7} className="DaySchedule-col">Round-Preserving Parallel Composition of Probabilistic-Termination Protocols</Col>
          </Row>
          <Row className="DaySchedule-row">
            <Col xs={2} md={2} className="DaySchedule-col">17:00</Col>
            <Col xs={10} md={3} className="DaySchedule-author">Morten Dahl</Col>
            <Col xsOffset={2} xs={10} mdOffset={0} md={7} className="DaySchedule-col">Private Data Aggregation on a Budget</Col>
          </Row>          
        </Panel>
      </div> 
    )
  }
}

DaySchedule.propTypes = {
  dateHeader: PropTypes.string.isRequired,
  dayTalkSchedule: PropTypes.array.isRequired
}

export default DaySchedule
