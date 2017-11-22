import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import buildImage from '../images/build.png'


class BuildBtn extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  handleRoad(){

  }

  handleCity(){

  }

  handleSettlement(){

  }

  render(){
    return (
      <Modal trigger={<Button style={{width: '49%', height: '75%'}}>Build</Button>}>
      <Modal.Actions>
          <Button color='blue' inverted onClick={this.handleRoad}>
            Build Road
          </Button>
          <Button color='blue' inverted onClick={this.handleSettlement}>
            Build Settlement
          </Button>
          <Button color='blue' inverted onClick={this.handleCity}>
            Build City
          </Button>
        </Modal.Actions>
      <Modal.Content>
          <img src={buildImage} style={{height: '100'}}/>
      </Modal.Content>
      </Modal>
    )
  }
}

export default (BuildBtn);

