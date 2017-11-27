import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Header, Image, Modal, Grid, Dropdown} from 'semantic-ui-react'
import wheat from '../images/wheat.jpg'
import brick from '../images/brick.jpg'
import sheep from '../images/sheep.jpg'
import wood from '../images/wood.jpg'
import ore from '../images/ore.jpg'
import { initiateTrade } from '../utils'

const images = [wheat, brick, sheep, wood, ore]

class TradePrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.currentGame.players[localStorage.getItem(`${this.props.gameId}`)].trade || false,
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }
  handleOpen(){this.setState({ open: true })}

  handleClose(){this.setState({ open: false })}

  render(){
    const { currentGame, gameId } = this.props

    return(
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
                    placeholder={currentGame.trade.offer[resource] || '0'}
                    selection
                    disabled/>
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
                    placeholder={currentGame.trade.exchange[resource] || '0'}
                    selection
                    disabled/>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
          <Modal.Actions>
            <Button color='blue' disabled={this.state.submitDisabled} inverted onClick={() => {
              initiateTrade(currentGame.game.currentPlayer, localStorage.getItem(gameId), this.props.offer, this.props.exchange, gameId)
              this.handleClose()
              }
            }>
              Accept
        </Button>
            <Button color='blue' inverted onClick={this.handleClose}>
              Cancel
        </Button>
          </Modal.Actions>
        </Modal>
    )
  }
}
export default connect()(TradePrompt);
