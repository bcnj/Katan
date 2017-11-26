import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Grid, Menu, Dropdown, Input } from 'semantic-ui-react'
import { db } from '../firebase'

import KnightImg from '../images/knight.jpg'
import MonopolyImg from '../images/monopoly.JPG'
import YearOfPlentyImg from '../images/yearOfPlenty.jpg'
import RoadBuildingImg from '../images/roadBuilding.jpg'
import VictoryPointImg from '../images/victoryPoint.jpg'

import { purchaseDevCard, deleteSpecificDevCard, getOptions, useKnightTakeCard } from '../utils/index.js'
//setRobberOnTile will be imported
//`{ text: '', value: '' }`

class DevCardBtn extends Component {
  constructor(props) {
    super(props)
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
      knightValuePosPlayers: []
    }
    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleBuyClick = this.handleBuyClick.bind(this)
    this.handleKnightChange =this.handleKnightChange.bind(this)
    this.handleKnightSubmit =this.handleKnightSubmit.bind(this)
    this.handleKnightInputChange=this.handleKnightInputChange.bind(this)
  }

  handleKnightChange(e, data) {
    e.preventDefault()
    //I need victim, currentPlayer, and thats it
    let knightValueTile = parseInt(data.value.tile)
    //user...
    let knightValuePlayer = '1'
    let knightValuePosPlayers = data.value.players
    this.setState({
      knightValueTile,
      knightValuePlayer,
      knightValuePosPlayers
    })
  }

  handleKnightInputChange(e,data) {
    let knightValueVictim = data.value
    this.setState({knightValueVictim})
  }

  handleKnightSubmit(e, data) {
    let count = 0
    let gameId = window.location.href.slice(-20)
    if(this.state.knightValuePosPlayers.length===0){
      // setRobberOnTile(this.state.knightValueTile)
    } else {
      this.state.knightValuePosPlayers.forEach((player)=> {
        player = Object.keys(player)[0]
        if(this.state.knightValueVictim===player) {
          count++
        }
      })
      if(count===0) alert('Enter a correct player')
      else {
        useKnightTakeCard(gameId, this.state.knightValuePlayer, this.state.knightValueVictim)
        // setRobberOnTile(this.state.knightValueTile)
      }
    }
    this.setState({
      knightMode: false
    })
  }

  handleBuyClick(e) {
    e.preventDefault()
    let gameId = window.location.href.slice(-20)
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
    //player + String(this.props.user.playerNum)
    purchaseDevCard('player1', gameId)
  }

  handleCardClick(e, num) {
    e.preventDefault()
    //player + String(this.props.user.playerNum)
    let gameId = window.location.href.slice(-20)
    if (num === 1) {
      // setRobberBuild(gameId, true)
      // useKnightTakeCard()
      this.setState({
        knightMode: true,
        knight: this.state.knight - 1
      })
    }
    if (num === 2) {
      this.setState({
        vPoint: this.state.vPoint - 1
      })
    }
    if (num === 3) {
      this.setState({
        plenty: this.state.plenty - 1
      })
    }
    if (num === 4) {
      this.setState({
        roadBuild: this.state.roadBuild - 1
      })
    }
    if (num === 5) {
      this.setState({
        monopoly: this.state.monopoly - 1
      })
    }
    deleteSpecificDevCard(num, 'player1', gameId)
  }

  componentDidMount() {
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

    devCards.forEach((card, i) => {
      if (card === 1) knight++
      if (card === 2) vPoint++
      if (card === 3) plenty++
      if (card === 4) roadBuild++
      if (card === 5) monopoly++
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
          <Button fluid onClick={e => this.handleBuyClick(e)}>
            Purchase a Card
          </Button>
        ) : (
          <Button disabled fluid>
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
                <Button disabled>Use</Button>
              ) : (
                <Button onClick={e => this.handleCardClick(e, 1)}>Use</Button>
              )}
              <Button disabled>{this.state.knight}</Button>
            </Button.Group>
            <Button.Group size="medium">
              {this.state.monopoly === 0 ? (
                <Button disabled>Use</Button>
              ) : (
                <Button onClick={e => this.handleCardClick(e, 5)}>Use</Button>
              )}
              <Button disabled>{this.state.monopoly}</Button>
            </Button.Group>
            <Button.Group size="medium">
              {this.state.roadBuild === 0 ? (
                <Button disabled>Use</Button>
              ) : (
                <Button onClick={e => this.handleCardClick(e, 4)}>Use</Button>
              )}
              <Button disabled>{this.state.roadBuild}</Button>
            </Button.Group>
            <Button.Group size="medium">
              {this.state.plenty === 0 ? (
                <Button disabled>Use</Button>
              ) : (
                <Button onClick={e => this.handleCardClick(e, 3)}>Use</Button>
              )}
              <Button disabled>{this.state.plenty}</Button>
            </Button.Group>
            <Button.Group size="medium">
              {this.state.vPoint === 0 ? (
                <Button disabled>Use</Button>
              ) : (
                <Button onClick={e => this.handleCardClick(e, 2)}>Use</Button>
              )}
              <Button disabled>{this.state.vPoint}</Button>
            </Button.Group>
          </div>
          {this.state.knightMode && (
            <Menu vertical>
              <Menu.Item header>Select Tile and Player</Menu.Item>
              <Menu.Item>
                <Dropdown
                  options={this.state.options}
                  placeholder="Click"
                  fluid
                  selection
                  onChange={this.handleKnightChange}
                />
              </Menu.Item>
              <Input placeholder='Which player?' onChange={this.handleKnightInputChange}/>
              <Button onClick={this.handleKnightSubmit}>Submit</Button>
            </Menu>
          )}
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect()(DevCardBtn)
// export default DevCardBtn;
