import React, { Component } from "react";
import { Layer, Circle, Image } from "react-konva";

// import one from "../images/field.png";
// import two from '../images/desert.png';
// import three from '../images/forest.png';
// import four from '../images/hill.png';
// import five from '../images/mountain.png';
// import six from '../images/pasture.png';
// import seven from "../images/field.png";
// import eight from '../images/desert.png';
// import nine from '../images/forest.png';
// import ten from '../images/hill.png';
// import eleven from '../images/mountain.png';
// import twelve from '../images/pasture.png';

class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   const one = new window.Image();
  //   const two = new window.Image();
  //   const three = new window.Image();
  //   const ten = new window.Image();
  //   const five = new window.Image();
  //   const six = new window.Image();
  //   const seven = new window.Image();
  //   const eight = new window.Image();
  //   const nine = new window.Image();
  //   const ten = new window.Image();
  //   const eleven = new window.Image();
  //   const twelve = new window.Image();

  //   one.src = one;
  //   two.src = two;
  //   three.src = three;
  //   four.src = Brick;
  //   five.src = five;
  //   six.src = six;
  //   seven.src = seven;
  //   eight.src = eight;
  //   nine.src = nine;
  //   ten.src = Brick;
  //   eleven.src = eleven;
  //   twelve.src = twelve;

  //   wheat.onload = () => {
  //     this.setState({
  //       one,
  //       two,
  //       three,
  //       four,
  //       five,
  //       six,
  //       seven,
  //       eight,
  //       nine,
  //       ten,
  //       eleven,
  //       twelve
  //     });
  //   };
  // }

  render() {

    // const resources = {
    //   one: {
    //     img: this.state.one,
    //     stroke: '#ffde66'
    //   },
    //   two: {
    //     img: this.state.two,
    //     stroke: '#672d25'
    //   },
    //   three: {
    //     img: this.state.three,
    //     stroke: '#062916'
    //   },
    //   four: {
    //     img: this.state.four,
    //     stroke: '#4d0a01'
    //   },
    //   five: {
    //     img: this.state.five,
    //     stroke: '#534f4b'
    //   },
    //   six: {
    //     img: this.state.six,
    //     stroke: '#a9d751'
    //   },
    //   seven: {
    //     img: this.state.seven,
    //     stroke: '#ffde66'
    //   },
    //   eight: {
    //     img: this.state.eight,
    //     stroke: '#672d25'
    //   },
    //   nine: {
    //     img: this.state.nine,
    //     stroke: '#062916'
    //   },
    //   ten: {
    //     img: this.state.ten,
    //     stroke: '#4d0a01'
    //   },
    //   eleven: {
    //     img: this.state.eleven,
    //     stroke: '#534f4b'
    //   },
    //   twelve: {
    //     img: this.state.twelve,
    //     stroke: '#a9d751'
    //   }
    // }

    const { x, y } = this.props;

    return (
      <Circle
        x={x}
        y={y}
        radius={20}
        fill={"black"}
        shadowBlur={5}
        // fillPatternImage={resources[resourceType]['img']}
        // fillPatternScale={{ x: 0.07, y: 0.07 }}
        // fillPatternOffset={{ x: -1020, y: -820 }}
      />
    );
  }
}

export default Number;
