import { connect } from 'react-redux';

import ApplicationNameForm from '../components/ApplicationNameForm';

import { saveWebAppSettings } from "../actions/webAppSettingsActionCreators";

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
  webAppSettings: state.webAppSettings,
});

const mapDispatchToProps = (dispatch) => ({
  saveWebAppSettings: (webAppSettings) => {
    dispatch(saveWebAppSettings(webAppSettings));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationNameForm);
