import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import { searchVideos } from '../api';
import './App.css';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      formValue: {
        lat: '',
        lng: '',
        radius: ''
      },
      loading: false,
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
    const { formValue } = this.state;
    const { lat, lng, radius } = formValue;

    const { data } = await searchVideos(
      this.props.accessToken,
      lat,
      lng,
      radius
    );

    const { results, pageInfo } = data;

    this.setState({
      results,
      pageInfo
    });
  };

  render() {
    return (
      <div className="App">
        <SearchForm
          formValue={this.state.formValue}
          changeValue={this.changeFormValue}
          submitForm={this.submitSearchQuery}
        />
        <SearchResults results={this.state.results} />
      </div>
    );
  }
}

export default SearchPage;
