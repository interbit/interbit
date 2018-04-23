// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
export { default as Welcome } from './components/Welcome'
export { default as Covenant } from './components/Covenant'
export { default as About } from './components/About'
export { default as BlockExplorer } from './components/BlockExplorer'
export { default as Layout } from './components/Layout'
export { default as ObjectTree } from './components/ObjectTree'
export { default as Logo } from './components/UIKit/Logo'
export { default as IBIcon } from './components/UIKit/IBIcon'
export { default as IBWordmark } from './components/UIKit/IBWordmark'
export { default as Footer } from './components/Footer'
export { default as NotFound } from './components/NotFound'
export { default as Navigation } from './components/Navigation'
export { default as NavigationWrapper } from './components/NavigationWrapper'
export {
  default as DeveloperNavigation
} from './components/DeveloperNavigation'
export { default as Markdown } from './components/Markdown'

// Content Components
export { default as Card } from './components/UIKit/Card'
export { default as CodeBlock } from './components/UIKit/CodeBlock'
export { default as ConnectingTo } from './components/UIKit/ConnectingTo'
export { default as ContentBox } from './components/UIKit/ContentBox'
export { default as ContentBar } from './components/UIKit/ContentBar'
export {
  default as ContentBarDefault
} from './components/UIKit/ContentBarDefault'
export {
  default as ContentBarWithButton
} from './components/UIKit/ContentBarWithButton'
export { default as Divider } from './components/UIKit/Divider'
export { default as Quote } from './components/UIKit/Quote'
export { default as SideBarNav } from './components/UIKit/SideBarNav'
export { default as SidebarList } from './components/UIKit/SidebarList'
export { default as TitledList } from './components/UIKit/TitledList'

// Interactive Components
export { default as ButtonLink } from './components/UIKit/ButtonLink'
export { default as CallToAction } from './components/UIKit/CallToAction'
export { default as IconButton } from './components/UIKit/IconButton'
export { default as LaunchPad } from './components/UIKit/LaunchPad'
export { default as LaunchPadRow } from './components/UIKit/LaunchPadRow'
export { default as LinkBar } from './components/UIKit/LinkBar'
export { default as LinkBarSlack } from './components/UIKit/LinkBarSlack'
export { default as LinkWrapper } from './components/UIKit/LinkWrapper'
export { default as ModalWrapper } from './components/UIKit/ModalWrapper'
export { default as VerticalButtons } from './components/UIKit/VerticalButtons'

export { renderInput } from './help/reduxForm/reduxForm'

const generateServiceUrl = (name, port) => {
  const host = window.location.host
  console.log('host', host)
  if (host.includes('localhost')) {
    return `http://localhost:${port}`
  }
  if (name === 'interbit.io') {
    // TODO this is wrong
    return name
  }
  if (host.includes('test-interbit.io')) {
    return `https://${name}.test-interbit.io`
  }
  const serverName = herokuMap[name] || 'interbit.io'
  const stage = getStage(host)
  return `https://ib-${stage}-${serverName}.herokuapp.com`
}

const getStage = host => {
  const stage = host.split('-')[1]
  console.log('stage', stage)
  return stage
}

const herokuMap = {
  accounts: 'account',
  store: 'app-store',
  projects: 'app-projects',
  'interbit-io': 'app-interbit-io'
}

export { generateServiceUrl }
