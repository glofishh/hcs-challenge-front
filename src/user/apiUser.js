import { API } from '../config';

export const read = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const update = (userId, token, user) => {
  return fetch(`${API}/user/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
      .catch(err => console.log(err));
};

export const updateUser = (user, next) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('jwt')) {
      let auth = JSON.parse(localStorage.getItem('jwt'));
      auth.user = user;
      localStorage.setItem('jwt', JSON.stringify(auth));
      next();
    }
  }
};

export const getAllTasks = (userId, token) => {
  return fetch(`${API}/tasks/by/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const createTask = (userId, token, task) => {
  return fetch(`${API}/task/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: task
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err)
    });
};

export const getTasks = () => {
  return fetch(`${API}/tasks`, {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};


export const deleteTasks = (taskId, userId, token) => {
  return fetch(`${API}/task/${taskId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getTask = (taskId) => {
  return fetch(`${API}/task/${taskId}`, {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const updateTask = (taskId, userId, token, task) => {
  return fetch(`${API}/task/${taskId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: task
  })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};