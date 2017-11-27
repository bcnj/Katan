import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Header, Image, Modal, Grid, Dropdown} from 'semantic-ui-react'
import wheat from '../images/wheat.jpg'
import brick from '../images/brick.jpg'
import sheep from '../images/sheep.jpg'
import wood from '../images/wood.jpg'
import ore from '../images/ore.jpg'
import { turnTradeOn, tradeInfo } from '../utils'

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
      offer: {},
      exchange: [],
      submitDisabled: false // diable submit if currentPlayer don't have enough resources
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleOfferChange = this.handleOfferChange.bind(this)
    this.handleExChange = this.handleExChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpen(){this.setState({ open: true })}

  handleClose(){this.setState({ open: false, submitDisabled: false })}

  handleOfferChange(e, {value}, resource){
    if (!this.state.offer){
      this.setState({ offer: {[resource]: value} })
    } else {
      let currentOffer = {...this.state.offer}
      currentOffer[resource] = value
      this.setState({ offer: {...currentOffer} })
    }
    // check if current player has enough resources
    let reKey = Object.keys(this.state.offer)
    if(reKey.find(key => this.state.offer[key] > this.props.currentGame.players[this.props.currentGame.game.currentPlayer][resource]) || value > this.props.currentGame.players[this.props.currentGame.game.currentPlayer][resource]){
      this.setState({submitDisabled: true})
    } else {
      this.setState({submitDisabled: false})
    }
  }

  handleExChange(e, {name, value}){
    if (!this.state.offer.length){
      this.setState({ exchange: [{[name]: value}] })
    } else {
      this.setState({ exchange: [...this.state.offer, {[name]: value}] })
    }
  }

  handleSubmit(currentPlayer, gameId){
    //check if i have enough resources before send this to other players
    turnTradeOn(currentPlayer, gameId)
    tradeInfo(this.state.offer, this.state.exchange, gameId)
  }

  render(){
    return (
      <Button onClick={this.handleOpen} style={{width: '49%', height: '75%'}}>Trade
        <Modal
          open={this.state.open}
          onClose={this.handleClose}>
          <h1 style={{ textAlign: 'center' }}> I am offering </h1>
          <Grid divided='vertically'>
            <Grid.Row columns={5}>
              {['wheat', 'brick', 'sheep', 'wood', 'ore'].map((resource, idx) => (
                <Grid.Column key={idx}>
                  <img src={images[idx]} style={{ width: '70%' }} />
                  <Dropdown
                    fluid
                    placeholder='0'
                    selection
                    options={qtyOptions}
                    onChange={(e, {value}) => this.handleOfferChange(e, {value}, resource)}/>
                </Grid.Column>
              ))}
            </Grid.Row>
            <div style={{ width: '100%' }}>
              <h1 style={{ textAlign: 'center' }} width={'100%'}> In exchange for </h1>
            </div>
            <Grid.Row columns={5}>
              {['wheat', 'brick', 'sheep', 'wood', 'ore'].map((resource, idx) => (
                <Grid.Column key={idx}>
                  <img src={images[idx]} style={{ width: '70%' }} />
                  <br/>
                  <Dropdown
                    fluid
                    placeholder='0'
                    selection
                    options={qtyOptions}/>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
          <Modal.Actions>
            <Button color='blue' disabled={this.state.submitDisabled} inverted onClick={() => this.handleSubmit(this.props.currentGame.game.currentPlayer, this.props.gameId)}>
              Submit
        </Button>
            <Button color='blue' inverted onClick={this.handleClose}>
              Cancel
        </Button>
          </Modal.Actions>
        </Modal>
      </Button>
    )
  }
}
export default connect()(TradeBtn);
