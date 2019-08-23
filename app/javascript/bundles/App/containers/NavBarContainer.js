import { connect } from 'react-redux';
import NavBar from '../components/NavBar';

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    currentAlert: state.alerts.currentAlert,
    appName: state.webAppSettings.web_app_title
  };
};

export default connect(mapStateToProps)(NavBar);
