import React from 'react';
import { Link } from 'react-router-dom';

const AllContent = ({ recipe: { id, name, prepTime, image } }) => {
  const show = name.substring(0,10)+"...";
  return (
    <li >
      <div className="col s2 offset-1">
        <div className="card hoverable grey lighten-4" style={{ height: '200px', width: '190px' }}>
          <div className="card-image">
            <img src={image || '/images/noimg.png'} className="responsive-img" style={{ height: 130 + 'px' }} />
            <div className="card-action">
              <Link to={`/recipe/${id}`} className="tooltip" data-tooltip={name} style={{ fontSize: 14 + 'px' }}> {show} : { prepTime} </Link>
            </div>
          </div>
        </div>
      </div>
    </li>

  );
}

export default AllContent;
