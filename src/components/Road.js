import React, { Component } from "react";
import { Ellipse, Text } from "react-konva";
import {buildRoad} from '../utils'

class Road extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      // console.log('Clicked on road', this.props.id)
  }

  render() {
    const { x, y, rotation, id, color, currentGame, gameId } = this.props;

    return (
      <Ellipse
        x={x}
        y={y}
        width={10}
        height={35}
        rotation={rotation}
        fill={color} // Pull in color depending on game current player
        shadowBlur={5}
        onClick={(e) => buildRoad(currentGame.game.currentPlayer, gameId, id)}
        listening={currentGame.roadNodes[id].active}
      />

    //   <Text
    //   x={x}
    //   y={y}
    //   width={20}
    //   height={35}
    //   fontSize={13}
    //   fontStyle={'bold'}
    //   fill={'red'}
    //   text={id}
    //   // rotation={rotation}
    //   // fill={color} // Pull in color depending on game current player
    //   // shadowBlur={5}
    //   // onClick={this.handleClick}
    // />
    );
  }
}

export default Road;
