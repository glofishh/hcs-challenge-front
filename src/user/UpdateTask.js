import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getTask, updateTask } from './apiUser';

const UpdateTask = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: '',
    description: '',
    date: '',
    loading: false,
    error: '',
    createdTask: '',
    redirectToProfile: false,
    formData: ''
  });

  const {
    name,
    description,
    date,
    loading,
    error,
    createdTask,
    redirectToProfile,
    formData
  } = values;

  //load and set form data
  const init = taskId => {
    getTask(taskId).then(data =>{
      if (data.error) {
        setValues({...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          date: data.date,
          formData: new FormData()
        });
      }
    });
  };


  useEffect(() => {
    init(match.params.taskId);
  }, []);

  
  const handleChange = name => event => {
    const value =
      name === event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    updateTask(match.params.taskId, user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          date: '',
          loading: false,
          error: false,
          redirectToProfile: true,
          createdTask: data.name
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3 text-uppercase" onSubmit={clickSubmit}>

      <div className="form-group">
          <label className="text-uppercase">new task name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control border rounded-0"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-uppercase">new task description</label>
          <input
            onChange={handleChange("description")}
            className="form-control border rounded-0"
            value={description}
          />
        </div>

        <div className="form-group">
          <label className="text-uppercase">new task date</label>
          <input
            onChange={handleChange("date")}
            type="number"
            className="form-control border rounded-0"
            value={date}
          />
        </div>

        <button>update task</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      <i className="fas fa-exclamation-triangle"></i> {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="text-success"
      style={{ display: createdTask ? '' : 'none'}}
    >
      <h2>Your task has been successfully updated.</h2>
    </div>
  );

  const showLoading = () => 
    loading && (
      <div className="alert alert-success">
        <h2>loading...</h2>
      </div>
    );
  
    const goBackToDashboard = () => (
      <div>
        <Link to="/user/dashboard" className="mt-5">
          go back to dashboard
        </Link>
      </div>
    );

    const redirectUser = () => {
      if (redirectToProfile) {
        if (!error) {
          return <Redirect to="/user/dashboard" />;
        }
      }
    };


  return (
    <div className="container">
      <div class="table-wrapper">
          <div class="table-title">
              <div class="row">
                  <div class="col-sm-8 text-uppercase"><h2>update task</h2>
                  </div>
              </div>
          </div>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}
          {goBackToDashboard()}
        </div>
        </div>
  );
};

export default UpdateTask;