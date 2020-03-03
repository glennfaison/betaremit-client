import React from 'react';

import './index.css';
import { Routes } from '../../constants';

export default function NotFound(props) {
  return (
    <div className="col d-flex justify-content-center position-relative p-5">
    
      <div className="notfound text-center position-absolute mt-5">
        <div className="notfound-bg">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>oops!</h1>
        <h2>Error 404 : Page Not Found</h2>
        <a href={Routes.products}>go back</a>
        {/*
        <div className="notfound-social">
          <a href="."><i className="fa fa-facebook"></i></a>
          <a href="."><i className="fa fa-twitter"></i></a>
          <a href="."><i className="fa fa-pinterest"></i></a>
          <a href="."><i className="fa fa-google-plus"></i></a>
        </div>
        */}
      </div>

    </div>
  );
}