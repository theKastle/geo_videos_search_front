import React from 'react';

const SearchResults = ({ results, loading, error }) => {
  return (
    <div className="search-results-container">
      {error ? (
        <div className="search-results--status">Something went wrong.</div>
      ) : loading ? (
        <div className="search-results--status">Loading...</div>
      ) : results.length ? (
        results.map(result => (
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
        ))
      ) : (
        <div className="search-results--status">Nothing</div>
      )}
    </div>
  );
};

export default SearchResults;
