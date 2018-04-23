import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Grid, Row } from 'react-bootstrap'
import Toggle from 'react-toggle'
import Immutable from 'seamless-immutable'
import ObjectTree from '../ObjectTree'
import Table from './Table'
import Metadata from './Metadata'

export default class BlockExplorer extends Component {
  static propTypes = {
    selectedChain: PropTypes.shape({
      name: PropTypes.string.isRequired,
      state: PropTypes.object.isRequired,
      interbit: PropTypes.object.isRequired,
      blocks: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired,
    doToggleRawData: PropTypes.func.isRequired,
    showRawData: PropTypes.bool.isRequired,
    doSetSelectedBlockHash: PropTypes.func.isRequired,
    selectedBlockHash: PropTypes.string
  }

  static defaultProps = {
    selectedBlockHash: null
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.selectedChain.state !== nextProps.selectedChain.state ||
      this.props.selectedChain.interbit !== nextProps.selectedChain.interbit ||
      this.props.selectedChain.blocks !== nextProps.selectedChain.blocks ||
      this.props.showRawData !== nextProps.showRawData ||
      this.props.selectedBlockHash !== nextProps.selectedBlockHash
    ) {
      return true
    }

    return false
  }

  toggleRawData = () => {
    this.props.doToggleRawData()
  }

  renderJson = treeData => {
    if (!treeData) {
      return null
    }

    return (
      <div className="json">
        <pre>{JSON.stringify(treeData, null, 4)}</pre>
      </div>
    )
  }

  render() {
    const {
      selectedChain,
      showRawData,
      doSetSelectedBlockHash,
      selectedBlockHash
    } = this.props

    const blocks = selectedChain.blocks
    const treeData = {
      ...selectedChain.state,
      interbit: { ...selectedChain.interbit, blocks: selectedChain.blocks }
    }

    const lastBlock =
      blocks.length > 0 ? blocks[blocks.length - 1] : { blockHash: undefined }
    const selectedBlock = selectedBlockHash
      ? blocks.find(o => o.blockHash === selectedBlockHash) || lastBlock
      : lastBlock

    return (
      <Grid fluid className="explorerBody">
        <Row className="fillHeight">
          <Col sm={3} className="explorerColumn">
            <Row className="explorerColumnHeading">
              <Col sm={4}>Blocks</Col>
            </Row>
            <Row className="blockTable">
              <Table
                blocks={(Immutable.isImmutable(blocks)
                  ? blocks.asMutable()
                  : blocks
                ).reverse()}
                selectedBlockHash={selectedBlock.blockHash}
                doSetSelectedBlockHash={doSetSelectedBlockHash}
              />
            </Row>
          </Col>
          <Col sm={5} className="explorerColumn">
            <Row className="explorerColumnHeading">
              <Col sm={10}>State</Col>
              <Col sm={2}>
                <Toggle
                  className="pull-right"
                  icons={false}
                  checked={!showRawData}
                  onChange={this.toggleRawData}
                />
              </Col>
            </Row>
            {!selectedChain.name && <p>No Chain Selected</p>}
            {!showRawData ? (
              <ObjectTree treeData={treeData} />
            ) : (
              this.renderJson(treeData)
            )}
          </Col>
          <Col sm={4} className="explorerColumn">
            <Row className="explorerColumnHeading">
              <Col sm={12}>Block Metadata</Col>
            </Row>
            <Row className="fillHeight">
              <Metadata block={selectedBlock} />
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}
