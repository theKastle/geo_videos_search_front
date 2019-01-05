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

  submitSearchQuery = async (formValue, pageToken) => {
    const { lat, lng, radius } = formValue;

    const { data } = await searchVideos(
      this.props.accessToken,
      lat,
      lng,
      radius,
      pageToken
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
          submitForm={() => this.submitSearchQuery(this.state.formValue)}
        />
        <SearchResults results={this.state.results} />
        <div>
          {this.state.pageInfo.prevPageToken && (
            <button
              onClick={() =>
                this.submitSearchQuery(
                  this.state.formValue,
                  this.state.pageInfo.prevPageToken
                )
              }
            >
              Prev
            </button>
          )}
          {this.state.pageInfo.nextPageToken && (
            <button
              onClick={() =>
                this.submitSearchQuery(
                  this.state.formValue,
                  this.state.pageInfo.nextPageToken
                )
              }
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
