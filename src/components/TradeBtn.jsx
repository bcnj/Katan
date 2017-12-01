import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Grid, Dropdown, Message} from 'semantic-ui-react'
import wheat from '../images/wheat.jpg'
import brick from '../images/brick.jpg'
import sheep from '../images/sheep.jpg'
import wood from '../images/wood.jpg'
import ore from '../images/ore.jpg'
import { tradeInfo } from '../utils'

const images = [wheat, brick, sheep, wood, ore]
const qtyOptions = []
for (let i= 0; i<= 10; i++){
  qtyOptions.push({text: `${i}`, value: i,})
}

class TradeBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      offer: {'wheat': 0, 'ore': 0, 'wood': 0, 'sheep':0, 'brick':0},
      exchange: {'wheat': 0, 'ore': 0, 'wood': 0, 'sheep':0, 'brick':0},
      submitDisabled: false // diable submit if currentPlayer don't have enough resources
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleOfferChange = this.handleOfferChange.bind(this)
    this.handleExChange = this.handleExChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpen(){this.setState({ open: true , offer: {'wheat': 0, 'ore': 0, 'wood': 0, 'sheep':0, 'brick':0}, exchange: {'wheat': 0, 'ore': 0, 'wood': 0, 'sheep':0, 'brick':0} })}

  handleClose(){this.setState({ open: false, submitDisabled: false, offer: {'wheat': 0, 'ore': 0, 'wood': 0, 'sheep':0, 'brick':0}, exchange: {'wheat': 0, 'ore': 0, 'wood': 0, 'sheep':0, 'brick':0} })}

  handleOfferChange(e, {value}, resource){
    let currentOffer = {...this.state.offer}
    currentOffer[resource] = value
    this.setState({ offer: {...currentOffer} })
    // check if current player has enough resources
    let reKey = Object.keys(this.state.offer)
    if(reKey.find(key => this.state.offer[key] > this.props.currentGame.players[this.props.currentGame.game.currentPlayer][resource]) || value > this.props.currentGame.players[this.props.currentGame.game.currentPlayer][resource]){
      this.setState({submitDisabled: true})
    } else {
      this.setState({submitDisabled: false})
    }
  }

  handleExChange(e, {value}, resource){
    let currentEx = {...this.state.exchange}
    currentEx[resource] = value
    this.setState({ exchange: {...currentEx} })
  }

  handleSubmit(currentPlayer, gameId){
    //check if i have enough resources before send this to other players
    tradeInfo(this.state.offer, this.state.exchange, gameId, currentPlayer)
    this.handleClose()
  }

  render() {
    return (
      <Button onClick={this.handleOpen} style={{ width: '49%', height: '75%' }} disabled={ this.props.currentGame.game.currentPlayer !== localStorage.getItem(this.props.gameId)}>
        Trade
        <Modal open={this.state.open}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        onClose={this.handleClose}>
          <h1 style={{ textAlign: 'center' }}> I am offering </h1>
          <Grid divided="vertically">
            <Grid.Row columns={5}>
              {['wheat', 'brick', 'sheep', 'wood', 'ore'].map((resource, idx) => (
                <Grid.Column key={idx}>
                  <img src={images[idx]} style={{ width: '70%' }} alt='' />
                  <Dropdown
                    fluid
                    selection
                    value={this.state.offer[resource]}
                    options={qtyOptions}
                    onChange={(e, {value}) => this.handleOfferChange(e, {value}, resource)}/>
                </Grid.Column>
              ))}
            </Grid.Row>
            <div style={{ width: '100%' }}>
              <h1 style={{ textAlign: 'center' }} width={'100%'}>
                {' '}
                In exchange for{' '}
              </h1>
            </div>
            <Grid.Row columns={5}>
              {['wheat', 'brick', 'sheep', 'wood', 'ore'].map((resource, idx) => (
                <Grid.Column key={idx}>
                  <img src={images[idx]} style={{ width: '70%' }} alt='' />
                  <br/>
                  <Dropdown
                    fluid
                    selection
                    value={this.state.exchange[resource]}
                    options={qtyOptions}
                    onChange={(e, {value}) => this.handleExChange(e, {value}, resource)}/>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
          <Modal.Actions>
          {this.state.submitDisabled &&
          <Message color='red'>
            You do not have enough resources for this trade!
          </Message> }
            <Button color='blue' disabled={this.state.submitDisabled} inverted onClick={() => this.handleSubmit(this.props.currentGame.game.currentPlayer, this.props.gameId)}>
              Submit
            </Button>
            <Button color="blue" inverted onClick={this.handleClose}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Button>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    currentGame: state.currentGame,
    gameId: ownProps.gameId
  }
}
export default connect(mapState)(TradeBtn)
