import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import { IconButton } from 'interbit-ui-components'

export default class ConnectFormMissingProfileField extends Component {
  static propTypes = {
    profileFields: PropTypes.shape({
      alias: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string
    })
  }

  static defaultProps = {
    profileFields: []
  }

  render() {
    const { profileFields } = this.props

    return (
      <div>
        <Table>
          <tbody>
            {Object.keys(profileFields).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{profileFields[key]}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}>
                <Button className="text-button">
                  Add a (missing token name)
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <IconButton text="Continue" className="disabled" />
        <IconButton text="Go Back" className="secondary" />
      </div>
    )
  }
}
