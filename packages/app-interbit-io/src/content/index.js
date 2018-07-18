import constants from '../constants'

import contact from './contact'
import developers from './developers'
import home from './home'
import linkBars from './linkBars'
import platform from './platform'
import policies from './policies'

export default {
  contact,
  developers,
  home,
  linkBars,
  platform,
  policies,
  notFound: {
    title: '404. We can\u2019t seem to find the page you\u2019re looking for.',
    linkListTitle: 'Here are some helpful links:',
    links: [
      { title: 'Platform', to: constants.paths.PLATFORM },
      { title: 'Developers', to: constants.paths.DEVELOPERS },
      { title: 'Support', to: constants.paths.DEVELOPERS_SUPPORT }
    ]
  }
}
