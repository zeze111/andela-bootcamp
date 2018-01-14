import React from 'react';
import PropTypes from 'prop-types';

export const TextFieldGroup = ({
  value, onChange, id, type, name, label, error
}) => (
  <div className="input-field">
    <label htmlFor={id}>{label}</label>
    <input
      value={value}
      onChange={onChange}
      id={id}
      type={type}
      className="validate"
      name={name}
    />
    {error && <span className="help-block red-text" style={{ fontSize: `${13}px` }}>{error}</span>}
  </div>);

export const TextFieldGroup2 = ({
  value, onChange, id, type, classname, name, label, error
}) => (
  <div className="input-field">
    <label htmlFor={id}>{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      id={id}
      className="materialize-textarea"
      name={name}
    />
    {error && <span className="help-block red-text" style={{ fontSize: `${13}px` }}>{error}</span>}
  </div>);

export const TextFieldGroup3 = ({
  value, onChange, id, type, name, label, icon
}) => (
  <div className="input-field">
    <label htmlFor={id}>{label}
      <i className="material-icons left">{icon}</i>
    </label>
    <input
      value={value}
      onChange={onChange}
      id={id}
      type={type}
      className="validate"
      name={name}
    />
  </div>);

TextFieldGroup.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.array,
};

TextFieldGroup2.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.array,
};

TextFieldGroup3.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

TextFieldGroup2.defaultProps = {
  type: 'text'
};

TextFieldGroup3.defaultProps = {
  type: 'text'
};
