import { connect } from "react-redux";

import ApplicationSettingsPage from "../pages/ApplicationSettingsPage";

import { fetchClassifiedTypes } from "../actions/classifiedTypesActionCreators";

const mapStateToProps = (state) => ({
  classifiedTypes: state.classifiedTypes.classifiedTypes,
  webAppSettings: state.webAppSettings,
});

const dispatchToProps = (dispatch) => ({
  fetchClassifiedTypes: () => {
    dispatch(fetchClassifiedTypes());
  },
});

export default connect(mapStateToProps, dispatchToProps)(ApplicationSettingsPage);
