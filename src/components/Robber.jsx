import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Menu, Dropdown } from 'semantic-ui-react'
import brickImage from '../images/brick.jpg'
import wheatImage from '../images/wheat.jpg'
import woodImage from '../images/wood.jpg'
import sheepImage from '../images/sheep.jpg'
import oreImage from '../images/ore.jpg'
import { db } from '../firebase'
import {
  setRobberOnTile,
  robberDivideCardsInHalf,
  getOptions,
  rollDice
} from '../utils/index.js'

class Robber extends Component {
  constructor(props) {
    super(props)
    //massive state to handle comparing data at beginning of the display of the component until its end
    //moveRobber is used to find out if the current user is the one who rolled, this needs to be fixed when we have user properly figured out
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
      userMoveTile: false,
      options: [],
      tile: ''
    }
    this.upOrDown = this.upOrDown.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTileChange = this.handleTileChange.bind(this)
    this.handleTileSubmit = this.handleTileSubmit.bind(this)
  }

  componentDidMount() {
    //insert massive data into state, again when user works this must be fixed, as in currentPlayer and currentPlayerData, the if/else relates to if the user should be able to move the robber
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
      totalCards,
      options = getOptions(this.props.currentGame, '1')
    console.log(options)
    // if(this.props.currentGame.game.currentUser === `player${this.props.user.playerNum}`){
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
      totalCards: brick + wheat + ore + sheep + wood,
      options,
      userMoveTile: true
    })
    // else{
    //   //moveRobber does not change, only specific user has access to that state
    //   this.setState({
    //     brick,
    //     ore,
    //     sheep,
    //     wood,
    //     wheat,
    //     brickStart,
    //     sheepStart,
    //     woodStart,
    //     wheatStart,
    //     oreStart,
    //     tempTotalCards:
    //       brickStart + oreStart + sheepStart + woodStart + wheatStart,
    //     totalCards: brick + wheat + ore + sheep + wood
    //   })
    // }
  }
  upOrDown(event, type, direction) {
    event.preventDefault()
    //up or down as in the component each resource can be increased or decreased based upon what is logically able to be done
    if (direction === 'down') {
      if (type === 'brick') {
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

  handleSubmit(e) {
    e.preventDefault()
    //when multiple users works...
    // let currentPlayerNum = this.props.user.playerNum
    // let currentPlayer = `player${currentPlayerNum}`
    let player = '1', //for now
      gameId = window.location.href.slice(-20),
      brick = this.state.brickStart - this.state.brick,
      wheat = this.state.wheatStart - this.state.wheat,
      sheep = this.state.sheepStart - this.state.sheep,
      ore = this.state.oreStart - this.state.ore,
      wood = this.state.woodStart - this.state.wood,
      resources = {}

    resources.brick = brick
    resources.wheat = wheat
    resources.sheep = sheep
    resources.ore = ore
    resources.wood = wood

    robberDivideCardsInHalf(gameId, player, resources)
  }

  handleTileChange(e, data) {
    e.preventDefault()
    let tile = data.value.tile
    this.setState({
      tile
    })
  }

  handleTileSubmit(e, data) {
    e.preventDefault()
    let gameId = window.location.href.slice(-20)
    console.log(this.state.tile)
    setRobberOnTile(gameId, this.state.tile)
  }

  handleClose(e, data) {
    let gameId = window.location.href.slice(-20)
    rollDice(10, gameId)
  }

  render() {
    //massive modal, as I had to create 20 buttons because of the ternary nature of user having enough resources, not gaining more then they had, etc.
    return (
      <div>
        <Modal open>
          {this.props &&
          this.props.currentGame &&
          this.props.currentGame.game &&
          this.state.tempTotalCards >= 7 ? (
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
                      <Button onClick={e => this.upOrDown(e, 'brick', 'down')}>
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
                      <Button onClick={e => this.upOrDown(e, 'wheat', 'down')}>
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
                      <Button onClick={e => this.upOrDown(e, 'sheep', 'down')}>
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
              {Math.floor(this.state.tempTotalCards / 2) ===
                this.state.totalCards && !this.state.moveRobber ? (
                <Button
                  fluid
                  color="violet"
                  size="huge"
                  inverted
                  onClick={e => {
                    this.handleSubmit(e)
                  }}
                >
                  Finish
                </Button>
              ) : (
                <Button disabled fluid color="violet" size="huge" inverted>
                  Finish
                </Button>
              )}
              {this.state.userMoveTile && (
                <Menu style={{ display: 'flex' }}>
                  <Menu.Item
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      fontSize: '1em',
                      flexGrow: '1'
                    }}
                    header
                  >
                    Select Tile
                  </Menu.Item>
                  <Menu.Item>
                    <Dropdown
                      options={this.state.options}
                      placeholder="Pick Tile"
                      fluid
                      color="purple"
                      selection
                      onChange={this.handleTileChange}
                    />
                  </Menu.Item>
                  <Button
                    color="red"
                    style={{ flexGrow: '1' }}
                    onClick={this.handleTileSubmit}
                  >
                    Submit
                  </Button>
                </Menu>
              )}
            </div>
          ) : (
            <div>
              <div>
                <br />
                <h1 style={{ textAlign: 'center', fontSize: '2em' }}>
                  You do not have over 7 cards, click to exit, or if you are the
                  current player, select a location to move the Robber.
                </h1>
                <br />
                <Button
                  onClick={this.handleClose}
                  fluid
                  color="violet"
                  size="huge"
                  inverted
                >
                  Close
                </Button>
              </div>
              {this.state.userMoveTile && (
                <Menu style={{ display: 'flex' }}>
                  <Menu.Item
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      fontSize: '1em',
                      flexGrow: '1'
                    }}
                    header
                  >
                    Select Tile
                  </Menu.Item>
                  <Menu.Item>
                    <Dropdown
                      options={this.state.options}
                      placeholder="Pick Tile"
                      fluid
                      color="purple"
                      selection
                      onChange={this.handleTileChange}
                    />
                  </Menu.Item>
                  <Button
                    color="red"
                    style={{ flexGrow: '1' }}
                    onClick={this.handleTileSubmit}
                  >
                    Submit
                  </Button>
                </Menu>
              )}
            </div>
          )}
        </Modal>
      </div>
    )
  }
}

export default Robber