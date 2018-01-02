import React, { Component } from 'react';
import { TextFieldGroup3 } from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Favorites extends Component {

  render() {
    return (
      <div id="fave" className="col s10 offest-s2" style={{ marginTop: '3em', marginBottom: '3em' }}>
        <div id="myfave" className="col s11 offset-s1"> You currently have no Favourites </div>
      </div>
    )
  };
}

Favorites.propTypes = {
}

export default Favorites;
