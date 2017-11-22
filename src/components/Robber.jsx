import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import robberImage from '../images/therobber_360.png'
import { db } from '../firebase'

//currentGame is to be passed in

export const setRobberBuild = (currentGame, setTrueFalse) => {
  console.log(currentGame, setTrueFalse)
  if (setTrueFalse === true) {
    let robberBuildUpdate = {}
    robberBuildUpdate[`game.robberBuild`] = true
    db
      .collection('testGames')
      .doc(currentGame)
      .update(robberBuildUpdate)
  } else {
    let robberBuildUpdate = {}
    robberBuildUpdate[`game.robberBuild`] = false
    db
      .collection('testGames')
      .doc(currentGame)
      .update(robberBuildUpdate)
  }
}

class Robber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: true
    }
    this.setBuildRobber = this.setBuildRobber.bind(this)
  }

  setBuildRobber(event) {
    let currentGame = window.location.href.slice(27)
    setRobberBuild(currentGame, true)
  }

  render() {

    return (
      <div>
        <Modal
          //this should not be a button but something which occurs when a player rolls a 7.
          style={{ width: '60%' }}
          trigger={
            <Button style={{ width: '30%', height: '100%' }}>
              Relocate Robber
            </Button>
          }
        >
          <br />
          <h1 style={{ textAlign: 'center', fontSize: '2em' }}>
            Every player with over 7 cards must discard down to half their cards
          </h1>
          <br />
          <h1 style={{ textAlign: 'center', fontSize: '2em' }}>
            You have X cards, discard down to
          </h1>
          <Modal.Content>
            <img
              src={robberImage}
              style={{ height: 'auto', position: 'relative', left: '40%' }}
            />
          </Modal.Content>
          <Button
            fluid
            color="violet"
            size="huge"
            inverted
            onClick={this.setBuildRobber}
          >
            Relocate Robber
          </Button>
        </Modal>
      </div>
    )
  }
}

export default Robber
