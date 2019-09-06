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
    this.setState({ showClassifiedTypeForm: true });
  }

  render() {
    const { showClassifiedTypeForm, classifiedTypes } = this.state;
    const { webAppSettings } = this.props;

    console.log(classifiedTypes);

    let domClassifiedTypes = null;

    if (classifiedTypes.length > 0) {
      domClassifiedTypes = classifiedTypes.map((classifiedType, idx) => {
        const { name, attributes, id } = classifiedType;

        return (
          <div key={idx}>
            <hr />
            <ClassifiedTypeFormContainer
              id={id}
              name={name}
              attributes={attributes}
              onRemove={this.onRemoveClassifiedType}
            />
          </div>
        );
      });
    }

    return (
      <div className="d-flex flex-column align-items-center">
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
          {showClassifiedTypeForm && (
            <div className="my-5 new-classified-type">
              <ClassifiedTypeFormContainer id="new-classified-type" />
            </div>
          )}

          {
            !showClassifiedTypeForm && (
              <button
                onClick={this.showAddNewClassifiedTypeForm}
                className="btn btn-primary"
                type="button"
              >
                Add New Classified Type
              </button>
            )
          }

          {
            domClassifiedTypes && (
            <div className="classified-types">
              <hr />
              {domClassifiedTypes}
            </div>
            )
          }
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
