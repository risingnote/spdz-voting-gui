/**
 * Customise display of Connection component for this GUI.
 * Depends on bootstrap css having been imported. See ../index.js.
 */
import React from 'react'
import { Connection } from 'spdz-gui-components'
import { List } from 'immutable'

const ConnectionStatus = (props) => {
  const connectionStyle = {
    padding: '0', 
    border: '0'
  }

  const connectionHeaderStyle = {
    color: 'rgb(55,55,55)'
  }

  return (
    <div className='panel panel-default' style={{ margin: '0' }}>
      <div className='panel-body' style={{padding: '10px'}}>
        <Connection spdzProxyServerList={props.spdzProxyServerList} 
                    spdzProxyStatus={props.spdzProxyStatus}
                    componentStyle={connectionStyle}
                    headerStyle={connectionHeaderStyle} />
      </div>
    </div>
  )
}

ConnectionStatus.propTypes = {
  spdzProxyServerList: React.PropTypes.instanceOf(List).isRequired,
  spdzProxyStatus: React.PropTypes.array.isRequired
}

export default ConnectionStatus
