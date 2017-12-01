import React, { Component } from 'react'
import { RegularPolygon } from 'react-konva'
import Wheat from '../images/field.png'
import Desert from '../images/desert.png'
import Wood from '../images/forest.png'
import Brick from '../images/hill.png'
import Ore from '../images/mountain.png'
import Sheep from '../images/pasture.png'
import Water from '../images/sea.png'


class Tile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this) // For testing
  }

  componentDidMount() {
    const wheat = new window.Image()
    const desert = new window.Image()
    const wood = new window.Image()
    const brick = new window.Image()
    const ore = new window.Image()
    const sheep = new window.Image()
    const water = new window.Image()

    wheat.src = Wheat
    desert.src = Desert
    wood.src = Wood
    brick.src = Brick
    ore.src = Ore
    sheep.src = Sheep
    water.src = Water

    wheat.onload = () => {
      this.setState({
        wheat,
        desert,
        wood,
        brick,
        ore,
        sheep,
        water
      })
    }
  }

  handleClick(event) {
    console.log(this.props.id)
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
      ,
      water: {
        img: this.state.water,
        stroke: '#062916'
      }
    }
    const { x, y, resourceType } = this.props
    let radius

    if ( resourceType === 'water') { radius = 54 }
    else ( radius = 50 )

    return (
      <RegularPolygon
        stroke={resources[resourceType]['stroke']}
        strokeWidth={45}
        x={x}
        y={y}
        sides={6}
        radius={radius}
        fillPatternImage={resources[resourceType]['img']}
        fillPatternScale={{ x: 0.07, y: 0.07 }}
        fillPatternOffset={{ x: -1020, y: -820 }}
        onClick={this.handleClick}
      />
    )
  }
}

export default Tile
