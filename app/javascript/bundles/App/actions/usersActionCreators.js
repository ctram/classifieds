import fetchPlus from '../../../helpers/fetch-plus';
import { startSpinner, endSpinner } from './spinnersActionCreators';
import { setCurrentAlert } from './alertsActionCreators';
import { translateResponseMessage } from '../../../helpers/response-helper';

import { SET_CURRENT_USER } from '../constants/constants';

export function setCurrentUser(user) {
  return { type: SET_CURRENT_USER, user };
}

export function signIn(email, password) {
  return (dispatch) => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/api/v1/sessions`, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } }),
    })
      .then(({
        json, message, status,
      }) => {
        if (status === 200) {
          dispatch(setCurrentUser(json.user));
          return dispatch(setCurrentAlert('success', message));
        }

        throw (message);
      })
      .catch((e) => {
        dispatch(setCurrentAlert('danger', e));
        throw (e);
      })
      .finally(() => {
        dispatch(endSpinner());
      });
  };
}

export function signUp(email, password) {
  return (dispatch) => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/api/v1/users`, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } }),
    })
      .then(({ res, message }) => {
        if (res.status === 201) {
          return dispatch(setCurrentAlert('success', message));
        }

        throw (message);
      })
      .catch((e) => {
        dispatch(setCurrentAlert('danger', e));
        throw (e);
      })
      .finally(() => {
        dispatch(endSpinner());
      });
  };
}

export function signOut() {
  return (dispatch) => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/api/v1/sessions`, {
      method: 'DELETE',
    })
      .then(({ status, message }) => {
        if (status === 200) {
          dispatch(setCurrentAlert('success', message));
          return dispatch(setCurrentUser(null));
        }

        throw (message);
      })
      .catch((e) => {
        dispatch(setCurrentAlert('danger', e));
        throw (e);
      })
      .finally(() => {
        dispatch(endSpinner());
      });
  };
}

export function authenticateUser() {
  return (dispatch) => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/api/v1/sessions`)
      .then(({ json }) => {
        const { user } = json;

        if (user) {
          dispatch(setCurrentUser(user));
          return Promise.resolve(user);
        }

        throw Error('unauthorized');
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        dispatch(endSpinner());
      });
  };
}

export function updateUser(currentUser, attrs, attributeType) {
  return (dispatch) => {
    dispatch(startSpinner());

    const attrType = `${attributeType[0].toUpperCase()}${attributeType.slice(1, attributeType.length)}`;

    return fetchPlus(`${SERVER_DOMAIN}/api/v1/users/${currentUser.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ user: attrs }),
    })
      .then(({ json, message, status, detail }) => {
        if (status === 200) {
          dispatch(setCurrentUser(Object.assign(currentUser, json.user)));
          return dispatch(setCurrentAlert('success', `${attrType} updated.`));
        }

        throw (detail || message);
      })
      .catch((e) => {
        dispatch(setCurrentAlert('danger', e));
        console.error(e);
      })
      .finally(() => {
        dispatch(endSpinner());
      });
  };
}
