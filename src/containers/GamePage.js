import React, { Component } from 'react'
import { Grid, Menu, Button } from 'semantic-ui-react'

import { fetchSingleGame } from '../actions'

import Board from '../components/Board'

import PlayerTab from '../components/PlayerTab'
import MessageTab from '../components/MessageTab'
import BuildBtn from '../components/BuildBtn'
import BuildBtnInit from '../components/BuildBtnInit'
import DevCardBtn from '../components/DevCardBtn'
import EndTurnBtn from '../components/EndTurnBtn'
import TradeBtn from '../components/TradeBtn'
import TradePrompt from '../components/TradePrompt'
import PlayerTable from '../components/PlayerTable'
import { connect } from 'react-redux'

import Robber from '../components/Robber.jsx'

import Winning from '../components/Winning.js'
import { checkForWinner, endTurn } from '../utils/index'

class GamePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'players',
      timer: null,
      counter: 300
    }
    this.handlePanelClick = this.handlePanelClick.bind(this)
    this.tick = this.tick.bind(this)
  }

  handlePanelClick(e, { name }) {
    this.setState({ activeItem: name })
  }

  componentDidMount() {
    const { currentGame, gameId } = this.props
    this.cancel = this.props.fetchSingleGame(this.props.gameId)
    if (currentGame.game.currentPlayer === localStorage.getItem(gameId)){
      let timer = setInterval(this.tick, 1000)
      this.setState({timer})
    } else {
      clearInterval(this.state.timer)
    }
  }

  componentWillUnmount() {
    this.cancel()
    clearInterval(this.state.timer)
  }

  tick(){
    const { currentGame, gameId } = this.props

    if (this.state.counter > 0){
      this.setState({ counter: this.state.counter - 1})
    } else {
      endTurn(currentGame.game.turn, currentGame.game.currentPlayer, gameId)
      this.setState({ counter: 300})
    }
  }

  render() {
    //controls which panel tab appears based on menu selection

    let section

    if (this.state.activeItem === 'players') {
      section = (
        <PlayerTab
          currentGame={this.props.currentGame}
          gameId={this.props.gameId}
          counter={this.state.counter}
        />
      )
    }
    if (this.state.activeItem === 'messages' &&
    localStorage.getItem(this.props.gameId) !== 'player90') {
      section = (
        <MessageTab
          players={this.props.currentGame.players}
          messageCount={this.props.currentGame.game.messageCount}
          messageStart={this.props.currentGame.game.messageStart}
        />
      )
    }

    //local state governing current panel selection
    const { activeItem } = this.state
    const { user, currentGame, gameId } = this.props

    if (currentGame.game) {
    }

    return (
      <Grid padded>
        {/* this row contains game map, players, chat */}
        <Grid.Row style={{ height: '80vh' }}>
          {/* Konva map column */}
          <Grid.Column
            textAlign={'center'}
            // color={'red'}
            width={11}
          >
            {currentGame &&
              currentGame.game && (
                <Board
                  currentPlayer={currentGame.game.currentPlayer}
                  gameId={gameId}
                />
              )}
          </Grid.Column>

          {/* right-side panel column */}
          <Grid.Column
            textAlign={'center'}
            // color={'blue'}
            width={5}
          >
            {/* do not abtract due to local state (unless we transition to using redux store) */}
            <Menu pointing secondary>
              <Menu.Item
                name="players"
                active={activeItem === 'players'}
                onClick={this.handlePanelClick}
              />
              <Menu.Item
                name="messages"
                active={activeItem === 'messages'}
                onClick={this.handlePanelClick}
              />
              <Menu.Menu position="right">
                <Menu.Item
                  name="quit"
                  active={activeItem === 'quit'}
                  onClick={this.handlePanelClick}
                />
              </Menu.Menu>
            </Menu>


            {/* section depends on menu selection */}
            {section}
          </Grid.Column>
        </Grid.Row>

        {/* contains the players table and action buttons */}
        <Grid.Row
          style={{ height: '20vh', zIndex: 20 }}
        // color={'yellow'}
        >
          {/* players table column */}
          <Grid.Column width={11}>

          { localStorage.getItem(gameId) !== 'player90' &&
            <PlayerTable
              user={user}
              currentGame={currentGame}
              gameId={gameId}
            />}
          </Grid.Column>

          {/* action buttons column */}
          <Grid.Column width={5}>
            <Grid.Row style={{ height: '50%' }}>
              {currentGame &&
                currentGame.game &&
                (currentGame.game.turn >= 8 ? (
                  <BuildBtn gameId={gameId} currentGame={currentGame} />
                ) : (
                    <BuildBtnInit gameId={gameId} currentGame={currentGame} />
                  ))}
              {currentGame &&
                currentGame.game &&
                <TradeBtn currentGame={currentGame} gameId={gameId} />
              }
            </Grid.Row>

            <Grid.Row style={{ height: '50%' }}>
              {currentGame &&
                currentGame.game &&
                localStorage.getItem(gameId) ===
                currentGame.game.currentPlayer &&
                localStorage.getItem(gameId) !== 'player90' &&
                !currentGame.players[localStorage.getItem(gameId)].trade ? (
                  <DevCardBtn currentGame={currentGame} />
                ) : (
                  <Button disabled style={{ width: '49%', height: '75%' }}>
                    Dev Cards
                </Button>
                )}
                {currentGame &&
              currentGame.game &&
              (checkForWinner(currentGame)[0] && <Winning winner={checkForWinner(currentGame)[1]} />)}

              {currentGame &&
                currentGame.game &&
                <EndTurnBtn gameId={gameId} />
              }

              {currentGame &&
                currentGame.game &&
                localStorage.getItem(gameId) !== 'player90' &&
                currentGame.players[localStorage.getItem(gameId)]
                  .modalOpen &&

                  <Robber currentGame={currentGame} />}
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        {currentGame &&
          currentGame.players &&
          localStorage.getItem(gameId) !== 'player90' &&
          currentGame.players[localStorage.getItem(gameId)].trade && (
            <TradePrompt currentGame={currentGame} gameId={gameId} />
          )}
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    // playerNum: state.user.playerNum,
    gameId: ownProps.gameId,
    currentGame: state.currentGame
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSingleGame: gameId => dispatch(fetchSingleGame(gameId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
