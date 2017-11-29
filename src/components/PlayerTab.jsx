import React from 'react'
import { connect } from 'react-redux'
import { Segment, Card, Message, Icon } from 'semantic-ui-react'
import Dice from '../components/Dice'

const PlayerTab = ({ currentGame, gameId, counter}) => {

  return (

    <Segment
      style={{ height: '90%', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
    >

    { currentGame.game && currentGame.game.turn < 8 &&
    <Segment inverted color='green' tertiary>
      INITIAL SETUP PHASE
    </Segment>}

    { currentGame.game && currentGame.game.currentPlayer === localStorage.getItem(gameId) &&
    <Segment inverted color='red' tertiary>
      <Icon name='warning'/>
      Your turn now
    </Segment>}

      <Card.Group>
        {currentGame &&
          currentGame.game &&
          [1, 2, 3, 4].map(num => (
            <Card
              style={{
                backgroundColor:
                  currentGame.game.currentPlayer === `player${num}`
                    ? 'rgba(0, 0, 0, 0.2)'
                    : ''
              }}
              fluid
              key={num}
              header={currentGame.players[`player${num}`].name}
              meta={
                <div>
                  <strong>
                    {currentGame.game.currentPlayer === `player${num}`
                      ? 'playing'
                      : 'waiting'}
                  </strong>

                </div>
              }

              description={`${
                currentGame.players[`player${num}`].score
                } VP Points`}
              color={currentGame.players[`player${num}`].color}
            />
          ))}
      </Card.Group>
      <Dice currentGame={currentGame} gameId={gameId} />
    </Segment>
  )
}

export default connect()(PlayerTab)
