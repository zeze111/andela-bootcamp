import React from 'react';
import { Link } from 'react-router-dom';

const AllContent = ({ recipe: { name } }) => {
  return (
    <li >
      <div className="col s2 offset-1">
        <div className="card hoverable grey lighten-3">
          <div className="card-image">
            <img src="../../assets/images/card.jpeg" className="responsive-img" style={{ height: 130 + 'px' }} />
            <div className="card-action">
              <Link to="#" style={{ fontSize: 14 + 'px' }}> {name} </Link>
            </div>
          </div>
        </div>
      </div>
    </li>

  );
}

export default AllContent;
