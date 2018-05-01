import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Nav,
  NavItem,
  Grid,
  Row,
  Col,
  Tab,
  Checkbox,
  Form,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Navigation } from 'interbit-ui-components'
import './css/App.css'
import AppsList from './components/AppsList'
import AppDescription from './components/AppDescription'
import { selectApp } from './redux/uiReducer'
import profilePic from './img/profilePic.png'

const mapStateToProps = state => {
  const isInterbitLoaded = state.interbit.chains
  if (!isInterbitLoaded) {
    return {
      apps: {},
      selectedApp: state.ui.selectedApp
    }
  }

  const appStoreState = state.interbit.chains.appStore
  const apps = appStoreState ? appStoreState.apps : []

  return {
    apps,
    selectedApp: state.ui.selectedApp
  }
}

const mapDispatchToProps = dispatch => ({
  doSelectApp: appName => {
    dispatch(selectApp(appName))
  }
})

class App extends Component {
  static propTypes = {
    apps: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      author: PropTypes.shape({
        name: PropTypes.string,
        chainId: PropTypes.string
      })
    }),
    selectedApp: PropTypes.string,
    doSelectApp: PropTypes.func.isRequired
  }

  static defaultProps = {
    apps: {},
    selectedApp: null
  }

  renderApps = () => {
    const { apps, doSelectApp, selectedApp } = this.props

    switch (selectedApp) {
      case 'my-account':
        return <div />

      case null: // Empty - display home page when nothing is selected
        return <AppsList selectApp={doSelectApp} apps={apps} />

      default:
        return <AppDescription app={apps[selectedApp]} />
    }
  }

  render() {
    const { doSelectApp } = this.props
    const userProfile = (
      <div className="Logged-in-user">
        <img className="Profile-pic" src={profilePic} alt="profile" />
        <span>JohnSmith</span>
        {/* <img className="Profile-pic" src={ anonymousPic } alt="profile" />
        <span>anonymous</span> */}
      </div>
    )

    return (
      <div className="App">
        <Navigation
          userAlias={userProfile}
          navItems={[
            { title: 'My Projects', eventKey: 'projects' },
            { title: 'App Analytics', eventKey: 'analytics' },
            { title: 'Marketplace', eventKey: 'marketplace' }
          ]}
        />
        <Grid>
          <Tab.Container id="left-tabs-example" defaultActiveKey="second">
            <Row className="clearfix">
              <Col sm={3} lg={2} className="App-sidebar">
                <h4>Apps</h4>
                <Nav bsStyle="pills" stacked>
                  <NavItem eventKey="first" disabled>
                    My Apps
                  </NavItem>
                  <NavItem
                    onClick={() => {
                      doSelectApp(null)
                    }}
                    eventKey="second">
                    Shop
                  </NavItem>
                  <NavItem eventKey="third" className="category" disabled>
                    Main Category 1
                  </NavItem>
                  <NavItem eventKey="fourth" className="category" disabled>
                    Main Category 2
                  </NavItem>
                  <NavItem eventKey="fourth" className="category" disabled>
                    Main Category 3
                  </NavItem>
                </Nav>
                <h4 className="Filter-heading">Filter by</h4>
                <div className="Filters">
                  <Checkbox>Filter</Checkbox>
                  <Checkbox>Filter</Checkbox>
                  <Checkbox>Filter</Checkbox>
                  <Checkbox>Filter</Checkbox>
                  <Checkbox>Filter</Checkbox>
                  <Checkbox>Filter</Checkbox>
                </div>
              </Col>
              <Col sm={9} lg={10}>
                <Row className="Search-apps">
                  <Form>
                    <Col sm={6} md={7} lg={6}>
                      <FormGroup controlId="formInlineName">
                        <FormControl type="text" placeholder="Search" />
                      </FormGroup>
                    </Col>
                    <Col sm={3} md={2}>
                      <Button bsStyle="success" className="Primary-button">
                        Search
                      </Button>
                    </Col>
                  </Form>
                </Row>
                <hr className="Tab-divider" />
                <Row className="Select-cat">
                  <Col sm={10} md={4}>
                    <FormGroup controlId="formControlsSelect">
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">Category</option>
                        <option value="other">Art & Design</option>
                        <option value="other">Books & Reference</option>
                        <option value="other">Business</option>
                        <option value="other">Communication</option>
                        <option value="other">Education</option>
                        <option value="other">Entertainment</option>
                        <option value="other">Events</option>
                        <option value="other">Finance</option>
                        <option value="other">Food & Drink</option>
                        <option value="other">Health & Fitness</option>
                        <option value="other">House & Home</option>
                        <option value="other">Lifestyle</option>
                        <option value="other">Maps & Navigation</option>
                        <option value="other">Medical</option>
                        <option value="other">Music & Audio</option>
                        <option value="other">News & Magazines</option>
                        <option value="other">Photography</option>
                        <option value="other">Productivity</option>
                        <option value="other">Shopping</option>
                        <option value="other">Social</option>
                        <option value="other">Sports</option>
                        <option value="other">Tools</option>
                        <option value="other">Travel & Local</option>
                        <option value="other">Weather</option>
                        <option value="other">Games</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                  {/* Home, Top apps, and New Releases links below show
                  up in the marketplace "home" and while viewing the details
                  of an app. These links do not show when a search term has
                  been used or when a category has been selected  */}
                  <Col sm={7} md={5} lg={4} className="Cat-link">
                    <a href="/" disabled>
                      Home
                    </a>
                    <a href="/" disabled>
                      Top Apps
                    </a>
                    <a href="/" disabled>
                      New Releases
                    </a>
                  </Col>

                  {/* below select menus show up after a search term has been entered */}
                  {/* <Col sm={7} md={3} lg={2}>
                    <FormGroup controlId="formControlsSelect">
                      <FormControl componentClass="select" placeholder="All Prices">
                        <option value="select">All Prices</option>
                        <option value="other">Free</option>
                        <option value="other">Paid</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                  <Col sm={7} md={3} lg={2}>
                    <FormGroup controlId="formControlsSelect">
                      <FormControl componentClass="select" placeholder="All Ratings">
                        <option value="select">All Ratings</option>
                        <option value="other">4+</option>
                      </FormControl>
                    </FormGroup>
                  </Col> */}
                </Row>
                <hr className="Tab-divider" />
                <Row>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first" />
                    <Tab.Pane eventKey="second">{this.renderApps()}</Tab.Pane>
                    <Tab.Pane eventKey="third" />
                    <Tab.Pane eventKey="fourth" />
                  </Tab.Content>
                </Row>
              </Col>
            </Row>
          </Tab.Container>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
