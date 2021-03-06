import React, { Component } from 'react'
import { Ellipse } from 'react-konva'
import { buildRoad } from '../utils'

class Road extends Component {

  constructor(props){
    super(props)
    this.state = {
      roadOn: true
    }
    this.turnRoadOff = this.turnRoadOff.bind(this)
  }

  turnRoadOff(){
    this.setState({roadOn: false})
    setTimeout(() => this.setState({roadOn: true}), 2000)
  }

  render() {
    const { x, y, rotation, id, color, currentGame, gameId } = this.props

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
        listening={this.state.roadOn && currentGame.roadNodes[id].active && (currentGame.game.currentPlayer === localStorage.getItem(gameId))}

      />
    )
  }
}

export default Road
