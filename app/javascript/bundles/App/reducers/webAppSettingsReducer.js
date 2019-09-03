import { SET_WEB_APP_SETTINGS } from '../constants/constants';

export default (state = { webAppSettings: {} }, action) => {
  switch (action.type) {
    case SET_WEB_APP_SETTINGS:
      return { ...state.webAppSettings, ...action.webAppSettings };
    default:
      return state;
  }
};
