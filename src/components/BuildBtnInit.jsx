import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import buildImage from '../images/build.png'
import { turnRoadsOnInit, turnSettlementOnInit } from '../utils'

class BuildBtnInit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      buildRoadDisabled: true,
      buildSettlementDisabled: false,
      // buildRoad and buildSettlement is only allowed once per turn
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })

  render(){
  const {gameId, handleSettlement, handleCity, handleRoad, currentGame} = this.props

  return (
      <Button disabled={currentGame.game.currentPlayer !== localStorage.getItem(gameId)} onClick={this.handleOpen} style={{width: '49%', height: '75%'}}>Build
        { currentGame && currentGame.game && currentGame.roadNodes && currentGame.players &&
      <Modal
        open={this.state.open}
        onClose={this.handleClose}>
        <Modal.Actions>
          <Button color='blue' inverted
            disabled={this.state.buildRoadDisabled}
            onClick={e => {
            turnRoadsOnInit(currentGame.game.currentPlayer, gameId, currentGame.roadNodes, currentGame.intersectionNodes)
            this.setState({buildSettlementDisabled: false, buildRoadDisabled: true})
            this.handleClose()
          }}>
            Build Road
          </Button>
          <Button color='blue' inverted
            disabled={this.state.buildSettlementDisabled}
            onClick={e => {
            turnSettlementOnInit(currentGame.game.currentPlayer, gameId, currentGame.intersectionNodes, currentGame.roadNodes)
            this.setState({buildSettlementDisabled: true, buildRoadDisabled: false})
            this.handleClose()
          }}>
            Build Settlement
          </Button>
          <Button color='blue' inverted disabled={true}>
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

export default connect()(BuildBtnInit);
