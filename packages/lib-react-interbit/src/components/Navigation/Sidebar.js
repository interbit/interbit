import React, { Component } from 'react'
import { Nav, NavItem, Panel, PanelGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'

export default class Sidebar extends Component {
  static propTypes = {
    contents: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string.isRequired,
            to: PropTypes.string
          })
        ).isRequired
      })
    ).isRequired
  }

  render() {
    const { contents } = this.props
    return (
      <div className="ibweb-sidebar-nav">
        <div className="hidden-md hidden-sm hidden-xs">
          {contents.map(c => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              <Nav>
                {c.items.map(li => (
                  <LinkContainer to={li.to} key={li.to} exact>
                    <NavItem>{li.text}</NavItem>
                  </LinkContainer>
                ))}
              </Nav>
            </div>
          ))}
        </div>

        <div className="visible-md visible-sm visible-xs">
          <PanelGroup accordion id="sidebar-nav-accordion">
            {contents.map(c => (
              <Panel key={c.title} eventKey={c.title}>
                <Panel.Heading>
                  <Panel.Title toggle>{c.title}</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <Nav>
                    {c.items.map(li => (
                      <LinkContainer to={li.to} key={li.to} exact>
                        <NavItem>{li.text}</NavItem>
                      </LinkContainer>
                    ))}
                  </Nav>
                </Panel.Body>
              </Panel>
            ))}
          </PanelGroup>
        </div>
      </div>
    )
  }
}
