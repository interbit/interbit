import urls from '../constants/urls'
import iconAttention from '../assets/icons/iconAttention.svg'
import iconGitHub from '../assets/icons/iconGitHub.svg'
import iconHosting from '../assets/icons/iconHosting.svg'
import iconStore from '../assets/icons/iconStore.svg'

export default {
  attention: {
    title: 'Attention',
    image: iconAttention,
    content: `The Interbit platform is currently a test environment.
There is no guarantee of data preservation, uptime, stability, or security at this time.`,
    className: 'image-sm white',
    callToAction: {
      text: 'Learn what this means for your data'
    }
  },
  appHosting: {
    title: 'Hosting',
    content:
      'Simple, hassle-free hosting for your development projects. Host on Interbit or with other providers.',
    image: iconHosting,
    callToAction: {
      text: 'Coming soon...'
    }
  },
  appStore: {
    title: 'Store',
    content:
      'A place to discover apps, and for developers to connect, collaborate, promote and sell their products and services.',
    image: iconStore,
    callToAction: {
      text: 'Go to the Store',
      to: urls.APP_STORE
    }
  },
  gitHubCreateAccount: {
    title: 'GitHub',
    image: iconGitHub,
    content: 'Authenticate with GitHub to create your account.',
    error: 'Error connecting to GitHub. Please try again.',
    buttonText: 'Create Account'
  },
  gitHubSignIn: {
    title: 'GitHub',
    image: iconGitHub,
    content: 'Authenticate with GitHub to sign in to your account.',
    error: 'Error connecting to GitHub. Please try again.',
    buttonText: 'Sign In'
  }
}
