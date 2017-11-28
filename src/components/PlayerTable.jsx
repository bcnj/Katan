import React from 'react'
import { Grid, Card, Segment, Label, Image, Icon } from 'semantic-ui-react'

import brickImage from '../images/brick.jpg'
import wheatImage from '../images/wheat.jpg'
import woodImage from '../images/wood.jpg'
import sheepImage from '../images/sheep.jpg'
import oreImage from '../images/ore.jpg'

import player1Image from '../images/player1.jpg'
import player2Image from '../images/player2.jpg'
import player3Image from '../images/player3.jpg'
import player4Image from '../images/player4.jpg'

const PlayerTable = ({ user, currentGame, gameId }) => {
  let player,
    image = player1Image
  if (currentGame && gameId) {
    player = localStorage.getItem(`${gameId}`)
    if (player === 'player1') image = player1Image
    if (player === 'player2') image = player2Image
    if (player === 'player3') image = player3Image
    if (player === 'player4') image = player4Image
  }

  return (
    <div>
      {user &&
        currentGame &&
        currentGame.players &&
        player && (
          <Grid>
            <Grid.Column width={3}>
              <Card
                style={{
                  height: '100%',
                  width: '100%'
                }}
              >
                <Image style={{ height: '50%' }} src={image} />
                <Card.Content>
                  <Card.Header textAlign="center">{user.name}</Card.Header>
                  <Card.Description textAlign="center">
                    <strong>VP: {currentGame.players[player].score}</strong>
                  </Card.Description>
                  <Card.Description textAlign="center">
                    {currentGame.game.currentPlayer === player ? (
                      <strong>Currently your turn</strong>
                    ) : (
                      <strong>Not your turn</strong>
                    )}

                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={13}>
              <Segment
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <img
                    src={brickImage}
                    style={{
                      height: '15%',
                      width: '15%'
                    }}
                    alt="brick"
                  />
                  <img
                    src={woodImage}
                    style={{
                      height: '15%',
                      width: '15%'
                    }}
                    alt="wood"
                  />
                  <img
                    src={sheepImage}
                    style={{
                      height: '15%',
                      width: '15%'
                    }}
                    alt="sheep"
                  />
                  <img
                    src={wheatImage}
                    style={{
                      height: '15%',
                      width: '15%'
                    }}
                    alt="wheat"
                  />
                  <img
                    src={oreImage}
                    style={{
                      height: '15%',
                      width: '15%'
                    }}
                    alt="ore"
                  />
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <Label
                    circular
                    style={{ width: '10%' }}
                    size="huge"
                    color="red"
                  >
                    {currentGame.players[`${player}`].brick}
                  </Label>
                  <Label
                    circular
                    style={{ width: '10%' }}
                    size="huge"
                    color="brown"
                  >
                    {currentGame.players[`${player}`].wood}
                  </Label>
                  <Label
                    circular
                    style={{ width: '10%' }}
                    size="huge"
                    color="green"
                  >
                    {currentGame.players[`${player}`].sheep}
                  </Label>
                  <Label
                    circular
                    style={{ width: '10%' }}
                    size="huge"
                    color="yellow"
                  >
                    {currentGame.players[`${player}`].wheat}
                  </Label>
                  <Label
                    circular
                    style={{ width: '10%' }}
                    size="huge"
                    color="black"
                  >
                    {currentGame.players[`${player}`].ore}
                  </Label>
                </div>
              </Segment>
            </Grid.Column>
          </Grid>
        )}
    </div>
  )
}

export default PlayerTable
