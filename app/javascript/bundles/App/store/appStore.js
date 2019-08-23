import { createStore, applyMiddleware } from 'redux';
import appReducer from '../reducers/indexReducer';
import thunk from 'redux-thunk';

const configureStore = (railsProps) => {
  const initialState = {
    webAppSettings: railsProps.web_app_settings
  };
  
  return createStore(appReducer, initialState, applyMiddleware(thunk))
};

export default configureStore;
