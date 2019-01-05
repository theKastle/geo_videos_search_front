import React, { Component } from 'react';
import SearchPage from './pages/Search';
import { authenticate, signup } from './api';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'; // { Link }

import './App.css';
import AuthenticationForm from './components/AuthenticationForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accessToken: '',
      isAuthenticated: false,
      password: '',
      email: ''
    };
  }

  changeFormValue = (label, value) => {
    this.setState({
      [label]: value
    });
  };

  login = async (email, password) => {
    try {
      const { data } = await authenticate(email, password);
      const { accessToken } = data;

      this.setState({
        accessToken,
        isAuthenticated: true
      });
    } catch (err) {}
  };

  signup = async (email, password) => {
    try {
      await signup(email, password);
      await this.login(email, password);
    } catch (err) {}
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          {this.state.isAuthenticated ? (
            <SearchPage accessToken={this.state.accessToken} />
          ) : (
            <Switch>
              <Route
                path="/login"
                render={props => (
                  <AuthenticationForm
                    type={'login'}
                    changeValue={this.changeFormValue}
                    formValue={this.state}
                    submitForm={() =>
                      this.login(this.state.email, this.state.password)
                    }
                  />
                )}
              />
              <Route
                path="/signup"
                render={props => (
                  <AuthenticationForm
                    type={'signup'}
                    changeValue={this.changeFormValue}
                    formValue={this.state}
                    submitForm={() =>
                      this.signup(this.state.email, this.state.password)
                    }
                  />
                )}
              />
              <Redirect to="/login" />
            </Switch>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
