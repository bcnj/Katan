import React from 'react'
import { Grid, Card, Segment } from 'semantic-ui-react'

const PlayerTable = ({ user, currentGame, gameId }) => {
  let player
  if (currentGame && gameId) {
    player = localStorage.getItem(`${gameId}`)
  }

  return (
    <div>
      {user &&
        currentGame &&
        currentGame.players &&
        player && (
          <Grid>
            <Grid.Column width={3}>
              <Card style={{ height: '167%', width: '100%' }}>
                <Card.Content>
                  <Card.Header>{user.name}</Card.Header>
                  <Card.Description>
                    VP Points: {currentGame.players[player].score}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={13}>
              <Segment style={{ height: '167%', width: '100%' }}>
                <Grid columns={5}>
                  <Grid.Row>
                    <Grid.Column>
                      {' '}
                      Brick: {currentGame.players[`${player}`].brick}{' '}
                    </Grid.Column>
                    <Grid.Column>
                      {' '}
                      Wood: {currentGame.players[player].wood}{' '}
                    </Grid.Column>
                    <Grid.Column>
                      {' '}
                      Sheep: {currentGame.players[player].sheep}{' '}
                    </Grid.Column>
                    <Grid.Column>
                      {' '}
                      Wheat: {currentGame.players[player].wheat}{' '}
                    </Grid.Column>
                    <Grid.Column>
                      {' '}
                      Ore: {currentGame.players[player].ore}{' '}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid>
        )}
    </div>
  )
}

export default PlayerTable
