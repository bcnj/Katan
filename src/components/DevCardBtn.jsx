import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { db } from '../firebase'

const DevCardBtn = props => {
  return <Button style={{ width: '49%', height: '75%' }}>Dev Card</Button>
}

export default connect()(DevCardBtn)
// export default DevCardBtn;
