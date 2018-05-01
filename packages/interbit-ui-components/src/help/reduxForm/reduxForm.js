import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { ControlLabel, FormControl, FormGroup, Checkbox } from 'react-bootstrap'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'

export default {}

export function renderInput(props) {
  const {
    input,
    meta: { touched, error },
    // eslint-disable-next-line
    label, type, disabled, selectPlaceholder, selectValues, labelSm, inputSm, hideFeedback, autoFocus, validate2, checkboxTitle
  } = props
  const opts = {
    type,
    componentClass: type,
    disabled,
    autoFocus,
    placeholder: selectPlaceholder,
    className: `${input.name}`
  }
  let validationState = null
  if (touched) {
    validationState = error ? 'error' : 'success'
  }

  let formControl
  switch (type) {
    case 'select':
      formControl = (
        <FormControl {...input} {...opts}>
          <option value="">{selectPlaceholder}</option>
          {selectValues.filter(v => v !== selectPlaceholder).map(v => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </FormControl>
      )
      break
    case 'textarea':
      formControl = <FormControl {...input} {...opts} />
      break
    case 'date':
      formControl = (
        // See: https://github.com/airbnb/react-dates for available options for SingleDatePicker
        <DateField {...props} showClearDate displayFormat={DATE_FORMAT} />
      )
      break
    case 'checkbox':
      formControl = <Checkbox disabled={disabled}>{checkboxTitle}</Checkbox>
      break
    default:
      opts.componentClass = 'input'
      formControl = <FormControl {...input} {...opts} />
      break
  }

  return (
    <FormGroup
      controlId={input.name}
      validationState={!disabled ? validationState : undefined}
      className={`${input.name}`}>
      <ControlLabel>{label}</ControlLabel>
      {formControl}
      {!disabled && !hideFeedback && <FormControl.Feedback />}
      {error && touched && <span className="text-danger">{error}</span>}
    </FormGroup>
  )
}

// regarding eslint-disable, see: https://github.com/erikras/redux-form/issues/2109
renderInput.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  input: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  selectPlaceholder: PropTypes.string,
  selectValues: PropTypes.arrayOf(PropTypes.string),
  labelSm: PropTypes.number.isRequired,
  inputSm: PropTypes.number.isRequired,
  hideFeedback: PropTypes.bool,
  autoFocus: PropTypes.bool
}

renderInput.defaultProps = {
  disabled: false,
  selectPlaceholder: null,
  selectValues: [],
  hideFeedback: false,
  autoFocus: false
}

// Wrap the Airbnb component so that it conforms to the property API expected by redux-form
// See: https://github.com/erikras/redux-form/issues/1860
// Also, see: https://github.com/airbnb/react-dates/blob/master/examples/SingleDatePickerWrapper.jsx
class DateField extends Component {
  // The props are supplied via redux-form's <Field /> component
  static propTypes = {
    autoFocus: PropTypes.bool.isRequired,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
      onBlur: PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)
    const { value } = this.props.input
    this.state = {
      date: !value || value === '' ? null : moment(value),
      focused: this.props.autoFocus
    }
  }

  // Use empty value instead of null to ensure it's treated as a controlled component
  getValueAsString = date => (date ? date.toISOString() : '')

  handleDateChange = (date, foo) => {
    // eslint-disable-next-line react/no-set-state
    this.setState({ date }, () => {
      const dateStr = this.getValueAsString(this.state.date)
      this.props.input.onChange(dateStr)
    })
  }

  handleFocusChange = e => {
    // eslint-disable-next-line react/no-set-state
    this.setState({ focused: e.focused }, () => {
      const date = this.state.date
      const dateStr = this.getValueAsString(date)
      if (e.focused) {
        this.props.input.onFocus(dateStr)
      } else {
        this.props.input.onBlur(dateStr)
      }
    })
  }

  renderHiddenField = field => <input {...field.input} type="hidden" />

  render() {
    // eslint-disable-next-line
    const { input, meta, type, label, selectPlaceholder, selectValues, labelSm, inputSm, hideFeedback, autoFocus, ...rest } = this.props
    const dateStr = this.getValueAsString(this.state.date)
    return (
      <div>
        <Field
          {...this.props}
          name={`_hidden_${input.name}`}
          value={dateStr}
          component={this.renderHiddenField}
        />
        <SingleDatePicker
          id={`_wrapped_${input.name}`}
          date={this.state.date}
          focused={this.state.focused}
          onDateChange={this.handleDateChange}
          onFocusChange={this.handleFocusChange}
          {...rest}
        />
      </div>
    )
  }
}
