import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import assert from 'assert'

import ButtonLink from '../components/UIKit/ButtonLink'
import IconButton from '../components/UIKit/IconButton'

configure({ adapter: new Adapter() })

// A dumb test to get started
describe('<ButtonLink />', () => {
  it('Renders one <IconButton />', () => {
    const wrapper = shallow(<ButtonLink text="foo" />)
    assert.equal(wrapper.find(IconButton).length, 1)
  })
})
