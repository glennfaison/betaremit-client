import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions';
import { Settings, Routes } from '../../constants';


function NavBar(props) {
  return (
    props.thisUser.data &&
    <nav className="navbar navbar-expand-md navbar-light bg-light w-100 py-3">
      <div className="container">
        <a className="navbar-brand" href=".">{Settings.AppShortName}</a>
        <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle Navigation">
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href=".">Landing<span className="sr-only">(current)</span></a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="." id="dropdownId" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">{props.thisUser.data.firstName + ' ' + props.thisUser.data.otherNames}</a>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <a className="dropdown-item" href={Routes.login}
                  onClick={props.logOut}>
                  Sign Out
                </a>
                <a className="dropdown-item" href={Routes.products}>Product list</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state, ownProps) => ({
  thisUser: state.thisUser,
  router: state.router,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
