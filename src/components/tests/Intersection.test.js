import { configure, mount, render, shallow, contain } from 'enzyme'
import { expect } from 'chai'

import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Intersection from '../Intersection.js'
configure({ adapter: new Adapter() })

const defaultProps = {
    id: 2,
    x: 300,
    y: 300,
    color: 'red',
    type: 'type',
    currentGame: {},
    gameId: 'id'
  };

it('renders without crashing', () => {
  shallow(<Intersection props={defaultProps}/>)
})
