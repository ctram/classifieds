import PropTypes from "prop-types";
import React from "react";

import SignInForm from "../containers/SignInFormContainer";

export default class SignInPage extends React.Component {
  render() {
    const headerTxt = this.props.type === "sign-up" ? "Sign Up" : "Sign In";
    const { type } = this.props;

    return (
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center">{headerTxt}</h1>
        <div className="form-container">
          <SignInForm type={type} />
        </div>
      </div>
    );
  }
}
