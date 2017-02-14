/**
 * Display a list of workshop talks in date order.
 * A stateless component.
 */
import React, { Component, PropTypes } from 'react'
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap'

class WorkshopSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }

  render() {
    return (
      <Grid fluid={true}>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <div style={ { display: 'flex', justifyContent: 'space-between', textAlign: 'right', background:'lightgrey'}}>
              <h4 style={ {paddingLeft: '1rem'} }>Monday 10th</h4>
              <Button href="#" bsStyle="link" onClick={ () => this.setState({ open: !this.state.open }) }>Hide</Button> 
            </div>
            <Panel collapsible expanded={this.state.open}>
              <h3>Workshop schedule 1 place holder.</h3>
              <Button bsStyle="primary" bsSize="large" block>Block level button</Button>      
            </Panel>
          </Col> 
          <Col xs={12} md={6}>
            <Panel>        
              <h3>Workshop schedule 2 place holder.</h3>
              <Button bsStyle="primary" bsSize="large" block>Block level button</Button>      
            </Panel>
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
