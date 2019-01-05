import React from 'react';

const SearchResults = ({ results }) => {
  return results.map(result => (
    <div key={result.id}>
      <div>
        <img alt={result.title} src={result.thumbnails.default.url} width={result.thumbnails.default.width} height={result.thumbnails.default.height}/>
      </div>
      <div>{result.title}</div>
      <div>{result.description}</div>
    </div>
  ));
};

export default SearchResults;
