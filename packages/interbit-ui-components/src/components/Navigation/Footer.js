import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Panel, PanelGroup } from 'react-bootstrap'
import LinkWrapper from '../UIKit/LinkWrapper'
import Logo from '../UIKit/Logo'
import TitledList from '../UIKit/TitledList'

export default class Footer extends Component {
  static propTypes = {
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            icon: PropTypes.string,
            text: PropTypes.string.isRequired,
            to: PropTypes.string
          })
        )
      })
    ),
    bottomLinks: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string,
        text: PropTypes.string
      })
    ),
    logoUrl: PropTypes.string,
    isInline: PropTypes.bool
  }

  static defaultProps = {
    sections: [],
    bottomLinks: [],
    logoUrl: '/',
    isInline: false
  }

  render() {
    const { sections, bottomLinks, logoUrl, isInline } = this.props

    const colLayout = {
      lg: isInline ? 4 : 3
    }

    const inlineLogoFooter = (
      <Row className="hidden-md hidden-sm hidden-xs">
        <Col {...colLayout}>
          <LinkWrapper to={logoUrl}>
            <Logo />
          </LinkWrapper>
        </Col>
        {sections.length &&
          sections.map(s => (
            <Col key={s.title} {...colLayout}>
              <TitledList title={s.title} items={s.items} />
            </Col>
          ))}
      </Row>
    )

    const blockLogoFooter = (
      <div className="hidden-md hidden-sm hidden-xs">
        <Row>
          <Col {...colLayout}>
            <LinkWrapper to={logoUrl}>
              <Logo />
            </LinkWrapper>
          </Col>
        </Row>
        <Row>
          {!!sections.length &&
            sections.map(s => (
              <Col key={s.title} {...colLayout}>
                <TitledList title={s.title} items={s.items} />
              </Col>
            ))}
        </Row>
      </div>
    )

    return (
      <div className="ibweb-footer-container">
        <Row className="ibweb-footer">
          {isInline ? inlineLogoFooter : blockLogoFooter}

          <Row className="visible-md visible-sm visible-xs">
            <LinkWrapper to={logoUrl}>
              <Logo />
            </LinkWrapper>
            <PanelGroup accordion id="footer-accordion">
              {!!sections.length &&
                sections.map(s => (
                  <Panel key={s.title} eventKey={s.title}>
                    <Panel.Heading>
                      <Panel.Title toggle>{s.title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      <ul>
                        {s.items.map(item => (
                          <li key={item.text}>
                            <LinkWrapper to={item.to}>{item.text}</LinkWrapper>
                          </li>
                        ))}
                      </ul>
                    </Panel.Body>
                  </Panel>
                ))}
            </PanelGroup>
          </Row>
        </Row>

        <Row className="copyright">
          <Col md={12} lg={8} lgOffset={2}>
            {bottomLinks.length &&
              bottomLinks.map(l => (
                <LinkWrapper key={l.to} to={l.to}>
                  {l.text}
                </LinkWrapper>
              ))}
            <span>&copy; 2018 BTL Group Ltd.</span>
          </Col>
        </Row>
      </div>
    )
  }
}
