import constants from '../../constants'

export default {
  title: 'Resources',
  intro: `Interbit uses a number of technologies, and has gained a lot from the community (in particular, the Redux community). Some helpful resources are listed below.`,
  sections: [
    {
      title: 'Interbit Docs:',
      text:
        'API reference and documentation on Interbit. These are living docs and so are under constant revision.',
      callToActions: [
        {
          to: constants.urls.SDK_DOCS
        }
      ]
    },
    {
      title: 'Redux:',
      callToActions: [
        {
          to: 'https://redux.js.org/basics'
        },
        {
          to: 'https://egghead.io/courses/getting-started-with-redux'
        }
      ]
    },
    {
      title: 'React:',
      text: `React is used all the time here at Interbit. In particular, Create React App was inspiration for our own bootstrapping tool Create Interbit App. Learning about Create React App is a great way to familiarize yourself with how Create Interbit App works.`,
      callToActions: [
        {
          to: 'https://github.com/facebook/create-react-app/blob/next/README.md'
        }
      ]
    },
    {
      title: 'Node.js:',
      text: `Node.js is an asynchronous runtime engine that powers Interbit running on a server. Node.js is a requirement for any app running Interbit, and we’ve found these things helpful.`,
      callToActions: [
        {
          to: 'https://nodejs.org/en/docs/'
        },
        {
          to: 'https://github.com/maxogden/art-of-node/#the-art-of-node'
        }
      ]
    },
    {
      title: 'NPM:',
      callToActions: [
        {
          to: 'https://docs.npmjs.com/misc/developers'
        },
        {
          to: 'https://www.sitepoint.com/beginners-guide-node-package-manager/'
        }
      ]
    },
    {
      title: 'Functional programming in JavaScript:',
      callToActions: [
        {
          to: 'https://opensource.com/article/17/6/functional-javascript'
        },
        {
          to:
            'https://hackernoon.com/a-quick-introduction-to-functional-javascript-7e6fe520e7fa'
        }
      ]
    }
  ]
}
