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
      panelExpanded: (this.props.collapsible && this.props.expandedAtStart) || !this.props.collapsible || false
    }
  }  

  // Use inline styles as higher specificity than bootstrap.
  render() {
    
    const hdrStyle = {
      padding: '2px 8px',
      borderRadius: '3px 3px 0 0',
      borderTop: '1px solid #ddd',
      borderLeft: '1px solid #ddd',
      borderRight: '1px solid #ddd',
      borderBottom: '1px solid #bbb',
      background: '#c4e3ed'
    }

    const hdrLayoutStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }

    const hdrTitleStyle = {
      fontSize: '16px',
      paddingLeft: '0'
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

    const upDownGlyph = this.state.panelExpanded ? 'arrow-up' : 'arrow-down'
    const upDownAltText = this.state.panelExpanded ? "Hide " + this.props.heading : "Show "  + this.props.heading

    const panelHeader = this.props.collapsible ?
      <Button bsSize="large" block style={hdrStyle} onClick={() => this.setState({ panelExpanded: !this.state.panelExpanded })}>
        <div style={hdrLayoutStyle}>
          <h4 style={hdrTitleStyle}>{this.props.heading}</h4>
          <Glyphicon glyph={upDownGlyph} aria-label={upDownAltText} />
        </div>
      </Button> 
      :
      <div style={hdrStyle}>
        <div style={hdrLayoutStyle}>
          <h4 style={hdrTitleStyle}>{this.props.heading}</h4>
        </div>
      </div> 

    return (
      <div>
        {panelHeader}

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
