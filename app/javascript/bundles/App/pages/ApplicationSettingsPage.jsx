import PropTypes from 'prop-types';
import React from 'react';

import { setCurrentAlert } from '../actions/alertsActionCreators';
import { updateWebAppSettings } from '../actions/webAppSettingsActionCreators';

import { connect } from 'react-redux';

class ApplicationSettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.inputApplicationName = React.createRef();

    this.updateApplicationName = this.updateApplicationName.bind(this);
  }

  updateApplicationName(e) {
    e.preventDefault();

    const webAppSettings = {
      web_app_title: this.inputApplicationName.current.value
    };

    this.props.dispatch(updateWebAppSettings(webAppSettings));
  }

  render() {
    const { currentUser, webAppSettings } = this.props;

    return <div className="d-flex flex-column align-items-center">
      <h1 className="my-3">Application Settings</h1>

      <div className="d-flex flex-column align-items-start">
        <div className="my-3">
          <h2 className="my-3">Application Name</h2>
          <form onSubmit={this.updateApplicationName}>
            <div className="form-group">
              <input
                id="application-name"
                type="text"
                className="form-control"
                defaultValue={webAppSettings.web_app_title}
                ref={this.inputApplicationName}
                placeholder="Classifieds"
                required />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Application Name
            </button>
          </form>
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
    webAppSettings: state.webAppSettings
  };
};

export default connect(mapStateToProps)(ApplicationSettingsPage);
