import React, { Component } from "react";
import TiltPhaseSix from "../TiltPhaseSix";
import "../vendor/bootstrap/css/bootstrap.min.css";
import "../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../vendor/animate/animate.css";
import "../vendor/css-hamburgers/hamburgers.min.css";
import "../vendor/select2/select2.min.css";
import logo from "../images/examify.png";
import "../css/main.css";
import "../css/util.css";
export default class loginForm extends Component {
  state = {
    details: {
      email: "",
      password: "",
    },
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.props.login(this.state.details);
  };
  updateemail = (query) => {
    this.setState(() => ({
      details: {
        email: query.trim(),
        password: this.state.details.password,
      },
    }));
  };
  updatepassword = (query) => {
    this.setState(() => ({
      details: {
        password: query.trim(),
        email: this.state.details.email,
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
                {this.props.error !== "" ? (
                  <div>{this.props.error}</div>
                ) : (
                  <div></div>
                )}
                <div class="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    id="email"
                    onChange={(e) => this.updateemail(e.target.value)}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
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

                <div class="text-center p-t-12">
                  <span class="txt1"> Forgot</span>
                  <a class="txt2" href="localhost:3000">
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
    );
  }
}
