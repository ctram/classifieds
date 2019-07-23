import PropTypes from 'prop-types';
import React from 'react';

import fetchPlus from '../../../helpers/fetch-plus';
import { fetchHabits } from '../actions/habitsActionCreators';
import { authenticateUser } from '../actions/usersActionCreators';

import MissingEntityPage from './MissingEntityPage';
import SignInPage from './SignInPage';
import NavBarContainer from '../containers/NavBarContainer';
import HabitsIndexPage from './HabitsIndexPage';
import AlertBar from '../components/AlertBar';
import AddHabitPageContainer from '../containers/AddHabitPageContainer';
import HabitPage from '../pages/HabitPage';
import Spinner from '../components/Spinner';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class App extends React.Component {
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    this.authenticateUser = this.authenticateUser.bind(this);
  }

  componentDidMount() {
    return this.authenticateUser()
      .then(currentUser => {
        return this.props.dispatch(fetchHabits(currentUser));
      })
      .catch(e => console.error(e));
  }

  authenticateUser() {
    return this.props.dispatch(authenticateUser())
      .catch(e => console.warn(e));
  }

  render() {
    const { alert, currentUser, habits, showSpinner } = this.props;

    const habitRoutes = habits.map((habit, idx) => {
        return <Route path={`/habits/${habit.id}`} render={() => (<HabitPage habit={habit} currentUser={currentUser} />)} key={idx} />;
    });

    const isHighDensity = matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches;

    let cssClass = 'py-5';
    cssClass += isHighDensity ? '' : ' px-5';

    return (
        <Router>
          { showSpinner
              && <Spinner />
          }
          <NavBarContainer />
          <div className={cssClass}>
            {
              alert && <AlertBar alertType={alert.alertType} message={alert.message} />
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
                <Route path='/' component={MissingEntityPage} />
            </Switch>
          </div>
        </Router>
    );
  }
}
