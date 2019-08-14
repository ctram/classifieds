import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/appStore';
import AppContainer from '../containers/AppContainer';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
export default (props) => {
  return <Provider store={configureStore(props)}>
    <AppContainer />
  </Provider>
};
