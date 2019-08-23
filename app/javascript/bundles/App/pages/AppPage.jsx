import PropTypes from 'prop-types';
import React from 'react';

import { fetchHabits } from '../actions/habitsActionCreators';
import { authenticateUser } from '../actions/usersActionCreators';

import MissingEntityPage from './MissingEntityPage';
import SignInPage from './SignInPage';
import NavBarContainer from '../containers/NavBarContainer';
import HabitsIndexPage from './HabitsIndexPage';
import AlertBar from '../components/AlertBar';
import AddHabitPageContainer from '../containers/AddHabitPageContainer';
import HabitPage from '../pages/HabitPage';
import UserPage from '../pages/UserPage';
import ApplicationSettingsPage from '../pages/ApplicationSettingsPage';

import Spinner from '../components/Spinner';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class App extends React.Component {
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    this.authenticateUser = this.authenticateUser.bind(this);
    this.state = { attemptedAuthentication: false };
  }

  componentDidMount() {
    return this.authenticateUser()
      .then(currentUser => {
        return this.props.dispatch(fetchHabits(currentUser));
      })
      .catch(e => console.error(e))
      .finally(() => {
        this.setState({ attemptedAuthentication: true });
      });
  }

  authenticateUser() {
    return this.props.dispatch(authenticateUser())
      .catch(e => console.warn(e));
  }

  render() {
    const { alert, currentUser, habits, showSpinner } = this.props;
    const { attemptedAuthentication } = this.state;

    const habitRoutes = habits.map((habit, idx) => {
        return <Route path={`/habits/${habit.id}`} render={() => (<HabitPage habit={habit} currentUser={currentUser} />)} key={idx} />;
    });

    return (
        <Router>
          { showSpinner
              && <Spinner />
          }
          <NavBarContainer />
          <div className="py-5">
            {
              alert && <div className="mb-3">
                <AlertBar alertType={alert.alertType} message={alert.message} />
              </div>
            }
            <Switch>
                <Route path='/sign-in' component={SignInPage} />
                <Route path='/sign-up' render={() => (<SignInPage type="sign-up" />)} />
                <Route path='/habits/new' component={AddHabitPageContainer} />
                {
                  currentUser
                    && <Route exact path='/' render={() => (<HabitsIndexPage habits={habits} />)} />
                }
                {
                  currentUser
                    && habitRoutes
                }
                {
                  currentUser
                    && <Route exact path={`/user-settings`} component={UserPage} />
                }
                {
                  currentUser
                    && <Route exact path={`/application-settings`} component={ApplicationSettingsPage} />
                }
                {
                  // don't show 404 pages until client at least tried to authenticate,
                  // once authenticate attempt has concluded, we'll know what urls should
                  // be considered 404s
                  attemptedAuthentication
                    && <Route path='/' component={MissingEntityPage} />
                }
            </Switch>
          </div>
        </Router>
    );
  }
}
