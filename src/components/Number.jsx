import React, { Component } from "react";
import { Layer, Circle, Image } from "react-konva";

// import A from '../images/field.png';
// import B from '../images/desert.png';
// import C from '../images/forest.png';
// import D from '../images/hill.png';
// import E from '../images/mountain.png';
// import F from '../images/pasture.png';
// import G from '../images/field.png';
// import H from '../images/desert.png';
// import I from '../images/forest.png';
// import J from '../images/hill.png';
// import K from '../images/mountain.png';
// import L from '../images/pasture.png';
// import M from '../images/pasture.png';
// import N from '../images/field.png';
// import O from '../images/desert.png';
// import P from '../images/forest.png';
// import Q from '../images/hill.png';
// import R from '../images/mountain.png';
// import S from '../images/pasture.png';

class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const A = new window.Image();
    const B = new window.Image();
    const C = new window.Image();
    const D = new window.Image();
    const E = new window.Image();
    const F = new window.Image();
    const G = new window.Image();
    const H = new window.Image();
    const I = new window.Image();
    const J = new window.Image();
    const K = new window.Image();
    const L = new window.Image();
    const M = new window.Image();
    const N = new window.Image();
    const O = new window.Image();
    const P = new window.Image();
    const Q = new window.Image();
    const R = new window.Image();
    const S = new window.Image();

    A.src = A;
    B.src = B;
    C.src = C;
    D.src = D;
    E.src = E;
    F.src = F;
    G.src = G;
    H.src = H;
    I.src = I;
    J.src = J;
    K.src = K;
    L.src = L;
    M.src = M;
    N.src = N;
    O.src = O;
    P.src = P;
    Q.src = Q;
    R.src = R;
    S.src = S;


    A.onload = () => {
      this.setState({
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
      });
    };
  }

  render() {

    const ids = {
      A: {
        img: this.state.A,
        // stroke: '#ffde66'
      },
      B: {
        img: this.state.B,
        // stroke: '#672d25'
      },
      C: {
        img: this.state.C,
        // stroke: '#062916'
      },
      D: {
        img: this.state.D,
        // stroke: '#4d0a01'
      },
      E: {
        img: this.state.E,
        // stroke: '#534f4b'
      },
      F: {
        img: this.state.F,
        // stroke: '#a9d751'
      },
      G: {
        img: this.state.G,
        // stroke: '#ffde66'
      },
      H: {
        img: this.state.H,
        // stroke: '#672d25'
      },
      I: {
        img: this.state.I,
        // stroke: '#062916'
      },
      J: {
        img: this.state.J,
        // stroke: '#4d0a01'
      },
      K: {
        img: this.state.K,
        // stroke: '#534f4b'
      },
      L: {
        img: this.state.L,
        // stroke: '#a9d751'
      },
      M: {
        img: this.state.M,
        // stroke: '#a9d751'
      },
      N: {
        img: this.state.N,
        // stroke: '#a9d751'
      },
      O: {
        img: this.state.O,
        // stroke: '#a9d751'
      },
      P: {
        img: this.state.P,
        // stroke: '#a9d751'
      },
      Q: {
        img: this.state.Q,
        // stroke: '#a9d751'
      },
      R: {
        img: this.state.R,
        // stroke: '#a9d751'
      },
      S: {
        img: this.state.S,
        // stroke: '#a9d751'
      }
    }

    const { id, x, y } = this.props;

    return (
      <Circle
        x={x}
        y={y}
        radius={20}
        // fill={"black"}
        shadowBlur={5}
        fillPatternImage={ids[id].img}
      // fillPatternScale={{ x: 0.07, y: 0.07 }}
      // fillPatternOffset={{ x: -1020, y: -820 }}
      />
    );
  }
}

export default Number;
