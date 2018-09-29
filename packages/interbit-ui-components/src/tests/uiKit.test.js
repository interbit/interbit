import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, render } from 'enzyme'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'

import CallToAction from '../components/UIKit/CallToAction'
import Card from '../components/UIKit/Card'
import ConnectingTo from '../components/UIKit/ConnectingTo'
import ContentBar from '../components/UIKit/ContentBar'
import ContentBarDefault from '../components/UIKit/ContentBarDefault'
import ContentBox from '../components/UIKit/ContentBox'
import IconButton from '../components/UIKit/IconButton'
import LaunchPad from '../components/UIKit/LaunchPad'
import LaunchPadRow from '../components/UIKit/LaunchPadRow'
import LinkBar from '../components/UIKit/LinkBar'
import LinkWrapper from '../components/UIKit/LinkWrapper'
import ModalWrapper from '../components/UIKit/ModalWrapper'
import Quote from '../components/UIKit/Quote'
import TitledList from '../components/UIKit/TitledList'
import Markdown from '../components/Markdown'
import placeholder from '../assets/placeholder.svg'
import ActivityBar from '../components/UIKit/ActivityBar'

configure({ adapter: new Adapter() })

const countChildren = (parent, child, count) => {
  const wrapper = shallow(parent)
  expect(wrapper.find(child).length).toBe(count)
}

