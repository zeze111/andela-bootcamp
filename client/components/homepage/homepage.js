import React, { Component }  from 'react';
import Slide from './slide';
import PopularContent from './popularContent';
import AllContent from './allContent';
import '../../assets/style.scss';


class homepage extends Component {
  render() {
    return (
      <div>
        <main>
          <Slide/>
          <PopularContent/>
          <AllContent/>
        </main>
      </div>
    );
  }
}
 export default homepage;
