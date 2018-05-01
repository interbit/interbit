import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AutoSizer, Table, Column } from 'react-virtualized'

const INDEX = 'index'
const TIME = 'time'

export default class BlockTable extends Component {
  static propTypes = {
    blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
    doSetSelectedBlockHash: PropTypes.func.isRequired,
    selectedBlockHash: PropTypes.string
  }

  static defaultProps = {
    selectedBlockHash: null
  }

  onRowClick = ({ index }) => {
    const block = this.props.blocks[index]
    this.props.doSetSelectedBlockHash(block.blockHash)
  }

  getRowData = index => this.props.blocks[index]

  renderCell = ({
    cellData,
    columnData,
    dataKey,
    isScrolling,
    rowData,
    rowIndex
  }) => {
    let value = cellData
    switch (dataKey) {
      case INDEX:
        value = rowData.content && rowData.content.height
        break
      case TIME:
        value = rowData.content && rowData.content.timestamp
        break
      default:
    }
    return value
  }

  render() {
    const columns = [
      { name: 'Height', key: INDEX, width: 75 },
      { name: 'Time', key: TIME, width: 200 }
    ]
    const { blocks, selectedBlockHash } = this.props
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className="blockTableBody"
            gridClassName="blockTableGrid"
            headerHeight={38}
            headerClassName="blockTableHeader"
            height={height}
            rowHeight={38}
            rowGetter={({ index }) => this.getRowData(index)}
            rowCount={blocks.length}
            width={width}
            rowClassName={({ index }) => {
              const block = blocks[index]
              const isSelected = block && block.blockHash === selectedBlockHash
              const classNames = ['blockTableRow']
              if (index === -1) {
                classNames.push('headerRow')
              } else {
                if (index % 2) {
                  classNames.push('alternatingRow')
                }
                if (isSelected) {
                  classNames.push('selectedRow')
                }
              }
              return classNames.join(' ')
            }}
            onRowClick={this.onRowClick}>
            {columns.map((column, index) => {
              const key = index
              return (
                <Column
                  key={key}
                  label={column.name}
                  dataKey={column.key}
                  width={column.width || 60}
                  flexGrow={column.width ? 0 : 1}
                  cellRenderer={this.renderCell}
                />
              )
            })}
          </Table>
        )}
      </AutoSizer>
    )
  }
}
