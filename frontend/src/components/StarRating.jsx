import { useState } from 'react';

/**
 * StarRating Component
 * Interactive or display-only star rating (1-10 scale).
 * @param {number} rating - Current rating value
 * @param {function} onRate - Callback when a star is clicked (omit for readonly)
 * @param {boolean} readonly - If true, disables interaction
 */
const StarRating = ({ rating = 0, onRate, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const totalStars = 10;

  return (
    <div className={`star-rating ${readonly ? 'readonly' : ''}`}>
      {Array.from({ length: totalStars }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= (hoverRating || rating);
        const isHovered = !readonly && starValue <= hoverRating;

        return (
          <span
            key={starValue}
            className={`star ${isFilled ? 'filled' : ''} ${isHovered ? 'hovered' : ''}`}
            onClick={() => !readonly && onRate && onRate(starValue)}
            onMouseEnter={() => !readonly && setHoverRating(starValue)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            role={readonly ? 'img' : 'button'}
            aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
