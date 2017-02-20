/**
 * Modified bootstrap panel with header (optional collapsable behaviour).
 * Bespoke borders etc.
 */
import React, { Component, PropTypes } from 'react'
import { Panel, Button, Glyphicon } from 'react-bootstrap'
import './DisplayPanel.css'

class DisplayPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panelExpanded: this.props.expandedAtStart
    }
  }  

  // Use inline styles as higher specificity than bootstrap.
  render() {
    const upDownGlyph = this.state.panelExpanded ? 'arrow-up' : 'arrow-down'
    const upDownAltText = this.state.panelExpanded ? "Hide " + this.props.heading : "Show "  + this.props.heading

    const hdrContainerStyle = {
      borderRadius: '3px 3px 0 0',
      borderTop: '1px solid #ddd',
      borderLeft: '1px solid #ddd',
      borderRight: '1px solid #ddd',
      borderBottom: '1px solid #bbb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#c4e3ed'    
    }

    const hdrTitleStyle = {
      fontSize: '16px',
      paddingLeft: '1rem'
    }

    const hdrButtonStyle = {
      padding: '8px 16px',
      borderWidth: '0',
      background: '#c4e3ed'
    }

    const panelStyle = this.props.noBorder ? 
    {
      borderRadius: '0 0 3px 3px',
      borderWidth: '0px',
      margin: '0px'      
    } :
    {
      borderRadius: '0 0 3px 3px',
      borderWidth: '0 1px 1px 1px',
      margin: '0px'      
    }

    const optionalCollapseBtn = this.props.collapsible ? 
        <Button bsSize="large" style={hdrButtonStyle} 
            onClick={() => this.setState({ panelExpanded: !this.state.panelExpanded })}>
          <Glyphicon glyph={upDownGlyph} aria-label={upDownAltText} />
        </Button> : ''

    return (
      <div>
        <div style={hdrContainerStyle}>
          <h4 style={hdrTitleStyle}>{this.props.heading}</h4>
          {optionalCollapseBtn}
        </div>

        <Panel className="Display-panel" style={panelStyle} collapsible expanded={this.state.panelExpanded}>
          {this.props.content}
        </Panel>

      </div>
    )
  }
}

DisplayPanel.propTypes = {
  heading: PropTypes.string.isRequired,
  collapsible : PropTypes.bool.isRequired,
  expandedAtStart: PropTypes.bool,
  content: PropTypes.node,
  noBorder: PropTypes.bool
}

export default DisplayPanel
