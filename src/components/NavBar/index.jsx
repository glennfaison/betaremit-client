import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions';
import { Settings, Routes } from '../../constants';


class NavBar extends React.Component {
  render() {
    const { logOut } = this.props;
    return (
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
              {/*
                <li className="nav-item">
                  <a className="nav-link" href=".">Link</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="." id="dropdownId" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">Dropdown</a>
                  <div className="dropdown-menu" aria-labelledby="dropdownId">
                    <a className="dropdown-item" href=".">Action 1</a>
                    <a className="dropdown-item" href=".">Action 2</a>
                  </div>
                </li>
              */}
            </ul>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="." id="dropdownId" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">{this.props.thisUser.data.firstName + ' ' + this.props.thisUser.data.otherNames}</a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <Link className="dropdown-item" to={Routes.login}
                    onClick={() => logOut()}>
                    Sign Out
                  </Link>
                  <a className="dropdown-item" href={Routes.products}>Product list</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ thisUser, router }, ownProps) => ({
  thisUser,
  router
});

export default connect(mapStateToProps, {
  logOut
})(withRouter(NavBar));
