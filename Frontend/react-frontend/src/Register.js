import React, { Component } from "react";
import axios from "axios";
import TiltPhaseSix from "./TiltPhaseSix";
import './App.css';
import './vendor/bootstrap/css/bootstrap.min.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './vendor/animate/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/select2/select2.min.css';
import './css/util.css';
import './css/main.css';
import logo from './images/examify.png';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password1: '',
        password2: '',
        email: '',
        user_type:'1'
      },
      submitted: false
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
        [name]: value
      }
    });
  }

  handleSubmit(event) {

    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.username && user.password1 && user.password2 && user.email) {
      //this.props.register(user);
      console.log(this.state.user)
      axios.post('https://cors-anywhere.herokuapp.com/http://ec2-18-191-113-113.us-east-2.compute.amazonaws.com:8000/dj-rest-auth/registration/',this.state.user)
           .then(response => {
             console.log(response)
           })
           .catch(error =>{
             console.log(error)
           })
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;

    //options for tilting image
    const options = {
      max: 10,
      perspective: 100,
      scale: 1,
    }

    return (
      <div className="Register">
        <div>
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <TiltPhaseSix options={options}>
                  <img src={logo} alt="logo" />
                </TiltPhaseSix>
                <form className="login100-form validate-form" onSubmit={this.handleSubmit}>
                  <span className="login100-form-title">
                    Examiner sign up
                  </span>
                  <div className="wrap-input100 validate-input" data-validate="Username is required">
                    <input className="input100" type="text" id="username" name="username" placeholder="Username" value={user.username} onChange={this.handleChange} />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-envelope" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <input className="input100" type="password" id="password1" name="password1" placeholder="Password" value={user.password1} onChange={this.handleChange} />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password confirmation is required">
                    <input className="input100" type="password" id="password2" name="password2" placeholder="Re-enter password" value={user.password2} onChange={this.handleChange} />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                    <input className="input100" type="text" id="email" name="email" placeholder="Email" value={user.email} onChange={this.handleChange} />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-envelope" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn" type="submit">
                      Sign up
                    </button>
                  </div>
                  <div className="text-center p-t-136">
                    <div>Already have an account?</div>
                    <a className="txt2" href="#">
                      Login
                      <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
