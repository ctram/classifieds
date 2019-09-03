import { connect } from "react-redux";
import ApplicationSettingsPage from "../pages/ApplicationSettingsPage";

const mapStateToProps = (state) => {
  return {
    classifiedTypes: state.classifiedTypes.classifiedTypes,
    webAppSettings: state.webAppSettings,
  };
};

export default connect(mapStateToProps)(ApplicationSettingsPage);
