import React from 'react'
import PropTypes from 'prop-types'

const DataContainer = ({ dataStatePosition, id, timestamp }) => (
  <div
    className="data-container"
    style={{ width: '100%', border: '1px solid #eee', padding: '16px' }}>
    {dataStatePosition} | {id} | {timestamp}
  </div>
)

DataContainer.propTypes = {
  /** An integer representing which state slice is being displayed. */
  dataStatePosition: PropTypes.number.isRequired,
  /** An unique identifier for the state slice. */
  id: PropTypes.string.isRequired,
  /** An unix timestamp in milliseconds when the state slice change was made. */
  timestamp: PropTypes.number.isRequired
}

export default DataContainer
