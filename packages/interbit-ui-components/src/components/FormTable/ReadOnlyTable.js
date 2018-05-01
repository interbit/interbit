import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, FormGroup, Grid, Row, Table } from 'react-bootstrap'
import { formatDateTime } from '../../help/reduxForm/format'

export default class ReadOnlyTable extends Component {
  static propTypes = {
    definition: PropTypes.arrayOf(PropTypes.object).isRequired,
    styles: PropTypes.objectOf(PropTypes.string).isRequired,
    headerWidth: PropTypes.number.isRequired,
    bodyWidth: PropTypes.number.isRequired,
    initialValues: PropTypes.objectOf(PropTypes.string),
    editLabel: PropTypes.string,
    onEdit: PropTypes.func
  }

  static defaultProps = {
    initialValues: {},
    onEdit: null,
    editLabel: 'Edit'
  }

  renderValue = (definition, value) => {
    if (definition.type === 'date') {
      return formatDateTime(value)
    }

    return value
  }

  render() {
    const {
      headerWidth,
      bodyWidth,
      styles,
      initialValues,
      definition,
      editLabel,
      onEdit
    } = this.props
    return (
      <Grid fluid>
        <Form horizontal className={styles.formContainer}>
          <Row>
            <Table condensed className={styles.readOnlyContainer}>
              <tbody>
                {definition.map(o => {
                  const initialValue = initialValues[o.key]
                  const value = this.renderValue(o, initialValue)
                  return (
                    <tr key={o.label} className={o.key}>
                      <td>
                        <Row>
                          <Col sm={headerWidth}>
                            <div className={styles.label}>{o.label}</div>
                          </Col>
                          <Col sm={bodyWidth}>
                            <div className={styles.value}>{value}</div>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Row>
          {onEdit && (
            <Row className={styles.buttonRow}>
              <Col sm={headerWidth} />
              <Col sm={bodyWidth}>
                <FormGroup className="pull-right">
                  <Button onClick={onEdit}>{editLabel}</Button>
                </FormGroup>
              </Col>
            </Row>
          )}
        </Form>
      </Grid>
    )
  }
}
