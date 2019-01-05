import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/images/search.svg';

const SearchForm = ({ submitForm, changeValue, formValue, fullname = '' }) => {
  return (
    <div className="search-form">
      <div className="text-input__wrapper text-input__wrapper--row text-input__wrapper--dark">
        <input
          type="text"
          placeholder="lattitude"
          onChange={e => changeValue('lat', e.target.value)}
          value={formValue.lat}
          className="text-input__input text-input__input--dark"
        />
      </div>
      <div className="text-input__wrapper text-input__wrapper--row text-input__wrapper--dark">
        <input
          type="text"
          placeholder="longitue"
          onChange={e => changeValue('lng', e.target.value)}
          value={formValue.lng}
          className="text-input__input text-input__input--dark"
        />
      </div>
      <div className="text-input__wrapper text-input__wrapper--row text-input__wrapper--dark">
        <input
          type="text"
          placeholder="radius (km)"
          onChange={e => changeValue('radius', e.target.value)}
          value={formValue.radius}
          className="text-input__input text-input__input--dark"
        />
      </div>
      <div className="button" onClick={submitForm}>
        <SearchIcon width={24} height={24} />
      </div>
      <div className="fullname-welcome">
        {`Hello, ${(fullname).slice(0, 10)} ${fullname.length > 10 ? '...' : ''}`}
      </div>
    </div>
  );
};

export default SearchForm;
