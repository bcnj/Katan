import React, { Component } from "react";
import { Circle } from "react-konva";

class Intersection extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // console.log("You clicked on intersection", this.props.id);
  }

  addSettlement() { } // Query Firebase to change settlement occupation to true
  addCity() { } // Query Firebase to change city occupation to true
  getNeighbors() { } // Query Firebase to get neighbors; consider hardcoding?
  isOccupied() { } // Query Firebase to see if city or settlement exists

  render() {

    const { id, x, y, color, type } = this.props;
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
        onClick={this.handleClick}
      />
    );
  }
}

export default Intersection;
