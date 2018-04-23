import React, { Component } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'

export default class ProjectPackages extends Component {
  render() {
    return (
      <div className="Project-packages">
        <Row>
          <Col sm={9}>
            <h3>Packages</h3>
            <span className="Status">Last Updated: Jan 10, 2018</span>
          </Col>
          <Col sm={3}>
            <Button className="Secondary-button pull-right">
              Upload File(s)
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Table className="Package-files">
              <thead>
                <tr>
                  <th>Filename</th>
                  <th>Date</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>filename.js</td>
                  <td>Jan 10, 2018</td>
                  <td>
                    <i className="fa fa-trash" />
                  </td>
                </tr>
                <tr>
                  <td>filename.js</td>
                  <td>Jan 10, 2018</td>
                  <td>
                    <i className="fa fa-trash" />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}
