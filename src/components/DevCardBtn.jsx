import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Grid, Menu, Dropdown, Input } from 'semantic-ui-react'
import { db } from '../firebase'

import KnightImg from '../images/knight.jpg'
import MonopolyImg from '../images/monopoly.JPG'
import YearOfPlentyImg from '../images/yearOfPlenty.jpg'
import RoadBuildingImg from '../images/roadBuilding.jpg'
import VictoryPointImg from '../images/victoryPoint.jpg'

import {
  purchaseDevCard,
  deleteSpecificDevCard,
  getOptions,
  useKnightTakeCard,
  monopolize,
  addTwoSelectedResources,
  victoryPointCard
} from '../utils/index.js'
//setRobberOnTile will be imported

class DevCardBtn extends Component {
  constructor(props) {
    super(props)
    //resources are needed as are devCards user currently has, I store the dev cards as so: 1=knight, 2=monopoly, 3=roadBuild, 4=plenty, 5=vPoint. As in, looking in the DB, storing the cards solely puts the integer, not the name of the card
    this.state = {
      brick: 0,
      wheat: 0,
      wood: 0,
      sheep: 0,
      ore: 0,
      knight: 0,
      vPoint: 0,
      plenty: 0,
      monopoly: 0,
      roadBuild: 0,
      canOrCannotBuyCard: false,
      knightMode: false,
      options: [],
      knightValueVictim: 0,
      knightValuePlayer: 0,
      knightValueTile: 0,
      knightValuePosPlayers: [],
      monopolyMode: false,
      monopolyResource: '',
      monopolyPlayer: '',
      plentyMode: false,
      plentyResource: '',
      plentyResourceChoices: [],
      plentyPlayer: ''
    }
    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleBuyClick = this.handleBuyClick.bind(this)
    this.handleKnightChange = this.handleKnightChange.bind(this)
    this.handleKnightSubmit = this.handleKnightSubmit.bind(this)
    this.handleKnightInputChange = this.handleKnightInputChange.bind(this)
    this.handleMonopolyChange = this.handleMonopolyChange.bind(this)
    this.handleMonopolySubmit = this.handleMonopolySubmit.bind(this)
    this.handlePlentyChange = this.handlePlentyChange.bind(this)
    this.handlePlentySubmit = this.handlePlentySubmit.bind(this)
    this.handlePlentyAdd = this.handlePlentyAdd.bind(this)
  }

  componentDidMount() {
    //grab all resources and dev cards to display in component
    let currentPlayerData = this.props.currentGame.players.player1,
      currentPlayer = this.props.currentGame.game.currentPlayer,
      brick = currentPlayerData.brick,
      ore = currentPlayerData.ore,
      sheep = currentPlayerData.sheep,
      wood = currentPlayerData.wood,
      wheat = currentPlayerData.wheat,
      devCards = currentPlayerData.devCards,
      canOrCannotBuyCard = false,
      roadBuild = 0,
      vPoint = 0,
      plenty = 0,
      monopoly = 0,
      knight = 0,
      options = getOptions(this.props.currentGame, '1')
    if (sheep >= 1 && ore >= 1 && wheat >= 1) {
      canOrCannotBuyCard = true
    }
    //for state as each is stored as integer
    devCards.forEach((card, i) => {
      if (card === 1) knight++
      if (card === 2) monopoly++
      if (card === 3) roadBuild++
      if (card === 4) plenty++
      if (card === 5) vPoint++
    })
    // if(this.props.currentGame.game.currentUser === `player${this.props.user.playerNum}`){
    //rather then player1
    this.setState({
      brick,
      ore,
      sheep,
      wood,
      wheat,
      roadBuild,
      vPoint,
      plenty,
      monopoly,
      knight,
      canOrCannotBuyCard,
      options
    })
  }

  handleBuyClick(e) {
    e.preventDefault()
    let gameId = window.location.href.slice(-20)
    //check if there is one of the needed cards, if only one, next time button is disabled
    let sheep = this.state.sheep,
      ore = this.state.ore,
      wheat = this.state.wheat
    if (sheep <= 1 || ore <= 1 || wheat <= 1) {
      let canOrCannotBuyCard = false
      this.setState({
        canOrCannotBuyCard,
        sheep: sheep - 1,
        ore: ore - 1,
        wheat: wheat - 1
      })
    } else {
      this.setState({
        sheep: sheep - 1,
        ore: ore - 1,
        wheat: wheat - 1
      })
    }
    //player + String(this.props.user.playerNum) for user
    //num is what is returned from the firebase function, so I know what to increment in state, so that the page reRenders correctly
    let num = purchaseDevCard('player1', gameId)
    console.log(num)
    if (num === 1) {
      this.setState({
        knight: this.state.knight + 1
      })
    }
    if (num === 2) {
      this.setState({
        monopoly: this.state.monopoly + 1
      })
    }
    if (num === 3) {
      this.setState({
        roadBuild: this.state.roadBuild + 1
      })
    }
    if (num === 4) {
      this.setState({
        plenty: this.state.plenty + 1
      })
    }
    if (num === 5) {
      //do this automatically, as no need to be able to click a vPoint card, solely need to add 1 to score
      //...user not '1'
      victoryPointCard('1', gameId)
      this.setState({
        vPoint: this.state.vPoint + 1
      })
    }
  }

