import React from 'react';
import { Link } from 'react-router-dom';

const AuthenticationForm = ({
  type,
  submitForm,
  changeValue,
  formValue,
  loading,
  error
}) => {
  return (
    <div className="authentication-form">
      <h1 className="authentication-form__title">GEO VIDEO SEARCH</h1>
      <h3 className="authentication-form__description">
        {type === 'login'
          ? 'Login to search videos'
          : 'Sign up to search videos'}
      </h3>
      <div className="auth-box">
        {error && (
          <div className="auth-box__error">
            Something went wrong. Please try again.
          </div>
        )}
        <div className="text-input__wrapper">
          <input
            type="text"
            placeholder="Username"
            onChange={e => changeValue('username', e.target.value)}
            value={formValue.username}
            className="text-input__input"
          />
        </div>
        {type === 'signup' && (
          <div className="text-input__wrapper">
            <input
              type="text"
              placeholder="Fullname"
              onChange={e => changeValue('fullname', e.target.value)}
              value={formValue.fullname}
              className="text-input__input"
            />
          </div>
        )}
        <div className="text-input__wrapper">
          <input
            type="password"
            placeholder="Password"
            onChange={e => changeValue('password', e.target.value)}
            value={formValue.password}
            className="text-input__input"
          />
        </div>
        <div
          className={`button ${loading ? 'button--loading' : ''}`}
          onClick={submitForm}
        >
          {type.toUpperCase()}
        </div>
      </div>
      <div>
        {type === 'login' ? (
          <>
            <span>Not have an account ? </span>
            <Link to={`/signup`} className="color-white">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span>Already have an account ? </span>
            <Link to={`/login`} className="color-white">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthenticationForm;
