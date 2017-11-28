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
                <p style={{ verticalAlign: 'text-bottom' }}>{user.name}</p>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={13}>
            <Segment
              style={{
                paddingBottom: '0',
                margin: '0',
                height: '28%',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                display: 'flex',
                justifyContent: 'space-around'
              }}
            >
              <Label
                circular
                style={{ width: '10%' }}
                size="small"
                color="red"
              >
                {currentGame.players[`${player}`].brick}
              </Label>
              <Label
                circular
                style={{ width: '10%' }}
                size="small"
                color="brown"
              >
                {currentGame.players[`${player}`].wood}
              </Label>
              <Label
                circular
                style={{ width: '10%' }}
                size="small"
                color="green"
              >
                {currentGame.players[`${player}`].sheep}
              </Label>
              <Label
                circular
                style={{ width: '10%' }}
                size="small"
                color="yellow"
              >
                {currentGame.players[`${player}`].wheat}
              </Label>
              <Label
                circular
                style={{ width: '10%' }}
                size="small"
                color="black"
              >
                {currentGame.players[`${player}`].ore}
              </Label>

            </Segment>
            <Segment
              style={{
                paddingTop: '0',
                margin: '0',
                height: '83%',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                display: 'flex',
                justifyContent: 'space-around'
              }}
            >
              <img
                src={brickImage}
                style={{
                  height: '100%',
                  width: '13%'
                }}
                alt="brick"
              />
              <img
                src={woodImage}
                style={{
                  height: '100%',
                  width: '13%'
                }}
                alt="wood"
              />
              <img
                src={sheepImage}
                style={{
                  height: '100%',
                  width: '13%'
                }}
                alt="sheep"
              />
              <img
                src={wheatImage}
                style={{
                  height: '100%',
                  width: '13%'
                }}
                alt="wheat"
              />
              <img
                src={oreImage}
                style={{
                  height: '100%',
                  width: '13%'
                }}
                alt="ore"
              />
            </Segment>
          </Grid.Column>
        </Grid>
      }
    </Grid.Row >
  )
}

export default PlayerTable
