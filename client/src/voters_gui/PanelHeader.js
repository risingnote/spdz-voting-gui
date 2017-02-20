/**
 * Provide a panel header for a collapsable panel.
 */
import React, { PropTypes } from 'react'
import { Button, Glyphicon } from 'react-bootstrap'

const PanelHeader = (props) => {

  const upDownGlyph = props.open ? 'arrow-up' : 'arrow-down'
  const upDownAltText = props.open ? "Hide " + props.heading : "Show "  + props.heading

  const containerStyle = {
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'right',
    background: 'lightblue'    
  }

  const headerStyle = {
    paddingLeft: '1rem'
  }

  const buttonStyle = {
    background: 'lightblue'
  }

  return (
    // Use inline styles as higher specificity than bootstrap.
    <div style={containerStyle}>
      <h4 style={headerStyle}>{props.heading}</h4>
      <Button bsSize="large" style={buttonStyle} onClick={props.onClickState}>
        <Glyphicon glyph={upDownGlyph} aria-label={upDownAltText} />
      </Button>
    </div>
  )
}

PanelHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClickState: PropTypes.func.isRequired
}

export default PanelHeader
