import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import { IconButton } from 'interbit-ui-components'

export default class ConnectFormMissingProfileField extends Component {
  static propTypes = {
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    missingFields: PropTypes.arrayOf(PropTypes.string),
    profileFields: PropTypes.shape({
      alias: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string
    }),
    title: PropTypes.string
  }

  static defaultProps = {
    image: '',
    imageAlt: '',
    missingFields: [],
    profileFields: [],
    title: ''
  }

  render() {
    const { image, imageAlt, missingFields, profileFields, title } = this.props

    return (
      <div>
        {image && <img src={image} alt={imageAlt} />}
        <h3>{title}</h3>
        <Table>
          <tbody>
            {Object.keys(profileFields).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{profileFields[key]}</td>
              </tr>
            ))}
            {missingFields.map(field => (
              <tr key={field}>
                <td colSpan={2}>
                  <Button className="text-button">Add {field}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <IconButton text="Continue" className="disabled" />
        <IconButton text="Go Back" className="secondary" />
      </div>
    )
  }
}
