const sampleProjects = [
  {
    projectAlias: 'To-Do-List-Sample',
    projectName: 'Interbit Sample Applications - To Do List',
    description: `To Do List builds on the well known To Do List Redux/React example, using an Interbit blockchain back-end.`,
    license: 'Interbit Open Source',
    icon: 'fa-list',
    documentation:
      'https://github.com/interbit/interbit/blob/master/docs/gitbook/examples/to-do-list.md',
    sourceCode:
      'https://github.com/interbit/interbit/tree/master/docs/examples/to-do-list'
  },
  {
    projectAlias: 'Order-Books-Sample',
    projectName: 'Interbit Sample Applications - Order Books',
    description: `_Order Books_ is a working example of a multi-chain Interbit application. We've used the create-react-app npm package and react-bootstrap, react-redux, and redux for a quick and easy development experience.

The application mimics an exchange’s set of open orders for various commodities trading or this fictional exchange's order books. It contains balances of each commodity traded by a user and a list of the open trades on its books. The commodities traded are oil, gas, Canadian dollars (CAD), and United States dollars (USD).`,
    license: 'Interbit Open Source',
    icon: 'fa-line-chart',
    documentation:
      'https://github.com/interbit/interbit/blob/master/docs/gitbook/examples/order-books.md',
    sourceCode:
      'https://github.com/interbit/interbit/tree/master/docs/examples/order-books'
  },
  {
    projectAlias: 'Interbit-Under-the-Hood-Sample',
    projectName: 'Interbit Sample Applications - Interbit Under the Hood',
    description: `_Interbit Under the Hood_ is a bare-bones Interbit application that exposes and demonstrates the full range of Interbit features, including advanced features such as read and write joins.

_Interbit Under the Hood_ contains a blockchain viewer that you can use to see the current chain state and navigate through the full block history. It also contains a UI that ananlyzes your action creators, so you can submit actions directly to running chains.`,
    license: 'Interbit Open Source',
    icon: 'fa-cogs',
    documentation:
      'https://github.com/interbit/interbit/blob/master/packages/app-uth-ex/ITH.md',
    sourceCode:
      'https://github.com/interbit/interbit/tree/master/packages/app-uth-ex',
    launchUrl: 'https://ib-dev-uth.herokuapp.com/'
  }
]

module.exports = sampleProjects
