import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
// import SortableTree from 'react-sortable-tree'

let SortableTree = null

export default class Tree extends Component {
  static propTypes = {
    root: PropTypes.string,
    // This is a generic object renderer, so it takes a generic object as input
    // eslint-disable-next-line react/forbid-prop-types
    treeData: PropTypes.object
  }

  static defaultProps = {
    root: 'Selected chain',
    treeData: {}
  }

  // TODO: Use a dedicated Redux store instead of setState
  constructor(props) {
    super(props)
    this.state = { treeData: this.getTreeData(props.root, props.treeData) }

    if (!SortableTree) {
      // The current version of this library does not support isomorphic rendering
      // which is why it's require-ed here via client-side code
      // eslint-disable-next-line global-require
      SortableTree = require('react-sortable-tree').default // .SortableTreeWithoutDndContext
    }
  }

  // componentDidMount() {
  //   Sortable tree initialization has been moved from here because it fails the first time the component is displayed
  // }

  componentWillReceiveProps(props) {
    const treeData = this.getTreeData(props.root, props.treeData)
    // eslint-disable-next-line react/no-set-state
    this.setState({ treeData })
  }

  getTreeData = (root, treeData) => {
    const converted = convertToTree(root, treeData, 0)
    return [converted]
  }

  updateCache = treeData => {
    if (!treeData) {
      return
    }
    treeData.forEach(node => {
      expandedCache[node.path] = node.expanded
      this.updateCache(node.children)
    })
  }

  handleChange = treeData => {
    // console.info('some change', treeData)
    // walk the tree
    // update the expanded cache
    // re-render all the data
    this.updateCache(treeData)
    const newTreeData = this.getTreeData(this.props.root, this.props.treeData)
    // eslint-disable-next-line react/no-set-state
    this.setState({ treeData: newTreeData })
  }

  render() {
    if (!this.props.treeData) {
      return null
    }

    return SortableTree ? (
      <SortableTree
        treeData={this.state.treeData}
        onChange={this.handleChange}
        canDrag={() => false}
        canDrop={() => false}
        style={{ width: 'calc(100% + 30px)', height: 'calc(100% - 40px)' }}
        innerStyle={{ marginLeft: -15, paddingBottom: 20, overflowX: 'scroll' }}
        rowHeight={58}
      />
    ) : (
      <div>
        <p className="text-danger">SortableTree not loaded</p>
      </div>
    )
  }
}

const expandedCache = {}

const convertToTree = (key, value, depth, path = key) => {
  const isChain = key === 'blocks' && depth === 1
  const defaultExpanded = isChain ? true : depth < 2
  const cached = typeof expandedCache[path] !== typeof undefined
  const expanded = cached ? expandedCache[path] : defaultExpanded
  expandedCache[path] = expanded
  const node = { title: key, children: [], expanded, path }

  if (_.isArray(value)) {
    value.forEach((item, index) => {
      const child = convertToTree(
        isChain ? `${item.content.height}` : `[${index}]`,
        item,
        depth + 1,
        `${path}[${index}]`
      )
      node.children.push(child)
    })
  } else if (_.isObject(value)) {
    Object.keys(value).forEach(key2 => {
      const child = convertToTree(
        key2,
        value[key2],
        depth + 1,
        `${path}.${key2}`
      )
      node.children.push(child)
    })
  } else {
    return { title: key, subtitle: JSON.stringify(value), path }
  }
  return node
}
