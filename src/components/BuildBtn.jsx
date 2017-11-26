import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import buildImage from '../images/build.png'
import { turnRoadsOn, turnSettlementOn, turnCityOn } from '../utils'

class BuildBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      buildRoadDisabled: true,
      buildSettlementDisabled: true,
      buildCityDisabled: true,
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })

  render(){
  const {gameId, handleSettlement, handleCity, handleRoad, currentGame} = this.props
  let playerResource
  if (currentGame && currentGame.game){
    playerResource = currentGame.players[`${currentGame.game.currentPlayer}`]
  }

  return (
      <Button onClick={this.handleOpen} style={{width: '49%', height: '75%'}}>Build
        { currentGame && currentGame.game && currentGame.roadNodes && playerResource &&
      <Modal
        open={this.state.open}
        onClose={this.handleClose}>
        <Modal.Actions>
          {/* disable button when players don't have enough resources */}
          <Button color='blue' inverted
            disabled={playerResource.brick < 1 || playerResource.wood < 1}
            onClick={e => {
            turnRoadsOn(currentGame.game.currentPlayer, gameId, currentGame.roadNodes)
            this.handleClose()
          }}>
            Build Road
          </Button>
          <Button color='blue' inverted
            disabled={playerResource.brick < 1 || playerResource.wood < 1 || playerResource.sheep < 1 || playerResource.wheat < 1}
            onClick={e => {
            turnSettlementOn(currentGame.game.currentPlayer, gameId, currentGame.intersectionNodes, currentGame.roadNodes)
            this.handleClose()
          }}>
            Build Settlement
          </Button>
          <Button color='blue' inverted
            disabled={playerResource.ore < 3 || playerResource.wheat < 2}
            onClick={e => {
            turnCityOn(currentGame.game.currentPlayer, gameId, currentGame.intersectionNodes)
            this.handleClose()
            }}>
              Build City
          </Button>
            </Modal.Actions>
            <Modal.Content>
              <img src={buildImage} style={{ height: '100' }} />
            </Modal.Content>
          </Modal>}
        </Button>
    )
  }
}

export default connect()(BuildBtn);

