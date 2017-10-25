import React from 'react';
import { Link  } from 'react-router-dom';

export default () => {
  return (
    <div className="container" style={{width: 100 + '%', margin: 0 + 'auto'}}>
    <br/> <br/>
    <Link to="/allRecipes">
    <h5 className="light teal-text"> ALL RECIPES </h5>
    </Link>
    <div className="row">
      <div className="categories-container">
        <ul id="alllist" className="categories">
          <li id="alist1">
            <div className="col s2 offset-1">
              <div className="card hoverable grey lighten-3">
                <div className="card-image">
                  <img src="assets/images/card.jpeg" className="responsive-img" style={{height: 130 + 'px'}}/>                    
                  <div className="card-action">
                    <Link to="#" style={{fontSize: 14 + 'px'}}> Baked Alaska </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li id="alist2">
            <div className="col s2 offset-1">
              <div className="card hoverable grey lighten-3">
                <div className="card-image">
                  <img src="assets/images/nig2.jpg" className="responsive-img" style={{height: 130 + 'px'}}/>                    
                  <div className="card-action">
                    <Link to="#" style={{fontSize: 14 + 'px'}}> Goat Peppersoup </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li id="alist3">
            <div className="col s2 offset-1">
              <div className="card hoverable grey lighten-3">
                <div className="card-image">
                  <img src="assets/images/card2.jpg" className="responsive-img" style={{height: 130 + 'px'}}/>
                  <div className="card-action">
                    <Link to="#" style={{fontSize: 14 + 'px'}}> Stir Fry Shrimp </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li id="alist4">
            <div className="col s2 offset-1">
              <div className="card hoverable grey lighten-3">
                <div className="card-image">
                  <img src="assets/images/nig1.jpg" className="responsive-img" style={{height: 130 + 'px'}}/>
                  <div className="card-action">
                    <Link to="#" style={{fontSize: 14 + 'px'}}> Jollof Rice </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li id="alist5">
            <div className="col s2 offset-1">
              <div className="card hoverable grey lighten-3">
                <div className="card-image">
                  <img src="assets/images/card.jpeg" className="responsive-img" style={{height: 130 + 'px'}}/>                    
                  <div className="card-action">
                    <Link to="#" style={{fontSize: 14 + 'px'}}> Baked Alaska </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li id="alist6">
            <div className="col s2 offset-1">
              <div className="card hoverable grey lighten-3">
                <div className="card-image">
                  <img src="assets/images/nig2.jpg" className="responsive-img" style={{height: 130 + 'px'}}/>
                  <div className="card-action">
                    <Link to="#" style={{fontSize: 14 + 'px'}}> Goat Peppersoup </Link>
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
