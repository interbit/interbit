import React, { Component } from 'react'
import PropTypes from 'prop-types'

import jsx from 'react-syntax-highlighter/languages/prism/jsx'
import SyntaxHighlighter, {
  registerlanguage
} from 'react-syntax-highlighter/prism-light'
import { darcula } from 'react-syntax-highlighter/styles/prism'

registerlanguage('jsx', jsx)

export default class CodeBlock extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render() {
    const { content } = this.props
    return (
      <SyntaxHighlighter
        style={darcula}
        language="jsx"
        className="ibweb-code-block">
        {content}
      </SyntaxHighlighter>
    )
  }
}
