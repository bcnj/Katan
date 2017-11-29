import { configure, mount, render, shallow } from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { Lobby } from '../Lobby'
configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  shallow(<Lobby />)
})
