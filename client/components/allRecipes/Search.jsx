import React from 'react';
import PropTypes from 'prop-types';

/** Stateless component to render search bar
 *
 * @export {function} Search
 *
 * @param {object} props
 *
 * @returns {null} null
 */
const Search = props => (
  <form className="col s12 offset-s1 offset-m3 offset-l5 paginate">
    <div className="row">
      <div className="input-field col l6 m9 s12">
        <i className="material-icons search-icon">
        search
        </i>
        <input
          className="search-input"
          placeholder="Search for recipes"
          type="text"
          id="search"
          value={props.search}
          onChange={props.onChange}
        />
      </div>
    </div>
  </form>
);

Search.propTypes = {
  search: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Search;
