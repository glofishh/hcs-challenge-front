import React, { useState, useEffect } from 'react';
import { isAuthenticated, signout } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getTasks, deleteTasks } from './apiUser';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { user, token } = isAuthenticated();

  const loadTasks = () => {
    getTasks().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTasks(data);
      }
    });
  };

  const removeTask = taskId => {
    deleteTasks(taskId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadTasks();
      }
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);


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

  const userLinks = () => {
    return (
      <div className="card">
        <h1 className="card-header">My Links</h1>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/create/task">add new task <i className="fas fa-heart" style={{fontSize: "12px"}}></i></Link>
          </li>
          <li 
            className="list-group-item"
            style={{ cursor: "pointer", color: "red" }}
            onClick={() =>
              signout(() => {
                window.location.assign("/");
              })}
          >
            sign out
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-2">
        <h1 className="card-header">Account Information</h1>
        <ul className="list-group">
          <li className="list-group-item">
            <b>Name:</b> {user.name}</li>
          <li className="list-group-item">
            <b>Email:</b> {user.email}</li>
        </ul>
      </div>
    );
  };

  const userTasks = () => {
    return (
      <div className="container">
      <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8 text-uppercase"><h2>manage tasks</h2></div>
                    <div class="col-sm-4">
                    </div>
                </div>
            </div>

            <table class="table">
                <thead>
                  <tr>
                    <th><div className="text-uppercase">tasks total: {tasks.length}</div></th>
                    </tr>
                </thead>
                <tbody>
                
                  <tr>
                  <td className="list-group">
                    {tasks.map((t, i) => (
                      <div className="list-group-item py-0">
                        <td key={i}>
                          <b>{i+1}. {t.name}</b> - <i>{t.description}</i> - <b><u> due by {t.date.slice(0,10)}</u></b>
                        </td>
                        <td>
                            <a class="edit" title="Edit" data-toggle="tooltip">
                              <Link to={`/user/task/update/${t._id}`}>
                                <i className="far fa-edit"></i>
                              </Link>
                            </a>
                            <a class="delete" title="Delete" data-toggle="tooltip" onClick={() => removeTask(t._id)}>
                                <i className="far fa-trash-alt"></i>
                            </a>
                            </td>
                        </div>
                      ))}
                  </td>
                  </tr>
                </tbody>
            </table>
          </div>
        </div>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="container mt-4">
          <h2>{`welcome back, ${user.name}!`}<hr /></h2>
            <div className="row">
              <div className="col-3">
                {userInfo()}
                {userLinks()}
              </div>
              <div className="col-9">
                {userTasks()}
              </div>

            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;