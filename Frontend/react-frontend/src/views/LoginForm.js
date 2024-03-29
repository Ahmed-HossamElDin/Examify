import React, { Component } from "react";
import TiltPhaseSix from "../components/TiltImage";
import logo from "../images/examify.png";
import { Link, Redirect } from "react-router-dom";
import "../css/main.css";
import "../css/util.css";
import axios from "axios";
import SimpleBar from "simplebar-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "simplebar/dist/simplebar.min.css";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class loginForm extends Component {
  componentDidMount() {
    localStorage.removeItem("ExamifyRememberMe");
    this.setState({ goToDashboard: false }, () => {
      if (
        localStorage.getItem("ExamifyToken") !== "" &&
        localStorage.getItem("ExamifyToken") !== null
      ) {
        this.setState({
          goToDashboard: true,
        });
      }
    });
  }
  state = {
    user: {
      username: "",
      res: "",
      key: "",
      error: "",
      type: "",
    },
    details: {
      username: "",
      password: "",
    },
    loading: false,
    goToDashboard: false,
  };
  startLoading = () => {
    this.setState({ loading: true });
  };
  endLoading = () => {
    this.setState({ loading: false });
  };
  login = (details) => {
    this.startLoading();
    axios
      .post(
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/dj-rest-auth/login/`,
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
        localStorage.setItem("ExamifyToken", res.data.key);
        localStorage.setItem("ExamifyUserType", res.data.user_type);
        localStorage.setItem("ExamifyUsername", details.username);
        this.confirmLogin(details);
      })
      .catch((error) => {
        var n = error.toString().includes("400");

        if (n) {
          this.setState({
            loading: false,
            user: {
              error: "Password or username incorrect, please try again.",
            },
          });
        } else {
          this.setState({
            loading: false,
            user: {
              error: "Error logging in, please try again.",
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
          type: this.state.user.res.data.type,
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
    if (
      localStorage.getItem("ExamifyRememberMe") === false ||
      localStorage.getItem("ExamifyRememberMe") === "false" ||
      localStorage.getItem("ExamifyRememberMe") === null
    ) {
      window.onbeforeunload = function() {
        localStorage.clear();
      };
    }
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
  handleRememberMe = () => {
    window.sessionStorage.setItem("key", "value");

    var toggle = localStorage.getItem("ExamifyRememberMe");
    if (localStorage.getItem("ExamifyRememberMe") === null) {
      localStorage.setItem("ExamifyRememberMe", true);
    } else {
      if (toggle === "true") localStorage.setItem("ExamifyRememberMe", false);
      else localStorage.setItem("ExamifyRememberMe", true);
    }
  };
  render() {
    const options = {
      max: 10,
      perspective: 100,
      scale: 1,
    };
    return (
      <div>
        {this.state.goToDashboard && <Redirect to="/dashboard/home" />}
        <SimpleBar>
          {this.state.user.key ? (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: {
                  username: this.state.user.username,
                  key: this.state.user.key,
                  usertype: this.state.user.type,
                },
              }}
            />
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
                          style={{
                            textAlign: "center",
                            fontSize: 14,
                            color: "red",
                          }}
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
                          required
                          id="username"
                          placeholder="Username"
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
                          placeholder="Password"
                          onChange={(e) => this.updatepassword(e.target.value)}
                          required
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                          <i className="fa fa-lock" aria-hidden="true" />
                        </span>
                      </div>

                      <div className="container-login100-form-btn">
                        {this.state.loading ? (
                          <button
                            disabled
                            style={{ backgroundColor: "gray" }}
                            className="login100-form-btn"
                            type="submit"
                          >
                            {this.state.loading && <CircularProgress />}{" "}
                            {"   Logging in"}
                          </button>
                        ) : (
                          <button className="login100-form-btn" type="submit">
                            Login
                          </button>
                        )}
                      </div>
                      <div className="text-center p-t-12">
                        <FormControlLabel
                          control={
                            <Checkbox onChange={this.handleRememberMe} />
                          }
                          label="Remember me"
                        />
                      </div>
                      <br />
                      {/*<div className="text-center p-t-12">
                        <Link to="#">Forgot username / password ?</Link>
                      </div>*/}

                      <div className="text-center p-t-136">
                        Don't have an account yet?
                        <Link to="/register">
                          {" "}
                          Sign up
                          <i
                            className="fa fa-long-arrow-right m-l-5"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </SimpleBar>
      </div>
    );
  }
}
