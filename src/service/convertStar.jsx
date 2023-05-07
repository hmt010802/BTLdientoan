import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import React from 'react';

function ConvertToStars(rating) {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        starArray.push(<FontAwesomeIcon icon={faStar} className="star" key={i} />);
        rating -= 1;
      } else if (rating > 0 && rating < 1) {
        starArray.push(<FontAwesomeIcon icon={faStarHalfAlt} className="star" key={i} />);
        rating = 0;
      } else {
        starArray.push(<FontAwesomeIcon icon={faStarRegular} className="star" key={i} />);
      }
    }
    return starArray;
  }
  export default ConvertToStars