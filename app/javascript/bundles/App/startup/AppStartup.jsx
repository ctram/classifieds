// import React from 'react';
// import { Provider } from 'react-redux';
//
// import configureStore from '../store/helloWorldStore';
// import HelloWorldContainer from '../containers/HelloWorldContainer';
//
// // See documentation for https://github.com/reactjs/react-redux.
// // This is how you get props from the Rails view into the redux store.
// // This code here binds your smart component to the redux store.
// const HelloWorldApp = (props) => (
//   <Provider store={configureStore(props)}>
//     <HelloWorldContainer />
//   </Provider>
// );
//
// export default HelloWorldApp;



import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/appStore';
import AppPage from '../pages/App';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
const App = (props) => (
  <Provider store={configureStore(props)}>
    <AppPage />
  </Provider>
);

export default App;