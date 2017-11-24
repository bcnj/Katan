import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import brickImage from '../images/brick.jpg'
import wheatImage from '../images/wheat.jpg'
import woodImage from '../images/wood.jpg'
import sheepImage from '../images/sheep.jpg'
import oreImage from '../images/ore.jpg'
import { db } from '../firebase'

//currentGame is to be passed in
const total = 0

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
    this.setBuildRobber = this.setBuildRobber.bind(this)
    this.upOrDown = this.upOrDown.bind(this)
  }

  upOrDown(type, upDown, player, currentGame) {
    let game = window.location.href.slice(27)
    let updateResource = {}
    if (upDown === 'up') {
      updateResource[`players.${player}.${type}`]
      db
        .collection('testGames')
        .doc(game)
        .update(updateResource)
    } else {
      updateResource[`players.${player}.${type}`]
      db
        .collection('testGames')
        .doc(currentGame)
        .update(updateResource)
    }
  }

  setBuildRobber(event) {
    let currentGame = window.location.href.slice(27)
    setRobberBuild(currentGame, true)
  }

  render() {
    let currentPlayer = {},
      currentPlayerData = {},
      totalCards = 0,
      brick,
      ore,
      sheep,
      wood,
      wheat
    if (this.props && this.props.props && this.props.props.game) {
      let currentPlayer = this.props.props.game.currentPlayer,
        currentPlayerData = this.props.props.players[currentPlayer]
      totalCards =
        currentPlayerData.brick +
        currentPlayerData.ore +
        currentPlayerData.sheep +
        currentPlayerData.wood +
        currentPlayerData.wheat
      brick = currentPlayerData.brick
      ore = currentPlayerData.ore
      sheep = currentPlayerData.sheep
      wood = currentPlayerData.wood
      wheat = currentPlayerData.wheat
      totalCards = totalCards
    }
    return (
      <div>
        <Modal
          //this should not be a button but something which occurs when a player rolls a 7.
          style={{ width: '60%' }}
          trigger={
            <Button style={{ width: '30%', height: '150%' }}>
              Relocate Robber
            </Button>
          }
        >
          {this.props &&
            this.props.props &&
            this.props.props.game &&
            totalCards > 0 && (
              <div>
                <br />
                <h1 style={{ textAlign: 'center', fontSize: '2em' }}>
                  Every player with over 7 cards must discard down to half their
                  cards
                </h1>
                <br />
                <h1 style={{ textAlign: 'center', fontSize: '2em' }}>
                  You have {totalCards} cards, discard down to{' '}
                  {Math.floor(totalCards / 2)}
                </h1>
                <br />
                <Modal.Content>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                  >
                    <img
                      src={brickImage}
                      style={{
                        height: '15%',
                        width: '15%'
                      }}
                    />
                    <img
                      src={wheatImage}
                      style={{
                        height: '15%',
                        width: '15%'
                      }}
                    />
                    <img
                      src={woodImage}
                      style={{
                        height: '15%',
                        width: '15%'
                      }}
                    />
                    <img
                      src={oreImage}
                      style={{
                        height: '15%',
                        width: '15%'
                      }}
                    />
                    <img
                      src={sheepImage}
                      style={{
                        height: '15%',
                        width: '15%'
                      }}
                    />
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                  >
                    {' '}
                    <Button.Group size="medium" color="red">
                      <Button
                        onClick={this.upOrDown('brick', 'up', currentPlayer)}
                      >
                        ⬇
                      </Button>
                      <Button>{brick}</Button>
                      <Button>⬆</Button>
                    </Button.Group>
                    <Button.Group size="medium" color="yellow">
                      <Button>⬇</Button>
                      <Button>{wheat}</Button>
                      <Button>⬆</Button>
                    </Button.Group>
                    <Button.Group size="medium" color="brown">
                      <Button>⬇</Button>
                      <Button>{wood}</Button>
                      <Button>⬆</Button>
                    </Button.Group>
                    <Button.Group size="medium" color="black">
                      <Button>⬇</Button>
                      <Button>{ore}</Button>
                      <Button>⬆</Button>
                    </Button.Group>
                    <Button.Group size="medium" color="green">
                      <Button>⬇</Button>
                      <Button>{sheep}</Button>
                      <Button>⬆</Button>
                    </Button.Group>
                  </div>
                  <br />
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
              </div>
            )}
        </Modal>
      </div>
    )
  }
}

export default Robber
