import users from './usersReducer';
import alerts from './alertsReducer';
import spinners from './spinnersReducer';
import webAppSettings from './webAppSettings';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ users, alerts, spinners, webAppSettings });

export default appReducer;