  handleCardClick(e, num) {
    e.preventDefault()
    //player + String(this.props.user.playerNum)
    let gameId = window.location.href.slice(-20)
    if (num === 1) {
      this.setState({
        knightMode: true,
        knight: this.state.knight - 1
      })
    }
    if (num === 2) {
      this.setState({
        monopolyMode: true,
        monopoly: this.state.monopoly - 1
      })
    }
    if (num === 3) {
      this.setState({
        roadBuild: this.state.roadBuild - 1
      })
    }
    if (num === 4) {
      this.setState({
        plentyMode: true,
        plenty: this.state.plenty - 1
      })
    }
    deleteSpecificDevCard(num, 'player1', gameId)
  }

  handleKnightChange(e, data) {
    e.preventDefault()
    let knightValueTile = parseInt(data.value.tile)
    //user...
    let knightValuePlayer = '1'
    //to check if possible players to take card from are connected to tile
    let knightValuePosPlayers = data.value.players
    this.setState({
      knightValueTile,
      knightValuePlayer,
      knightValuePosPlayers
    })
  }

  handleKnightInputChange(e, data) {
    let knightValueVictim = data.value
    this.setState({ knightValueVictim })
  }

  handleKnightSubmit(e, data) {
    let count = 0
    let gameId = window.location.href.slice(-20)
    if (this.state.knightValuePosPlayers.length === 0) {
      //when robber is merged
      // setRobberOnTile(this.state.knightValueTile)
    } else {
      this.state.knightValuePosPlayers.forEach(player => {
        //only want the key, that is the player, this is to check if the player that user wants to take card from is connected to tile
        player = Object.keys(player)[0]
        if (this.state.knightValueVictim === player) {
          count++
        }
      })
      //force user to enter correct player
      if (count === 0) alert('Enter a correct player')
      else {
        //switch card, random card from victims hand given to player, no interaction, simply increment and decrement of resource
        useKnightTakeCard(
          gameId,
          this.state.knightValuePlayer,
          this.state.knightValueVictim
        )
        //...robber
        // setRobberOnTile(this.state.knightValueTile)
      }
    }
    this.setState({
      knightMode: false
    })
  }

  handleMonopolyChange(e, data) {
    e.preventDefault()
    let monopolyResource = data.value
    //user...
    let monopolyPlayer = '1'
    this.setState({
      monopolyResource,
      monopolyPlayer
    })
  }

  handleMonopolySubmit(e, data) {
    let gameId = window.location.href.slice(-20)
    let monopolyMode = false
    this.setState({
      monopolyMode
    })
    monopolize(gameId, this.state.monopolyResource, this.state.monopolyPlayer)
  }

  handleRoadBuildChange(e, data) {
    e.preventDefault()
  }

  handleRoadBuildSubmit(e, data) {
    let gameId = window.location.href.slice(-20)
    //this one i leave for later
  }

  handlePlentyChange(e, data) {
    e.preventDefault()
    console.log(data.value)
    let plentyResource = data.value
    //user...
    let plentyPlayer = '1'
    this.setState({
      plentyResource,
      plentyPlayer
    })
  }

  handlePlentyAdd(e, data) {
    let resourceChoice = this.state.plentyResource
    //get added resources
    this.setState({
      plentyResourceChoices: [
        ...this.state.plentyResourceChoices,
        resourceChoice
      ]
    })
  }

  handlePlentySubmit(e, data) {
    let gameId = window.location.href.slice(-20)
    let plentyMode = false
    addTwoSelectedResources(
      gameId,
      this.state.plentyResourceChoices,
      this.state.plentyPlayer
    )
    this.setState({
      plentyMode,
      plentyResourceChoices: []
    })
  }

