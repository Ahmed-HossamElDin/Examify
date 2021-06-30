import React, { Component } from "react";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
import Landing from "./views/Landing";
import ExaminerDashboard from "./views/Dashboard";
import UserProfile from "./views/profile";
import { Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <Landing />} />
        <Route path="/register" render={() => <RegisterForm />} />
        <Route path="/login" render={() => <LoginForm />} />
        <Route path="/dashboard" component={ExaminerDashboard} />
        <Route path="/profile" component={UserProfile} />
      </div>
    );
  }
}
