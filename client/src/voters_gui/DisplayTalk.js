/**
 * Display a single workshop talk as a bootstrap row.
 * Allow talk to be voted on (selected or de-selected).
 * Doesn't maintain own state, relies on votingClick to feed it back.
 */
import React, { PropTypes } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Map } from 'immutable'
import './DisplayTalk.css'

const DisplayTalk = (props) => {

  const votingClick = () => {
    props.voteOn(props.talk.get('id'), !props.selected)
  }

  const showStar = !props.talk.get('infoOnly', true)
  const votingStar =  showStar ?
      <Button bsSize="large" onClick={votingClick}>
        <span className={props.selected ? "selected" : ""}>{'\u2606'}</span>
      </Button> : ''

  return (
      <Row className="DisplayTalk-row" style={{margin: '0px'}} key={props.talk.get('id')}>
        <Col xs={2} md={2} className="DisplayTalk-col">{props.talk.get('displayTime')}</Col>
        <Col xs={10} md={3} className="DisplayTalk-author">{props.talk.get('speaker')}</Col>
        <Col xs={2} md={1} className="DisplayTalk-vote">{votingStar}</Col>
        <Col xs={10} mdOffset={0} md={6} className="DisplayTalk-col">{props.talk.get('title')}</Col>
      </Row>
  )
}

/**
 * Selected uses a prop as although can be set and removed internally (and so use state)
 *  it can also removed externally, e.g. when other talks are selected causing it to be removed.
 * Mixing props and state is problamatic.
 */
DisplayTalk.propTypes = {
  talk: PropTypes.instanceOf(Map).isRequired,
  voteOn: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
}

export default DisplayTalk
