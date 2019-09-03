import PropTypes from 'prop-types';
import React from "react";

import ApplicationNameFormContainer from "../containers/ApplicationNameFormContainer";
import ClassifiedTypeForm from "../components/ClassifiedTypeForm";

import { fetchClassifiedTypes } from '../actions/classifiedTypesActionCreators';

class ApplicationSettingsPage extends React.Component {
  constructor(props) {
    super(props);

    const { classifiedTypes } = props;

    this.state = {
      showClassifiedTypeForm: false,
      classifiedTypes,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchClassifiedTypes())
      .catch((e) => console.error(e));
  }

  render() {
    const { showClassifiedTypeForm, classifiedTypes } = this.state;
    const { webAppSettings } = this.props;

    console.log(classifiedTypes);

    return (
      <div className="d-flex flex-column align-items-center">
        <ApplicationNameFormContainer webAppSettings={webAppSettings} />
        <hr />
        <div>
          <h2 className="mb-5">Classified Types</h2>
          {(showClassifiedTypeForm && <ClassifiedTypeForm />) || (
            <button type="button">Add New Classified Type</button>
          )}
        </div>
      </div>
    );
  }
}

ApplicationSettingsPage.propTypes = {
  classifiedTypes: PropTypes.instanceOf(Array),
  dispatch: PropTypes.func.isRequired,
  webAppSettings: PropTypes.instanceOf(Object).isRequired
};

ApplicationSettingsPage.defaultProps = {
  classifiedTypes: []
};

export default ApplicationSettingsPage;
