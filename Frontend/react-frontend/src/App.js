import './App.css';
import RegisterForm from './views/RegisterForm'
import React, { Component } from "react";
import LoginForm from "./views/LoginForm";

export default class App extends Component {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

}