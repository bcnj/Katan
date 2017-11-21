import React, { Component } from "react";
import { Layer, Circle, Image } from "react-konva";

import Aimg from '../images/A.png';
import Bimg from '../images/B.png';
import Cimg from '../images/C.png';
import Dimg from '../images/D.png';
import Eimg from '../images/E.png';
import Fimg from '../images/F.png';
import Gimg from '../images/G.png';
import Himg from '../images/H.png';
import Iimg from '../images/I.png';
import Jimg from '../images/J.png';
import Kimg from '../images/K.png';
import Limg from '../images/L.png';
import Mimg from '../images/M.png';
import Nimg from '../images/N.png';
import Oimg from '../images/O.png';
import Pimg from '../images/P.png';
import Qimg from '../images/Q.png';
import Rimg from '../images/R.png';

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

    A.src = Aimg;
    B.src = Bimg;
    C.src = Cimg;
    D.src = Dimg;
    E.src = Eimg;
    F.src = Fimg;
    G.src = Gimg;
    H.src = Himg;
    I.src = Iimg;
    J.src = Jimg;
    K.src = Kimg;
    L.src = Limg;
    M.src = Mimg;
    N.src = Nimg;
    O.src = Oimg;
    P.src = Pimg;
    Q.src = Qimg;
    R.src = Rimg;

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
        R
      });
    };
  }

  render() {

    const ids = {
      A: {
        img: this.state.A,
      },
      B: {
        img: this.state.B,
      },
      C: {
        img: this.state.C,
      },
      D: {
        img: this.state.D,
      },
      E: {
        img: this.state.E,
      },
      F: {
        img: this.state.F,
      },
      G: {
        img: this.state.G,
      },
      H: {
        img: this.state.H,
      },
      I: {
        img: this.state.I,
      },
      J: {
        img: this.state.J,
      },
      K: {
        img: this.state.K,
      },
      L: {
        img: this.state.L,
      },
      M: {
        img: this.state.M,
      },
      N: {
        img: this.state.N,
      },
      O: {
        img: this.state.O,
      },
      P: {
        img: this.state.P,
      },
      Q: {
        img: this.state.Q,
      },
      R: {
        img: this.state.R,
      },
    }

    const { id, x, y } = this.props;

    return (
      <Circle
        x={x}
        y={y}
        radius={20}
        shadowBlur={5}
        fillPatternImage={ids[id]['img']}
        fillPatternScale={{ x: .15, y: .15 }}
        fillPatternOffset={{ x: -1110, y: -805 }}
      />
    );
  }
}

export default Number;
