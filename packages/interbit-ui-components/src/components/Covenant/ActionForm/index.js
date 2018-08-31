import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SubmissionError } from 'redux-form'
import EditableTable from '../../FormTable/EditableTable'
import { buildDefinition } from './definition'

export default class ActionForm extends Component {
  static propTypes = {
    payloadFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    isConnected: PropTypes.bool,
    isCreating: PropTypes.bool,
    reset: PropTypes.func.isRequired,
    actionCreator: PropTypes.func.isRequired,
    blockchainDispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    isCreating: false,
    isConnected: true
  }

  handleSubmit = formValues => {
    try {
      const { type, actionCreator, blockchainDispatch } = this.props
      const action = actionCreator(formValues)
      console.log(action)
      blockchainDispatch(action)

      this.props.reset(type)
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

  render() {
    const { type, payloadFields, isConnected, isCreating } = this.props

    return (
      <div>
        <h4>{type}</h4>
        <EditableTable
          form={type}
          styles={{}}
          onSubmit={this.handleSubmit}
          isCreating={isCreating}
          headerWidth={4}
          bodyWidth={8}
          submitLabel="Dispatch Action"
          definition={buildDefinition(payloadFields, isConnected)}
        />
      </div>
    )
  }
}
