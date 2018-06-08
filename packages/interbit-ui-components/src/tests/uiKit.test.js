import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import assert from 'assert'

import ButtonLink from '../components/UIKit/ButtonLink'
import CallToAction from '../components/UIKit/CallToAction'
import Card from '../components/UIKit/Card'
import ConnectingTo from '../components/UIKit/ConnectingTo'
import ContentBar from '../components/UIKit/ContentBar'
import IconButton from '../components/UIKit/IconButton'
import LinkWrapper from '../components/UIKit/LinkWrapper'
import placeholder from '../assets/placeholder.svg'

configure({ adapter: new Adapter() })

const countChildren = (parent, child, count) => {
  const wrapper = shallow(parent)
  assert.equal(wrapper.find(child).length, count)
}

describe('<ButtonLink />', () => {
  it('renders one <IconButton />', () => {
    countChildren(<ButtonLink text="foo" />, IconButton, 1)
  })
})

describe('<CallToAction />', () => {
  const props = {}
  beforeEach(() => (props.text = 'Click me meow'))

  it('renders a <ButtonLink /> when CTA type is button', () => {
    countChildren(<CallToAction type="button" {...props} />, ButtonLink, 1)
    countChildren(<CallToAction type="button" {...props} />, 'a', 0)
  })

  it('renders an <a /> when CTA type is link', () => {
    countChildren(<CallToAction type="link" {...props} />, 'a', 1)
    countChildren(<CallToAction type="link" {...props} />, ButtonLink, 0)
  })
})

describe('<Card />', () => {
  it('renders the right number of <LinkWrappers /> when <Card /> has CTAs', () => {
    const props = {
      title: "Ceci n'est pas un carte",
      content: 'foo',
      image: placeholder,
      callToActions: [
        {
          text: 'foo',
          to: '#'
        }
      ]
    }
    countChildren(<Card {...props} />, LinkWrapper, props.callToActions.length)
  })
})

describe('<ConnectingTo />', () => {
  const props = {}
  beforeEach(() => {
    props.title = 'foo'
    props.content = 'bar'
  })

  it('renders an image if there is one', () => {
    countChildren(<ConnectingTo image={placeholder} {...props} />, 'img', 1)
  })

  it('renders a spinner if there is one', () => {
    countChildren(
      <ConnectingTo spinner={placeholder} {...props} />,
      'div.spinner',
      1
    )
  })
})

describe('<ContentBar />', () => {
  const props = {}
  beforeEach(() => {
    props.title = 'foo'
    props.image = placeholder
  })

  it('renders an <a /> if it has a titleTo', () => {
    countChildren(<ContentBar titleTo="#" {...props} />, 'a', 1)
  })

  it('renders and <h3 /> if it has no titleTo', () => {
    countChildren(<ContentBar {...props} />, 'h3', 1)
    countChildren(<ContentBar {...props} />, 'a', 0)
  })
})
