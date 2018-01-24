import React from 'react';
import PropTypes from 'prop-types';

const Search = props => (
  <form className="col s7 offset-s4">
    <div className="row">
      <div className="input-field col s6">
        <label htmlFor="search" />
        <input
          placeholder="Search for Recipes"
          type="text"
          id="search"
          value={props.search}
          onChange={props.onChange}
        />
      </div>
      <div className="col s6">
        <button
          className="btn grey top"
          type="button"
        >
          <i className="material-icons">search</i>
        </button>
      </div>
    </div>
  </form>
);

Search.propTypes = {
  search: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Search;
