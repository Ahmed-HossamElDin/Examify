import React, { Component } from "react";
import axios from "axios";
import TiltPhaseSix from "../components/TiltImage";
import { Link, Redirect } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import "../css/util.css";
import "../css/main.css";
import "../css/register.css";
import logo from "../images/examify.png";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import CircularProgress from "@material-ui/core/CircularProgress";

class Register extends Component {
  componentDidMount() {
    this.setState({ goToDashboard: false, goToLogin: false }, () => {
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
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        password1: "",
        password2: "",
        email: "",
        user_type: "",
      },
      submitted: false,
      goToDashboard: false,
      goToLogin: false,
      loading: false,
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  updateuserType = (e) => {
    const { user } = this.state;
    this.setState(
      {
        user: {
          ...user,
          user_type: e.target.value,
        },
      },
      function() {
        console.log(this.state);
      }
    );
  };
  isUpper = (str) => {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
  };
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true, loading: true }, () => {
      const { user } = this.state;
      if (user.password1 === user.password2) {
        if (user.password1.toString().length < 8) {
          this.setState({
            error: "Passwords must be atleast 8 characters!",
            loading: false,
          });
        } else {
          var hasUpperCase = false;
          for (var i = 0; i < user.password1.toString().length; i++) {
            hasUpperCase = this.isUpper(user.password1.toString().charAt(i));
          }
          if (hasUpperCase == false) {
            this.setState({
              error: "Passwords must contain an upper case letter!",
              loading: false,
            });
          }
        }
      }
      if (user.user_type == "") {
        this.setState({
          error: "User type is required",
          loading: false,
        });
      } else if (user.password1 !== user.password2) {
        this.setState({
          error: "Passwords don't match!",
          loading: false,
        });
      } else {
        if (
          user.username &&
          user.password1 &&
          user.password2 &&
          user.email &&
          user.user_type
        ) {
          axios
            .post(
              "https://examify-cors-proxy.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/dj-rest-auth/registration/",
              this.state.user
            )
            .then((response) => {
              this.setState({
                goToLogin: true,
                loading: false,
                error: "",
              });
            })
            .catch((error) => {
              var error_str = "";
              Object.keys(error.response.data).map((key) => {
                error_str += error.response.data[key][0];
                console.log(error.response.data[key][0], error_str);
              });
              this.setState({
                loading: false,
                error: error_str,
              });
            });
        } else {
          this.setState({
            error: "All fields are required",
            loading: false,
          });
        }
      }
    });
  }
  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;

    //options for tilting image
    const options = {
      max: 10,
      perspective: 100,
      scale: 1,
    };

    return (
      <div className="Register">
        {this.state.goToDashboard && <Redirect to="/dashboard/home" />}{" "}
        {this.state.goToLogin && <Redirect to="/login" />}
        <SimpleBar>
          <div>
            <div className="limiter">
              <div className="container-login100">
                <div className="wrap-login100">
                  <TiltPhaseSix options={options}>
                    <img src={logo} alt="logo" />
                  </TiltPhaseSix>
                  <form
                    className="login100-form validate-form"
                    onSubmit={this.handleSubmit}
                  >
                    <span className="login100-form-title">Sign up</span>
                    {this.state.error !== "" ? (
                      <div style={{ textAlign: "center", color: "red" }}>
                        {this.state.error}
                        <br />
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div
                      className="wrap-input100 validate-input"
                      data-validate="Username is required"
                    >
                      <input
                        className="input100"
                        required
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={this.handleChange}
                      />
                      <span className="focus-input100" />
                      <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true" />
                      </span>
                    </div>
                    <div
                      className="wrap-input100 validate-input"
                      data-validate="Password is required"
                    >
                      <input
                        className="input100"
                        type="password"
                        required
                        id="password1"
                        name="password1"
                        placeholder="Password"
                        value={user.password1}
                        onChange={this.handleChange}
                      />
                      <span className="focus-input100" />
                      <span className="symbol-input100">
                        <i className="fa fa-lock" aria-hidden="true" />
                      </span>
                    </div>
                    <div
                      className="wrap-input100 validate-input"
                      data-validate="Password confirmation is required"
                    >
                      <input
                        className="input100"
                        required
                        type="password"
                        id="password2"
                        name="password2"
                        placeholder="Re-enter password"
                        value={user.password2}
                        onChange={this.handleChange}
                      />
                      <span className="focus-input100" />
                      <span className="symbol-input100">
                        <i className="fa fa-lock" aria-hidden="true" />
                      </span>
                    </div>
                    <div
                      className="wrap-input100 validate-input"
                      data-validate="Valid email is required: ex@abc.xyz"
                    >
                      <input
                        className="input100"
                        required
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={this.handleChange}
                      />
                      <span className="focus-input100" />
                      <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true" />
                      </span>
                    </div>{" "}
                    <FormControl
                      className="form"
                      width="auto"
                      component="fieldset"
                      id="user-selection"
                      value={this.value}
                      onChange={this.updateuserType}
                    >
                      <FormLabel className="form" component="legend">
                        Sign up as
                      </FormLabel>
                      <RadioGroup
                        className="form"
                        row
                        aria-label="user-type"
                        name="user-type"
                      >
                        <FormControlLabel
                          className="form"
                          value="1"
                          control={<Radio color="primary" />}
                          label="Student"
                          required
                        />
                        <FormControlLabel
                          className="form"
                          value="2"
                          control={<Radio color="primary" />}
                          label="Examiner"
                        />
                        <FormControlLabel
                          className="form"
                          value="3"
                          control={<Radio color="primary" />}
                          label="Proctor"
                        />
                      </RadioGroup>
                    </FormControl>
                    <div className="container-login100-form-btn">
                      {this.state.loading ? (
                        <button
                          disabled
                          style={{ backgroundColor: "gray" }}
                          className="login100-form-btn"
                          type="submit"
                        >
                          {this.state.loading && <CircularProgress />}{" "}
                          {"   Signing  Up"}
                        </button>
                      ) : (
                        <button className="login100-form-btn" type="submit">
                          Sign Up
                        </button>
                      )}
                    </div>
                    <div className="text-center p-t-60">
                      Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </SimpleBar>
      </div>
    );
  }
}

export default Register;
