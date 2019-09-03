import PropTypes from "prop-types";
import React from "react";

import ApplicationNameFormContainer from "../containers/ApplicationNameFormContainer";
import ClassifiedTypeFormContainer from "../containers/ClassifiedTypeFormContainer";

import { fetchClassifiedTypes } from "../actions/classifiedTypesActionCreators";

class ApplicationSettingsPage extends React.Component {
  constructor(props) {
    super(props);

    const { classifiedTypes } = props;

    this.state = {
      showClassifiedTypeForm: false,
      classifiedTypes,
    };

    this.showAddNewClassifiedTypeForm = this.showAddNewClassifiedTypeForm.bind(
      this,
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchClassifiedTypes()).catch((e) => console.error(e));
  }

  showAddNewClassifiedTypeForm() {
    this.setState({ showClassifiedTypeForm: true });
  }

  render() {
    const { showClassifiedTypeForm, classifiedTypes } = this.state;
    const { webAppSettings } = this.props;

    console.log(classifiedTypes);

    let domClassifiedTypes = null;

    if (classifiedTypes.length > 0) {
      domClassifiedTypes = classifiedTypes.map((classifiedType) => {
        const { name, attributes } = classifiedType;

        return (
          <div>
            <hr />
            <ClassifiedTypeFormContainer name={name} attributes={attributes} />
            );
          </div>
        );
      });
    }

    return (
      <div className="d-flex flex-column align-items-center">
        <ApplicationNameFormContainer webAppSettings={webAppSettings} />
        <hr />
        <div>
          <h2 className="mb-5">Classified Types</h2>
          {(showClassifiedTypeForm && <ClassifiedTypeFormContainer />) || (
            <button
              onClick={this.showAddNewClassifiedTypeForm}
              className="btn btn-primary"
              type="button"
            >
              Add New Classified Type
            </button>
          )}
          {domClassifiedTypes}
        </div>
      </div>
    );
  }
}

ApplicationSettingsPage.propTypes = {
  classifiedTypes: PropTypes.instanceOf(Array),
  dispatch: PropTypes.func.isRequired,
  webAppSettings: PropTypes.instanceOf(Object).isRequired,
};

ApplicationSettingsPage.defaultProps = {
  classifiedTypes: [],
};

export default ApplicationSettingsPage;
