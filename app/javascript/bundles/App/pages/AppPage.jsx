import PropTypes from "prop-types";

import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { authenticateUser } from "../actions/usersActionCreators";

import MissingEntityPage from "./MissingEntityPage";
import SignInPage from "./SignInPage";
import NavBarContainer from "../containers/NavBarContainer";
import AlertBar from "../components/AlertBar";
import UserPage from "./UserPage";
import ApplicationSettingsPage from "./ApplicationSettingsPage";
import Spinner from "../components/Spinner";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.authenticateUser = this.authenticateUser.bind(this);
    this.state = { attemptedAuthentication: false };
  }

  componentDidMount() {
    return this.authenticateUser()
      .catch(e => console.error(e))
      .finally(() => {
        this.setState({ attemptedAuthentication: true });
      });
  }

  authenticateUser() {
    const { dispatch } = this.props;
    return dispatch(authenticateUser()).catch(e => console.warn(e));
  }

  render() {
    const { alert, currentUser, showSpinner } = this.props;

    const { attemptedAuthentication } = this.state;

    return (
      <Router>
        {showSpinner && <Spinner />}
        <NavBarContainer />
        <div className="py-5">
          {alert && (
            <div className="mb-3">
              <AlertBar alertType={alert.alertType} message={alert.message} />
            </div>
          )}
          <Switch>
            <Route path="/sign-in" component={SignInPage} />
            <Route
              path="/sign-up"
              render={() => <SignInPage type="sign-up" />}
            />
            {currentUser && (
              <Route exact path="/user-settings" component={UserPage} />
            )}
            {currentUser && (
              <Route
                exact
                path="/application-settings"
                component={ApplicationSettingsPage}
              />
            )}
            {// don't show 404 pages until client at least tried to authenticate,
            // once authenticate attempt has concluded, we'll know what urls should
            // be considered 404s
            attemptedAuthentication && (
              <Route path="/" component={MissingEntityPage} />
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  alert: PropTypes.shape({
    alertType: PropTypes.string,
    message: PropTypes.string
  }),
  currentUser: PropTypes.shape({}),
  showSpinner: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

App.defaultProps = {
  alert: {},
  currentUser: {},
  showSpinner: false
};

export default App;
