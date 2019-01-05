import React from 'react';

const AuthenticationForm = ({ type, submitForm, changeValue, formValue }) => {
  return (
    <div>
      <div>
        <input
          type="text"
          onChange={e => changeValue('email', e.target.value)}
          value={formValue.email}
        />
      </div>
      <div>
        <input
          type="text"
          onChange={e => changeValue('password', e.target.value)}
          value={formValue.password}
        />
      </div>
      <div onClick={submitForm}>{type.toUpperCase()}</div>
    </div>
  );
};

export default AuthenticationForm;
