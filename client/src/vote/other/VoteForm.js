import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import { Panel, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

import './VoteForm.css'

class VoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      voterId: '',
    }
    this.voterIdIsValid = this.voterIdIsValid.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  voterIdIsValid() {
    return this.state.voterId.length === 8 && /^\d+$/.test(this.state.voterId)
  }

  handleSubmit(event) {
    this.props.submitVote(this.state.voterId)
    this.setState({voterId: ''})
    event.preventDefault() // Stop page refresh
  }


  render() {
    const showVoterIdFeedback = (this.state.voterId.length > 0) ? <FormControl.Feedback /> : ''
    const voteButton = (this.props.selectedTalkIds.size > 0 && this.voterIdIsValid()) ?
                            <Button type="submit" active>Vote</Button> :
                            <Button type="submit" disabled>Vote</Button>
    const defaultStatusMessage = (this.props.statusMessage === undefined || this.props.statusMessage.length === 0)
    const statusMessage = defaultStatusMessage ?
            'Choose at least one talk and enter your voter id, to vote.' : this.props.statusMessage
    const statusMessageDisplay = defaultStatusMessage ?
          {color: '#999'} :
          {color: 'green'}

    return (
      <Panel style={{margin: '0'}}>
        <Form horizontal className="VoteForm" onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="formVoterInput"
            validationState={this.voterIdIsValid() ? 'success' : 'warning'}
            style={{marginBottom: '10px'}}
          >
            <Col componentClass={ControlLabel} xs={3} 
                 style={{textAlign: 'right', marginBottom: '0', padding: '5px 5px 0px 5px'}}>
              Voter Id
            </Col>
            <Col xs={9} md={7} style={{padding: '0px 5px'}}>
              <FormControl
                type="text"
                value={this.state.voterId}
                placeholder="Enter your 8 digit voter ID."
                onChange={(e) => this.setState( {voterId: e.target.value } )}
              />
              {showVoterIdFeedback}
            </Col>
          </FormGroup>

          <Col xsOffset={3} xs={9} style={{textAlign: 'left', padding: '0', marginBottom: '10px'}}>
            {voteButton}
          </Col>

          <Col xsOffset={0} xs={12} mdOffset={3} md={9} style={{textAlign: 'left', padding: '0'}}>
            <div role="alert" style={statusMessageDisplay}>
              {statusMessage}
            </div>
          </Col>

        </Form>      
      </Panel>
    )
  }
}

VoteForm.propTypes = {
  selectedTalkIds: PropTypes.instanceOf(List).isRequired,
  submitVote: PropTypes.func.isRequired,
  statusMessage: PropTypes.string
}

export default VoteForm
