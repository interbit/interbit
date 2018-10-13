AppBucket example:

```js
const BrowserRouter = require("react-router-dom").BrowserRouter;

initialState = { isVisible: false , isSecondVisible:false};
<BrowserRouter>
<React.Fragment>
  <div style={{ backgroundColor: "#e7e7e7", display:'flex', justifyContent:'flex-end'}}>
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

    <div style={{ backgroundColor: "#e7e7e7", display:'flex', justifyContent:'center'}}>
    <AppBucket
      isVisible={state.isSecondVisible}
      closeAppBucket={() => {
        setState({ isSecondVisible: false });
      }}
      toggleAppBucket={() => {
        setState(prevState => ({
          isSecondVisible: !prevState.isSecondVisible
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
  </React.Fragment>
</BrowserRouter>;
```
