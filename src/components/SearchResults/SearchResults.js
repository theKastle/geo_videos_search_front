import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results-container">
      {results.map(result => (
        <div key={result.id} className="search-result">
          <div className="search-result__thumbnail">
            <a href={result.link}>
              <img
                alt={result.title}
                src={result.thumbnails.default.url}
                width={result.thumbnails.default.width}
                height={result.thumbnails.default.height}
              />
            </a>
          </div>
          <div className="search-result__info">
            <a href={result.link} className="search-result__title">
              {result.title}
            </a>
            <div className="search-result__description">
              {result.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
