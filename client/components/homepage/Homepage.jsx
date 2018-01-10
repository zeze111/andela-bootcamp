import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllRecipes } from '../../actions/recipeActions'
import Slide from './Slide';
import PopularContent from './PopularContent';
import AllContent from './AllContent';
import '../../assets/style.scss';
import '../../assets/init';

class Homepage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.getAllRecipes();
  }

  componentWillMount() {
    $(document).ready(() => {
      $('.dropown-button').dropdown();
      $('.materialboxed').materialbox();
      $('.tooltip').tooltip({delay: 20});
      Materialize.updateTextFields();
      $('select').material_select();
    });
  }
  

  render() {
    const { getAllRecipes } = this.props;
    const allRecipes = (this.props.recipes) ? (this.props.recipes) : [];
    return (
      <div id="homepageBody">
        <main>
          <Slide />
          <PopularContent />
          <div className="container" style={{ width: 100 + '%', margin: 0 + 'auto' }}>
            <br /> <br />
            <Link to="/allRecipes">
              <h5 className="light teal-text"> ALL RECIPES </h5>
            </Link>
            <div className="row remove-margin-bottom">
                <ul className="categories flex-container-homepage">
                  {
                    allRecipes.map((recipe, index) => {
                      return (
                        <AllContent
                          recipe={recipe}
                          key={index}
                          getAllRecipes={this.props.getAllRecipes}
                        />)
                    })
                  }
                </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Homepage.propTypes = {
  getAllRecipes: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    recipes: state.recipeReducer.recipes
  };
}

export default connect(mapStateToProps, { getAllRecipes })(Homepage);
