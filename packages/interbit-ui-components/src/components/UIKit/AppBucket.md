AppBucket example:

```js
const BrowserRouter = require("react-router-dom").BrowserRouter;

initialState = { isVisible: false };
<BrowserRouter>
  <div style={{ backgroundColor: "#e7e7e7"}}>
    <AppBucket
      isVisible={state.isVisible}
      closeAppBucket={() => {
        setState({ isVisible: false });
      }}
      toggleAppBucket={() => {
        setState(prevState => ({
          isVisible: !prevState.isVisible
        }));
      }}
      items={[
        {
          label: "App",
          icon: "placeholder.svg",
          to: "#",
          clickHandler: () => {
            alert("It tickles");
          }
        },
        {
          label: "App",
          icon: "placeholder.svg",
          to: "#",
          clickHandler: () => {
            alert("It tickles");
          }
        },
        {
          label: "App",
          icon: "placeholder.svg",
          to: "#",
          clickHandler: () => {
            alert("It tickles");
          }
        },
        {
          label: "App",
          icon: "placeholder.svg",
          to: "#",
          clickHandler: () => {
            alert("It tickles");
          }
        }
      ]}
    />
  </div>
</BrowserRouter>;
```
