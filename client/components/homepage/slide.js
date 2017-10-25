import React from 'react';

export default () => {
  return (
    <div className="container">
      <div className="row" style={{marginTop: 1 + 'em'}}>
        <div className="slider">
          <ul className="slides">
            <li>
              <img src="../../assets/images/recipe.png" className="responive-img" />
              <div className="caption bottom left-align">
                <h4 className="blue-text" style={{marginTop: 215 + 'px' }}> Sign Up For Free! </h4>
              </div>
            </li>
            <li>
              <img src="../../assets/images/food.jpg" className="responive-img" />
              <div className="caption left-align">
                <h4 className="light grey-text text-lighten-3 "> Come indulge your taste buds </h4>
              </div>
            </li>
            <li>
              <img src="../../assets/images/food2.jpg" className="responive-img" />
              <div className="caption center-align">
                <h4 className=" light grey-text text-lighten-3"> Share your culinary talent </h4>
              </div>
            </li>
            <li>
              <img src="../../assets/images/des.jpg" className="responive-img" />
              <div className="caption right-align">
                <h4 className="light blue-text"> Yummy treats for your meets </h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
