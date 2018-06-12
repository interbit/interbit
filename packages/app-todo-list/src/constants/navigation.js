import paths from './paths'

export default {
  headerNav: [
    {
      text: 'Todo List',
      to: paths.TODO_LIST,
      eventKey: 'todoList'
    },
    {
      text: 'Private Chain',
      to: paths.CHAINS,
      eventKey: 'chains'
    },
    {
      text: 'Block Explorer',
      to: paths.BLOCK_EXPLORER,
      eventKey: 'explore'
    }
  ]
}
