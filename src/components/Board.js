import React, { Component } from "react";
import { connect } from 'react-redux'
import Tile from "./Tile";
import Intersection from "./Intersection";
import Road from "./Road";
import Number from "./Number";
import RobberPiece from "./RobberImg";
import { Layer, Stage } from "react-konva";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [
        {
          id: 1,
          x: 250,
          y: 150,
          resourceType: "ore"
        },
        {
          id: 2,
          x: 350,
          y: 150,
          resourceType: "sheep"
        },
        {
          id: 3,
          x: 450,
          y: 150,
          resourceType: "wood"
        },
        {
          id: 4,
          x: 200,
          y: 235,
          resourceType: "wheat"
        },

        {
          id: 5,
          x: 300,
          y: 235,
          resourceType: "brick"
        },
        {
          id: 6,
          x: 400,
          y: 235,
          resourceType: "sheep"
        },
        {
          id: 7,
          x: 500,
          y: 235,
          resourceType: "brick"
        },
        {
          id: 8,
          x: 150,
          y: 320,
          resourceType: "wheat"
        },
        {
          id: 9,
          x: 250,
          y: 320,
          resourceType: "wood"
        },

        {
          id: 10,
          x: 350,
          y: 320,
          resourceType: "desert"
        },
        {
          id: 11,
          x: 450,
          y: 320,
          resourceType: "wood"
        },
        {
          id: 12,
          x: 550,
          y: 320,
          resourceType: "ore"
        },
        {
          id: 13,
          x: 200,
          y: 405,
          resourceType: "wood"
        },
        {
          id: 14,
          x: 300,
          y: 405,
          resourceType: "ore"
        },

        {
          id: 15,
          x: 400,
          y: 405,
          resourceType: "wheat"
        },
        {
          id: 16,
          x: 500,
          y: 405,
          resourceType: "sheep"
        },
        {
          id: 17,
          x: 250,
          y: 490,
          resourceType: "brick"
        },
        {
          id: 18,
          x: 350,
          y: 490,
          resourceType: "wheat"
        },
        {
          id: 19,
          x: 450,
          y: 490,
          resourceType: "sheep"
        }
      ],
      intersections: [
        {
          idx: 1,
          x: 250,
          y: 95
        },
        {
          idx: 2,
          x: 350,
          y: 95
        },
        {
          idx: 3,
          x: 450,
          y: 95
        },

        {
          idx: 4,
          x: 200,
          y: 120
        },
        {
          idx: 5,
          x: 300,
          y: 120
        },
        {
          idx: 6,
          x: 400,
          y: 120
        },
        {
          idx: 7,
          x: 500,
          y: 120
        },

        {
          idx: 8,
          x: 200,
          y: 180
        },
        {
          idx: 9,
          x: 300,
          y: 180
        },
        {
          idx: 10,
          x: 400,
          y: 180
        },
        {
          idx: 11,
          x: 500,
          y: 180
        },

        {
          idx: 12,
          x: 150,
          y: 205
        },
        {
          idx: 13,
          x: 250,
          y: 205
        },
        {
          idx: 14,
          x: 350,
          y: 205
        },
        {
          idx: 15,
          x: 450,
          y: 205
        },
        {
          idx: 16,
          x: 550,
          y: 205
        },

        {
          idx: 17,
          x: 150,
          y: 265
        },
        {
          idx: 18,
          x: 250,
          y: 265
        },
        {
          idx: 19,
          x: 350,
          y: 265
        },
        {
          idx: 20,
          x: 450,
          y: 265
        },
        {
          idx: 21,
          x: 550,
          y: 265
        },
        {
          idx: 22,
          x: 100,
          y: 290
        },
        {
          idx: 23,
          x: 200,
          y: 290
        },
        {
          idx: 24,
          x: 300,
          y: 290
        },
        {
          idx: 25,
          x: 400,
          y: 290
        },
        {
          idx: 26,
          x: 500,
          y: 290
        },
        {
          idx: 27,
          x: 600,
          y: 290
        },

        {
          idx: 28,
          x: 100,
          y: 350
        },
        {
          idx: 29,
          x: 200,
          y: 350
        },
        {
          idx: 30,
          x: 300,
          y: 350
        },
        {
          idx: 31,
          x: 400,
          y: 350
        },
        {
          idx: 32,
          x: 500,
          y: 350
        },
        {
          idx: 33,
          x: 600,
          y: 350
        },

        {
          idx: 34,
          x: 150,
          y: 375
        },
        {
          idx: 35,
          x: 250,
          y: 375
        },
        {
          idx: 36,
          x: 350,
          y: 375
        },
        {
          idx: 37,
          x: 450,
          y: 375
        },
        {
          idx: 38,
          x: 550,
          y: 375
        },

        {
          idx: 39,
          x: 150,
          y: 435
        },
        {
          idx: 40,
          x: 250,
          y: 435
        },
        {
          idx: 41,
          x: 350,
          y: 435
        },
        {
          idx: 42,
          x: 450,
          y: 435
        },
        {
          idx: 43,
          x: 550,
          y: 435
        },

        {
          idx: 44,
          x: 200,
          y: 460
        },
        {
          idx: 45,
          x: 300,
          y: 460
        },
        {
          idx: 46,
          x: 400,
          y: 460
        },
        {
          idx: 47,
          x: 500,
          y: 460
        },

        {
          idx: 48,
          x: 200,
          y: 520
        },
        {
          idx: 49,
          x: 300,
          y: 520
        },
        {
          idx: 50,
          x: 400,
          y: 520
        },
        {
          idx: 51,
          x: 500,
          y: 520
        },

        {
          idx: 52,
          x: 250,
          y: 545
        },
        {
          idx: 53,
          x: 350,
          y: 545
        },
        {
          idx: 54,
          x: 450,
          y: 545
        }
      ],
      roads: [
        {
          idx: 1,
          x: 225,
          y: 107.5,
          rotation: 60
        },

        {
          idx: 2,
          x: 275,
          y: 107.5,
          rotation: -60
        },

        {
          idx: 3,
          x: 325,
          y: 107.5,
          rotation: 60
        },

        {
          idx: 4,
          x: 375,
          y: 107.5,
          rotation: -60
        },

        {
          idx: 5,
          x: 425,
          y: 107.5,
          rotation: 60
        },

        {
          idx: 6,
          x: 475,
          y: 107.5,
          rotation: -60
        },

        {
          idx: 7,
          x: 200,
          y: 150
        },
        {
          idx: 8,
          x: 300,
          y: 150
        },
        {
          idx: 9,
          x: 400,
          y: 150
        },
        {
          idx: 10,
          x: 500,
          y: 150
        },

        {
          idx: 11,
          x: 175,
          y: 192.5,
          rotation: 60
        },
        {
          idx: 12,
          x: 225,
          y: 192.5,
          rotation: -60
        },

        {
          idx: 13,
          x: 275,
          y: 192.5,
          rotation: 60
        },

        {
          idx: 14,
          x: 325,
          y: 192.5,
          rotation: -60
        },

        {
          idx: 15,
          x: 375,
          y: 192.5,
          rotation: 60
        },

        {
          idx: 16,
          x: 425,
          y: 192.5,
          rotation: -60
        },

        {
          idx: 17,
          x: 475,
          y: 192.5,
          rotation: 60
        },

        {
          idx: 18,
          x: 525,
          y: 192.5,
          rotation: -60
        },


        {
          idx: 19,
          x: 150,
          y: 235
        },
        {
          idx: 20,
          x: 250,
          y: 235
        },
        {
          idx: 21,
          x: 350,
          y: 235
        },
        {
          idx: 22,
          x: 450,
          y: 235
        },
        {
          idx: 23,
          x: 550,
          y: 235
        },

        {
          idx: 24,
          x: 125,
          y: 277.5,
          rotation: 60
        },

        {
          idx: 25,
          x: 175,
          y: 277.5,
          rotation: -60
        },

        {
          idx: 26,
          x: 225,
          y: 277.5,
          rotation: 60
        },

        {
          idx: 27,
          x: 275,
          y: 277.5,
          rotation: -60
        },

        {
          idx: 28,
          x: 325,
          y: 277.5,
          rotation: 60
        },

        {
          idx: 29,
          x: 375,
          y: 277.5,
          rotation: -60
        },

        {
          idx: 30,
          x: 425,
          y: 277.5,
          rotation: 60
        },

        {
          idx: 31,
          x: 475,
          y: 277.5,
          rotation: -60
        },

        {
          idx: 32,
          x: 525,
          y: 277.5,
          rotation: 60
        },

        {
          idx: 33,
          x: 575,
          y: 277.5,
          rotation: -60
        },

        {
          idx: 34,
          x: 100,
          y: 320
        },
        {
          idx: 35,
          x: 200,
          y: 320
        },
        {
          idx: 36,
          x: 300,
          y: 320
        },
        {
          idx: 37,
          x: 400,
          y: 320
        },
        {
          idx: 38,
          x: 500,
          y: 320
        },
        {
          idx: 39,
          x: 600,
          y: 320
        },

        {
          idx: 40,
          x: 125,
          y: 362.5,
          rotation: -60
        },

        {
          idx: 41,
          x: 175,
          y: 362.5,
          rotation: 60
        },

        {
          idx: 42,
          x: 225,
          y: 362.5,
          rotation: -60
        },

        {
          idx: 43,
          x: 275,
          y: 362.5,
          rotation: 60
        },

        {
          idx: 44,
          x: 325,
          y: 362.5,
          rotation: -60
        },

        {
          idx: 45,
          x: 375,
          y: 362.5,
          rotation: 60
        },

        {
          idx: 46,
          x: 425,
          y: 362.5,
          rotation: -60
        },

        {
          idx: 47,
          x: 475,
          y: 362.5,
          rotation: 60
        },

        {
          idx: 48,
          x: 525,
          y: 362.5,
          rotation: -60
        },

        {
          idx: 49,
          x: 575,
          y: 362.5,
          rotation: 60
        },

        {
          idx: 50,
          x: 150,
          y: 405
        },
        {
          idx: 51,
          x: 250,
          y: 405
        },
        {
          idx: 52,
          x: 350,
          y: 405
        },
        {
          idx: 53,
          x: 450,
          y: 405
        },
        {
          idx: 54,
          x: 550,
          y: 405
        },

        {
          idx: 55,
          x: 175,
          y: 447.5,
          rotation: -60
        },

        {
          idx: 56,
          x: 225,
          y: 447.5,
          rotation: 60
        },

        {
          idx: 57,
          x: 275,
          y: 447.5,
          rotation: -60
        },

        {
          idx: 58,
          x: 325,
          y: 447.5,
          rotation: 60
        },

        {
          idx: 59,
          x: 375,
          y: 447.5,
          rotation: -60
        },

        {
          idx: 60,
          x: 425,
          y: 447.5,
          rotation: 60
        },

        {
          idx: 61,
          x: 475,
          y: 447.5,
          rotation: -60
        },

        {
          idx: 62,
          x: 525,
          y: 447.5,
          rotation: 60
        },

        {
          idx: 63,
          x: 200,
          y: 490
        },
        {
          idx: 64,
          x: 300,
          y: 490
        },
        {
          idx: 65,
          x: 400,
          y: 490
        },
        {
          idx: 66,
          x: 500,
          y: 490
        },

        {
          idx: 67,
          x: 225,
          y: 532.5,
          rotation: -60
        },

        {
          idx: 68,
          x: 275,
          y: 532.5,
          rotation: 60
        },

        {
          idx: 69,
          x: 325,
          y: 532.5,
          rotation: -60
        },

        {
          idx: 70,
          x: 375,
          y: 532.5,
          rotation: 60
        },

        {
          idx: 71,
          x: 425,
          y: 532.5,
          rotation: -60
        },

        {
          idx: 72,
          x: 475,
          y: 532.5,
          rotation: 60
        }
      ],
      numbers: [
        {
          id: 'A',
          x: 250,
          y: 150,
        },
        {
          id: 'B',
          x: 350,
          y: 150,
        },
        {
          id: 'C',
          x: 450,
          y: 150,
        },
        {
          id: 'D',
          x: 200,
          y: 235,
        },

        {
          id: 'E',
          x: 300,
          y: 235,
        },
        {
          id: 'F',
          x: 400,
          y: 235,
        },
        {
          id: 'G',
          x: 500,
          y: 235,
        },
        {
          id: 'H',
          x: 150,
          y: 320,
        },
        {
          id: 'I',
          x: 250,
          y: 320,
        },
        // this is the desert tile
        // {
        //   id: 'J',
        //   x: 350,
        //   y: 320,

        // },
        {
          id: 'J',
          x: 450,
          y: 320,
        },
        {
          id: 'K',
          x: 550,
          y: 320,
        },
        {
          id: 'L',
          x: 200,
          y: 405,
        },
        {
          id: 'M',
          x: 300,
          y: 405,
        },

        {
          id: 'N',
          x: 400,
          y: 405,
        },
        {
          id: 'O',
          x: 500,
          y: 405,
        },
        {
          id: 'P',
          x: 250,
          y: 490,
        },
        {
          id: 'Q',
          x: 350,
          y: 490,
        },
        {
          id: 'R',
          x: 450,
          y: 490,
        }],
        robber:{
          id:null,
          x: 335,
          y: 300
        },
      currentPlayer: null,
      players: [],
      active: true,
      diceRoll: null
    };
    this.renderTiles = this.renderTiles.bind(this)
  }

  endGame() { }
  rollDice() { }
  setCurrentPlayer() { }
  getAllPlayers() { }

  handleWheel(thisEvent, thisStage) {
    let e = thisEvent.evt;
    let stage = thisStage._stage;
    var scaleBy = 1.03;
    e.preventDefault();

    var oldScale = stage.scaleX();

    var mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });

    var newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    };
    stage.position(newPos);
    stage.batchDraw();
  }

  renderTiles() {
    let robberBuild = this.props.robberBuild
    return this.state.tiles.map(function (tile) {
      const { id, x, y, resourceType } = tile;
      return <Tile robberBuild={robberBuild} id={id} x={x} y={y} resourceType={resourceType} key={id}/>;
    });
  }
  renderIntersections(intersectionNodes,  currentGame, gameId) {
    return this.state.intersections.map(function (intersection) {
      const { idx, x, y } = intersection;
      let color;
      let type;

      if (intersectionNodes[idx].player === '0') { color = 'transparent' };

      if (intersectionNodes[idx].player === 'player1' && intersectionNodes[idx].city === true) { color = 'red'; type = 'city' }
      else if (intersectionNodes[idx].player === 'player1') { color = 'red'; type = 'settlement' }

      if (intersectionNodes[idx].player === 'player2' && intersectionNodes[idx].city === true) { color = 'white'; type = 'city' }
      else if (intersectionNodes[idx].player === 'player2') { color = 'white'; type = 'settlement' }

      if (intersectionNodes[idx].player === 'player3' && intersectionNodes[idx].city === true) { color = 'green'; type = 'city' }
      else if (intersectionNodes[idx].player === 'player3') { color = 'green'; type = 'settlement' }

      if (intersectionNodes[idx].player === 'player4' && intersectionNodes[idx].city === true) { color = 'blue'; type = 'city' }
      else if (intersectionNodes[idx].player === 'player4') { color = 'blue'; type = 'settlement' }

      return <Intersection key={idx} x={x} y={y} id={idx} color={color} type={type}  gameId={gameId} currentGame={currentGame}/>;
    });
  }
  renderRoads(roadNodes, currentGame, gameId) {

    return this.state.roads.map(function (roads) {

      const { x, y, idx } = roads;
      let color;

      if (roadNodes[idx].player === '0') { color = 'transparent' };
      if (roadNodes[idx].player === 'player1') { color = 'red' };
      if (roadNodes[idx].player === 'player2') { color = 'white' };
      if (roadNodes[idx].player === 'player3') { color = 'green' };
      if (roadNodes[idx].player === 'player4') { color = 'blue' };

      const rotation = roads.rotation || "";
      return <Road key={idx} x={x} y={y} rotation={rotation} id={idx} color={color} gameId={gameId} currentGame={currentGame} />;
    });
  }
  renderNumbers() {
    return this.state.numbers.map(function (number) {
      const { id, x, y } = number;
      return <Number key={id} id={id} x={x} y={y} />;
    });
  }
  renderRobber(){
    const { id, x, y} = this.state.robber;
    return <RobberPiece key={id} x={x} y={y} />;
  }

  componentDidMount() {
    let tileCoords = {},
    robberId = parseInt(this.props.currentGame.game.robber)
    this.state.tiles.forEach((tile) => {
      if(tile.id === robberId) {
        tileCoords.x = tile.x+10
        tileCoords.y = tile.y-20
      }
    })
    this.setState({
      robber: {
        id: robberId,
        x: tileCoords.x,
        y: tileCoords.y
      }
    })
  }

  render() {

    return (
      <Stage
        ref={thisStage => {
          this.stage = thisStage;
        }}
        onWheel={e => {
          this.handleWheel(e, this.stage);
        }}
        width={700}
        height={700}
        draggable={true}
      >
        {this.props.currentGame.roadNodes && this.props.currentGame.intersectionNodes &&
          <Layer>
            {this.renderTiles()}
            {this.renderRoads(this.props.currentGame.roadNodes, this.props.currentGame, this.props.gameId)}
            {this.renderIntersections(this.props.currentGame.intersectionNodes,this.props.currentGame, this.props.gameId )}
            {this.renderNumbers()}
            {this.renderRobber()}
          </Layer>
        }

      </Stage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentGame: state.currentGame
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    //
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
