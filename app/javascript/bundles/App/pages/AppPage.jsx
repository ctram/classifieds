import PropTypes from "prop-types";

import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { authenticateUser } from "../actions/usersActionCreators";

import MissingEntityPage from "./MissingEntityPage";
import SignInPage from "./SignInPage";
import NavBarContainer from "../containers/NavBarContainer";
import AlertBar from "../components/AlertBar";
import UserPage from "./UserPage";
import ApplicationSettingsPageContainer from "../containers/ApplicationSettingsPageContainer";
import Spinner from "../components/Spinner";
import Dashboard from "../components/Dashboard";
import HomePage from "./HomePage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.authenticateUser = this.authenticateUser.bind(this);
    this.state = { attemptedAuthentication: false };
  }

  componentDidMount() {
    return this.authenticateUser()
      .catch((e) => console.error(e))
      .finally(() => {
        this.setState({ attemptedAuthentication: true });
      });
  }

  authenticateUser() {
    const { dispatch } = this.props;
    return dispatch(authenticateUser()).catch((e) => console.warn(e));
  }

  render() {
    const { alert, currentUser, showSpinner } = this.props;

    const { attemptedAuthentication } = this.state;

    const domSignedOutRoutes = (
      <div>
        <Route path="/sign-in" component={SignInPage} />
        <Route
          path="/sign-up"
          render={() => <SignInPage type="sign-up" />}
        />
      </div>
    );

    const domSignedInRoutes = (
      <div>
        <Route exact path="/user-settings" component={UserPage} />
        <Route
          exact
          path="/application-settings"
          component={ApplicationSettingsPageContainer}
        />
      </div>
    );

    return (
      <Router>
        {showSpinner && <Spinner />}

        <NavBarContainer />

        <div className="py-5 px-3">
          {alert && alert.message && (
            <div className="mb-3">
              <AlertBar alertType={alert.alertType} message={alert.message} />
            </div>
          )}

          { !currentUser && domSignedOutRoutes}
          { currentUser && domSignedInRoutes}
          <Route exact path="/" component={HomePage} />
        </div>

      </Router>
    );
  }
}

App.propTypes = {
  alert: PropTypes.shape({
    alertType: PropTypes.string,
    message: PropTypes.string,
  }),
  currentUser: PropTypes.shape({}),
  showSpinner: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

App.defaultProps = {
  alert: {},
  currentUser: {},
  showSpinner: false,
};

export default App;
