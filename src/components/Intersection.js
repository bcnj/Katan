import React, { Component } from "react";
import { Circle } from "react-konva";
import { buildCity, buildSettlement } from '../utils'

class Intersection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, x, y, color, type, currentGame, gameId } = this.props;
    let stroke, strokeWidth, radius;
    if (type === 'settlement') { radius = 7; stroke = ''; strokeWidth = '' }
    if (type === 'city') { radius = 14; stroke = 'black'; strokeWidth = '5' }

    return (
      <Circle
        x={x}
        y={y}
        radius={radius}
        fill={color}
        stroke={stroke}
        strokeWidth={strokeWidth}
        shadowBlur={5}
        onClick={e => console.log('!!!')}
      />
    );
  }
}


//     return
//     <Circle
//         x={x}
//         y={y}
//         radius={radius}
//         fill={color}
//         stroke={stroke}
//         strokeWidth={strokeWidth}
//         shadowBlur={5}
//         onClick={(e) => buildSettlement(currentGame.game.currentPlayer, gameId, id, currentGame.players[currentGame.game.currentPlayer].score)}
//         listening={currentGame.intersectionNodes[id].active}
//         />
//     )
//   }
// }


export default Intersection;
