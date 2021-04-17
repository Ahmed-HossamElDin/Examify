import React, {Component} from "react";
import $ from 'jquery'; 
//import useForm from "./useForm";
import './App.css';
import './vendor/bootstrap/css/bootstrap.min.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './vendor/animate/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/select2/select2.min.css';
import './css/util.css';
import './css/main.css';
import logo from './images/examify.png';
import * as jquery from "./vendor/jquery/jquery-3.2.1.min.js";
import * as bootstrap from "./vendor/bootstrap/js/bootstrap.min.js";
import * as popper from "./vendor/bootstrap/js/popper.js";
import * as select2 from "./vendor/select2/select2.min.js";
import * as tilt from "./vendor/tilt/tilt.jquery.min.js";
import * as main from "./js/main.js";


// var loadScript = function(src) {
//     var tag = document.createElement('script');
//     tag.type = 'text/babel';
//     tag.async = false;
//     tag.src = src;
//     document.body.appendChild(tag);
//   }


class Register extends Component{

 componentDidMount() {
//     const script = document.createElement("script");
//     script.async = false;
//     var scripts = ["/vendor/jquery/jquery-3.2.1.min.js",
//     "/vendor/bootstrap/js/bootstrap.min.js",
//     "/vendor/bootstrap/js/popper.js",
//     "/vendor/select2/select2.min.js",
//     "/vendor/tilt/tilt.jquery.min.js",
//     "/js/main.js"]
//     scripts.forEach(function(item,index){
//         loadScript(item);
//     })
 test = require('./vendor/tilt/tilt.jquery.min.js');
 }

render(){
  //const{handleChange, values} = useForm(); 

  return (
    <div className="Register">
      <div>
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <div className="login100-pic js-tilt" data-tilt>
                  <img src={logo} alt="Logo" />
                </div>
                <form className="login100-form validate-form">
                  <span className="login100-form-title">
                    Examiner sign up
                  </span>
                  <div className="wrap-input100 validate-input" data-validate="Username is required">
                    <input className="input100" type="text" id="username" name="username" placeholder="Username"/>
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-envelope" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <input className="input100" type="password" id="password" name="password" placeholder="Password"/>
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password confirmation is required">
                    <input className="input100" type="password" id="password2" name="password2" placeholder="Re-enter password"/>
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                    <input className="input100" type="text" id="email" name="email" placeholder="Email"/>
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
