import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllRecipes } from '../../actions/recipeActions'
import Slide from './Slide';
import PopularContent from './PopularContent';
import AllContent from './AllContent';




class Homepage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.getAllRecipes();
  }

  render() {
    const { getAllRecipes } = this.props;
    return (
      <div id="homepageBody">
        <main>
          <Slide />
          <PopularContent/>
          <div className="container" style={{ width: 100 + '%', margin: 0 + 'auto' }}>
            <br /> <br />
            <Link to="/allRecipes">
              <h5 className="light teal-text"> ALL RECIPES </h5>
            </Link>
            <div className="row remove-margin-bottom">
              <div className="categories-container">
                <ul className="categories">
                  {
                    this.props.recipes.map((recipe, index) => {
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
