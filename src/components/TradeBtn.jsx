import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Header, Image, Modal, Grid } from 'semantic-ui-react'
import wheat from '../images/wheat.jpg'
import brick from '../images/brick.jpg'
import sheep from '../images/sheep.jpg'
import wood from '../images/wood.jpg'
import ore from '../images/ore.jpg'

const images = [wheat, brick, sheep, wood, ore]

class TradeBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })

  render() {
    return (
      <Button onClick={this.handleOpen} style={{ width: '49%', height: '75%' }}>
        Trade
        <Modal open={this.state.open} onClose={this.handleClose}>
          <h1 style={{ textAlign: 'center' }}> I am offering </h1>
          <Grid divided="vertically">
            <Grid.Row columns={5}>
              {[0, 1, 2, 3, 4].map(num => (
                <Grid.Column key={num}>
                  <img src={images[num]} style={{ width: '70%' }} />
                  <Button.Group>
                    <Button icon="plus" onClick={this.handleShow} />
                    <Button icon="minus" onClick={this.handleHide} />
                  </Button.Group>
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
              {[0, 1, 2, 3, 4].map(num => (
                <Grid.Column key={num}>
                  <img src={images[num]} style={{ width: '70%' }} />
                  <Button.Group>
                    <Button icon="plus" onClick={this.handleShow} />
                    <Button icon="minus" onClick={this.handleHide} />
                  </Button.Group>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
          <Modal.Actions>
            <Button color="blue" inverted onClick={this.handleClose}>
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
export default connect()(TradeBtn)
