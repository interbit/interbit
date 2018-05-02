import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Card, Markdown } from 'interbit-ui-components'

import LinkBarGetStarted from '../components/LinkBarGetStarted'
import cardBuild from '../assets/cardBuild.svg'
import cardCentral from '../assets/cardCentral.svg'
import cardIntegrate from '../assets/cardIntegrate.svg'
import cardAnalytics from '../assets/cardAnalytics.svg'
import cardPayments from '../assets/cardPayments.svg'
import cardKYC from '../assets/cardKYC.svg'

export default class MyApps extends Component {
  render() {
    const colLayout = {
      md: 8,
      mdOffset: 2
    }

    const intro = {
      title: 'Developers (coming soon) ',
      content:
        'The Store will provide a place for you to setup, manage, and promote your apps. Look forward to these features coming with the introduction of a developer dashboard.'
    }

    const cards = [
      {
        title: 'Interbit community',
        content: 'Build apps and services with the developer community.',
        image: cardBuild
      },
      {
        title: 'Developer hub',
        content: 'View, manage, and promote your listed apps and services.',
        image: cardCentral
      },
      {
        title: 'Integrate apps & services',
        content:
          'Integrate other apps and services into your project, or build and commercialize your own.',
        image: cardIntegrate
      },
      {
        title: 'Analytics',
        content: 'Get insights into how many people are using your app.',
        image: cardAnalytics
      },
      {
        title: 'Payments',
        content: 'Payment processing to support Store and in-app purchases',
        image: cardPayments
      },
      {
        title: 'Know your customer',
        content:
          'KYC services will be integrated, allowing for apps that require identity verification.',
        image: cardKYC
      }
    ]

    return (
      <Grid className="ibweb-page">
        <Row>
          <Col {...colLayout}>
            <h1>{intro.title}</h1>
            <Markdown markdown={intro.content} className="ibweb-intro" />
          </Col>
        </Row>

        <Row className="ibweb-mg-sm">
          {cards.map((c, i) => (
            <Col key={c.title} md={4} mdOffset={i % 2 === 0 ? 2 : 0}>
              <Card title={c.title} content={c.content} image={c.image} />
            </Col>
          ))}
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBarGetStarted />
          </Col>
        </Row>
      </Grid>
    )
  }
}
