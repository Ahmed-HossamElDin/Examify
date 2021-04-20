import React, { Component } from "react";
import LoginForm from "./component/LoginForm";
import axios from "axios";
export default class App extends Component {
  state = {
    user: { name: "", email: "", res: "" },
  };
  login = (details) => {
    console.log("entered sendRequest");
    axios
      .post(
        `http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/dj-rest-auth/login/`,
        { username: details.email, password: details.password }
      )
      .then((res) => {
        this.setState({
          user: {
            res: res,
            name: this.state.user.name,
            email: this.state.user.email,
          },
        });
        console.log(res);
        console.log("getting response here", this.state.user);
        this.confirmLogin(details);
      })
      .catch((error) => {
        console.log("This is the error", error);
      });
    console.log("left sendRequest");
  };
  confirmLogin = (details) => {
    console.log("before if", this.state.user);
    if (this.state.user.res) {
      console.log("logged in");
      console.log("logging in here", this.state.user.res.data.key);
      this.setState({
        user: {
          name: details.email,
          email: details.email,
          res: this.state.res,
        },
      });
      console.log(this.state);
      this.setState({ error: "" });
    } else {
      console.log("Error");
      this.setState({ error: "Error" });
    }
  };
  logout = () => {
    this.setState({ user: { name: "", email: "" } });
  };
  render() {
    return (
      <div>
        {this.state.user.email !== "" ? (
          <div>
            <h1>Welcome {this.state.user.name}</h1>
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : (
          <div>
            <LoginForm login={this.login} error={this.state.error} />
          </div>
        )}
      </div>
    );
  }
}
