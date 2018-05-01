import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Col, Form, FormGroup, Grid, Row, Table } from 'react-bootstrap'
import {
  initialize as initializeForm,
  reduxForm,
  touch as touchForm,
  Field
} from 'redux-form'
import { renderInput } from '../../help/reduxForm/reduxForm'
import { createFieldValidator } from '../../help/reduxForm/validation'

class EditableTable extends Component {
  static propTypes = {
    initialValues: PropTypes.objectOf(PropTypes.string),
    onSubmit: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    definition: PropTypes.arrayOf(PropTypes.object).isRequired,
    isCreating: PropTypes.bool.isRequired,
    submitError: PropTypes.shape({
      error: PropTypes.string
    }),
    form: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    initialize: PropTypes.func.isRequired,
    touch: PropTypes.func.isRequired,
    error: PropTypes.string,
    headerWidth: PropTypes.number.isRequired,
    bodyWidth: PropTypes.number.isRequired,
    styles: PropTypes.objectOf(PropTypes.string).isRequired
  }

  static defaultProps = {
    initialValues: {},
    error: undefined,
    onCancel: null,
    submitError: null
  }

  componentWillMount() {
    const initialValues = { ...this.props.initialValues }

    // Note: If any form fields are drop-down values, it's a good idea to ensure the values are legit.
    // ...see ReportHistory\EditableTable:componentWillMount()

    // The ususal way to initialize is to set initialValues in the @reduxForm connector, but that prevents use of
    // redux state for initiailization.  Using the constructor is a great alternative
    this.props.initialize(this.props.form, initialValues)
    Object.keys(initialValues).forEach(k =>
      this.props.touch(this.props.form, k)
    )
  }

  render() {
    const {
      error,
      handleSubmit,
      definition,
      isCreating,
      submitError,
      reset,
      pristine,
      submitting,
      styles,
      headerWidth,
      bodyWidth,
      submitLabel,
      onSubmit,
      onCancel
    } = this.props

    return (
      <Grid fluid>
        <Form horizontal className={styles.formContainer}>
          <Row>
            <Table condensed>
              <tbody>
                {definition.map(o => (
                  <tr key={o.key} className={o.key}>
                    <td>
                      <Field
                        name={o.key}
                        type={o.type}
                        component={renderInput}
                        label={o.label}
                        disabled={o.readOnly}
                        validate={createFieldValidator(o.validators)}
                        selectPlaceholder={o.selectPlaceholder}
                        selectValues={o.selectValues}
                        labelSm={4}
                        inputSm={8}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row className={styles.buttonRow}>
            <Col sm={headerWidth}>
              {/* An exception in a synchronous method will cause error to be set */}
              {error && <span className="text-danger">{error}</span>}
              {/* An exception in an asynchronous method will trigger a _FAIL action which sets submitError in the reducer */}
              {submitError &&
                !error && (
                  <span className="text-danger">{submitError.toString()}</span>
                )}
            </Col>
            <Col sm={bodyWidth}>
              <FormGroup className="pull-right">
                {onCancel && (
                  <Button
                    disabled={submitting}
                    onClick={onCancel}
                    bsStyle="warning">
                    Cancel
                  </Button>
                )}
                {!isCreating && (
                  <Button
                    type="reset"
                    disabled={pristine || submitting}
                    onClick={reset}>
                    Reset
                  </Button>
                )}
                <Button
                  type="submit"
                  onClick={handleSubmit(values => onSubmit(values))}
                  disabled={submitting}
                  bsStyle="success">
                  {submitLabel}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Grid>
    )
  }
}

export default reduxForm({
  destroyOnUnmount: true
})(
  connect(state => ({}), {
    initialize: initializeForm,
    touch: touchForm
  })(EditableTable)
)
