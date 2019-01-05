import React, { Component } from 'react';
import FormData from './components/SearchForm/SearchForm';
import { searchVideos } from './api';
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
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiI1YzMwMTUzMjM3MDBmYzIyMzFlNjkyNDAiLCJpYXQiOjE1NDY2NjI4MzAsImV4cCI6MTU0Njc0OTIzMCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiYW5vbnltb3VzIiwianRpIjoiNDFkODFiZDgtYjliZi00OGE0LWI3MWQtNGRiZDA2MDc2MmVhIn0.8SENEhr2PIYgD3qxBEYP07Hi82qFgFm2doyJmXhTVfU',
      results: [],
      pageInfo: {}
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

  submitSearchQuery = async () => {
    const { accessToken, formValue } = this.state;
    const { lat, lng, radius } = formValue;

    const { data } = await searchVideos(accessToken, lat, lng, radius);

    const { results, pageInfo } = data;

    this.setState({
      results,
      pageInfo
    });
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
