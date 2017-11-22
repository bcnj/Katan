import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import buildImage from '../images/build.png'
import { turnRoadsOn } from '../utils'

const BuildBtn = (props) => {
  const {gameId, handleSettlement, handleCity, handleRoad, currentGame} = props

  return (
    <Modal trigger={<Button style={{width: '49%', height: '75%'}}>Build</Button>}>
    <Modal.Actions>
      { console.log(props)}
        { currentGame && currentGame.game &&
        <Button color='blue' inverted onClick={turnRoadsOn(currentGame.game.currentPlayer, gameId, currentGame.roadNodes)}>
          Build Road
        </Button>}
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


// const mapStateToProps = (state)=>{
//   currentGame: state.currentGame
// }

// const mapDispatchToProps = (dispatch)=>{
//   return{
//     // handleRoad: (e)=> {
//     //   turnRoadsOn(currentPlayer, gameId, roadNodes)
//     // },
//     handleCity: ()=> {

//     },
//     handleSettlement: ()=> {

//     },
//   }
// }

export default connect()(BuildBtn);

