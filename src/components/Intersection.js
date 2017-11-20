import React, { Component } from "react";
import { Layer, Circle } from "react-konva";

class Intersection extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("You clicked on intersection", this.props.id);
  }
  
  addSettlement() {} // Query Firebase to change settlement occupation to true
  addCity() {} // Query Firebase to change city occupation to true
  getNeighbors() {} // Query Firebase to get neighbors; consider hardcoding?
  isOccupied() {} // Query Firebase to see if city or settlement exists
  	
  render() {
    const { x, y } = this.props;
    return (
      <Circle
        x={x}
        y={y}
        radius={10}
        fill={"black"}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

export default Intersection;
