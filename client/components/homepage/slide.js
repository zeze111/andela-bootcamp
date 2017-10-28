import React from 'react';
import { Slider, Slide } from 'react-materialize';

export default () => {
  return (
    <div className="container">
      <div className="row" style={{marginTop: 1 + 'em'}}>
        <Slider>
          <Slide
            src="../../assets/images/recipe.png" className="responive-img" 
            placement= "left" >
            <p className="blue-text" style={{marginTop: 215 + 'px', fontSize: 30 + 'px' }}> Sign Up For Free! </p>
          </Slide>
          <Slide 
            src="../../assets/images/food.jpg" className="responive-img"
            placement = "left">
            <p className="light grey-text text-lighten-3" style={{ fontSize: 30 + 'px' }}> Come indulge your taste buds </p>
          </Slide>
          <Slide 
            src="../../assets/images/food2.jpg" className="responive-img" 
             placement = "center">
            <p className=" light grey-text text-lighten-3" style={{ fontSize: 30 + 'px' }}> Share your culinary talent </p>
          </Slide>
          <Slide 
            src="../../assets/images/des.jpg" className="responive-img" 
            placement = "right">
            <p className="light blue-text" style={{ fontSize: 30 + 'px' }}> Yummy treats for your meets </p>
          </Slide>
        </Slider>
      </div>
    </div>
  );
}
