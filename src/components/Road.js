import React, { Component } from 'react'
import { Ellipse } from 'react-konva'
import { buildRoad } from '../utils'

class Road extends Component {

  render() {
    const { x, y, rotation, id, color, currentGame, gameId } = this.props

    console.log(currentGame.roadNodes[id].active && (currentGame.game.currentPlayer === localStorage.getItem(gameId)))

    return (
      <Ellipse
        x={x}
        y={y}
        width={10}
        height={35}
        rotation={rotation}
        fill={color} // Pull in color depending on game current player
        shadowBlur={5}
        onClick={e =>
          buildRoad(
            currentGame.game.currentPlayer,
            gameId,
            id,
            currentGame.game.turn,
            currentGame
          )
        }
        listening={currentGame.roadNodes[id].active && (currentGame.game.currentPlayer === localStorage.getItem(gameId))}

      />
    )
  }
}

export default Road
