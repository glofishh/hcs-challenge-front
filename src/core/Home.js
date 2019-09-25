import React from 'react';
import { signout, isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="ml-2 mt-2">
      <h1>landing page<hr /></h1> 
      <div className="ml-3">
          {isAuthenticated() && (
              <Link to="/user/dashboard">
                hi, {isAuthenticated().user.name}!
              </Link>
          )}
        <br/>
          {!isAuthenticated() && (
            <Link to="/signin">sign in</Link>
          )}
        <br/>
          {!isAuthenticated() && (
            <Link to="/signup">
              sign up
            </Link>
          )}
        <br/>
          {isAuthenticated() && (
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "red" }}
                onClick={() =>
                  signout(() => {
                    window.location.assign("/");
                  })
                }
              >
                sign out
              </span>
          )}
      </div>
    </div>
  );
};

export default Home;