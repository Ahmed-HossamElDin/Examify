import React, { Component } from "react";
import TiltPhaseSix from "../TiltPhaseSix";
import "../vendor/bootstrap/css/bootstrap.min.css";
import "../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../vendor/animate/animate.css";
import "../vendor/css-hamburgers/hamburgers.min.css";
import "../vendor/select2/select2.min.css";
import logo from "../images/examify-transparent.png";
import "../css/main.css";
import "../css/util.css";
import axios from "axios";

export default class loginForm extends Component {
  state = {
    user: { username: "", res: "", key: "", error: "" },
    details: {
      username: "",
      password: "",
    },
  };
  login = (details) => {
    axios
      .post(
        `https://cors-anywhere.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/dj-rest-auth/login/`,
        {
          username: details.username,
          password: details.password,
        }
      )
      .then((res) => {
        this.setState({
          user: {
            res: res,
            username: this.state.user.username,
          },
        });
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

  submitHandler = (e) => {
    e.preventDefault();
    this.login(this.state.details);
  };
  updateusername = (query) => {
    this.setState(() => ({
      details: {
        username: query.trim(),
        password: this.state.details.password,
      },
    }));
  };
  updatepassword = (query) => {
    this.setState(() => ({
      details: {
        password: query.trim(),
        username: this.state.details.username,
      },
    }));
  };

  render() {
    const options = {
      max: 10,
      perspective: 100,
      scale: 1,
    };
    return (
      <div>
        {this.state.user.key ? (
          <div>
            <h1>Welcome {this.state.user.username}</h1>
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : (
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <TiltPhaseSix options={options}>
                  <img src={logo} alt="logo" />
                </TiltPhaseSix>
                <form
                  onSubmit={this.submitHandler}
                  className="login100-form validate-form"
                >
                  <span className="login100-form-title">Login</span>
                  <div>
                    {this.state.user.error !== "" &&
                    this.state.user.error !== undefined ? (
                      <div
                        className="error"
                        style={{ textAlign: "center", fontSize: 14 }}
                      >
                        {this.state.user.error}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="wrap-input100 validate-input">
                      <input
                        className="input100"
                        type="text"
                        id="username"
                        onChange={(e) => this.updateusername(e.target.value)}
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        <i className="fa fa-user" aria-hidden="true"></i>
                      </span>
                    </div>

                    <div
                      className="wrap-input100 validate-input"
                      data-validate="Password is required"
                    >
                      <input
                        className="input100"
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => this.updatepassword(e.target.value)}
                        required
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        <i className="fa fa-lock" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="container-login100-form-btn">
                      <button className="login100-form-btn" type="submit">
                        Login
                      </button>
                    </div>

                    <div className="text-center p-t-12">
                      <span className="txt1"> Forgot</span>
                      <a className="txt2" href="localhost:3000">
                        {" "}
                        Username / Password?
                      </a>
                    </div>

                    <div className="text-center p-t-136">
                      <a className="txt2" href="localhost:3000">
                        Create your Account
                        <i
                          className="fa fa-long-arrow-right m-l-5"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
