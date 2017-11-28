import React, { Component } from 'react'
import { connect } from 'react-redux'
import Wait from './Wait'
import GamePage from './GamePage'
import { fetchSingleGame } from '../actions'

class GameStatus extends Component {
  componentDidMount() {
    this.cancel = this.props.fetchSingleGame(this.props.gameId)
  }

  componentWillUnmount() {
    this.cancel()
  }

  render(){
    const { currentGame, gameId, history} = this.props
    return(
      <div>
        { (currentGame && currentGame.game && currentGame.game.active ) ?
        <GamePage currentGame={currentGame} gameId={gameId}/>
        :
        <Wait currentGame={currentGame} gameId={gameId} history={history}/>}
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    gameId: ownProps.match.params.gameId,
    currentGame: state.currentGame,
    history: ownProps.history
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSingleGame: gameId => dispatch(fetchSingleGame(gameId))}}

export default connect (mapState, mapDispatchToProps)(GameStatus)