import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormControl, Table } from 'react-bootstrap'
import { IconButton } from 'interbit-ui-components'

export default class ConnectFormAddMissingProfileField extends Component {
  static propTypes = {
    profileFields: PropTypes.shape({
      alias: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string
    }),
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    profileFields: [],
    image: '',
    imageAlt: '',
    title: ''
  }

  render() {
    const { profileFields, image, imageAlt, title } = this.props

    return (
      <div>
        {image && <img src={image} alt={imageAlt} />}
        <h3>{title}</h3>
        <Form>
          <Table>
            <tbody>
              {Object.keys(profileFields).map(key => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{profileFields[key]}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className="form-td">
                  <FormControl
                    type="text"
                    placeholder="Add a (missing token name)"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <p>
            Your (unfilled field name) will be added to your interbit identity
            and can be used in other apps that require a (unfilled field name).
          </p>
          <IconButton text="Save" />
          <IconButton text="Cancel" className="secondary" />
        </Form>
      </div>
    )
  }
}
