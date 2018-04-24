# interbit-covenant-tools

This library contains reusable covenant components that provide core functionality for managing template deployment and utilities that make it easier to write covenants that conform to standard patterns.



## validate

`interbit-covenant-tools` contains a lightweight and flexible validation library for validating action creators and action payloads within covenants.

Usage:

``` JavaScript
const {
  validate,
  objectValidationRules: { required, faIconPattern, chainIdPattern }
} = require('@btlgroup/interbit-covenant-tools')

const actionTypes = {
  UPDATE_PROJECT: 'project/UPDATE_PROJECT',
  REGISTER_PROJECT: 'project/REGISTER_PROJECT'
}

const actionCreators = {
  updateProject: ({ projectName, description, icon, launchUrl }) => ({
    type: actionTypes.UPDATE_PROJECT,
    payload: validate(
      { projectName, description, icon, launchUrl },        // Object to validate
      { projectName: required(), icon: faIconPattern() }    // Validation rules attached to properties
    )
  }),

  registerProject: ({ parentChainId }) => ({
    type: actionTypes.REGISTER_PROJECT,
    payload: validate(
      { parentChainId },                       // Object to validate
      { parentChainId: chainIdPattern() }      // Validation rules attached to properties
    )
  })
}
```
