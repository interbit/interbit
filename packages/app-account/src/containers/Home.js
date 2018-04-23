import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { Card, LinkBar, Markdown } from 'lib-react-interbit'

import layout from '../constants/layout'

const mapStateToProps = state => ({
  content: state.content.home,
  linkBars: state.content.linkBars
})

export class Home extends Component {
  static propTypes = {
    content: PropTypes.shape({}).isRequired,
    linkBars: PropTypes.shape({}).isRequired
  }

  render() {
    const { content, linkBars } = this.props
    const colLayout = layout.colLayout.default

    // TODO: replace with actual auth status
    const isLoggedIn = false

    return (
      <Grid>
        <div className="ibweb-page home">
          <Row>
            <Col md={12}>
              <img
                src={content.image}
                alt={content.title}
                className="ibweb-image-full-width header"
              />
            </Col>
          </Row>
          <Row>
            <Col {...colLayout}>
              <h1>{content.title}</h1>
              <Markdown markdown={content.intro} className="ibweb-intro" />
            </Col>
          </Row>

          <Row>
            <Col {...colLayout}>
              {isLoggedIn ? (
                <LinkBar {...linkBars.continueToAccount} />
              ) : (
                <LinkBar {...linkBars.createAccount} />
              )}
            </Col>
          </Row>

          <Row>
            {content.cards.map((c, i) => (
              <Col key={c.title} md={6} lg={4} lgOffset={i % 2 === 0 ? 2 : 0}>
                <Card {...c} />
              </Col>
            ))}
          </Row>
        </div>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(Home)
