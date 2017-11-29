import { configure, mount, render, shallow } from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import LogTab from '../LogTab'

configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  shallow(<LogTab />)
})
