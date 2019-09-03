import { combineReducers } from 'redux';

import users from './usersReducer';
import alerts from './alertsReducer';
import spinners from './spinnersReducer';
import webAppSettings from './webAppSettingsReducer';
import classifiedTypes from './classifiedTypesReducer';

const appReducer = combineReducers({
  users, alerts, spinners, webAppSettings, classifiedTypes
});

export default appReducer;
