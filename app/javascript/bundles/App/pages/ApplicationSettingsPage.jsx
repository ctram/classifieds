// import PropTypes from 'prop-types';
import React from 'react';

import ApplicationNameFormContainer from '../containers/ApplicationNameFormContainer';
import ClassifiedAttributesForm from '../components/ClassifiedAttributesForm'

export default class ApplicationSettingsPage extends React.Component {
  render() {
    return <div className="d-flex flex-column align-items-center">
      <ApplicationNameFormContainer {...this.props} />
      <hr />
      <div>
        <h2>Classifieds Settings</h2>
        <ClassifiedAttributesForm />
      </div>
    </div>;
  }
}
