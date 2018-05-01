Bar example:

```js
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore } = require('redux');
const { BrowserRouter } = require('react-router-dom');
const { composeWithDevTools } = require('redux-devtools-extension');

const store = createStore(() => {}, composeWithDevTools());

<Provider store={store}>
  <BrowserRouter>
    <LinkBar to="http://google.com" image="chairmanmeow.jpg" title="Interaction Bar" content="Lorem ipsum dolor sit amet." />
  </BrowserRouter>
</Provider>
```
