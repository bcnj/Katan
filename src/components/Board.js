import React, { Component } from "react";
import Tile from "./Tile";
import Intersection from "./Intersection";
import Road from "./Road";
import Number from "./Number";
import { Layer, Rect, Stage, Group, RegularPolygon, Circle } from "react-konva";

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
          x: 250,
          y: 95
        },
        {
          x: 350,
          y: 95
        },
        {
          x: 450,
          y: 95
        },

        {
          x: 200,
          y: 120
        },
        {
          x: 300,
          y: 120
        },
        {
          x: 400,
          y: 120
        },
        {
          x: 500,
          y: 120
        },

        {
          x: 200,
          y: 180
        },
        {
          x: 300,
          y: 180
        },
        {
          x: 400,
          y: 180
        },
        {
          x: 500,
          y: 180
        },

        {
          x: 150,
          y: 205
        },
        {
          x: 250,
          y: 205
        },
        {
          x: 350,
          y: 205
        },
        {
          x: 450,
          y: 205
        },
        {
          x: 550,
          y: 205
        },

        {
          x: 150,
          y: 265
        },
        {
          x: 250,
          y: 265
        },
        {
          x: 350,
          y: 265
        },
        {
          x: 450,
          y: 265
        },
        {
          x: 550,
          y: 265
        },
        {
          x: 100,
          y: 290
        },
        {
          x: 200,
          y: 290
        },
        {
          x: 300,
          y: 290
        },
        {
          x: 400,
          y: 290
        },
        {
          x: 500,
          y: 290
        },
        {
          x: 600,
          y: 290
        },

        {
          x: 100,
          y: 350
        },
        {
          x: 200,
          y: 350
        },
        {
          x: 300,
          y: 350
        },
        {
          x: 400,
          y: 350
        },
        {
          x: 500,
          y: 350
        },
        {
          x: 600,
          y: 350
        },

        {
          x: 150,
          y: 375
        },
        {
          x: 250,
          y: 375
        },
        {
          x: 350,
          y: 375
        },
        {
          x: 450,
          y: 375
        },
        {
          x: 550,
          y: 375
        },

        {
          x: 150,
          y: 435
        },
        {
          x: 250,
          y: 435
        },
        {
          x: 350,
          y: 435
        },
        {
          x: 450,
          y: 435
        },
        {
          x: 550,
          y: 435
        },

        {
          x: 200,
          y: 460
        },
        {
          x: 300,
          y: 460
        },
        {
          x: 400,
          y: 460
        },
        {
          x: 500,
          y: 460
        },

        {
          x: 200,
          y: 520
        },
        {
          x: 300,
          y: 520
        },
        {
          x: 400,
          y: 520
        },
        {
          x: 500,
          y: 520
        },

        {
          x: 250,
          y: 545
        },
        {
          x: 350,
          y: 545
        },
        {
          x: 450,
          y: 545
        }
      ],
      roads: [
        {
          x: 225,
          y: 107.5,
          rotation: 60
        },

        {
          x: 275,
          y: 107.5,
          rotation: -60
        },

        {
          x: 325,
          y: 107.5,
          rotation: 60
        },

        {
          x: 375,
          y: 107.5,
          rotation: -60
        },

        {
          x: 425,
          y: 107.5,
          rotation: 60
        },

        {
          x: 475,
          y: 107.5,
          rotation: -60
        },

        {
          x: 200,
          y: 150
        },
        {
          x: 300,
          y: 150
        },
        {
          x: 400,
          y: 150
        },
        {
          x: 500,
          y: 150
        },

        {
          x: 225,
          y: 192.5,
          rotation: -60
        },

        {
          x: 175,
          y: 192.5,
          rotation: 60
        },

        {
          x: 325,
          y: 192.5,
          rotation: -60
        },

        {
          x: 275,
          y: 192.5,
          rotation: 60
        },

        {
          x: 425,
          y: 192.5,
          rotation: -60
        },

        {
          x: 375,
          y: 192.5,
          rotation: 60
        },

        {
          x: 525,
          y: 192.5,
          rotation: -60
        },

        {
          x: 475,
          y: 192.5,
          rotation: 60
        },

        {
          x: 150,
          y: 235
        },
        {
          x: 250,
          y: 235
        },
        {
          x: 350,
          y: 235
        },
        {
          x: 450,
          y: 235
        },
        {
          x: 550,
          y: 235
        },

        {
          x: 125,
          y: 277.5,
          rotation: 60
        },

        {
          x: 175,
          y: 277.5,
          rotation: -60
        },

        {
          x: 225,
          y: 277.5,
          rotation: 60
        },

        {
          x: 275,
          y: 277.5,
          rotation: -60
        },

        {
          x: 325,
          y: 277.5,
          rotation: 60
        },

        {
          x: 375,
          y: 277.5,
          rotation: -60
        },

        {
          x: 425,
          y: 277.5,
          rotation: 60
        },

        {
          x: 475,
          y: 277.5,
          rotation: -60
        },

        {
          x: 525,
          y: 277.5,
          rotation: 60
        },

        {
          x: 575,
          y: 277.5,
          rotation: -60
        },

        {
          x: 100,
          y: 320
        },
        {
          x: 200,
          y: 320
        },
        {
          x: 300,
          y: 320
        },
        {
          x: 400,
          y: 320
        },
        {
          x: 500,
          y: 320
        },
        {
          x: 600,
          y: 320
        },

        {
          x: 125,
          y: 362.5,
          rotation: -60
        },

        {
          x: 175,
          y: 362.5,
          rotation: 60
        },

        {
          x: 225,
          y: 362.5,
          rotation: -60
        },

        {
          x: 275,
          y: 362.5,
          rotation: 60
        },

        {
          x: 325,
          y: 362.5,
          rotation: -60
        },

        {
          x: 375,
          y: 362.5,
          rotation: 60
        },

        {
          x: 425,
          y: 362.5,
          rotation: -60
        },

        {
          x: 475,
          y: 362.5,
          rotation: 60
        },

        {
          x: 525,
          y: 362.5,
          rotation: -60
        },

        {
          x: 575,
          y: 362.5,
          rotation: 60
        },

        {
          x: 150,
          y: 405
        },
        {
          x: 250,
          y: 405
        },
        {
          x: 350,
          y: 405
        },
        {
          x: 450,
          y: 405
        },
        {
          x: 550,
          y: 405
        },

        {
          x: 175,
          y: 447.5,
          rotation: -60
        },

        {
          x: 225,
          y: 447.5,
          rotation: 60
        },

        {
          x: 275,
          y: 447.5,
          rotation: -60
        },

        {
          x: 325,
          y: 447.5,
          rotation: 60
        },

        {
          x: 375,
          y: 447.5,
          rotation: -60
        },

        {
          x: 425,
          y: 447.5,
          rotation: 60
        },

        {
          x: 475,
          y: 447.5,
          rotation: -60
        },

        {
          x: 525,
          y: 447.5,
          rotation: 60
        },

        {
          x: 200,
          y: 490
        },
        {
          x: 300,
          y: 490
        },
        {
          x: 400,
          y: 490
        },
        {
          x: 500,
          y: 490
        },

        {
          x: 225,
          y: 532.5,
          rotation: -60
        },

        {
          x: 275,
          y: 532.5,
          rotation: 60
        },

        {
          x: 325,
          y: 532.5,
          rotation: -60
        },

        {
          x: 375,
          y: 532.5,
          rotation: 60
        },

        {
          x: 425,
          y: 532.5,
          rotation: -60
        },

        {
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
    let props = this.props.props
    return this.state.tiles.map(function (tile) {
      const { id, x, y, resourceType } = tile;
      return <Tile props={props} id={id} x={x} y={y} resourceType={resourceType} />;
    });
  }
  renderIntersections() {
    return this.state.intersections.map(function (intersection, idx) {
      const { x, y } = intersection;
      return <Intersection x={x} y={y} id={idx} />;
    });
  }
  renderRoads() {
    return this.state.roads.map(function (roads, idx) {
      const { x, y } = roads;
      const rotation = roads.rotation || "";
      return <Road x={x} y={y} rotation={rotation} id={idx} />;
    });
  }
  renderNumbers() {
    return this.state.numbers.map(function (number) {
      const { id, x, y } = number;
      return <Number id={id} x={x} y={y} />;
    });
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
        <Layer>
          {this.renderTiles()}
          {this.renderRoads()}
          {this.renderIntersections()}
          {this.renderNumbers()}
        </Layer>
      </Stage>
    );
  }
}

export default Board;
