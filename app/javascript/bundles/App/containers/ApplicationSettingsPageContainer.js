import { connect } from "react-redux";
import ApplicationSettingsPage from "../pages/ApplicationSettingsPage";

const mapStateToProps = (state) => {
  return {
    classifiedTypes: state.classifiedTypes.classifiedTypes
  }
};

export default connect(mapStateToProps)(ApplicationSettingsPage);
