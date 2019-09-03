import { connect } from 'react-redux';
import ApplicationNameForm from '../components/ApplicationNameForm';

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
  webAppSettings: state.webAppSettings,
});

export default connect(mapStateToProps)(ApplicationNameForm);
