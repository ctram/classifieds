import fetchPlus from '../../../helpers/fetch-plus';
import { fetchHabits } from './habitsActionCreators';
import { startSpinner, endSpinner } from './spinnersActionCreators';
import { setCurrentAlert } from './alertsActionCreators';

import { SET_CURRENT_USER } from '../constants/constants';

export function setCurrentUser(user)
{
  return { type: SET_CURRENT_USER, user }
};

export function signIn(email, password) {
  return dispatch => {
    let status = null;

    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/sessions`, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } })
    })
    .then(res => {
      status = res.status;
      return res.json()
    })
    .then(obj => {
      if (status === 200) {
        dispatch(setCurrentUser(obj.user));
        return dispatch(fetchHabits(obj.user));
      }

      dispatch(setCurrentAlert('danger', 'Email or password is incorrect.'));
      throw(obj.message);
    })
    .catch(e => {
      throw(e);
    })
    .finally(() => {
      dispatch(endSpinner());
    })
  };
}

export function signUp(email, password) {
  return dispatch => {
    let status = null;

    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/users`, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } })
    })
    .then(res => {
      status = res.status;

      return res.json();
    })
    .then(res => {
      if (status === 201) {
        dispatch(setCurrentAlert('success', 'Account creation successful.'));
      }

      throw(res.message);
    })
    .catch(e => {
      dispatch(setCurrentAlert('danger', 'There was an error signing up.'));

      throw(e)
    })
    .finally(() => {
      dispatch(endSpinner());
    })
  };
}

export function signOut() {
  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/sessions`, {
      method: 'DELETE'
    })
      .then(() => {
        dispatch(setCurrentUser(null));
      })
      .catch(e => {
        throw(e)
      })
      .finally(() => {
        dispatch(endSpinner());
      })
  };
}

export function authenticateUser() {
  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/sessions`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }

        return {};
      })
      .then(res => {
        const { user } = res;

        if (user) {
          dispatch(setCurrentUser(user));
          return Promise.resolve(user);
        }

        throw('Not authenticated.')
      })
      .catch(e => {
        throw(e);
      })
      .finally(() => {
        dispatch(endSpinner());
      })
  };
}
