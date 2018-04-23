import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkBarSlack } from 'lib-react-interbit'

import DeveloperNavigation from '../../components/DeveloperNavigation'
import urls from '../../constants/urls'

const mapStateToProps = state => ({
  placeholder: state.content.placeholder,
  sdkSignup: state.content.sdkSignup,
  ...state.content.developers
})

class DevelopersProjects extends Component {
  render() {
    // eslint-disable-next-line
    const { building, sdkSignup, placeholder } = this.props

    const overview = (
      <div>
        <h3>Projects page</h3>
        <LinkBarSlack to={urls.SUPPORT_SLACK} />
      </div>
    )

    return <DeveloperNavigation {...this.props} component={overview} />
  }
}

export default connect(mapStateToProps)(DevelopersProjects)
