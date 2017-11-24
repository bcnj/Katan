import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react'
import buildImage from '../images/build.png'
import { turnRoadsOn, turnSettlementOn, turnCityOn } from '../utils'

class BuildBtn extends Component{
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOpen = () => this.setState({open: true})
  handleClose = () => this.setState({open: false})

  render(){
  const {gameId, handleSettlement, handleCity, handleRoad, currentGame} = this.props

  return (
    <div>
      <Button onClick={this.handleOpen} style={{width: '49%', height: '75%'}}>Build</Button>
        { currentGame && currentGame.game && currentGame.roadNodes &&
      <Modal
        open={this.state.open}
        onClose={this.handleClose}>
        <Modal.Actions>

          <Button color='blue' inverted onClick={e => { turnRoadsOn(currentGame.game.currentPlayer, gameId, currentGame.roadNodes)
          this.handleClose()
          }}>
            Build Road
          </Button>
          <Button color='blue' inverted onClick={e => {
          turnSettlementOn(currentGame.game.currentPlayer, gameId, currentGame.intersectionNodes, currentGame.roadNodes)
          this.handleClose()
          }}>
            Build Settlement
          </Button>
            <Button color='blue' inverted onClick={e => {
            turnCityOn(currentGame.game.currentPlayer, gameId, currentGame.intersectionNodes)
            this.handleClose()
            }}>
              Build City
          </Button>
        </Modal.Actions>
        <Modal.Content>
            <img src={buildImage} style={{height: '100'}}/>
        </Modal.Content>
      </Modal>}
    </div>
  )
}
}

export default connect()(BuildBtn);

