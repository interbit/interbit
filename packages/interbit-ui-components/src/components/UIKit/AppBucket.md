AppBucket example:

```js
const BrowserRouter = require("react-router-dom").BrowserRouter;
const AppBar = require("@material-ui/core").AppBar;
const Toolbar = require("@material-ui/core").Toolbar;
const IconButton = require("@material-ui/core").IconButton;
const Typography = require("@material-ui/core").Typography;
const Menu = require("@material-ui/core").Menu;
const MenuIcon = require("@material-ui/icons").Menu;
const SearchIcon = require("@material-ui/icons").Search;
const AccountCircle = require("@material-ui/icons").AccountCircle;
const MailIcon = require("@material-ui/icons").Mail;
const NotificationsIcon = require("@material-ui/icons").Notifications;
const AppIcon = require("@material-ui/icons").Apps;

initialState = {
  isVisible: false,
  changePosition: false,
  changeSecondPosition: false,
  isSecondVisible: false
};

<BrowserRouter>
  <React.Fragment>
    <AppBar color="primary" position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          AppBucket Example - 1
        </Typography>
        <AppBucket
          isVisible={state.isVisible}
          customStyles={{ marginLeft: "auto" }}
          closeAppBucket={() => {
            setState({ isVisible: false });
          }}
          toggleAppBucket={() => {
            setState(prevState => ({
              isVisible: !prevState.isVisible
            }));
          }}
          changePosition={state.changePosition}
          changePopOverPosition={changePosition => {
            setState({ changePosition });
          }}
          items={[
            {
              label: "App",
              icon: "placeholder.svg",
              to: "#",
              clickHandler: () => {
                alert("Clicked me");
              }
            },
            {
              label: "App",
              icon: "placeholder.svg",
              to: "#",
              clickHandler: () => {
                alert("Clicked me");
              }
            },
            {
              label: "App",
              icon: "placeholder.svg",
              to: "#",
              clickHandler: () => {
                alert("Clicked me");
              }
            },
            {
              label: "App",
              icon: "placeholder.svg",
              to: "#",
              clickHandler: () => {
                alert("Clicked me");
              }
            }
          ]}
        >
          <IconButton color="inherit" aria-label="AppIcon">
            <AppIcon />
          </IconButton>
        </AppBucket>
        <IconButton color="inherit" aria-label="AccountCircle">
          <AccountCircle />
        </IconButton>
        <IconButton color="inherit" aria-label="Mail">
          <MailIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Notification">
          <NotificationsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

    <div style={{ margin: "10px 0" }} />

    <AppBar color="primary" position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          AppBucket Example - 2
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          <IconButton color="inherit" aria-label="AccountCircle">
            <AccountCircle />
          </IconButton>
        </div>
        <IconButton color="inherit" aria-label="Mail">
          <MailIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Notification">
          <NotificationsIcon />
        </IconButton>
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
          changePosition={state.changeSecondPosition}
          changePopOverPosition={changePosition => {
            setState({ changeSecondPosition: changePosition });
          }}
          items={[
            {
              label: "App",
              icon: "placeholder.svg",
              to: "#",
              clickHandler: () => {
                alert("Clicked me");
              }
            },
            {
              label: "App",
              icon: "placeholder.svg",
              to: "#",
              clickHandler: () => {
                alert("Clicked me");
              }
            },
            {
              label: "App",
              icon: "placeholder.svg",
              to: "#",
              clickHandler: () => {
                alert("Clicked me");
              }
            },
            {
              label: "App",
              icon: "placeholder.svg",
              to: "#",
              clickHandler: () => {
                alert("Clicked me");
              }
            }
          ]}
        >
          <IconButton color="inherit" aria-label="AppIcon">
            <AppIcon />
          </IconButton>
        </AppBucket>
      </Toolbar>
    </AppBar>
  </React.Fragment>
</BrowserRouter>;
```
