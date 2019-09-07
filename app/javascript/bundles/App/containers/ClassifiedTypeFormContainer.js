import { connect } from "react-redux";

import ClassifiedTypeForm from "../components/ClassifiedTypeForm";

import { createClassifiedType } from "../actions/classifiedTypesActionCreators";

const mapDispatchToProps = (dispatch) => ({
  onSave: (classifiedType) => {
    dispatch(createClassifiedType(classifiedType));
  }
});

export default connect(null, mapDispatchToProps)(ClassifiedTypeForm);
