import React, { Component, PropTypes } from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
import { List, Map } from 'immutable'

class VoteChoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const displayTalks = [0,1,2].map( (talkPosn) => {
      const talkWithDefault = this.props.talks.get(talkPosn, 
        Map({id: -1 * talkPosn, speaker: 'None chosen', title: ''}))
      return <Row className="DaySchedule-row" key={talkWithDefault.get('id')}>
              <Col xs={2} md={2} className="DaySchedule-col">{talkPosn+1}</Col>
              <Col xs={10} md={3} className="DaySchedule-author">{talkWithDefault.get('speaker')}</Col>
              <Col xsOffset={2} xs={10} mdOffset={0} md={7} className="DaySchedule-col">{talkWithDefault.get('title')}</Col>
             </Row>
    })

    return (
      <div className="DaySchedule" style={{marginBottom: '1rem'}}>
        <Panel className="DaySchedule-content" header="Selected Talks">
          {displayTalks}
        </Panel>
      </div> 
    )
  }  

}

VoteChoice.propTypes = {
  talks: PropTypes.instanceOf(List).isRequired
}

export default VoteChoice
