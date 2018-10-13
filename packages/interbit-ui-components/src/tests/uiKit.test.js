import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import AppBucket from '../components/UIKit/AppBucket'
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

configure({ adapter: new Adapter() })

const countChildren = (parent, child, count) => {
  const wrapper = shallow(parent)
  expect(wrapper.find(child).length).toBe(count)
}

describe('<AppBucket />', () => {
  let props = {}
  beforeEach(() =>
    (props = {
      items: [
        {
          label: 'App1',
          icon: '/assets/icon1.png',
          to: '',
          clickHandler: () => {}
        },
        {
          label: 'App2',
          icon: '/assets/icon1.png',
          to: '',
          clickHandler: () => {}
        },
        {
          label: 'App3',
          icon: '/assets/icon1.png',
          to: '',
          clickHandler: () => {}
        },
        {
          label: 'App4',
          icon: '/assets/icon1.png',
          to: '',
          clickHandler: () => {}
        }
      ],
      onClose: () => {}
    }))

  it('renders the right number of items', () => {
    countChildren(
      <AppBucket {...props}>
        <IconButton text="Trigger" />
      </AppBucket>,
      '.ibweb-app-bucket-item',
      props.items.length
    )
  })

  it('renders the app names passed in through the items prop', () => {
    const wrapper = shallow(
      <AppBucket {...props}>
        <IconButton text="Trigger" />
      </AppBucket>
    )
    expect(
      wrapper.find('.ibweb-app-bucket-item-text').map(item => item.text())
    ).toEqual(props.items.map(item => item.label))
  })

  it('renders the app icons passed in through the items prop', () => {
    const wrapper = shallow(
      <AppBucket {...props}>
        <IconButton text="Trigger" />
      </AppBucket>
    )
    expect(
      wrapper.find('.ibweb-app-bucket-item img').map(item => item.prop('src'))
    ).toEqual(props.items.map(item => item.icon))
  })

  it('handle click events', () => {
    const onLinkClick = jest.fn()
    props.items[0].clickHandler = onLinkClick
    const wrapper = shallow(
      <AppBucket {...props}>
        <IconButton text="Trigger" />
      </AppBucket>
    )
    wrapper
      .find('.ibweb-app-bucket-item-wrapper')
      .first()
      .simulate('click')
    expect(onLinkClick).toHaveBeenCalled()
  })

  describe('event listener', () => {
    let windowRemoveEventListenerMock
    let documentRemoveEventListenerMock
    beforeEach(() => {
      windowRemoveEventListenerMock = jest.spyOn(
        global.window,
        'removeEventListener'
      )
      documentRemoveEventListenerMock = jest.spyOn(
        global.document,
        'removeEventListener'
      )
    })

    afterEach(() => {
      global.window.removeEventListener.mockRestore()
      global.document.removeEventListener.mockRestore()
    })

    it('should remove document click event listener', () => {
      const wrapper = shallow(
        <AppBucket {...props}>
          <IconButton text="Trigger" />
        </AppBucket>
      )

      expect(
        documentRemoveEventListenerMock.mock.calls.find(
          call => call[0] === 'click'
        )
      ).toBeUndefined()
      wrapper.unmount()
      expect(
        documentRemoveEventListenerMock.mock.calls.find(
          call => call[0] === 'click'
        )
      ).toBeDefined()
    })

    it('should remove window resize event listener', () => {
      const wrapper = shallow(
        <AppBucket {...props}>
          <IconButton text="Trigger" />
        </AppBucket>
      )

      expect(
        windowRemoveEventListenerMock.mock.calls.find(
          call => call[0] === 'resize'
        )
      ).toBeUndefined()
      wrapper.unmount()
      expect(
        windowRemoveEventListenerMock.mock.calls.find(
          call => call[0] === 'resize'
        )
      ).toBeDefined()
    })
  })
})

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
