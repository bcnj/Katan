import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

export default ({allGames}) => (
 <Card.Group>

    { allGames.length && allGames.map(game =>
        <Card key={game.id}>
          <Card.Content>
            <Card.Header>
              Game {game.id}
            </Card.Header>
            <Card.Description>
              <strong>{game.game.players.length}</strong> /4 Players
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>Join</Button>
              <Button basic color='red'>Watch</Button>
            </div>
          </Card.Content>
        </Card>
    )}
  </Card.Group>)

