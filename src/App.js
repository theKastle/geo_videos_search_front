import React, { Component } from 'react';
import SearchPage from './pages/Search';
import { authenticate, signup } from './api';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'; // { Link }
import jwt from 'jsonwebtoken';

import AuthenticationForm from './components/AuthenticationForm';

const initState = {
  accessToken: '',
  isAuthenticated: false,
  checkLogin: false,
  username: '',
  fullname: '',
  password: '',
  processingAuth: false,
  error: false
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      ...initState
    };
  }

  componentDidMount() {
    const savedToken = localStorage.getItem('accessToken');

    if (!savedToken) {
      return this.logout();
    }

    const { fullname, exp } = jwt.decode(savedToken);
    const currentTime = new Date().getTime() / 1000;

    if (currentTime > exp) {
      this.logout()
    } else {
      this.setState({
        accessToken: savedToken,
        isAuthenticated: true,
        checkLogin: true,
        fullname
      });
    }
  }

  changeFormValue = (label, value) => {
    this.setState({
      [label]: value
    });
  };

  logout = async () => {
    localStorage.removeItem('accessToken');
    this.setState({
      ...initState,
      checkLogin: true
    });
  };

  login = async (username, password) => {
    try {
      await this.toggleError();
      await this.toggleProcessingAuth();

      const { data } = await authenticate(username, password);
      const { accessToken } = data;
      const { fullname } = jwt.decode(accessToken);

      localStorage.setItem('accessToken', accessToken);

      this.setState({
        accessToken,
        isAuthenticated: true,
        fullname,
        processingAuth: false,
        error: false
      });
    } catch (err) {
      this.setState({
        processingAuth: false,
        error: true
      });
    }
  };

  signup = async (username, password, fullname) => {
    try {
      await this.toggleError();
      await this.toggleProcessingAuth();
      await signup(username, password, fullname);
      await this.login(username, password);
    } catch (err) {
      this.setState({
        processingAuth: false,
        error: true
      });
    }
  };

  async toggleProcessingAuth() {
    await new Promise((resolve, reject) => {
      this.setState(
        prevState => ({
          processingAuth: !prevState.processingAuth
        }),
        () => {
          return resolve();
        }
      );
    });
  }

  async toggleError() {
    await new Promise((resolve, reject) => {
      this.setState({ error: false }, () => {
        return resolve();
      });
    });
  }

  render() {
    if (!this.state.checkLogin) {
      return null;
    }

    return (
      <BrowserRouter>
        <>
          {this.state.isAuthenticated ? (
            <SearchPage
              accessToken={this.state.accessToken}
              fullname={this.state.fullname}
              logout={this.logout}
            />
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
                      loading={this.state.processingAuth}
                      error={this.state.error}
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
                      loading={this.state.processingAuth}
                      error={this.state.error}
                      changeValue={this.changeFormValue}
                      formValue={this.state}
                      submitForm={() =>
                        this.signup(
                          this.state.username,
                          this.state.password,
                          this.state.fullname
                        )
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
