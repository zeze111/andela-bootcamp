import React from 'react';

/**
 *
 *
 * @returns {function} App
 * @extends {React.Component}
 */
const PageNotFound = () => (
  <div className="row">
    <div className="col s12 center-align none">
      <h3 className="nf-text home-width"> Oops! Page Not Found </h3>
    </div>
    <div className="col s12 center-align nf-page">
      <img
        alt="Not Found"
        src="/images/404.jpg"
        className="responsive-img"
      />
    </div>
    <div className="col s12 center-align none">
      <h5 className="nf-text2"> When the page you're looking for
      gives you lemons,
      </h5>
      <h5 className="nf-text3"> make
        <span className="nf-span"> Lemonade </span>
      </h5>
    </div>
  </div>
);

export default PageNotFound;
