import constants from '../../constants'
import iconCreateIBApp from '../../assets/icons/iconCreateIBApp.png'

export default {
  title: 'Examples',
  intro: `Starting with the template app, there will be example applications provided with the Interbit SDK. These will illustrate how to develop Interbit applications and deal with common technical requirements in applications.`,

  apps: [
    {
      title: 'Interbit Template App',
      githubUrl: constants.urls.GITHUB_IB,
      text:
        'The template application provides a complete Node.js application with everything you need to start an Interbit application, including a default chains pattern, automatically generated React user interface, and our Block Explorer built-in.',
      image: iconCreateIBApp,
      appUrl: '#',
      storeUrl: constants.urls.APP_STORE_CREATE_IB_APP
    }
  ]
}
