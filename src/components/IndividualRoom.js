import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default ({allGames, handleJoin, playerNum, user}) => {

  return(
    <Card.Group>

    { allGames.length && allGames.map(game =>
        <Card key={game.id}>
          <Card.Content>
            <Card.Header>
              Game {game.id.slice(0,2)}
            </Card.Header>
            <Card.Description>
              <strong>{game.game.players.length}</strong> /4 Players
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
              <Button onClick={() => {handleJoin(game.id)}} basic color='green'>Join</Button>
              <Button basic color='red'>Watch</Button>
            </div>
          </Card.Content>
        </Card>
    )}
    </Card.Group>
  )
}


