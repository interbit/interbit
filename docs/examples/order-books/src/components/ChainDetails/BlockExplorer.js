import React, { Component } from 'react'
import _ from 'lodash'

let SortableTree = null

export default class BlockExplorer extends Component {
  componentWillReceiveProps (props) {
    const treeData = this.getTreeData(props.treeData)
    this.setState({treeData})
  }

  componentWillMount () {
    // Workaround for issue in react-sortable-tree:  https://github.com/fritz-c/react-sortable-tree/issues/55#issuecomment-282238983
    SortableTree = require('react-sortable-tree').default
    const treeData = this.getTreeData(this.props.treeData)
    this.setState({treeData})
  }

  render () {
    return (
      <div style={{ height: 800 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={this.handleChange}
          />
      </div>
    )
  }

  handleChange = treeData => {
    this.updateCache(treeData)
    const newTreeData = this.getTreeData(this.props.treeData)
    this.setState({treeData: newTreeData})
  }

  updateCache = (treeData) => {
    if (!treeData) {
      return
    }
    treeData.forEach(node => {
      expandedCache[ node.path ] = node.expanded
      this.updateCache(node.children)
    })
  }

  getTreeData = treeData => {
    const converted = convertToTree('Root', treeData, 0)
    return [ converted ]
  }
}

const expandedCache = {}

const convertToTree = (key, value, depth, path) => {
  path = path || key
  const isChain = key === 'blocks' && depth === 2
  const defaultExpanded = isChain ? true : depth < 2
  const cached = typeof expandedCache[ path ] !== typeof undefined
  const expanded = cached ? expandedCache[ path ] : defaultExpanded
  expandedCache[ path ] = expanded
  const node = { title: key, children: [], expanded, path }

  if (_.isArray(value)) {
    value.forEach((item, index) => {
      const child = convertToTree(`[${index}]`, item, depth + 1, `${path}[${index}]`)
      node.children.push(child)
    })
  } else if (_.isObject(value)) {
    Object.keys(value).forEach(key => {
      const child = convertToTree(key, value[ key ], depth + 1, `${path}.${key}`)
      node.children.push(child)
    })
  } else {
    return { title: key, subtitle: JSON.stringify(value), path }
  }
  return node
}
