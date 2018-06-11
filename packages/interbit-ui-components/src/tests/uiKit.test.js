import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import assert from 'assert'

import ButtonLink from '../components/UIKit/ButtonLink'
import CallToAction from '../components/UIKit/CallToAction'
import Card from '../components/UIKit/Card'
import ConnectingTo from '../components/UIKit/ConnectingTo'
import ContentBar from '../components/UIKit/ContentBar'
import ContentBarDefault from '../components/UIKit/ContentBarDefault'
import ContentBox from '../components/UIKit/ContentBox'
import IconButton from '../components/UIKit/IconButton'
import LinkWrapper from '../components/UIKit/LinkWrapper'
import Markdown from '../components/Markdown'
import placeholder from '../assets/placeholder.svg'

configure({ adapter: new Adapter() })

const countChildren = (parent, child, count) => {
  const wrapper = shallow(parent)
  assert.equal(wrapper.find(child).length, count)
}

describe('<ButtonLink />', () => {
  it('renders an <IconButton />', () => {
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
    countChildren(<ConnectingTo {...props} />, 'img', 0)
  })

  it('renders a spinner if there is one', () => {
    countChildren(
      <ConnectingTo spinner={placeholder} {...props} />,
      'div.spinner',
      1
    )
    countChildren(<ConnectingTo {...props} />, 'div.spinner', 0)
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

describe('<ContentBarDefault />', () => {
  const props = {}
  beforeEach(() => {
    props.title = 'foo'
    props.content = 'bar'
    props.image = placeholder
  })

  it('renders a <ContentBar />', () => {
    countChildren(<ContentBarDefault {...props} />, ContentBar, 1)
  })

  it('renders the status if there is one', () => {
    const status = {
      type: 'done',
      text: 'status is done'
    }
    countChildren(
      <ContentBarDefault {...props} status={status} />,
      `.${status.type}`,
      1
    )
  })

  it('renders an <a /> if there is a CTA', () => {
    const callToAction = {
      type: 'button',
      text: 'foo',
      to: '#'
    }
    countChildren(
      <ContentBarDefault {...props} callToAction={callToAction} />,
      'a',
      1
    )
    countChildren(<ContentBarDefault {...props} />, 'a', 0)
  })
})

describe('<ContentBox />', () => {
  const props = {}
  beforeEach(() => {
    props.title = 'foo'
    props.content = 'bar'
  })

  it('renders an <h2 />', () => {
    countChildren(<ContentBox {...props} />, 'h2', 1)
  })

  it('renders a <Markdown />', () => {
    countChildren(<ContentBox {...props} />, Markdown, 1)
  })

  it('renders a <CallToAction /> if there is one', () => {
    const callToAction = {
      text: 'foo'
    }
    countChildren(
      <ContentBox callToAction={callToAction} {...props} />,
      CallToAction,
      1
    )
    countChildren(<ContentBox {...props} />, CallToAction, 0)
  })
})

describe('<IconButton />', () => {
  const props = {}
  beforeEach(() => {
    props.text = 'foo'
  })

  it('renders an <img /> if there is one', () => {
    countChildren(<IconButton image={placeholder} {...props} />, 'img', 1)
    countChildren(<IconButton {...props} />, 'img', 0)
  })

  it('renders an <i/> if there is an icon', () => {
    countChildren(<IconButton icon={placeholder} {...props} />, 'i', 1)
    countChildren(<IconButton {...props} />, 'i', 0)
  })

  it('passes href prop to <Button /> only if clickHandler is undefined', () => {})
})
