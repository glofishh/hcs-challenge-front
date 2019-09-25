import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/UserRoute';
import Dashboard from './user/UserDashboard';
import AddTask from './user/AddTask';
import UpdateTask from './user/UpdateTask';
import Home from './core/Home';


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/" exact component={Home}/>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/signup" exact component={Signup}/>
        <PrivateRoute path ="/user/dashboard" exact component={Dashboard} />
        <AddTask path ="/create/task" exact component={AddTask} />
        <UpdateTask path ="/user/task/update/:taskId" exact component={UpdateTask} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;