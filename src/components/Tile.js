import React, { Component } from "react";
import { Layer, Rect, Stage, Group, RegularPolygon, Image } from "react-konva";
import Wheat from "../images/field.png";
import Desert from '../images/desert.png';
import Wood from '../images/forest.png';
import Brick from '../images/hill.png';
import Ore from '../images/mountain.png';
import Sheep from '../images/pasture.png';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this); // For testing
  }

  componentDidMount() {
    const wheat = new window.Image();
    const desert = new window.Image();
    const wood = new window.Image();
    const brick = new window.Image();
    const ore = new window.Image();
    const sheep = new window.Image();
    wheat.src = Wheat;
    desert.src = Desert;
    wood.src = Wood;
    brick.src = Brick;
    ore.src = Ore;
    sheep.src = Sheep;
    wheat.onload = () => {
      this.setState({
        wheat,
        desert,
        wood,
        brick,
        ore,
        sheep
      });
    };
  }


  addSettlement() {} // Adds city to intersection
  addCity() {} // Adds city to intersection
  getNeighbors() {} // Returns an array of player ID's
  isOccupied() {} // Returns BOOL

  handleClick() {
    console.log("Clicked on tile", this.props.id);
  }

  render() {

    const resources = {
      wheat: {
        img: this.state.wheat,
        stroke: '#ffde66'
      },
      desert: {
        img: this.state.desert,
        stroke: '#672d25'
      },
      wood: {
        img: this.state.wood,
        stroke: '#062916'
      },
      brick: {
        img: this.state.brick,
        stroke: '#4d0a01'
      },
      ore: {
        img: this.state.ore,
        stroke: '#534f4b'
      },
      sheep: {
        img: this.state.sheep,
        stroke: '#a9d751'
      }
    }
    console.log("Intersection");
    const { x, y, resourceType } = this.props;
    console.log("this.state", this.state);
    console.log(this.props)
    return (
      <RegularPolygon
        stroke={resources[resourceType]['stroke']}
        strokeWidth={30}
        x={x}
        y={y}
        sides={6}
        radius={50}
        fillPatternImage={resources[resourceType]['img']}
        fillPatternScale={{ x: 0.07, y: 0.07 }}
        fillPatternOffset={{ x: -1020, y: -820 }}
        onClick={this.handleClick}
      />
    );
  }
}

export default Tile;
