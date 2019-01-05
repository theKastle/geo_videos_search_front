import React, { Component } from 'react';
import SearchPage from './pages/Search';
import { authenticate, signup } from './api';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'; // { Link }
import jwt from 'jsonwebtoken';

import AuthenticationForm from './components/AuthenticationForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accessToken: '',
      isAuthenticated: false,
      username: '',
      fullname: '',
      password: ''
    };
  }

  changeFormValue = (label, value) => {
    this.setState({
      [label]: value
    });
  };

  login = async (username, password) => {
    try {
      const { data } = await authenticate(username, password);
      const { accessToken } = data;
      const { fullname } = jwt.decode(accessToken);

      this.setState({
        accessToken,
        isAuthenticated: true,
        fullname
      });
    } catch (err) {}
  };

  signup = async (username, password, fullname) => {
    try {
      await signup(username, password, fullname);
      await this.login(username, password);
    } catch (err) {}
  };

  render() {
    return (
      <BrowserRouter>
        <>
          {this.state.isAuthenticated ? (
            <SearchPage accessToken={this.state.accessToken} fullname={this.state.fullname}/>
          ) : (
            <div
              className={`authentication-page ${
                this.state.isAuthenticated
                  ? 'authentication-page--light-background'
                  : 'authentication-page--colored-background'
              }`}
            >
              <Switch>
                <Route
                  path="/login"
                  render={props => (
                    <AuthenticationForm
                      type={'login'}
                      changeValue={this.changeFormValue}
                      formValue={this.state}
                      submitForm={() =>
                        this.login(this.state.username, this.state.password)
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
                        this.signup(this.state.username, this.state.password, this.state.fullname)
                      }
                    />
                  )}
                />
                <Redirect to="/login" />
              </Switch>
            </div>
          )}
        </>
      </BrowserRouter>
    );
  }
}

export default App;
