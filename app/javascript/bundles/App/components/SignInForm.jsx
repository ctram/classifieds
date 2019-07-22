import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';
import * as usersActionCreators from '../actions/usersActionCreators';
import {setCurrentAlert } from '../actions/alertsActionCreators';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();

    this.submit = this.submit.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  submit() {
    const email = this.emailInput.current.value;
    const password = this.passwordInput.current.value;

    if (this.props.type === 'sign-up') {
      return this.signUp(email, password);
    }

    return this.signIn(email, password);
  }

  signIn(email, password) {
    const { dispatch } = this.props;

    dispatch(usersActionCreators.signIn(email, password))
      .then(() => {
        this.props.history.push('/');
        dispatch(setCurrentAlert('success', 'Successfully signed in.'));
      })
      .catch(e => {
        dispatch(setCurrentAlert('danger', 'Incorrect email or passsword.'));
        console.error(e);
      });
  }

  signUp(email, password) {
    let status = null;
    const { dispatch } = this.props;

    dispatch(usersActionCreators.signUp(email, password))
      .then(res => {
        status = res.status;
        return res.json()
      })
      .then(obj => {
        if (status === 201) {
          dispatch(setCurrentAlert('success', 'Sign up successful.'));
          return this.props.history.push('/sign-in');
        }

        throw(obj.message);
      })
      .catch(e => {
        let message = 'There was an error signing up.';

        if (e === 'EmailAlreadyTaken') {
          message += ' Email is already taken.';
        }

        dispatch(setCurrentAlert('primary', message));
        console.error(e);
      });
  }

  render() {
    const submitBtnText = this.props.type === 'sign-up' ? 'Sign Up' : 'Sign In'

    return (
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={this.emailInput} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" ref={this.passwordInput} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.submit} >
              {submitBtnText}
            </button>
        </form>
    );
  }
}

SignInForm.propTypes = {
  type: PropTypes.string
}

export default withRouter(SignInForm);
