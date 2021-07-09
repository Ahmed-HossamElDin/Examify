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

export default class ResetPassword extends Component {
  componentDidMount() {
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    error: false,
    loading: false
  };
  startLoading = () => {
    this.setState({ loading: true });
  };
  endLoading = () => {
    this.setState({ loading: false });
  };
  rese = () => {
    this.startLoading();
    axios
      .post( //change endpoint
        `https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/dj-rest-auth/login/`,
        {
          //email
        }
      )
      .then((res) => {
        this.setState({
          user: {
            res: res,
            username: this.state.user.username,
          },
        });
      })
      .catch((error) => {
        var n = error.toString().includes("400");

        if (n) {
          this.setState({
            loading: false,
            user: {
              error: "Email incorrect, please try again.",
            },
          });
        } else {
          this.setState({
            loading: false,
            error: "Reset error, please try again."
          });
        }
      });
  };

handleChange(event) {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
}

handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { email } = this.state;
    if (email) {
      axios
        .post(
          "https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/dj-rest-auth/registration/",
          this.state.user
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  

 
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
                    <span className="login100-form-title">Password reset</span>
                    <div>
                      {this.state.error !== "" &&
                      this.state.error !== undefined ? (
                        <div
                          className="error"
                          style={{
                            textAlign: "center",
                            fontSize: 14,
                          }}
                        >
                          {this.state.error}
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <div className="wrap-input100 validate-input">
                        <input
                          className="input100"
                          type="text"
                          id="email"
                          placeholder="E-mail"
                          onChange={this.handleChange}
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div className="container-login100-form-btn">
                      <button className="login100-form-btn" type="submit">
                        Reset
                      </button>
                      </div>

                      
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
        </SimpleBar>
      </div>
    );
  }
}
