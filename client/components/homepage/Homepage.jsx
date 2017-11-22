import React, { Component }  from 'react';
import Slide from './Slide';
import PopularContent from './PopularContent';
import AllContent from './AllContent';
import '../../assets/style.scss';
import '../../assets/init';

class Homepage extends Component {
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
