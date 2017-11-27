import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { db } from '../firebase'
import { Modal } from 'semantic-ui-react'

import { updateScoreToCloseModal } from '../utils/index.js'

const Winning = props => {
  return (
    <Modal open>
      <h1 style={{ color: 'violet', textAlign: 'center', fontSize: '4em' }}>
        {`${props.winner} wins!!`}
      </h1>
      <br />
      <h3 style={{ textAlign: 'center', fontSize: '2em' }}>
        Congratulations!!!!!
      </h3>
      <Button
        fluid
        content="Close"
        color="green"
        size="huge"
        onClick={e => updateScoreToCloseModal(e, props.winner)}
      />
    </Modal>
  )
}

export default connect()(Winning)
