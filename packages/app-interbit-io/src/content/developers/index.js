import constants from '../../constants'
import architecture from './architecture'
import exampleApps from './exampleApps'
import overview from './overview'
import platformFeatures from './platformFeatures'
import resources from './resources'
import support from './support'

import iconDownload from '../../assets/icons/iconDownload.svg'
import iconPlatformFeatures from '../../assets/icons/iconPlatformFeatures.svg'

// TODO: move nav out to navigation constants
export default {
  launchPads: [
    {
      title: 'Platform Features',
      text:
        'A growing platform with services that integrate with Interbit applications.',
      image: iconPlatformFeatures,
      to: constants.paths.DEVELOPERS_PLATFORM_FEATURES
    },
    {
      title: 'Get the SDK',
      text:
        'Download the Interbit SDK and get started building blockchain applications within minutes.',
      image: iconDownload,
      to: constants.urls.GITHUB_IB,
      clickHandler: () => {
        window.ga(...constants.ga.CLICK_GET_SDK)
      }
    }
  ],
  sidebar: [
    {
      title: 'Start Here',
      items: [
        {
          text: overview.title,
          to: constants.paths.DEVELOPERS
        }
      ]
    },
    {
      title: 'Platform',
      items: [
        {
          text: 'Platform Features',
          to: constants.paths.DEVELOPERS_PLATFORM_FEATURES
        },
        {
          text: 'Chain Architecture',
          to: constants.paths.DEVELOPERS_ARCHITECTURE
        },
        {
          text: exampleApps.title,
          to: constants.paths.DEVELOPERS_EXAMPLES
        },
        {
          text: resources.title,
          to: constants.paths.DEVELOPERS_RESOURCES
        }
      ]
    },
    {
      title: 'Stay in Touch',
      items: [
        {
          text: support.title,
          to: constants.paths.DEVELOPERS_SUPPORT
        }
      ]
    }
  ],
  architecture,
  exampleApps,
  overview,
  platformFeatures,
  resources,
  support
}
