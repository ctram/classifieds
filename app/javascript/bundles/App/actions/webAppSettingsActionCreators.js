import fetchPlus from '../../../helpers/fetch-plus';

import { startSpinner, endSpinner } from './spinnersActionCreators';
import { setCurrentAlert } from './alertsActionCreators';

import { SET_WEB_APP_SETTINGS } from '../constants/constants';

export function setWebAppSettings(webAppSettings) {
  return { type: SET_WEB_APP_SETTINGS, webAppSettings };
}

export function saveWebAppSettings(webAppSettings) {
  return (dispatch) => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/api/v1/web_app_setting`, {
      method: 'PATCH',
      body: JSON.stringify({ web_app_setting: webAppSettings }),
    })
      .then(({
        json, error, message, status,
      }) => {
        if (status === 200) {
          dispatch(setWebAppSettings(json.web_app_setting));

          // the web page title exists in the head of the document, which is presently
          // only rendered once, when the entire application is sent to the client;
          // for now, directly update the page's title -- on the next true refresh,
          // the latest title will be in the actual HTML. Should happen infrequently
          // anyway.
          document.title = json.web_app_setting.web_app_title;

          return dispatch(setCurrentAlert('success', `Web application attributes updated.`));
        }

        throw (message || error);
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
