import users from './usersReducer';
import alerts from './alertsReducer';
import habits from './habitsReducer';
import spinners from './spinnersReducer';
import webAppSettings from './webAppSettings';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ users, alerts, habits, spinners, webAppSettings });

export default appReducer;
