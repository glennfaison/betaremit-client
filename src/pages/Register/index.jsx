import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Routes } from '../../constants';
import { signUpWithEmailAndPassword } from '../../store/actions';

import './index.css'

function submitRegistration(props, e = new Event()) {
  e.preventDefault();
  const user = {
    username: e.target.elements.username.value,
    firstName: e.target.elements.firstName.value,
    otherNames: e.target.elements.otherNames.value,
    email: e.target.elements.email.value,
    password: e.target.elements.password.value,
    repeatPassword: e.target.elements.repeatPassword.value,
  };
  props.signUpWithEmailAndPassword(user);
}

function Register(props) {
  return (
    <div className="container-fluid">

      {/* Side nav */}
      <div className="sidenav">
        <div className="login-main-text">
          <h2>Application<br /> Registration Page</h2>
          <p>Register from here to access.</p>
        </div>
      </div>
      {/* End Side nav */}

      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">

            {/* Login form element */}
            <form name="registrationForm" action={Routes.products} onSubmit={e => submitRegistration(props, e)}>
              <div className="form-group">
                <label>Username</label>
                <input type="text" name="username" className="form-control" placeholder="Username" />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" className="form-control" placeholder="First Name" />
              </div>
              <div className="form-group">
                <label>Other Names</label>
                <input type="text" name="otherNames" className="form-control" placeholder="Other Names" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password" />
              </div>
              <div className="form-group">
                <label>Repeat Password</label>
                <input type="password" name="repeatPassword" className="form-control" placeholder="Repeat Password" />
              </div>

              {/* Submit button */}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-black">Register</button>
              </div>

              {/* Login redirect link */}
              <div className="small text-center">
                Already have an account? <Link to={Routes.login}>Log In</Link>
              </div>

            </form>
            {/* End Login form */}

          </div>
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  router: state.router
});

export default connect(mapStateToProps, {
  signUpWithEmailAndPassword,
})(Register);
