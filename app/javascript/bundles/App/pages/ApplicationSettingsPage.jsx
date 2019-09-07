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
      addNewClassifiedTypeFormVisible: false,
      classifiedTypes,
      newClassifiedType: {
        name: '',
        attributes: [],
      },
    };

    this.showAddNewClassifiedTypeForm = this.showAddNewClassifiedTypeForm.bind(
      this,
    );

    this.onRemoveClassifiedType = this.onRemoveClassifiedType.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchClassifiedTypes()).catch((e) => console.error(e));
  }

  componentDidUpdate(prevProps) {
    const { classifiedTypes } = this.props;

    if (prevProps.classifiedTypes !== classifiedTypes) {
      this.setState({ classifiedTypes });
    }
  }

  onRemoveClassifiedType(id) {
    let { classifiedTypes } = this.state;

    classifiedTypes = classifiedTypes.filter((classifiedType, idx) => id !== idx);

    this.setState({ classifiedTypes });
  }

  showAddNewClassifiedTypeForm() {
    this.setState({ addNewClassifiedTypeFormVisible: true });
  }

  render() {
    const { addNewClassifiedTypeFormVisible, classifiedTypes, newClassifiedType } = this.state;
    const { webAppSettings } = this.props;

    return (
      <div>
        <h1 className="text-center">Application Settings</h1>

        <div className="d-flex flex-column align-items-start px-5">
          <ApplicationNameFormContainer webAppSettings={webAppSettings} />

          <hr />

          <div>
            <h2 className="mb-3">Classified Types</h2>
            <div className="my-3">
              <p>
                A Classified Type represents a class of items.
              </p>
              <p>
                Examples: Cat, Dog, Car, Clothing, etc.
              </p>
            </div>
          </div>

          <div className="my-3">
            {
              addNewClassifiedTypeFormVisible && (
              <div>
                <ClassifiedTypeFormContainer
                  id="new-classified-type"
                  classifiedType={newClassifiedType}
                  canDelete={false} />
              </div>
              )
            }

            {
              !addNewClassifiedTypeFormVisible && (
              <button
                onClick={this.showAddNewClassifiedTypeForm}
                className="btn btn-secondary"
                type="button"
              >
                Add New Classified Type
              </button>
              )
            }
          </div>
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
