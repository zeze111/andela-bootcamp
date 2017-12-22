import React from 'react';
import { Link } from 'react-router-dom';

const AllContent = ({ recipe: { id, name, prepTime, image } }) => {
  return (
    <li >
      <div className="col s2 offset-1">
        <div className="card hoverable grey lighten-3">
          <div className="card-image">
            <img src={image || '/images/noimg.png'} className="responsive-img" style={{ height: 130 + 'px' }} />
            <div className="card-action">
              <Link to={`/recipe/${id}`} style={{ fontSize: 14 + 'px' }}> {name} : { prepTime} </Link>
            </div>
          </div>
        </div>
      </div>
    </li>

  );
}

export default AllContent;
