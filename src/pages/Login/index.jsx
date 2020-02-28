import React from 'react';
import { connect } from 'react-redux';

import { Routes } from '../../constants';
import { Link } from 'react-router-dom';

import './index.css'
import { logInWithEmailAndPassword } from '../../store/actions';

function submitRegistration(props, e = new Event()) {
  e.preventDefault();
  const user = {
    email: e.target.elements.email.value,
    password: e.target.elements.password.value,
  };

  props.logInWithEmailAndPassword(user);
}

function Login(props) {
  return (
    <div className="container-fluid">

      {/* Side nav */}
      <div className="sidenav">
        <div className="login-main-text">
          <h2>Application<br /> Login Page</h2>
          <p>Login or register from here to access.</p>
        </div>
      </div>
      {/* End Side nav */}

      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">

            {/* Login form element */}
            <form action={Routes.products} name="loginForm" onSubmit={e => submitRegistration(props, e)}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password" />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-black">Login</button>
              </div>
              <div className="small text-center">
                Don't have an account yet? <Link to={Routes.register}>Register</Link>
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
  router: state.router,
});

export default connect(mapStateToProps, {
  logInWithEmailAndPassword,
})(Login);
