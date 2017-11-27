import ReactKonva from 'react-konva'
import Robber from '../images/robber.png'
import React, { Component } from 'react'

class RobberPiece extends Component {
  constructor(props) {
    super(props)
    this.state = {
      robber: null
    }
  }

  componentDidMount() {
    const robber = new window.Image()
    robber.src = Robber
    robber.onload = () => {
      this.setState({
        robber
      })
    }
  }

  render() {

    /* draggable="true" definitely a stretch goal*/
    const { x, y } = this.props
    return (
      <ReactKonva.Image
        x={x}
        y={y}
        height={50}
        width={25}
        image={this.state.robber}
      />
    )
  }
}

export default RobberPiece
