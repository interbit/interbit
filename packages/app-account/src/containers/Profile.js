import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    return (
      <div className="ibweb-page">
        {/* App profile page heading section */}
        <div className="grid-cont two-col heading">
          <div className="buttons">Reset and delete buttons</div>
          <div className="intro">Profile photo, name, description</div>
        </div>

        {/* App profile edit form secion */}
        <div className="grid-cont two-col content">
          <div className="heading-left">Name</div>
          <div className="heading-right">Edit</div>
          <div className="line" />
          <div className="col-left">Description</div>
          <div className="col-right">Form</div>
        </div>
      </div>
    )
  }
}
