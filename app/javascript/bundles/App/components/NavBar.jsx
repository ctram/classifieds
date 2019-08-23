import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { setCurrentUser, signOut } from '../actions/usersActionCreators';
import { clearCurrentAlert } from '../actions/alertsActionCreators';
import fetchPlus from '../../../helpers/fetch-plus';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
    this.resetAlertBar = this.resetAlertBar.bind(this);
  }

  signOut(e) {
    e.preventDefault();

    const { dispatch, history } = this.props;

    this.props.dispatch(signOut())
      .then(() => {
        history.push('/sign-in');
      })
      .catch(e => console.error(e));
  }

  resetAlertBar() {
    this.props.dispatch(clearCurrentAlert());
  }

  render() {
    const { currentUser, appName } = this.props;

    let homePageTo = currentUser ? '/' : '/sign-in';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" href="#" to={homePageTo} onClick={this.resetAlertBar}>{appName}</Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {
                currentUser && <li className="nav-item">
                  <span className="nav-link font-weight-bold dropdown-toggle"
                        href="#"
                        data-toggle="dropdown">
                    {currentUser.email}
                  </span>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" href="#" to="/user-settings" onClick={this.resetAlertBar}>User Settings</Link>
                    {
                      currentUser.role === 'admin'
                        && <Link className="dropdown-item" href="#" to="/application-settings">Application Settings</Link>
                    }
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={this.signOut}>Sign Out</a>
                  </div>
                </li>
              }
              {
                !currentUser && <li className="nav-item active">
                  <Link className="nav-link" href="#" to="/sign-in" onClick={this.resetAlertBar}>Sign In</Link>
                </li>
              }
              {
                !currentUser && <li className="nav-item active">
                  <Link className="nav-link" href="#" to="/sign-up" onClick={this.resetAlertBar}>Sign Up</Link>
                </li>
              }
            </ul>
          </div>
        </nav>
    );
  }
}

NavBar.propTypes = {
  currentUser: PropTypes.object
};

NavBar.defaultProps = {
  currentUser: {},
  appName: 'Classifieds'
};

export default withRouter(NavBar);
