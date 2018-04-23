import acceptableUse from './acceptableUse'
import privacy from './privacy'
import termsOfService from './termsOfService'
import trademark from './trademark'
import paths from '../../constants/paths'

export default {
  acceptableUse,
  privacy,
  termsOfService,
  trademark,
  sidebar: [
    {
      title: 'Legal',
      items: [
        {
          text: 'Privacy',
          to: paths.POLICY_PRIVACY
        },
        {
          text: 'Terms of Use',
          to: paths.POLICY_TOS
        },
        {
          text: 'Acceptable Use',
          to: paths.POLICY_ACCEPTABLE_USE
        },
        {
          text: 'Trademark Usage',
          to: paths.POLICY_TRADEMARK
        }
      ]
    }
  ]
}
