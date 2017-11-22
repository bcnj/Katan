import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import buildImage from '../images/build.png'

const BuildBtn = ({handleSettlement, handleCity, handleRoad}) => {

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


const mapStateToProps = (state)=>{

}

const mapDispatchToProps  =(dispatch)=>{
  return{
    handleRoad: ()=> {

    },
    handleCity: ()=> {

    },
    handleSettlement: ()=> {

    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildBtn);

