import React from 'react'
import { connect } from 'react-redux'
import BlockExplorer from './BlockExplorer'
import { Col, Row, Tabs, Tab } from 'react-bootstrap'

class ChainDetails extends React.Component {
  render () {
    if (!this.props.chain || !this.props.chain.app) {
      return <div></div>
    }

    const state = this.props.chain.app
    const chain = this.props.chain.chain


    return (
      <div className="order-book-panel chain-details">
        <h3>Chain Details</h3>
        <Tabs defaultActiveKey={3} id='uncontrolled-tab-example'>
          <Tab eventKey={3} title='Block Explorer' >
            <Row>
              <Col xs={12}>
                <BlockExplorer treeData={{ state, chain }} />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey={2} title='Raw'>
            <Row>
              <Col xs={12}>
                <pre>
                  {JSON.stringify({ state, chain }, null, 4)}
                </pre>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { chain: state.orderbook }
}

export default connect(mapStateToProps)(ChainDetails)
