import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import { Card } from 'semantic-ui-react'
import Dice from '../components/Dice'

const PlayerTab = ({ currentGame, gameId }) => {
  return (
    <Segment
      style={{ height: '90%', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
    >
      <Card.Group>
        {currentGame &&
          currentGame.game &&
          [1, 2, 3, 4].map(num => (
            <Card
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
