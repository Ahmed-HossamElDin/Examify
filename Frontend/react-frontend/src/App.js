import React, { Component } from "react";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
import ResetPassword from "./views/ResetPassword";
import Landing from "./views/Landing";
import ExaminerDashboard from "./views/Dashboard";
import UserProfile from "./views/profile";
import CodeEdit from "./views/CodeEdit";
import { Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <Landing />} />
        <Route path="/test" render={() => <CodeEdit />} />
        <Route path="/register" render={() => <RegisterForm />} />
        <Route path="/login" render={() => <LoginForm />} />
        <Route path="/reset" render={() => <ResetPassword/>} />
        <Route path="/dashboard" component={ExaminerDashboard} />
        <Route path="/profile" component={UserProfile} />
      </div>
    );
  }
}
