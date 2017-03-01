/**
 * Presentation component to manage layout of Voting GUI using Bootstrap grid.
 * Two different layouts depending on mobile (<=786px) or bigger.
 */
import React, { PropTypes, Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

class VotingLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileLayout: (window.innerWidth <= 768)
    }
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }
  
  handleWindowSizeChange = () => {
    const isMobile = window.innerWidth <= 768
    this.setState({ mobileLayout: isMobile })
  }

  render() {
    if (this.state.mobileLayout) {
      return (
        <Grid fluid={true} style={{padding : '0px 2px'}}>
          <Row>
            <Col xs={12}>
              <div style={{marginBottom: '1rem'}}>            
                {this.props.workshopSchedule}
              </div>
            </Col> 
            <Col xs={12}>
              <div style={{marginBottom: '1rem'}}>            
                {this.props.voteChoice}
              </div>
            </Col> 
            <Col xs={12}>
              <div style={{marginBottom: '1rem'}}>                        
                {this.props.voteFormContainer}
              </div>
            </Col> 
            <Col xs={12}>
              {this.props.connectionStatus}
            </Col> 
          </Row>
        </Grid>
      )
    }
    else {
      return (
        <Grid fluid={true} style={{padding : '0px 2px', marginTop: '1rem'}}>
          <Row>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <div style={{marginBottom: '1rem'}}>
                    {this.props.voteChoice}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {this.props.voteFormContainer}                  
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <div style={{marginBottom: '1rem'}}>                                        
                    {this.props.workshopSchedule} 
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {this.props.connectionStatus}
                </Col>
              </Row>
            </Col> 
          </Row>
        </Grid>
      )
    }
  }
}

VotingLayout.propTypes = {
  workshopSchedule: PropTypes.element.isRequired,
  voteChoice: PropTypes.element.isRequired,
  voteFormContainer: PropTypes.element.isRequired,
  connectionStatus: PropTypes.element.isRequired
}

export default VotingLayout
