import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createTask } from './apiUser';

const AddTask = () => {
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

  //load categories and set form data
  const init = () => {
    setValues({
      ...values,
      formData: new FormData()
    });
  };

  useEffect(() => {
    init();
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

    createTask(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          date: '',
          loading: false,
          createdTask: data.name
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3 text-uppercase" onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-uppercase">item name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control border rounded-0"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-uppercase">task description</label>
          <input
            onChange={handleChange("description")}
            className="form-control border rounded-0"
            value={description}
          />
        </div>

        <div className="form-group">
          <label className="black-5 text-uppercase">task date</label>
          <input
            onChange={handleChange("date")}
            type="date"
            className="form-control border rounded-0"
            value={date}
          />
        </div>

        <br />< br />
        <button>create new task</button>
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
      <h2>Task has been successfully created.</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="text-success" style={{color: 'black'}}>
        <h2>Loading...</h2>
      </div>
    );
  
    const goBack = () => (
      <div className="mt-5">
        <Link to="/user/dashboard" className="mt-5">
          go back to dashboard
        </Link>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="table-wrapper">
          <div className="table-title">
              <div className="row">
                  <div className="col-sm-8 text-uppercase"><h2>add new task</h2>
                  </div>
              </div>
          </div>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {goBack()}
      </div>
    </div>
  )
}

export default AddTask;