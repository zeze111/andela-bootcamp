import React from 'react';
import { Link  } from 'react-router-dom';

export default () => {
  return (
    <div className="container" >
    <br/> <br/>
    <Link to="/popularRecipes">
      <h5 className="light teal-text"> POPULAR RECIPES </h5>
    </Link>
    <div className="row">
      <div className="categories-container">
        <ul id="favelist" className="categories ">
          <li id="flist1">
            <div className="col s2 offset-1">
              <div className="card hoverable grey lighten-3">
                <div className="card-image">
                  <img src="../../assets/images/card.jpeg" className="responsive-img" style={{height: 130 + 'px'}}/>
                  <div className="card-action">
                    <Link to="/recipe" style={{fontSize: 14 + 'px'}}> Baked Alaska </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li id="flist2">
            <div className="col s2 offset-1">
              <div className="card hoverable grey lighten-3">
                <div className="card-image">
                  <img src="../../assets/images/card2.jpg" className="responsive-img" style={{height: 130 + 'px'}}/>
                  <div className="card-action">
                    <Link to="#" style={{fontSize: 14 + 'px'}}> Stir Fry Shrimp </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li id="flist3">
            <div className="col s2 offset-1">
              <div className="card hoverable grey lighten-3">
                <div className="card-image">
                  <img src="../../assets/images/card.jpeg" className="responsive-img" style={{height: 130 + 'px'}}/>
                  <div className="card-action">
                    <Link to="#" style={{fontSize: 14 + 'px'}}> Baked Alaska </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
}
