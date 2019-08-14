import { createStore, applyMiddleware } from 'redux';
import appReducer from '../reducers/indexReducer';
import thunk from 'redux-thunk';

const configureStore = (railsProps) => {
  return createStore(appReducer, railsProps, applyMiddleware(thunk))
};

export default configureStore;
