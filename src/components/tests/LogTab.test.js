import { configure, mount, render, shallow, contain } from 'enzyme'
// import chai from 'chai'
// import chaiEnzyme from 'chai-enzyme'
import { expect } from 'chai'

import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import LogTab from '../LogTab.jsx'
configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  shallow(<LogTab />)
})

it('should contain 1 child', () => {
  const wrapper = shallow(<LogTab />)
  expect(wrapper.length).to.be.equal(1)
})

it('should contain a Segment', () => {
  const wrapper = shallow(<LogTab />)
  expect(wrapper).to.contain(Segment)
})