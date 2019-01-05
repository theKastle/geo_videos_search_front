import React from 'react';
import { Link } from 'react-router-dom';

const AuthenticationForm = ({ type, submitForm, changeValue, formValue }) => {
  return (
    <div>
      <div>
        {type === 'login' && (
          <>
            <span>Not have an account ? </span>
            <Link to={`/signup`}>Đăng ký</Link>
          </>
        )}
      </div>
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
