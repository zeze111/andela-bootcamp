import React from 'react';
import { Slider, Slide } from 'react-materialize';
import slide1 from '../../assets/images/recipe.png';
import slide2 from '../../assets/images/food.jpg';
import slide3 from '../../assets/images/food2.jpg';
import slide4 from '../../assets/images/des.jpg';

/** Stateless component to render pictures for homepgae slider
 *
 * @export {function} Slide
 *
 * @returns {null} null
 */
export default () => (
  <div className="container">
    <div className="row no-top one-top">
      <Slider>
        <Slide
          src={slide1}
          className="responive-img"
          placement="left"
        >
          <p className="red-text
          slide-pad slide-text"
          > Sign Up For Free!
          </p>
        </Slide>
        <Slide
          src={slide2}
          className="responive-img"
          placement="left"
        >
          <p className="light
          grey-text text-lighten-3 slide-text"
          > Come indulge your taste buds
          </p>
        </Slide>
        <Slide
          src={slide3}
          className="responive-img"
          placement="center"
        >
          <p className="light
          grey-text text-lighten-3 slide-text"
          > Share your culinary talent
          </p>
        </Slide>
        <Slide
          src={slide4}
          className="responive-img"
          placement="right"
        >
          <p className="light
          grey-text text-lighten-5 slide-text"
          > Yummy treats for your meets
          </p>
        </Slide>
      </Slider>
    </div>
  </div>
);