  render() {
    return (
      <Modal
        trigger={
          <Button style={{ width: '49%', height: '75%' }}>Dev Cards</Button>
        }
      >
        <h1 style={{ textAlign: 'center', fontSize: '2em' }}>
          Purchase a card?
        </h1>
        {this.state.canOrCannotBuyCard ? (
          <Button color="green" fluid onClick={e => this.handleBuyClick(e)}>
            Purchase a Card
          </Button>
        ) : (
          <Button color="green" disabled fluid>
            Purchase a Card
          </Button>
        )}
        <Modal.Content>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <img
              src={KnightImg}
              style={{
                height: '15%',
                width: '15%'
              }}
            />
            <img
              src={MonopolyImg}
              style={{
                height: '15%',
                width: '15%'
              }}
            />
            <img
              src={RoadBuildingImg}
              style={{
                height: '15%',
                width: '15%'
              }}
            />
            <img
              src={YearOfPlentyImg}
              style={{
                height: '15%',
                width: '15%'
              }}
            />
            <img
              src={VictoryPointImg}
              style={{
                height: '15%',
                width: '15%'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {' '}
            <Button.Group size="medium">
              {this.state.knight === 0 ? (
                <Button color="red" disabled>
                  Use
                </Button>
              ) : (
                <Button color="red" onClick={e => this.handleCardClick(e, 1)}>
                  Use
                </Button>
              )}
              <Button color="red" disabled>
                {this.state.knight}
              </Button>
            </Button.Group>
            <Button.Group size="medium">
              {this.state.monopoly === 0 ? (
                <Button color="orange" disabled>
                  Use
                </Button>
              ) : (
                <Button
                  color="orange"
                  onClick={e => this.handleCardClick(e, 2)}
                >
                  Use
                </Button>
              )}
              <Button color="orange" disabled>
                {this.state.monopoly}
              </Button>
            </Button.Group>
            <Button.Group size="medium">
              {this.state.roadBuild === 0 ? (
                <Button color="purple" disabled>
                  Use
                </Button>
              ) : (
                <Button
                  color="purple"
                  onClick={e => this.handleCardClick(e, 3)}
                >
                  Use
                </Button>
              )}
              <Button color="purple" disabled>
                {this.state.roadBuild}
              </Button>
            </Button.Group>
            <Button.Group size="medium">
              {this.state.plenty === 0 ? (
                <Button color="yellow" disabled>
                  Use
                </Button>
              ) : (
                <Button
                  color="yellow"
                  onClick={e => this.handleCardClick(e, 4)}
                >
                  Use
                </Button>
              )}
              <Button color="yellow" disabled>
                {this.state.plenty}
              </Button>
            </Button.Group>
            <Button.Group size="medium">
              <Button color="blue" disabled>
                +++
              </Button>
              <Button color="blue" disabled>
                {this.state.vPoint}
              </Button>
            </Button.Group>
          </div>
          {this.state.knightMode && (
            <Menu vertical>
              <Menu.Item header>Select Tile and Player</Menu.Item>
              <Menu.Item>
                <Dropdown
                  options={this.state.options}
                  placeholder="Pick Tile"
                  fluid
                  selection
                  onChange={this.handleKnightChange}
                />
              </Menu.Item>
              <Input
                placeholder="Which player?"
                onChange={this.handleKnightInputChange}
              />
              <Button onClick={this.handleKnightSubmit}>Submit</Button>
            </Menu>
          )}
          {this.state.monopolyMode && (
            <Menu vertical>
              <Menu.Item header>Select a resource</Menu.Item>
              <Menu.Item>
                <Dropdown
                  //`{ text: '', value: '' }`
                  options={[
                    { text: 'Ore', value: 'ore' },
                    { text: 'Wheat', value: 'WHEAT' },
                    { text: 'Wood', value: 'WOOD' },
                    { text: 'Brick', value: 'BRICK' },
                    { text: 'Sheep', value: 'SHEEP' }
                  ]}
                  placeholder="Pick one"
                  fluid
                  selection
                  onChange={this.handleMonopolyChange}
                />
              </Menu.Item>
              <Button onClick={this.handleMonopolySubmit}>Submit</Button>
            </Menu>
          )}
          {this.state.plentyMode && (
            <Menu vertical>
              <Menu.Item header>Select a resource</Menu.Item>
              <Menu.Item>
                <Dropdown
                  //`{ text: '', value: '' }`
                  options={[
                    { text: 'Ore', value: 'ore' },
                    { text: 'Wheat', value: 'wheat' },
                    { text: 'Wood', value: 'wood' },
                    { text: 'Brick', value: 'brick' },
                    { text: 'Sheep', value: 'sheep' }
                  ]}
                  placeholder="Pick one"
                  fluid
                  selection
                  onChange={this.handlePlentyChange}
                />
              </Menu.Item>
              {this.state.plentyResourceChoices.length === 2 ? (
                <Button disabled>Add</Button>
              ) : (
                <Button onClick={this.handlePlentyAdd}>Add</Button>
              )}
              {this.state.plentyResourceChoices.length === 2 ? (
                <Button onClick={this.handlePlentySubmit}>Submit</Button>
              ) : (
                <Button disabled>Submit</Button>
              )}
            </Menu>
          )}
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect()(DevCardBtn)
// export default DevCardBtn;
