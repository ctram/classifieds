import PropTypes from "prop-types";
import React from "react";

class ApplicationNameForm extends React.Component {
  constructor(props) {
    super(props);

    this.inputApplicationName = React.createRef();
    this.onSubmitApplicationName = this.onSubmitApplicationName.bind(this);
  }

  onSubmitApplicationName(e) {
    e.preventDefault();

    const { saveWebAppSettings } = this.props;

    const webAppSettings = {
      web_app_title: this.inputApplicationName.current.value,
    };

    saveWebAppSettings(webAppSettings);
  }

  render() {
    const { webAppSettings } = this.props;

    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-column align-items-start">
          <div className="my-3">
            <h2 className="my-3">Application Name</h2>
            <form onSubmit={this.onSubmitApplicationName}>
              <div className="form-group">
                <input
                  id="application-name"
                  type="text"
                  className="form-control"
                  defaultValue={webAppSettings.web_app_title}
                  ref={this.inputApplicationName}
                  placeholder="Classifieds"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ApplicationNameForm.defaultValues = {};

ApplicationNameForm.propTypes = {
  webAppSettings: PropTypes.shape({
    web_app_title: PropTypes.string.isRequired,
  }).isRequired,
  saveWebAppSettings: PropTypes.func.isRequired
};

export default ApplicationNameForm;
