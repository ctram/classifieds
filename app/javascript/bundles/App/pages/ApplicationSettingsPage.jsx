import PropTypes from "prop-types";
import React from "react";

import ApplicationNameFormContainer from "../containers/ApplicationNameFormContainer";
import ClassifiedTypeFormContainer from "../containers/ClassifiedTypeFormContainer";

class ApplicationSettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newClassifiedTypeFormVisible: false,
      classifiedTypes: []
    };

    this.onClickAddNewClassifiedType = this.onClickAddNewClassifiedType.bind(this);
  }

  componentDidMount() {
    const { fetchClassifiedTypes } = this.props;
    // fetchClassifiedTypes();
  }

  onClickAddNewClassifiedType() {
    this.setState({ newClassifiedTypeFormVisible: true });
  }

  render() {
    const { webAppSettings } = this.props;
    const { newClassifiedTypeFormVisible } = this.state;

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
            <div className="my-3">
              {
                !newClassifiedTypeFormVisible && (
                <button onClick={this.onClickAddNewClassifiedType} type="button" className="btn btn-secondary">
                  Add New Classified Type
                </button>
                )
              }
              {
                newClassifiedTypeFormVisible && <ClassifiedTypeFormContainer />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationSettingsPage;
