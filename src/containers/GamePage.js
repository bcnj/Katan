import React, { Component } from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import { fetchSingleGame } from '../actions'

import Board from '../components/Board';

import PlayerTab from '../components/PlayerTab'
import MessageTab from '../components/MessageTab'
import LogTab from '../components/LogTab'
import BuildBtn from '../components/BuildBtn'
import DevCardBtn from '../components/DevCardBtn'
import EndTurnBtn from '../components/EndTurnBtn'
import TradeBtn from '../components/TradeBtn'

import PlayerTable from '../components/PlayerTable'
import { connect } from 'react-redux'


class GamePage extends Component {

  constructor(props) {
      super(props)
      this.state = {
          activeItem: 'players'
      }
      this.handlePanelClick = this.handlePanelClick.bind(this)
  }

  handlePanelClick(e, { name }) {
    this.setState({ activeItem: name })
  }

  componentDidMount() {
    this.props.fetchSingleGame(this.props.gameId)
  }

  render() {

      //controls which panel tab appears based on menu selection
      let section;

      if (this.state.activeItem === 'players') { section = <PlayerTab currentGame={this.props.currentGame} gameId={this.props.gameId}/>; }
      if (this.state.activeItem === 'messages') { section = <MessageTab players={this.props.currentGame.players} messageCount={this.props.currentGame.game.messageCount} messageStart={this.props.currentGame.game.messageStart}/>; }
      if (this.state.activeItem === 'log') { section = <LogTab />; }

      //local state governing current panel selection
      const { activeItem } = this.state
      const { user, currentGame, gameId } = this.props

      return (

          <Grid padded>
              {/* this row contains game map, players, chat, log */}
              <Grid.Row
                  style={{ height: '80vh' }}
              >
                  {/* Konva map column */}
                  <Grid.Column
                      textAlign={'center'}
                      // color={'red'}
                      width={11}
                  >
                  { currentGame && currentGame.game &&
                      <Board currentPlayer={currentGame.game.currentPlayer} gameId={gameId}/>
                  }
                  </Grid.Column>

                  {/* right-side panel column */}
                  <Grid.Column
                      textAlign={'center'}
                      // color={'blue'}
                      width={5}
                  >
                      {/* do not abtract due to local state (unless we transition to using redux store) */}
                      <Menu pointing secondary>
                          <Menu.Item name='players' active={activeItem === 'players'} onClick={this.handlePanelClick} />
                          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handlePanelClick} />
                          <Menu.Item name='log' active={activeItem === 'log'} onClick={this.handlePanelClick} />
                          <Menu.Menu position='right'>
                              <Menu.Item name='quit' active={activeItem === 'quit'} onClick={this.handlePanelClick} />
                          </Menu.Menu>
                      </Menu>

                      {/* section depends on menu selection */}
                      {section}

                  </Grid.Column>
              </Grid.Row>

              {/* contains the players table and action buttons */}
              <Grid.Row
                  style={{ height: '20vh' }}
              // color={'yellow'}
              >
                  {/* players table column */}
                  <Grid.Column width={11} >
                      <PlayerTable user={user} currentGame={currentGame} gameId={gameId}/>
                  </Grid.Column>

                  {/* action buttons column */}
                  <Grid.Column width={5} >
                      <Grid.Row style={{ height: '50%' }}>
                          <BuildBtn gameId={gameId} currentGame={currentGame}/>
                          <TradeBtn />
                      </Grid.Row>

                      <Grid.Row style={{ height: '50%' }}>
                      { currentGame && currentGame.game &&
                          <DevCardBtn currentGame={currentGame}/>
                      }
                          <EndTurnBtn gameId={gameId}/>
                      </Grid.Row>
                  </Grid.Column>
              </Grid.Row>
          </Grid>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        // playerNum: state.user.playerNum,
        gameId: ownProps.match.params.gameId,
        currentGame: state.currentGame,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      fetchSingleGame: (gameId) => dispatch(fetchSingleGame(gameId)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
