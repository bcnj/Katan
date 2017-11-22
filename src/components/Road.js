import React, { Component } from "react";
import { Ellipse, Text } from "react-konva";

class Road extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      // console.log('Clicked on road', this.props.id)
  }

  render() {
    const { x, y, rotation, id, color } = this.props;
    return (
      // <Ellipse
      //   x={x}
      //   y={y}
      //   width={10}
      //   height={35}
      //   rotation={rotation}
      //   fill={color} // Pull in color depending on game current player
      //   shadowBlur={5}
      //   onClick={this.handleClick}
      // />
      <Text
      x={x}
      y={y}
      width={15}
      height={35}
      fontSize={10}
      text={id}
      // rotation={rotation}
      // fill={color} // Pull in color depending on game current player
      // shadowBlur={5}
      // onClick={this.handleClick}
    />
    );
  }
}

export default Road;
