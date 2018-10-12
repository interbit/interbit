AppBucket example

```js
const Router = require("react-router-dom").BrowserRouter;
const Icon = require("../../assets/icons/apps.svg");
const AppBar = require("@material-ui/core").AppBar;
const Toolbar = require("@material-ui/core").Toolbar;
const IconButton = require("@material-ui/core").IconButton;
const Button = require("@material-ui/core").Button;
const MenuIcon = require("@material-ui/icons").Menu;
const AppsIcon = require("@material-ui/icons").Apps;
const Typography = require("@material-ui/core").Typography;

initialState = { isVisible: false, isVisibleMenu: false };

<Router>
  <div style={{ backgroundColor: "#dedede", width: "100%", height: 50 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          style={{ marginLeft: -12, marginRight: 20 }}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          News
        </Typography>
        <AppBucket
          onClose={() => {
            setState({ isVisible: false });
          }}
          isVisible={state.isVisible}
          items={[
            {
              label: "App 1",
              icon: "https://image.flaticon.com/icons/svg/321/321828.svg",
              to: "/",
              clickHandler: () => alert("App 1 Clicked")
            },
            {
              label: "App 2",
              icon: "https://image.flaticon.com/icons/svg/321/321836.svg",
              to: "/",
              clickHandler: () => alert("App 2 Clicked")
            },
            {
              label: "Settings",
              icon: "https://image.flaticon.com/icons/svg/321/321777.svg",
              to: "/",
              clickHandler: () => alert("Settings Clicked")
            },
            {
              label: "No icon",
              icon: "",
              to: "https://google.com",
              clickHandler: () => alert("No icon clicked")
            }
          ]}
        >
          <IconButton
            style={{marginRight: -25}}
            onClick={() => {
              setState({ isVisible: true });
            }}
            color="inherit"
          >
            <AppsIcon />
          </IconButton>
        </AppBucket>
      </Toolbar>
    </AppBar>
  </div>
</Router>;
```

Example of a centered AppBucket
```js
const Router = require("react-router-dom").BrowserRouter;
const Icon = require("../../assets/icons/apps.svg");
const AppBar = require("@material-ui/core").AppBar;
const Toolbar = require("@material-ui/core").Toolbar;
const IconButton = require("@material-ui/core").IconButton;
const Button = require("@material-ui/core").Button;
const MenuIcon = require("@material-ui/icons").Menu;
const AppsIcon = require("@material-ui/icons").Apps;
const Typography = require("@material-ui/core").Typography;

initialState = { isVisible: false, isVisibleMenu: false };

<Router>
  <div style={{ backgroundColor: "#dedede", width: "100%", height: 50 }}>
    <AppBar position="static">
      <Toolbar style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <AppBucket
          onClose={() => {
            setState({ isVisible: false });
          }}
          isVisible={state.isVisible}
          items={[
            {
              label: "App 1",
              icon: "",
              to: "/a",
              clickHandler: () => alert("Clicked")
            },
            {
              label: "App 2",
              icon: "",
              to: "/b",
              clickHandler: () => alert("Clicked")
            },
            {
              label: "App 3",
              icon: "",
              to: "/c",
              clickHandler: () => alert("Clicked")
            },
            {
              label: "App 4",
              icon: "",
              to: "/",
              clickHandler: () => alert("Clicked")
            }
          ]}
        >
          <IconButton
            onClick={() => {
              setState({ isVisible: true });
            }}
            color="inherit"
          >
            <AppsIcon />
          </IconButton>
        </AppBucket>
      </Toolbar>
    </AppBar>
  </div>
</Router>;
```
