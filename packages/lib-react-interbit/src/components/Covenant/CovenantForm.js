import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ActionForm from './ActionForm'
import interpretCovenantFields from '../../help/reduxCovenantForm/interpretCovenantFields'

export default class CovenantForm extends Component {
  static propTypes = {
    // Note: We do not know the covenant shape and thus cannot define it in props
    // eslint-disable-next-line react/forbid-prop-types
    covenant: PropTypes.object,
    reset: PropTypes.func.isRequired,
    blockchainDispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    covenant: {}
  }

  render() {
    const { covenant, reset, blockchainDispatch } = this.props
    const covenantActions = interpretCovenantFields(covenant)
    const actionTypes = Object.keys(covenantActions)

    return (
      <div>
        {actionTypes.map(actionType => (
          <ActionForm
            key={actionType}
            type={actionType}
            reset={reset}
            blockchainDispatch={blockchainDispatch}
            actionCreator={covenantActions[actionType].actionCreator}
            payloadFields={covenantActions[actionType].payloadFields}
          />
        ))}
      </div>
    )
  }
}
