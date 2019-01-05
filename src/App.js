import React, { Component } from 'react';
import FormData from './components/SearchForm/SearchForm';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      formValue: {
        lat: '',
        lng: '',
        radius: ''
      },
      loading: false,
    };
  }

  changeFormValue = (label, value) => {
    this.setState(prevState => ({
      formValue: {
        ...prevState.formValue,
        [label]: value
      }
    }));
  };

  submitSearchQuery = () => {
    console.log('query --> ', this.state);
  };

  render() {
    return (
      <div className="App">
        <FormData
          formValue={this.state.formValue}
          changeValue={this.changeFormValue}
          submitForm={this.submitSearchQuery}
        />
      </div>
    );
  }
}

export default App;
