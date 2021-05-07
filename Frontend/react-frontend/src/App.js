<<<<<<< HEAD
import './App.css';
import RegisterForm from './views/RegisterForm'
import React, { Component } from "react";
import LoginForm from "./views/LoginForm";
=======
import React, { Component } from "react";
import LoginForm from "./views/LoginForm";
import RegisterForm from './views/RegisterForm'
import Landing from './views/Landing'
import { Route } from 'react-router-dom'
>>>>>>> Frontend

export default class App extends Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
        <LoginForm />
      </div>
    );
  }

}
=======
        <Route exact path="/" render={() => (
          <Landing/>
        )}
        />
        <Route path="/register" render={() => (
          <RegisterForm/>
        )}
        />
        <Route path="/login" render={() => (
          <LoginForm/>
        )}
        />
      </div>
    );
  }
}
>>>>>>> Frontend
