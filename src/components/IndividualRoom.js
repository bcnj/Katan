import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default ({ allGames, handleJoin, handleWatch, user }) => {
  return (
    <Card.Group>
      {allGames.length &&
        allGames.map(game => (
          <Card key={game.id}>
            <Card.Content>
              <Card.Header>Game {game.id.slice(0, 2)}</Card.Header>
              <Card.Description>
                <strong>{game.game.playerCount}</strong> /4 Players
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div>
                <Button
                  disabled={game.game.playerCount > 3}
                  onClick={e =>
                    handleJoin(game.id, game.game.playerCount, user.name)
                  }
                  basic
                  color="green"
                >
                  Join
                </Button>
                <Button onClick={e => handleWatch(game.id)} basic color="red">
                  Watch
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
    </Card.Group>
  )
}
