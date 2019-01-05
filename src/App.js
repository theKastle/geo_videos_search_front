import React, { Component } from 'react';
import SearchPage from './pages/Search';
import { authenticate } from './api';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'; // { Link }

import './App.css';
import AuthenticationForm from './components/AuthenticationForm/AuthenticationForm';

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

  login = async () => {
    const { email, password } = this.state;
    try {
      const { data } = await authenticate(email, password);
      const { accessToken } = data;

      this.setState({
        accessToken,
        isAuthenticated: true
      });
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
                    submitForm={this.login}
                  />
                )}
              />
              <Route
                path="/signup"
                render={props => (
                  <AuthenticationForm
                    type={'login'}
                    changeValue={this.changeFormValue}
                    formValue={this.state}
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
