import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const TextFieldGroup = ({
  value, onChange, id, type, name, label, error, active
}) => (
  <div className="input-field">
    <label className={active} htmlFor={id}>{label}
    </label>
    <input
      value={value}
      onChange={onChange}
      id={id}
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
  value, onChange, id, name, label, error
}) => (
  <div className="input-field">
    <label className="active" htmlFor={id}>{label}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      id={id}
      type="text"
      className="materialize-textarea"
      name={name}
    />
    {error &&
    <span className="help-block red-text error-text-field">{error}
    </span>}
  </div>
);

export const TextFieldGroup3 = ({
  value, onChange, id, name, label, icon, isDisabled
}) => (
  <div className="input-field">
    <label className="active" htmlFor={id}>{label}
      <i className="material-icons left">{icon}</i>
    </label>
    <input
      value={value}
      onChange={onChange}
      id={id}
      type="text"
      className="validate"
      name={name}
      disabled={isDisabled}
    />
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
      className="white-text list-item"
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
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.arrayOf(PropTypes.any),
};

TextFieldGroup2.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
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
  isDisabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
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
  active: ''
};

TextFieldGroup2.defaultProps = {
  error: []
};

TextFieldGroup3.defaultProps = {
  isDisabled: false
};
