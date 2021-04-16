import './App.css';
import './vendor/bootstrap/css/bootstrap.min.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './vendor/animate/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/select2/select2.min.css';
import './css/util.css';
import './css/main.css';
import logo from './images/examify.png'


function Register() {
  return (
    <div className="Register">
      <div>
          <link rel="icon" type="image/png" href="images/icons/favicon.ico" />
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
                    <input className="input100" type="text" name="username" placeholder="Username" />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-envelope" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <input className="input100" type="password" name="password" placeholder="Password" />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password confirmation is required">
                    <input className="input100" type="password" name="password-confirm" placeholder="Re-enter password" />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                    <input className="input100" type="text" name="email" placeholder="Email" />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-envelope" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn">
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


export default Register;
