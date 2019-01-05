import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import { searchVideos } from '../api';

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

    if (!lat || !lng || !radius) {
      return;
    }

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
    const { fullname = '' } = this.props;

    return (
      <div className="search-page">
        <SearchForm
          formValue={this.state.formValue}
          fullname={fullname}
          changeValue={this.changeFormValue}
          submitForm={() => this.submitSearchQuery(this.state.formValue)}
        />
        <SearchResults results={this.state.results} />
        <div className="d-flex flex-items-center">
          {this.state.pageInfo.prevPageToken && (
            <button
              className="button button--light"
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
              className="button button--light"
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
