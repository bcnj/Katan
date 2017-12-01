import React from 'react'
import { Grid, Card, Segment, Label, Image } from 'semantic-ui-react'

import brickImage from '../images/brick.jpg'
import wheatImage from '../images/wheat.jpg'
import woodImage from '../images/wood.jpg'
import sheepImage from '../images/sheep.jpg'
import oreImage from '../images/ore.jpg'

import player1Image from '../images/player1.jpg'
import player2Image from '../images/player2.jpg'
import player3Image from '../images/player3.jpg'
import player4Image from '../images/player4.jpg'

const images = [brickImage, wheatImage, woodImage, sheepImage, oreImage]
const color = ['red', 'brown', 'green', 'yellow', 'black']

const PlayerTable = ({ user, currentGame, gameId }) => {
  let player,
    image = player1Image
  if (currentGame && gameId) {
    player = localStorage.getItem(gameId)
    if (player === 'player1') image = player1Image
    if (player === 'player2') image = player2Image
    if (player === 'player3') image = player3Image
    if (player === 'player4') image = player4Image
  }

  return (
    <Grid.Row style={{ height: '100%' }}>
      {user &&
        currentGame &&
        currentGame.players &&
        player &&
        <Grid style={{ height: '100%' }}>

          <Grid.Column width={3}>
            <Card
              style={{
                height: '110%',
                width: '100%',
                backgroundImage: 'url(' + image + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
              }}
            >
              <Card.Content>
                <p style={{ verticalAlign: 'text-bottom', backgroundColor: 'rgba(255,255,255,0.7)'}}><strong>{user.name}</strong></p>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={13}>
            <Segment
              style={{
                paddingBottom: '0',
                margin: '0',
                height: '110%',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                display: 'flex',
                justifyContent: 'space-around'
              }}
            >
              <Grid>
                <Grid.Row columns={5}>
                  {['brick', 'wheat', 'wood', 'sheep', 'ore'].map((resource, idx) => (
                    <Grid.Column key={idx}>
                      <Label
                        color={color[idx]}
                        size={'small'}
                        style={{ width: '50%' }}
                        >
                        {currentGame.players[`${player}`][resource]}
                      </Label>
                      <Image centered fluid style={{height: '80%', width: 'auto', justifyContent:'center'}} src={images[idx]} alt='' />
                    </Grid.Column>
                  ))}

                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      }
    </Grid.Row>
  )
}

export default PlayerTable
