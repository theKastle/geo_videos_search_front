import React from 'react';

const SearchForm = ({ submitForm, changeValue, formValue }) => {
  return (
    <div>
      <div>
        <input
          type="text"
          onChange={e => changeValue('lat', e.target.value)}
          value={formValue.lat}
        />
      </div>
      <div>
        <input
          type="text"
          onChange={e => changeValue('lng', e.target.value)}
          value={formValue.lng}
        />
      </div>
      <div>
        <input
          type="text"
          onChange={e => changeValue('radius', e.target.value)}
          value={formValue.radius}
        />
      </div>
      <div onClick={submitForm}>Search</div>
    </div>
  );
};

export default SearchForm;
