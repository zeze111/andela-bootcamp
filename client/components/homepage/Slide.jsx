import React from 'react';
import { Slider, Slide } from 'react-materialize';
import slide1 from '../../assets/images/recipe.png';
import slide2 from '../../assets/images/food.jpg';
import slide3 from '../../assets/images/food2.jpg';
import slide4 from '../../assets/images/des.jpg';

export default () => {
  return (
    <div className="container">
      <div className="row" style={{marginTop: '0', paddingTop: '1em'}}>
        <Slider>
          <Slide
            src={slide1} className="responive-img" 
            placement= "left" >
            <p className="blue-text" style={{marginTop: 215 + 'px', fontSize: 30 + 'px' }}> Sign Up For Free! </p>
          </Slide>
          <Slide 
            src={slide2} className="responive-img"
            placement = "left">
            <p className="light grey-text text-lighten-3" style={{ fontSize: 30 + 'px' }}> Come indulge your taste buds </p>
          </Slide>
          <Slide 
            src={slide3} className="responive-img" 
             placement = "center">
            <p className=" light grey-text text-lighten-3" style={{ fontSize: 30 + 'px' }}> Share your culinary talent </p>
          </Slide>
          <Slide 
            src={slide4} className="responive-img" 
            placement = "right">
            <p className="light blue-text" style={{ fontSize: 30 + 'px' }}> Yummy treats for your meets </p>
          </Slide>
        </Slider>
      </div>
    </div>
  );
}
