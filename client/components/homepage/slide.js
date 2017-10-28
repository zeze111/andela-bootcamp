import React from 'react';
import { Slider, Slide } from 'react-materialize';

export default () => {
  return (
    <div className="container">
      <div className="row" style={{marginTop: 1 + 'em'}}>
        <Slider>
          <Slide
            src="../../assets/images/recipe.png" className="responive-img" 
            placement= "bottom left" >
            <h4 className="blue-text" style={{marginTop: 215 + 'px' }}> Sign Up For Free! </h4>
          </Slide>
          <Slide 
            src="../../assets/images/food.jpg" className="responive-img"
            placement = "left">
            <h4 className="light grey-text text-lighten-3 "> Come indulge your taste buds </h4>
          </Slide>
          <Slide 
            src="../../assets/images/food2.jpg" className="responive-img" 
             placement = "center">
            <h4 className=" light grey-text text-lighten-3"> Share your culinary talent </h4>
          </Slide>
          <Slide 
            src="../../assets/images/des.jpg" className="responive-img" 
            placement = "right">
            <h4 className="light blue-text"> Yummy treats for your meets </h4>
          </Slide>
        </Slider>
      </div>
    </div>
  );
}
