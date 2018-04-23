import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ContentBox, LinkBar, LinkBarSlack } from 'lib-react-interbit'

import DeveloperNavigation from '../../components/DeveloperNavigation'
import urls from '../../constants/urls'

const mapStateToProps = state => ({
  placeholder: state.content.placeholder,
  sdkSignup: state.content.sdkSignup,
  ...state.content.developers
})

class DevelopersAppDirectory extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { building, sdkSignup, placeholder } = this.props

    const overview = (
      <div>
        <ContentBox title={building.title} content={placeholder.md} />
        <LinkBar {...sdkSignup} />
        <div>{placeholder.xl}</div>
        <div>{placeholder.xl}</div>
        <div>{placeholder.xl}</div>
        <LinkBarSlack to={urls.SUPPORT_SLACK} />
      </div>
    )

    return <DeveloperNavigation {...this.props} component={overview} />
  }
}

export default connect(mapStateToProps)(DevelopersAppDirectory)
