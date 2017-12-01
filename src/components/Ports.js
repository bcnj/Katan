import React, { Component } from 'react'
import { Image } from 'react-konva'

import Wheat from '../images/wheat.jpg'
import Wood from '../images/wood.jpg'
import Brick from '../images/brick.jpg'
import Ore from '../images/ore.jpg'
import Sheep from '../images/sheep.jpg'
import ThreeForOne from '../images/threeForOne.png'

class Port extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const wheat = new window.Image()
    const wood = new window.Image()
    const brick = new window.Image()
    const ore = new window.Image()
    const sheep = new window.Image()
    const threeForOne = new window.Image()

    wheat.src = Wheat
    wood.src = Wood
    brick.src = Brick
    ore.src = Ore
    sheep.src = Sheep
    threeForOne.src = ThreeForOne

    wheat.onload = () => {
      this.setState({
        wheat,
        wood,
        brick,
        ore,
        sheep,
        threeForOne
      })
    }
  }

  render() {
    const ids = {
      threeForOne: {
        img: this.state.threeForOne
      },
      wheat: {
        img: this.state.wheat
      },
      ore: {
        img: this.state.ore
      },
      wood: {
        img: this.state.wood
      },
      brick: {
        img: this.state.brick
      },
      sheep: {
        img: this.state.sheep
      }
    }

    const { id, x, y, rotation } = this.props

    return (
      <Image
        x={x}
        y={y}
        rotation={rotation}
        height={45}
        width={45}
        image={ids[id]['img']}
      />
    )
  }
}

export default Port
