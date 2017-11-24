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
      totalCards: 0,
      tempTotalCards: 0,
      brickStart: 0,
      wheatStart: 0,
      woodStart: 0,
      sheepStart: 0,
      oreStart: 0,
      brick: 0,
      wood: 0,
      sheep: 0,
      ore: 0,
      wheat: 0,
      open: true
    }
    this.setBuildRobber = this.setBuildRobber.bind(this)
    this.upOrDown = this.upOrDown.bind(this)
    this.finishTransaction = this.finishTransaction.bind(this)
  }

  finishTransaction(event) {
    event.preventDefault()
    // let currentPlayerNum = this.props.user.playerNum
    // let currentPlayer = `player${currentPlayerNum}`
    let player = 'player1' //for now
    let currentGameId = window.location.href.slice(27)
    const game = db.collection('games').doc(currentGameId)
    let brickDifference = this.state.brickStart - this.state.brick,
      wheatDifference = this.state.wheatStart - this.state.wheat,
      sheepDifference = this.state.sheepStart - this.state.sheep,
      oreDifference = this.state.oreStart - this.state.ore,
      woodDifference = this.state.woodStart - this.state.wood

      console.log(oreDifference,player)

    game.get().then(() => {
      let updateSheep = {},
        updateBrick = {},
        updateWood = {},
        updateOre = {},
        updateWheat = {}
      updateBrick[`players.${player}.brick`] = brickDifference
      updateWood[`players.${player}.wood`] = woodDifference
      updateOre[`players.${player}.ore`] = oreDifference
      updateSheep[`players.${player}.sheep`] = sheepDifference
      updateWheat[`players.${player}.wheat`] = wheatDifference
      game.update(updateBrick)
      game.update(updateOre)
      game.update(updateSheep)
      game.update(updateWheat)
      game.update(updateWood)
      this.setState({
        open: false
      })
    })
  }

  upOrDown(event, type, direction) {
    //So I have to decrement or increment, simple as that, solely altering the one I want!!!
    event.preventDefault()
    if (direction === 'down') {
      if (type === 'brick') {
        console.log(this.state.brick)
        this.setState({
          totalCards: this.state.totalCards - 1,
          brick: this.state.brick - 1
        })
      } else if (type === 'wheat') {
        this.setState({
          totalCards: this.state.totalCards - 1,
          wheat: this.state.wheat - 1
        })
      } else if (type === 'wood') {
        this.setState({
          totalCards: this.state.totalCards - 1,
          wood: this.state.wood - 1
        })
      } else if (type === 'ore') {
        this.setState({
          totalCards: this.state.totalCards - 1,
          ore: this.state.ore - 1
        })
      } else if (type === 'sheep') {
        this.setState({
          totalCards: this.state.totalCards - 1,
          sheep: this.state.sheep - 1
        })
      }
    } else {
      if (type === 'brick') {
        this.setState({
          totalCards: this.state.totalCards + 1,
          brick: this.state.brick + 1
        })
      } else if (type === 'wheat') {
        this.setState({
          totalCards: this.state.totalCards + 1,
          wheat: this.state.wheat + 1
        })
      } else if (type === 'wood') {
        this.setState({
          totalCards: this.state.totalCards + 1,
          wood: this.state.wood + 1
        })
      } else if (type === 'ore') {
        this.setState({
          totalCards: this.state.totalCards + 1,
          ore: this.state.ore + 1
        })
      } else if (type === 'sheep') {
        this.setState({
          totalCards: this.state.totalCards + 1,
          sheep: this.state.sheep + 1
        })
      }
    }
  }

  componentDidMount() {
    let currentPlayerData = this.props.currentGame.players.player1,
      currentPlayer = this.props.currentGame.game.currentPlayer,
      brick = currentPlayerData.brick,
      ore = currentPlayerData.ore,
      sheep = currentPlayerData.sheep,
      wood = currentPlayerData.wood,
      wheat = currentPlayerData.wheat,
      brickStart = currentPlayerData.brick,
      oreStart = currentPlayerData.ore,
      sheepStart = currentPlayerData.sheep,
      woodStart = currentPlayerData.wood,
      wheatStart = currentPlayerData.wheat,
      tempTotalCards =
        brickStart + oreStart + sheepStart + woodStart + wheatStart,
      totalCards
    this.setState({
      brick,
      ore,
      sheep,
      wood,
      wheat,
      brickStart,
      sheepStart,
      woodStart,
      wheatStart,
      oreStart,
      tempTotalCards:
        brickStart + oreStart + sheepStart + woodStart + wheatStart,
      totalCards: brick + wheat + ore + sheep + wood
    })
  }

  setBuildRobber(event) {
    let currentGame = window.location.href.slice(27)
    setRobberBuild(currentGame, true)
  }

  render() {
    return (
      <div>
        <Modal open closeOnDimmerClick={false}>
          {this.props &&
            this.props.currentGame &&
            this.props.currentGame.game &&
            this.state.tempTotalCards >= 7 && (
              <div>
                <br />
                <h1 style={{ textAlign: 'center', fontSize: '2em' }}>
                  Every player with over 7 cards must discard down to half their
                  cards
                </h1>
                <br />
                <h1 style={{ textAlign: 'center', fontSize: '2em' }}>
                  You have {this.state.totalCards} cards, discard down to{' '}
                  {Math.floor(this.state.tempTotalCards / 2)}
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
                      {this.state.brick === 0 ? (
                        <Button disabled>⬇</Button>
                      ) : (
                        <Button
                          onClick={e => this.upOrDown(e, 'brick', 'down')}
                        >
                          ⬇
                        </Button>
                      )}
                      <Button>{this.state.brick}</Button>
                      {this.state.brickStart === this.state.brick ? (
                        <Button disabled>⬆</Button>
                      ) : (
                        <Button onClick={e => this.upOrDown(e, 'brick', 'up')}>
                          ⬆
                        </Button>
                      )}
                    </Button.Group>
                    <Button.Group size="medium" color="yellow">
                      {this.state.wheat === 0 ? (
                        <Button disabled>⬇</Button>
                      ) : (
                        <Button
                          onClick={e => this.upOrDown(e, 'wheat', 'down')}
                        >
                          ⬇
                        </Button>
                      )}
                      <Button>{this.state.wheat}</Button>
                      {this.state.wheatStart === this.state.wheat ? (
                        <Button disabled>⬆</Button>
                      ) : (
                        <Button onClick={e => this.upOrDown(e, 'wheat', 'up')}>
                          ⬆
                        </Button>
                      )}
                    </Button.Group>
                    <Button.Group size="medium" color="brown">
                      {this.state.wood === 0 ? (
                        <Button disabled>⬇</Button>
                      ) : (
                        <Button onClick={e => this.upOrDown(e, 'wood', 'down')}>
                          ⬇
                        </Button>
                      )}
                      <Button>{this.state.wood}</Button>
                      {this.state.woodStart === this.state.wood ? (
                        <Button disabled>⬆</Button>
                      ) : (
                        <Button onClick={e => this.upOrDown(e, 'wood', 'up')}>
                          ⬆
                        </Button>
                      )}
                    </Button.Group>
                    <Button.Group size="medium" color="black">
                      {this.state.ore === 0 ? (
                        <Button disabled>⬇</Button>
                      ) : (
                        <Button onClick={e => this.upOrDown(e, 'ore', 'down')}>
                          ⬇
                        </Button>
                      )}
                      <Button>{this.state.ore}</Button>
                      {this.state.oreStart === this.state.ore ? (
                        <Button disabled>⬆</Button>
                      ) : (
                        <Button onClick={e => this.upOrDown(e, 'ore', 'up')}>
                          ⬆
                        </Button>
                      )}
                    </Button.Group>
                    <Button.Group size="medium" color="green">
                      {this.state.sheep === 0 ? (
                        <Button disabled>⬇</Button>
                      ) : (
                        <Button
                          onClick={e => this.upOrDown(e, 'sheep', 'down')}
                        >
                          ⬇
                        </Button>
                      )}
                      <Button>{this.state.sheep}</Button>
                      {this.state.sheepStart === this.state.sheep ? (
                        <Button disabled>⬆</Button>
                      ) : (
                        <Button onClick={e => this.upOrDown(e, 'sheep', 'up')}>
                          ⬆
                        </Button>
                      )}
                    </Button.Group>
                  </div>
                  <br />
                </Modal.Content>
                <Button
                  fluid
                  color="violet"
                  size="huge"
                  inverted
                  onClick={this.finishTransaction}
                >
                  Finish
                </Button>
              </div>
            )}
        </Modal>
      </div>
    )
  }
}

export default Robber
