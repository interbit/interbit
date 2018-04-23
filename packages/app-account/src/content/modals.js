import urls from '../constants/urls'

export default {
  attentionMoreInfo: {
    title: 'Attention',
    content: `The Interbit Platform is currently a test environment provided for information, education, and evaluation purposes. There will be continual updates to this environment—adding functionality, applications, and addressing issues. We will be monitoring our Slack community ([interbitdev](${
      urls.SUPPORT_SLACK
    })) for issues and feedback. There is no guarantee of data preservation, uptime, stability or security at this time—the environment is provided "as is" with no express or implied warranty.

For more information, read the Interbit [Privacy Policy](${
      urls.APP_IB_IO_POLICY_PRIVACY
    }) and [Terms of Use](${urls.APP_IB_IO_POLICY_TOS}).`
  },
  attention: {
    title: 'Attention',
    content: `The Interbit Platform is currently a test environment provided for information, education, and evaluation purposes. There is no guarantee of data preservation, uptime, stability or security—the environment is provided “as is” with no express or implied warranty.

We will be updating this environment regularly—adding functionality, applications, and addressing issues. Our [Slack community](${
      urls.SUPPORT_SLACK
    }) is open for reporting issues, feedback, and announcements of updates to the platform.`,
    checkbox: 'I acknowledge that I have read and understood this disclaimer.',
    moreInfo: `For more information, read the Interbit [Privacy Policy](${
      urls.APP_IB_IO_POLICY_PRIVACY
    }) and [Terms of Use](${urls.APP_IB_IO_POLICY_TOS}).`
  }
}
