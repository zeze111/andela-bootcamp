import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ value, onChange, id, type, name, label, error }) => {
  return (
    <div className="input-field">
      <label className={classnames('', { 'red-text': error })} htmlFor={id}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={id}
        type={type}
        className="validate"
        name={name}
      />
      {error && <span className="help-block" style={{ fontSize: 13 + 'px' }}>{error}</span>}
    </div>);
};

TextFieldGroup.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.array,
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
