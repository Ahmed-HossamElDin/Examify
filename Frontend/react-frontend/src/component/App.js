import React, { Component } from "react";
import LoginForm from "./component/LoginForm";
import axios from "axios";
export default class App extends Component {
  state = {
    user: { username: "", res: "", key: "", error: "" },
  };
  login = (details) => {
    axios
      .post(
        `http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/dj-rest-auth/login/`,
        { username: details.username, password: details.password }
      )
      .then((res) => {
        this.setState({
          user: {
            res: res,
            username: this.state.user.username,
          },
        });
        console.log(res);
        this.confirmLogin(details);
      })
      .catch((error) => {
        var n = error.toString().includes("400");

        if (n) {
          this.setState({
            user: {
              error: "Password or username incorrect, please try again.",
            },
          });
        } else {
          this.setState({
            user: {
              error: "You must log in first.",
            },
          });
        }
      });
  };
  confirmLogin = (details) => {
    if (this.state.user.res) {
      this.setState({
        user: {
          username: details.username,
          key: this.state.user.res.data.key,
        },
      });
    } else {
      console.log("Error");
    }
  };
  logout = () => {
    this.setState({ user: { username: "" } });
  };
  render() {
    return (
      <div>
        {this.state.user.key ? (
          <div>
            <h1>Welcome {this.state.user.username}</h1>
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : (
          <div>
            <LoginForm login={this.login} error={this.state.user.error} />
          </div>
        )}
      </div>
    );
  }
}
