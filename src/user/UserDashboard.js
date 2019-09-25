import React, { useState, useEffect } from 'react';
import { isAuthenticated, signout } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getAllTasks } from './apiUser';

const Dashboard = () => {
  const [allTasks, setAllTasks] = useState([]);
  const {user: {_id, name, email, role}} = isAuthenticated();
  const token = isAuthenticated().token;

  // const init = (userId, token) => {
  //   getAllTasks(userId, token).then(data => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setAllTasks(data);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   init(_id, token);
  // }, []);

  // const userLinks = () => {
  //   return (
  //     <div className="card">
  //       <h1 className="card-header">My Links</h1>
  //       <ul className="list-group">
  //         <li className="list-group-item black-5 text-uppercase">
  //           <Link to="/user/tasks">my tasks <i className="fas fa-heart" style={{fontSize: "12px"}}></i></Link>
  //         </li>
  //         <li className="list-group-item black-5 text-uppercase">
  //         <Link to={`/profile/${_id}`}>update profile</Link>
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // };

  const userInfo = () => {
    return (
      <div className="card mb-2">
        <h1 className="card-header">Account Information</h1>
        <ul className="list-group">
          <li className="list-group-item">
            <b>Name:</b> {name}</li>
          <li className="list-group-item">
            <b>Email:</b> {email}</li>
        </ul>
      </div>
    );
  };

  const userTasks = () => {
    return (
      <div className="card mb-2">
        <h1 className="card-header">My Tasks</h1>
        <ul className="list-group">
          <li className="list-group-item">
            <h5 className="text-uppercase mb-0">
              Name:</h5>
              {name}</li>
          <li className="list-group-item">
            <h5 className="text-uppercase mb-0">
              Email:</h5>
              {email}</li>
          <li className="list-group-item">
            <h5 className="text-uppercase mb-0">
              Role:</h5>
              {role === 1 ? 'admin' : 'user'}</li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="container mt-4">
          <h2>{`welcome back, ${name}!`}<hr /></h2>
            <div className="row">
              <div className="col-3">
                {userInfo()}
              </div>
              <div className="col-9">
                {userTasks()}
              </div>
              <span
                style={{ cursor: "pointer", color: "red" }}
                onClick={() =>
                  signout(() => {
                    window.location.assign("/");
                  })}
              >
                sign out
              </span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;