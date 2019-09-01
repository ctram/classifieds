import PropTypes from 'prop-types';
import React from 'react';

import ApplicationNameFormContainer from '../containers/ApplicationNameFormContainer';

export default class ApplicationSettingsPage extends React.Component {
  render() {
    return <div className="d-flex flex-column align-items-center">
      <ApplicationNameFormContainer {...this.props} />
    </div>;
  }
}
