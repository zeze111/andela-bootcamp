import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const TextFieldGroup = ({
  value, onChange, id, type, name, req, label, error, active, placeholder
}) => (
  <div className="input-field">
    <label className={active} htmlFor={id}>{label}
      <span style={{ color: 'red' }} > {req} </span>
    </label>
    <input
      value={value}
      onChange={onChange}
      id={id}
      placeholder={placeholder}
      type={type}
      className="validate"
      name={name}
    />
    {error &&
    <span className="help-block red-text error-text-field">{error}
    </span>}
  </div>
);

export const TextFieldGroup2 = ({
  value, onChange, id, name, req, label, error, placeholder
}) => (
  <div className="input-field">
    <label className="active" htmlFor={id}>{label}
      <span style={{ color: 'red' }} > {req} </span>
    </label>
    <textarea
      value={value}
      onChange={onChange}
      id={id}
      type="text"
      placeholder={placeholder}
      className="materialize-textarea"
      name={name}
    />
    {error &&
    <span className="help-block red-text error-text-field">{error}
    </span>}
  </div>
);

export const TextFieldGroup3 = ({
  value, onChange, id, name, label, icon, error, isDisabled, type
}) => (
  <div className="input-field">
    <label className="active" htmlFor={id}>{label}
      <i className="material-icons left">{icon}</i>
    </label>
    <input
      value={value}
      onChange={onChange}
      id={id}
      type={type}
      className="validate"
      name={name}
      disabled={isDisabled}
    />
    {error &&
    <span className="help-block red-text error-text-field">{error}
    </span>}
  </div>
);

export const LinkFieldGroup = ({
  to, href, dataTool, icon
}) => (
  <li>
    <Link
      to={to}
      href={href}
      className="btn-floating
      btn-medium
      tooltipped
      waves-effect
      waves-light
      grey lighten-1"
      data-position="bottom"
      data-tooltip={dataTool}
    >
      <i className="material-icons">{icon}</i>
    </Link>
  </li>
);

export const LinkFieldGroup2 = ({
  to, href, item, icon, onClick
}) => (
  <li className="nav-list">
    <i className="material-icons">{icon}</i>
    <Link
      to={to}
      href={href}
      className="white-text list-item caps"
      onClick={onClick}
    >{item}
    </Link>
  </li>
);

TextFieldGroup.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  active: PropTypes.string,
  req: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.arrayOf(PropTypes.any),
};

TextFieldGroup2.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  req: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.arrayOf(PropTypes.any),
};

TextFieldGroup3.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  error: PropTypes.arrayOf(PropTypes.any),
};

LinkFieldGroup.propTypes = {
  to: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  dataTool: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

LinkFieldGroup2.propTypes = {
  to: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

TextFieldGroup.defaultProps = {
  error: [],
  active: '',
  placeholder: '',
  req: ''
};

TextFieldGroup2.defaultProps = {
  error: [],
  placeholder: '',
  req: ''
};

TextFieldGroup3.defaultProps = {
  error: [],
  isDisabled: false
};
