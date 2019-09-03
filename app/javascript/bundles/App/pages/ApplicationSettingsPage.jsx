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
      .then((classifiedTypes) => {
        // this.setState({ classifiedTypes });
        // console.log(classifiedTypes)
        console.log('got the classifiedTypes')
      })
      .catch((e) => console.error(e));
  }

  render() {
    const { showClassifiedTypeForm, classifiedTypes } = this.state;

    console.log(classifiedTypes);

    return (
      <div className="d-flex flex-column align-items-center">
        <ApplicationNameFormContainer {...this.props} />
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
  classifiedTypes: PropTypes.instanceOf(Array)
};

ApplicationSettingsPage.defaultProps = {
  classifiedTypes: []
};

export default ApplicationSettingsPage;