describe('<CallToAction />', () => {
  const props = {}
  beforeEach(() => (props.text = 'Click me meow'))

  it('renders a <IconButton /> when CTA type is button', () => {
    countChildren(<CallToAction type="button" {...props} />, IconButton, 1)
    countChildren(<CallToAction type="button" {...props} />, 'a', 0)
  })

  it('renders an <a /> when CTA type is link', () => {
    countChildren(<CallToAction type="link" {...props} />, 'a', 1)
    countChildren(<CallToAction type="link" {...props} />, IconButton, 0)
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

  it('passes href prop to <Button /> only if clickHandler is undefined', () => {
    const mockFn = jest.fn()
    const wrapperWithHandler = shallow(
      <IconButton clickHandler={mockFn} {...props} />
    )
    expect(wrapperWithHandler.find(Button).prop('href')).toBe(undefined)
  })
})

describe('<LaunchPad />', () => {
  const props = {}
  beforeEach(() => {
    props.title = 'foo'
    props.text = 'bar'
    props.image = placeholder
  })

  it('renders a <LinkWrapper />', () => {
    countChildren(<LaunchPad {...props} />, LinkWrapper, 1)
  })

  it('renders an <img />', () => {
    countChildren(<LaunchPad {...props} />, 'img', 1)
  })

  it('renders an <h3 />', () => {
    countChildren(<LaunchPad {...props} />, 'h3', 1)
  })
})

describe('<LaunchPadRow />', () => {
  it('renders 2 <LaunchPad />s', () => {
    const buttonLink = {
      title: 'foo',
      text: 'bar',
      image: placeholder
    }
    const buttonLinks = []
    for (let i = 0; i < 2; i += 1) {
      buttonLinks.push(buttonLink)
    }
    countChildren(<LaunchPadRow buttonLinks={buttonLinks} />, LaunchPad, 2)
  })
})

describe('<LinkBar />', () => {
  const props = {}
  beforeEach(() => {
    props.title = 'foo'
    props.content = 'bar'
  })

  it('renders an <a /> for external links and mailtos', () => {
    countChildren(<LinkBar {...props} to="https://interbit.io" />, 'a', 1)
    countChildren(<LinkBar {...props} to="https://interbit.io" />, Link, 0)
  })

  it('renders a <Link /> for internal links', () => {
    countChildren(<LinkBar {...props} to="/foo" />, Link, 1)
    countChildren(<LinkBar {...props} to="/foo" />, 'a', 0)
  })
})

describe('<LinkWrapper />', () => {
  const externalTo = 'https://interbit.io'
  const internalTo = '/foo'
  const mockFn = jest.fn()

  it('renders an <a /> for external links', () => {
    countChildren(<LinkWrapper to={externalTo} />, 'a', 1)
    countChildren(<LinkWrapper to={externalTo} />, Link, 0)
  })

  it('renders a <Link /> for internal links', () => {
    countChildren(<LinkWrapper to={internalTo} />, Link, 1)
    countChildren(<LinkWrapper to={internalTo} />, 'a', 0)
  })

  it('passes clickHandler to <a/>', () => {
    const wrapper = shallow(
      <LinkWrapper to={externalTo} clickHandler={mockFn} />
    )
    expect(wrapper.find('a').prop('onClick')).toBeDefined()
  })

  it('passes clickHandler to <Link />', () => {
    const wrapper = shallow(
      <LinkWrapper to={internalTo} clickHandler={mockFn} />
    )
    expect(wrapper.find(Link).prop('onClick')).toBeDefined()
  })
})

describe('<ModalWrapper />', () => {
  const props = {}
  beforeEach(() => {
    props.body = <div>foo</div>
  })

  it('renders a <Modal.Header /> if header prop is provided', () => {
    countChildren(
      <ModalWrapper header={<div>header</div>} {...props} />,
      Modal.Header,
      1
    )
    countChildren(<ModalWrapper {...props} />, Modal.Header, 0)
  })

  it('renders a <Modal.Footer /> if footer prop is provided', () => {
    countChildren(
      <ModalWrapper footer={<div>footer</div>} {...props} />,
      Modal.Footer,
      1
    )
    countChildren(<ModalWrapper {...props} />, Modal.Footer, 0)
  })
})

describe('<Quote />', () => {
  const props = {}
  beforeEach(() => {
    props.content = 'foo'
    props.image = placeholder
  })

  it('renders an <h4/> when an author is provided', () => {
    countChildren(<Quote author="John Donne" {...props} />, 'h4', 1)
    countChildren(<Quote {...props} />, 'h4', 0)
  })

  it('renders an <a /> for each callToAction', () => {
    const ctas = [{ text: 'foo', to: '/bar' }]
    countChildren(<Quote {...props} callToActions={ctas} />, 'p a', ctas.length)
  })

  it('renders publication info when publication prop is provided', () => {
    countChildren(<Quote {...props} publication="baz" />, 'p.publication', 1)
    countChildren(<Quote {...props} />, 'p.publication', 0)
  })
})

describe('<TitledList />', () => {
  it('renders a <li /> for each item', () => {
    const props = {
      title: 'foo',
      items: [{ text: 'meow', to: '/woof' }]
    }

    countChildren(<TitledList {...props} />, 'li', props.items.length)
  })
})

describe('<ActivityBar />', () => {
  const props = {}
  beforeEach(() => {
    props.firstName = 'foo'
    props.secondName = 'bar'
    props.breadcrumb = [{ title: 'foo' }, { title: 'bar' }]
    props.userClickHandler = jest.fn()
    props.timestamp = 1538117894366
    props.dateTimeFormat = 'lll'
  })

  it('renders a breadcrumb', () => {
    countChildren(<ActivityBar {...props} />, 'ul li', props.breadcrumb.length)
  })

  it('renders a timestamp in specified format', () => {
    const dateUtc = moment.utc(props.timestamp)
    const localDate = dateUtc.local()
    const localTimeStamp = localDate.format(props.dateTimeFormat)

    countChildren(
      <ActivityBar {...props} />,
      '.meta-data .activity-bar-timestamp',
      1
    )
    expect(
      render(
        <ActivityBar
          firstName="foo"
          secondName="bar"
          breadcrumb={[{ title: 'foo' }, { title: 'bar' }]}
          userClickHandler={() => jest.fn()}
          timestamp={1538117894366}
          dateTimeFormat="lll"
        />
      ).text()
    ).toContain(localTimeStamp)
  })

  it('renders an avatar if one is provided', () => {
    countChildren(<ActivityBar {...props} avatar={placeholder} />, 'img', 1)
  })

  it('renders the username', () => {
    countChildren(<ActivityBar {...props} />, '.content .name', 1)
  })

  it('renders the correct type of text block', () => {
    const change = { fieldName: 'doo', oldVal: 'foo', newVal: 'bar' }
    countChildren(<ActivityBar {...props} comment="foo" />, '.body div', 1)
    countChildren(<ActivityBar {...props} change={change} />, '.body div', 1)
  })
})
